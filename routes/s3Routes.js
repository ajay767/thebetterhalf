const router = require("express").Router();
const s3Controller = require("./../controllers/s3Controller");

router.route("/get-signed-url").get(s3Controller.sendS3UploadUrl);

module.exports = router;
