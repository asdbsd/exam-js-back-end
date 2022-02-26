const { getAllAds, getMyAds, getAdById, createAd, editAd, deleteAd } = require('../services/adService');

const adMiddleware = () => {
    return (req, res, next) => {
        req.storage = {
            getAllAds,
            getMyAds,
            getAdById,
            createAd,
            editAd,
            deleteAd
        };

        next();
    }
}

module.exports = adMiddleware;