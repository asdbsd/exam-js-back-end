const searchIndex = (req, res) => {
    res.locals.adds = [];
    res.render('search', { title: 'Search Page' })
}

const search = async (req, res) => {
    try {
        const user = JSON.parse(JSON.stringify((await req.auth.getUserByEmail(req.body.search))));
        res.locals.ads = JSON.parse(JSON.stringify((await req.storage.getMyAds(user[0]._id))));
        res.render('search', { title: 'Search Page' })
    } catch {
        res.locals.notFound = true;
        res.render('search', { title: 'Search Page' })
    }
}

module.exports = {
    searchIndex,
    search
};