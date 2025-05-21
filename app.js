import path from 'node:path'
import url from 'node:url'
import 'dotenv/config'

import express from 'express'
const app = express();

import indexRouter from './routes/indexRouter.js';
import loginRouter from './routes/loginRouter.js';
import signupRouter from './routes/signupRouter.js';

import session from 'express-session';
import { PrismaClient } from './generated/prisma/client.js';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import passport from 'passport';
import local from './passport/strategy.js';
import { getAllFiles, getUser } from './db/queries.js';
import logoutRouter from './routes/logoutRouter.js';
import uploadRouter from './routes/uploadRouter.js';
import downloadRouter from './routes/downloadRouter.js';
import deleteRouter from './routes/deleteRouter.js'
import folderRouter from './routes/folderRouter.js';
import { getAllFolders } from './db/folderQueries.js';
import createRouter from './routes/createRouter.js';
import { makeNav } from './controllers/folderController.js';
import shareRouter from './routes/shareRouter.js';

const __filename = url.fileURLToPath(import.meta.url)
export const __dirname = path.dirname(__filename);
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({extended: false}))

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    cookie: {
        maxAge: 15 * 24 * 60 * 60 * 1000,
    },
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(
        new PrismaClient(),
        {
            checkPeriod: 2 * 60 * 1000,
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        },
    ),
}))
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
})

app.use(async (req, res, next) => {
    if (req.user) {
        const folder = res.app.get('folder')
        let folders = await getAllFolders(req.user.id);
        let files = await getAllFiles({uploaderId: req.user.id})
        if (folder) {
            folders = folder.folders;
            files = folder.files;
        }
        res.locals.folders = folders;
        res.locals.files = files;
    }
    next()
})

app.use('/', indexRouter);
app.use((req, res, next) => {
    makeNav(res);
    next()
})

app.use('/login', loginRouter);
app.use('/sign-up', signupRouter);
app.use('/upload', uploadRouter);
app.use('/download', downloadRouter);
app.use('/delete', deleteRouter);
app.use('/create', createRouter);
app.use('/folder', folderRouter);
app.use('/share', shareRouter);


app.use('/logout', logoutRouter);


passport.use(local)
passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await getUser({id})
        done(null, user)
    } catch (err) {
        done(err);
    }
})

app.use((err, req, res, next) => {
    res.render('pages/errors', {error: err});
})

const port = process.env.PORT
app.listen(port, () => console.log('App listening at port', port));