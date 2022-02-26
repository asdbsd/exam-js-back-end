const homeController = (req, res) => {
    res.render('home', { title: 'Home Page'});
}

module.exports = {
    homeController
}