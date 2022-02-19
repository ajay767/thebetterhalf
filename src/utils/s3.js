import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";

const upload = async (file, onProgress, onComplete) => {
  const target = {
    Bucket: process.env.REACT_APP_AWS_BUCKET,
    Key: file.name,
    Body: file,
  };

  const credientails = {
    region: process.env.REACT_APP_REGION,
    credentials: {
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    },
  };

  try {
    const parallelUploads3 = new Upload({
      client: new S3Client(credientails),
      leavePartsOnError: false, // optional manually handle dropped parts
      params: target,
    });

    parallelUploads3.on("httpUploadProgress", (progress) => {
      onProgress(progress);
    });

    const data = await parallelUploads3.done();
    onComplete(data);
  } catch (e) {
    console.log(e);
  }
};

export default upload;
