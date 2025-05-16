import { Router } from "express";
import { postDeleteFile, postDeleteFolder } from "../controllers/deleteController.js";

const deleteRouter = Router();

deleteRouter.post('/file/:fileId', postDeleteFile)
deleteRouter.post('/folder/:folderId', postDeleteFolder)

export default deleteRouter;