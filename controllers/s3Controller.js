const aws = require("aws-sdk");
const crypto = require("crypto");
const { promisify } = require("util");

const randomBytes = promisify(crypto.randomBytes);

const region = "us-east-1";
const bucketName = process.env.AWS_BUCKET;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

async function generateUploadURL(req) {
  const rawBytes = await randomBytes(16);
  let imageName = rawBytes.toString("hex");

  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: 60,
    ContentType: req.query.contentType,
  };

  console.log(params);

  const uploadURL = await s3.getSignedUrlPromise("putObject", params);
  return uploadURL;
}

exports.sendS3UploadUrl = async (req, res, next) => {
  try {
    const url = await generateUploadURL(req);
    res.status(200).json({ url });
  } catch (error) {
    next(error);
  }
};
