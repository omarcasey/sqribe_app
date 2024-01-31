// pages/api/generateThumbnail.js

import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: "dinlvnzvm",
  api_key: "674821921245258",
  api_secret: "LC_G5K9oNa7lXCJqCbnGhtHDyF8",
});

export default async function handler(req, res) {
  try {
    const { videoUrl } = req.body;

    cloudinary.v2.uploader.upload(
        videoUrl,
        { resource_type: "video", folder: "sqribe" },
        (error, result) => {
            if (error) {
                res.status(500).json({ error: "Error generating thumbnail" });
            } else {
                // Ensure that the secure_url points to the generated thumbnail
                const thumbnailUrl = cloudinary.v2.url(result.public_id, { resource_type: "video", format: "jpg" });
                // const thumbnailUrl = result.public_id + ".jpg";
                // console.log(cloudinary.v2.image(thumbnailUrl, {resource_type: "video"}))
                res.status(200).json({ thumbnailUrl });
            }
        }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// pages/api/generateThumbnail.js

// import ffmpeg from 'fluent-ffmpeg';
// import fs from 'fs';
// import { promisify } from 'util';

// const unlinkAsync = promisify(fs.unlink);

// export default async function handler(req, res) {
//   try {
//     const { mp4Url } = req.body;

//     // Generate thumbnail using ffmpeg
//     ffmpeg(mp4Url)
//       .screenshots({
//         count: 1,
//         folder: '/tmp', // Store temporary files in /tmp directory
//         filename: 'thumbnail.png',
//         size: '382x116', // Thumbnail size
//         timemarks: [ '10' ] // Time mark to extract frame (e.g., 10 seconds)
//       })
//       .on('end', async () => {
//         // Read the generated thumbnail image
//         const thumbnailPath = '/tmp/thumbnail.png';
//         const thumbnailData = fs.readFileSync(thumbnailPath);
//         // Delete the temporary thumbnail file
//         await unlinkAsync(thumbnailPath);

//         // Send the thumbnail data as response
//         res.setHeader('Content-Type', 'image/png');
//         res.send(thumbnailData);
//       })
//       .on('error', (error) => {
//         console.error('Error generating thumbnail:', error);
//         res.status(500).json({ error: 'Error generating thumbnail' });
//       });
//   } catch (error) {
//     console.error('Internal server error:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }
