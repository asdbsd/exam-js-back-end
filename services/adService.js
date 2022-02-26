const Ad = require('../models/Ad');

const getAllAds = async () => {
    const ads = await Ad.find({});
    return ads;
}

const getMyAds = async (authorId) => {
    const ads = await Ad.find({ author: authorId });
    return ads;
}

const getAdById = async (id) => {
    try {
        const ad = (await Ad.find({ _id: id }))[0];

        if(ad) {
            return ad
        } else {
            throw new Error('Requested animal doesn\'t exist');
        }
        
    } catch(err) {
        return err;
    }
}

const createAd = async (ad) => {
    const newAd = new Ad(ad);

    try {
        await newAd.save();
    } catch(err) {
        throw err;
    }
}

const editAd = async (ad) => {
    const existingAd = await Ad.findById(ad.id)

    existingAd.headline = ad.headline;
    existingAd.location = ad.location;
    existingAd.companyName = ad.companyName;
    existingAd.companyDescription = ad.companyDescription

    try {
        await existingAd.save();
    } catch(err) {
        throw err;
    }
} 

const deleteAd = async (id) => {
    await Ad.findByIdAndDelete(id);
}

module.exports = {
    getAllAds,
    getMyAds,
    getAdById,
    createAd,
    editAd,
    deleteAd
}