const multer  = require('multer')
const multerS3 = require('multer-s3')
const AWS = require('aws-sdk');
require('dotenv').config;

//AWS s3 사용하기 위해서
AWS.config.update({
    accessKeyId: process.env.AWS_ACCES_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "ap-northeast-2"
})

//이미지 파일 업로드 위해서 upload라는 미들웨어 만들어주기
const upload = multer({
    storage: multerS3({
        s3: new AWS.S3(),
        bucket: "week6-project-bucket",
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key(req, file, cb) {
            cb(null, `original/${Date.now()}_${file.originalname}`);
        },
    }),
    limits: { fileSize: 20 * 1024 * 1024},
});

module.exports = upload;