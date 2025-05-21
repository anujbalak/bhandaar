import { addSharedLink, getSharedLink, updateSharedLink } from "../db/shareQueries.js";
import 'dotenv/config'
import { body, validationResult } from "express-validator";
import { getFolder } from "../db/folderQueries.js";

const daysValidationChain = () =>
    body('days').trim()
    .isNumeric().withMessage('Enter a numer only')
    .isFloat({min: 1, max: 100}).withMessage('Date range is between 1 to 100 days')

export const getShareDialog = async (req, res) => {
    try {
        if (!req.user) {
            return res.redirect('/')
        }
        const {folderId} = req.params;

        let sharedFolder = await getSharedLink({folderId});
        const date = addDays(5);
        if (!sharedFolder) {
            sharedFolder = await addSharedLink(folderId, date);
        }
        const link = `http://${process.env.SITE_HOST}/share/${sharedFolder.id}`;
        res.render('pages/index', {
            showShareDialog: true,
            folderId,
            link,
            id: sharedFolder.id,
        })
    } catch (error) {
        console.error(error);
        res.render('pages/errors', {
            error
        })
    }
}

export const postShareDays = [
    daysValidationChain(),
    async (req, res) => {
        try {
            const { id } = req.params;
            const { days } = req.body;
            const result = validationResult(req);
            const sharedLink = await getSharedLink({id});
            const link = `http://${process.env.SITE_HOST}/share/${sharedLink.id}`;
            if (!result.isEmpty()) {
                return res.render('pages/index', {
                    showShareDialog: true,
                    folderId: sharedLink.folderId,
                    link,
                    id,
                    errors: result.array()
                })
            }
            const date = addDays(days);
            await updateSharedLink(id, date);

            const currentFolder = res.app.get('folder')
            setTimeout(() => {
                if (currentFolder) {
                    res.redirect(`/folder/${currentFolder.id}`);
                    return;
                }
                res.redirect('/')
            }, 1000)

        } catch (error) {
            console.error(error);
            res.render('pages/errors', {
                error
            })
        }
    }
]

function addDays(days) {
    let result = new Date();
    result.setDate(result.getDate() + days)
    return result;
}

export const getSharedPage = async (req, res) => {
    try {
        const {id} = req.params;
        const sharedLink = await getSharedLink({id})
        if (!sharedLink) {
            return  res.redirect('/')
        }
        const expiryDate = sharedLink.expiresAt;
        const date = new Date();

        if (expiryDate.getTime() <= date.getTime()) {
            return res.render('pages/index', {
                expired: true,
            })
        }
    
        const folder = await getFolder(sharedLink.folderId)
        res.render('pages/index', {
            sharedPage: true,
            sharedId: id,
            folders: [folder],
            files: [],
            nav: [],
        })
    } catch (error) {
        console.error(error);
        res.render('pages/errors', {
            error
        })
    }
}

export const getSharedFolder = async (req, res) => {
    try {
        const { id, folderId} = req.params;

        // const sharedLink = await getSharedLink({id})
        // console.log(id)
        // console.log(sharedLink)
        // if (!sharedLink) {
        //     return  res.redirect('/')
        // }
        // const expiryDate = sharedLink.expiresAt;
        // const date = new Date();
        
        // if (expiryDate.getTime() <= date.getTime()) {
        //     return res.render('pages/index', {
        //         expired: true,
        //     })
        // }

        const folder = await getFolder(folderId)
        res.locals.folder = folder;
        res.app.set('folder', folder);
        
        res.render('pages/index', {
            sharedPage: true,
            sharedId: id,
            folders: folder.folders,
            files: folder.files,
        })
    } catch (error) {
        console.error(error);
        res.render('pages/errors', {
            error
        })
    }

}