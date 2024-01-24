// pages/api/uploadVideo.js
import fs from "fs";
import path from "path";
import multer from "multer";
import ytdl from "ytdl-core";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase";

export const config = {
  api: {
    bodyParser: false,
  },
};

const upload = multer();

export default async function handler(req, res) {
  let filePath = "";
  let downloadURL = "";
  let uploadTask = null;
  const videoPath = "video.mp4";

  const formData = req.body;

  const selectedFile = formData.get("selectedFile");
  const selectedFileName = formData.get("selectedFileName");
  const pasteLink = formData.get("pasteLink");

  console.log("FormData:", selectedFile, selectedFileName, pasteLink);

  try {
    if (selectedFile) {
      console.log("selected file upload");
      // Upload selected file to Firebase storage
      const storageRef = ref(storage, "files/" + selectedFileName);
      uploadTask = uploadBytesResumable(storageRef, selectedFile);
    } else {
      console.log("youtube upload");
      // Download video from pasteLink and upload to Firebase storage
      const videoStream = ytdl(pasteLink);
      const writeStream = fs.createWriteStream(videoPath);
      videoStream.pipe(writeStream);

      await new Promise((resolve, reject) => {
        writeStream.on("finish", resolve);
        writeStream.on("error", reject);
      });

      // Upload downloaded video to Firebase storage
      const storageRef = ref(storage, "files/" + videoPath);
      uploadTask = uploadBytesResumable(
        storageRef,
        fs.createReadStream(videoPath)
      );
    }

    // Register observers
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        // You may want to send progress information to the client if needed
      },
      (error) => {
        // Handle unsuccessful uploads
        console.error("Error uploading file: ", error);
        res.status(500).json({ error: "Error uploading file" });
      },
      async () => {
        // Handle successful uploads on complete
        downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        if (selectedFile) {
          filePath =
            "files/" +
            selectedFileName.replace(/ /g, "%20").replace(/#/g, "%23");
        } else {
          filePath = "files/" + videoPath;
        }
        console.log("File uploaded at " + filePath);

        // You can send the downloadURL or filePath back to the client if needed
        res.status(200).json({ success: true, downloadURL, filePath });
      }
    );
  } catch (error) {
    console.error("Error handling file upload:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
