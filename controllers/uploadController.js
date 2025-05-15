import multer from "multer"
import { addFile } from "../db/queries.js";

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

            const user = req.user
            await addFile(file.originalname, file.filename, file.size, user)
            res.redirect('/')   
        } catch (error) {
            console.error(error);
        }
    }
]