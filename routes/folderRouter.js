import { Router } from "express";
import { getCreateFolder, getFolderPage, postCreateFolder } from "../controllers/folderController.js";

const folderRouter = Router();

folderRouter.get('/:folderId', getFolderPage);

export default folderRouter;