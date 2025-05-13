import passport from "passport";

export const getLogin = (req, res) => {
    try {
        res.render('pages/login');
    } catch (error) {
        console.error(error)
    }
}

const redirect = {
    successRedirect: '/', 
    failureRedirect: '/login'
}

export const postLogin = passport.authenticate('local', redirect)