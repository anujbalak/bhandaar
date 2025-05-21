import { Router } from "express";
import { getShareDialog, postShareDays } from "../controllers/shareController.js";

const shareRouter = Router();

shareRouter.get('/:folderId', getShareDialog);
shareRouter.post('/:id', postShareDays);


export default shareRouter;
