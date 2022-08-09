const multer = require('multer');
const path = require('path');
const fs = require('fs');
const DOMAIN = process.env.DOMAIN;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './publics/uploads/postImage');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix);
    }
})
  
exports.upload = multer({ storage: storage }, {
    fileFilter: function (req, file, cb) {
        if(!file.mimetype.includes('image')) return cb(new Error('only accept image'));
        cb(null, true);
    }
})

exports.handlePostImageUpload = (files, body) => {
    let listImgArrInUse = body.post.split('src="').slice(1).map((value) => {
        return value.split('"')[0]
    });

    let listAllImage = body.base64;
    for(let i = 0; i < listAllImage.length; i++){
        if(!listImgArrInUse.includes(listAllImage[i])) {
            fs.unlink(files[i].path, (err) => {return});
        }else{
            body.post = body.post.replace(listAllImage[i], DOMAIN+files[i].path);
        }
    }
    return body.post;
}