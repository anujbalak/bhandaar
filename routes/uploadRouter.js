import { Router } from "express";
import { getUpload, postUpload } from "../controllers/uploadController.js";

const uploadRouter = Router()

uploadRouter.get('/', getUpload)
uploadRouter.post('/', postUpload);
uploadRouter.get('/:folderId', getUpload);
uploadRouter.post('/:folderId', postUpload)

export default uploadRouter;