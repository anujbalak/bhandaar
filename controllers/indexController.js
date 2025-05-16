import { getAllFiles } from "../db/queries.js";
import { getAllFolders } from "../db/folderQueries.js";

export const getIndexPage = async (req, res) => {
    if (!req.user) {
        return res.redirect('/login')
    }
    res.app.set('folder', null);
    const folders = await getAllFolders(req.user.id);
    const files = await getAllFiles({uploaderId: req.user.id})

    res.render('pages/index', {folders, files})
}