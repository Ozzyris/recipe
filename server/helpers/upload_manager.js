const aws = require('aws-sdk');
	  multer = require('multer'),
	  multerS3 = require('multer-s3'),
      config = require('../config');

aws.config.update({
	secretAccessKey : config.aws_secretAccessKey,
	accessKeyId: config.aws_accessKeyId,
	region: config.aws_region,
})

const s3 = new aws.S3();

const upload = multer({
	storage: multerS3({
		s3: s3,
		bucket: 'images-recipe-alexandrenicol.com',
		acl: 'public-read',
		metadata: function (req, file, cb) {
			cb(null, {fieldName: file.fieldname});
		},
		key: function (req, file, cb) {
			cb(null, Date.now().toString())
		}
	})
})

module.exports = upload;