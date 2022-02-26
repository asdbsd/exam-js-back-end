const del = (req, res) => {
    req.storage.deleteAd(req.params.id);
    res.redirect('/all-ads');
} 

module.exports = {
    del
}