const AppError = require("./../utils/AppError");
const AWS_CONFIG = require("../utils/aws");

exports.imageUpload = async (req, res, next) => {
  try {
    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: req.file.originalname,
      Body: req.file.buffer,
    };

    AWS_CONFIG.upload(params, (err, data) => {
      if (err) {
        return next(
          new AppError(
            "Internal Server Error ! Please try after some time",
            500
          )
        );
      }
      res.status(200).json({
        status: "success",
        data,
      });
    });
  } catch (error) {
    next(error);
  }
};
