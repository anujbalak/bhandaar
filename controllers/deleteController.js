import { deleteFromCloud, deleteFromCloudFolder } from "../cloudinary/cloudinaryQueries.js";
import { getFolder, removeFolder } from "../db/folderQueries.js";
import { deleteFile, getFile } from "../db/queries.js"
import fs from 'node:fs'

export const postDeleteFile = async (req, res) => {
    try {
        const { fileId } = req.params;
        const file = await getFile({id: fileId});
        
        // const filePath = `uploads/${file.filename}`
        await deleteFile(fileId);
        // fs.unlink(filePath, (err) => {
        //     if (err) throw err;
        // })
        await deleteFromCloud(file.public_id, file.resource_type);
        res.redirect('/');
    } catch (error) {
        console.error(error);
    }
}

export const postDeleteFolder = async (req, res) => {
    try {
        const { folderId } = req.params;
        console.log(folderId)
        await deleteFromCloudFolder(folderId);
        await removeFolder(folderId);
        res.redirect('/');
    } catch (error) {
        console.error(error);
    }
}