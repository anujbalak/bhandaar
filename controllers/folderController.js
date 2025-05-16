import { body, validationResult } from "express-validator";
import { createFolder, createFolderInFolder, getFolder } from "../db/folderQueries.js";

export const getCreateFolder = (req, res) => {
    try {
        res.render('pages/index', {
            createFolder: true
        });
    } catch (error) {
        throw new Error(error);
    }
}

const folderNameValidation = () => 
    body('folder').trim()
    .notEmpty().withMessage('Folder name can not be empty')

export const postCreateFolder = [
    folderNameValidation(),
    async (req, res) => {
        try {
            const result = validationResult(req)
            if (!result.isEmpty()) {
                return res.render('pages/index', {
                    createFolder: true,
                    errors: result.array()
                })
            }
            const currentFolder = res.app.get('folder')
            const { folder } = req.body;
            const user = req.user
            if (currentFolder) {
                await createFolderInFolder(currentFolder.id, folder, user.id);
                res.redirect('/');
                return;
            }
            await createFolder(folder, user.id);
            res.redirect('/')
        } catch (error) {
            throw new Error(error);
        }
    }
]

export const getFolderPage = async (req, res) => {
    try {
        const { folderId } = req.params;
        const folder = await getFolder(folderId)
        res.locals.folder = folder;
        res.app.set('folder', folder);
        res.render('pages/index', {
            folders: folder.folders,
            files: folder.files,
        });
    } catch (error) {
        throw new Error(error);
    }
}