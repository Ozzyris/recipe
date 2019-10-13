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

function delete_file_from_s3( file_key ){
	return new Promise((resolve, reject)=>{
		let params = {
			Bucket: 'images-recipe-alexandrenicol.com',
			Key: file_key
		};
		s3.deleteObject(params, function(error, response) {
			if(error){
				console.log(error);
				reject(error);
			}else{
				resolve(response)
			}
		});
	})
}

module.exports = {
	'delete_file_from_s3': delete_file_from_s3,
};