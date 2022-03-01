const aws = require("aws-sdk");
const fs = require("fs");
const AppError = require("./AppError");

const fileUploader = async (req) => {
  try {
    aws.config.setPromisesDependency();
    aws.config.update({
      accessKeyId: process.env.ACCESSKEYID,
      secretAccessKey: process.env.SECRETACCESSKEY,
      region: process.env.REGION,
    });

    const s3 = new aws.S3();

    let params = {
      Bucket: process.env.AWS_BUCKET,
      Body: fs.createReadStream(req.file.path),
      Key: `userAvatar/${req.file.originalname}`,
    };
    const data = await s3.upload(params).promise();
    return data;
  } catch (error) {
    return new AppError("Error while uploading file", 400);
  }
};

module.exports = fileUploader;
