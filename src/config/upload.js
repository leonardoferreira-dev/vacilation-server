/* eslint-disable no-param-reassign */
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);

        // const n = file.originalname.split('.')[0] + '.webp';

        file.key = `${hash.toString('hex')}-${file.originalname}`;

        cb(null, file.key);
      });
    },
  }),
  s3: multerS3({
    s3: new aws.S3(),
    bucket: process.env.BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);

        file.key = `${hash.toString('hex')}-${file.originalname}`;

        cb(null, file.key);
      });
    },
  }),
};

module.exports = {
  dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
  storage: storageTypes[process.env.STORAGE_TYPE],
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  filterFilter: (req, file, cb) => {
    const permitido = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/webp',
      'image/jfif',
    ];

    if (permitido.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Extensão inválida'));
    }
  },
};
