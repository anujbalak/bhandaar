import { Router } from "express";
import { postDeleteFile } from "../controllers/deleteController.js";

const deleteRouter = Router();

deleteRouter.post('/file/:fileId', postDeleteFile)

export default deleteRouter;