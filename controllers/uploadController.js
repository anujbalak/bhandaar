import multer from "multer"
import { addFile } from "../db/queries.js";
import { uploadFileInFolder } from "../db/folderQueries.js";
import pkg from 'cloudinary'
import 'dotenv/config'
import { buildDataURL, handleFolderUpload, handleHomeUpload } from "../cloudinary/cloudinaryQueries.js";

const cloudinary = pkg.v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
})

// const upload = multer({ dest: 'uploads/'});
const storage = multer.memoryStorage();
const upload = multer({storage});
const uploadMiddleware = upload.single('file');

function runUploadMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result)
            }
            return resolve(result);
        })
    })
}


export const getUpload = (req, res) => {
    if (req.user) {
        return res.render('pages/upload')
    } else {
        return res.redirect('/')
    }
}



export const postUpload = [
    async (req, res) => {
        try {
            await runUploadMiddleware(req, res, uploadMiddleware);
            const file = req.file;
            if (!file) {
                return res.render('pages/upload', {
                    error: 'Select a file first'
                })
            }
            const dataURL = buildDataURL(file);
            
            const currentFolder = res.app.get('folder')
            const user = req.user;

            if (currentFolder) {
                const cldRes = await handleFolderUpload(dataURL, currentFolder);
                await uploadFileInFolder(
                    {
                        id:currentFolder.id, 
                        originalname: file.originalname, 
                        asset_id: cldRes.asset_id,
                        public_id: cldRes.public_id,
                        size: file.size, 
                        uploaderId: user.id,
                        url: cldRes.url,
                        resource_type: cldRes.resource_type,
                    });
                res.redirect(`/folder/${currentFolder.id}`);
                return;
            }
            const cldRes = await handleHomeUpload(dataURL);

            await addFile(
                {
                    originalname: file.originalname, 
                    size: file.size, 
                    asset_id: cldRes.asset_id,
                    public_id: cldRes.public_id,
                    uploaderId: user.id,
                    url: cldRes.url,
                    resource_type: cldRes.resource_type,
                })
            res.redirect('/')   
        } catch (error) {
            console.error(error);
            res.render('pages/errors', {
                error: error.error
            })
        }
    }
]

const main = async () => {
    try {
        const result = await cloudinary.api.resource('zpaecdubpdnhk1tncpf8')
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}