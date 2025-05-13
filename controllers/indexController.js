export const getIndexPage = (req, res) => {
    if (!req.user) {
        return res.redirect('/login')
    }
    res.render('pages/index')
}