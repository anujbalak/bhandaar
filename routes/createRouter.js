import { Router } from "express";
import { getCreateFolder, postCreateFolder } from "../controllers/folderController.js";
const createRouter = Router();

createRouter.get('/folder', getCreateFolder);
createRouter.post('/folder', postCreateFolder);
createRouter.get('/folder/:folderId', getCreateFolder);

export default createRouter;