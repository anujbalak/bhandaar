import { Router } from "express";
import { getShareDialog, getSharedPage, postShareDays, getSharedFolder } from "../controllers/shareController.js";

const shareRouter = Router();

shareRouter.get('/create/:folderId', getShareDialog);
shareRouter.post('/:id', postShareDays);
shareRouter.get('/:id', getSharedPage);
shareRouter.get('/:id/folder/:folderId', getSharedFolder);


export default shareRouter;
