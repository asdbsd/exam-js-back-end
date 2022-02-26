const { validationResult, body } = require('express-validator');

const adsIndex = async (req, res) => {
    res.locals.ads = (await req.storage.getAllAds()).map(p => JSON.parse(JSON.stringify(p)));
    res.render('all-ads', { title: 'All Ads' });
};

const createIndex = (req, res) => {
    res.render('create', { title: 'Create Page' });
};

const create = async (req, res) => {
    const { errors } = validationResult(req);

    try {
        if (errors.length > 0) {
            throw errors;
        }

        const userId = req.session.user.id
        const ad = {
            headline: req.body.headline,
            location: req.body.location,
            companyName: req.body.companyName,
            companyDescription: req.body.companyDescription,
            author: userId,
        }
        await req.storage.createAd(ad)
        res.redirect('/all-ads');
    } catch (err) {
        res.locals.errors = err
        res.render('create', { title: 'Create Page' });
    }
};

const adDetails = async (req, res) => {
    const ad = JSON.parse(JSON.stringify((await req.storage.getAdById(req.params.id))));
    const user = JSON.parse(JSON.stringify((await req.auth.getUserById(ad.author))));

    if (req.session.user && req.session.user.id == ad.author) {
        res.locals.isOwner = true
    } else if (req.session.user && ad.users.includes(req.session.user.id) == true) {
        res.locals.isLogged = true
        res.locals.isApplyable = false
    } else if (req.session.user && ad.users.includes(req.session.user.id) == false) {
        res.locals.isLogged = true
        res.locals.isApplyable = true
    }

    if (!ad.users) {
        return res.redirect('/404')
    }

    if (ad.users && ad.users.length > 0) {
        const users = []
        for (let id of ad.users) {
            const user = JSON.parse(JSON.stringify((await req.auth.getUserById(id))))
            users.push(user);
        }
        res.locals.users = users
        res.locals.usersCount = users.length;
    } else {
        res.locals.usersCount = 0
    }
    res.locals.ad = ad;
    res.locals.user = user;
    res.render('details', { title: `${ad.title} Page` });
}

const editIndex = async (req, res) => {
    try {
        const ad = JSON.parse(JSON.stringify((await req.storage.getAdById(req.params.id))));
        res.locals.ad = ad;
        res.render('edit', { title: `Edit ${ad.title}` })
    } catch (err) {
        const errors = [{ msg: err }];
        res.redirect('/');
    }
}

const edit = async (req, res) => {
    const { errors } = validationResult(req);

    const ad = JSON.parse(JSON.stringify((await req.storage.getAdById(req.params.id))));

    if (req.session.user.id == ad.author) {
        const updatedAd = {
            id: ad._id,
            headline: req.body.headline,
            location: req.body.location,
            companyName: req.body.companyName,
            companyDescription: req.body.companyDescription,
            description: req.body.description,
            users: ad.users,
            author: ad.author
        }
        try {
            if (errors.length > 0) {
                throw errors;
            }

            await req.storage.editAd(updatedAd);
            res.redirect(`/all-ads/${req.params.id}`);
        } catch (err) {
            res.locals.ad = ad;
            res.locals.errors = err;
            res.render('edit', { title: `Edit ${ad.title}` })
        }
    } else {
        res.redirect('/all-ads');
    }

}

const apply = async (req, res) => {
    const ad = await req.storage.getAdById(req.params.id)
    const userCount = ad.users.length;
    ad.users = JSON.parse(JSON.stringify(ad.users));
    ad.users.push(req.session.user.id)
    try {
        await ad.save();
        res.redirect(`/all-ads/${req.params.id}`)
    } catch (err) {
        res.locals.errors = [{ msg: 'There was a problem with your application, please try again!' }]
        res.redirect(`/all-ads/${req.params.id}`)
    }
}


module.exports = {
    adsIndex,
    createIndex,
    create,
    adDetails,
    editIndex,
    edit,
    apply
}