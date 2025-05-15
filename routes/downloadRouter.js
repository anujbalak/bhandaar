import { Router } from "express";
import { getDownload } from "../controllers/downloadController.js";

const downloadRouter = Router();

downloadRouter.get('/:fileId', getDownload)

export default downloadRouter;