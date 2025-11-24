const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
    
});
console.log('Cloudinary sees CLOUDINARY_CLOUD_NAME as:', process.env.CLOUDINARY_CLOUD_NAME);


const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'YelpCamp',
        allowed_formats: ['jpeg', 'png', 'jpg']
    }
});

console.log("Cloud name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API key:", process.env.CLOUDINARY_KEY);
console.log("API secret:", process.env.CLOUDINARY_SECRET);


module.exports = {
    cloudinary,
    storage
}