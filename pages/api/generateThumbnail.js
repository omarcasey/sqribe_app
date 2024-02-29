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