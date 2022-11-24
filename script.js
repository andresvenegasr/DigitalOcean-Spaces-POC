import aws from 'aws-sdk';
import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const endpoint = process.env.DIGITAL_OCEAN_SPACES_ENDPOINT; 
const bucket = process.env.DIGITAL_OCEAN_SPACES_BUCKET;
const accessKeyId = process.env.DIGITAL_OCEAN_SPACES_ACCESS_KEY_ID;
const secretAccessKey = process.env.DIGITAL_OCEAN_SPACES_SECRET_ACCESS_KEY;
const region = process.env.DIGITAL_OCEAN_SPACES_REGION;

aws.config.update({
    accessKeyId,
    secretAccessKey
});

// Set S3 endpoint to DigitalOcean Spaces
const spacesEndpoint = new aws.Endpoint(endpoint);

// Create S3 service object
const s3 = new aws.S3({
  endpoint: spacesEndpoint,
  region,
  useAccelerateEndpoint: false
});

const filename = 'picture.jpg';
const fileContent = fs.readFileSync(path.join(__dirname, filename));

const params = {
  Bucket: bucket,
  Key: filename,
  Body: fileContent,
  ACL: 'public-read',
  ContentType: 'image/jpeg',
  CacheControl: 'no-cache',
  Metadata: {
    'x-user-id': '12345'
  }
}

// s3.upload(params, (err, data) => {
//   if (err) {
//     console.log({
//       err: err
//     });
//   }
//   console.log(data.Location);
// })

// Uncomment the following line to delete the file in the bucket
// s3.deleteObject({
//   Bucket: bucket,
//   Key: filename
// }, (err, data) => {
//   if (err) {
//     console.log({
//       err: err
//     });
//   }
//   console.log(data);
// });

// Uncomment the following line to list all files in the bucket
// s3.listObjectsV2({
//   Bucket: bucket
// }, (err, data) => {
//   if (err) {
//     console.log({
//       err: err
//     });
//   }
//   console.log(data);
// });