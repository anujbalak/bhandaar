import multer from "multer"
import { addFile } from "../db/queries.js";

const upload = multer({ dest: 'uploads/'});

export const getUpload = (req, res) => {
    if (req.user) {
        return res.render('pages/upload')
    }
}

export const postUpload = [
    upload.single('file'),
    async (req, res) => {
        try {
            const file = req.file;
            const user = req.user
            console.log(file)
            await addFile(file.originalname, file.filename, file.size, user)
            res.redirect('/')   
        } catch (error) {
            console.error(error);
        }
    }
]