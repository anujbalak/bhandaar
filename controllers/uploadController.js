import multer from "multer"
import { addFile } from "../db/queries.js";
import { uploadFileInFolder } from "../db/folderQueries.js";

const upload = multer({ dest: 'uploads/'});

export const getUpload = (req, res) => {
    if (req.user) {
        return res.render('pages/upload')
    } else {
        return res.redirect('/')
    }
}

export const postUpload = [
    upload.single('file'),
    async (req, res) => {
        try {
            const file = req.file;
            if (!file) {
                return res.render('pages/upload', {
                    error: 'Select a file first'
                })
            }

            const currentFolder = res.app.get('folder')
            const user = req.user
            if (currentFolder) {
                await uploadFileInFolder(currentFolder.id, file.originalname, file.filename, file.size, user.id);
                res.redirect('/');
                return;
            }
            await addFile(file.originalname, file.filename, file.size, user)
            res.redirect('/')   
        } catch (error) {
            console.error(error);
        }
    }
]