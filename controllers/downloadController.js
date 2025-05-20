import path from 'node:path'
import url from 'node:url'
import { __dirname } from '../app.js'
import { getAllFiles, getFile, updateDownloadCount } from '../db/queries.js';

export const getDownload = async (req, res, next) => {
   const { fileId } = req.params;
   const file = await getFile({id: fileId})
//    const filePath = path.join(__dirname, 'uploads', file.filename)
   await updateDownloadCount(fileId)
   console.log(file);
   await res.download(file.url, file.originalname,  (err) => {
    if (err) {
        console.error(err);
    }
    })
}

