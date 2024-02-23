import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '@/firebase';
import Crunker from 'crunker';


export async function mergeAndManipulateAudioClips(clipsData) {
    const crunker = new Crunker();
    try {
        // Extract audio URLs from clipsData
        const audioURLs = clipsData.map(clip => clip.translatedAudioURL);

        // Fetch audio buffers from the provided URLs
        const buffers = await crunker.fetchAudio(...audioURLs);

        // Merge audio buffers
        const mergedBuffer = await crunker.concatAudio(buffers);

        // Export the merged audio as an MP3 blob
        const output = await crunker.export(mergedBuffer, 'audio/mp3');

        // Upload the blob to Firebase Storage or handle as needed
        // For example:
        const storageRef = ref(storage, `merged_audio_${Date.now()}.mp3`);
        await uploadBytes(storageRef, output.blob);
        const audioURL = await getDownloadURL(storageRef);

        console.log("Merged audio uploaded to Firebase Storage");
        return audioURL;
    } catch (error) {
        console.error("Error merging and uploading audio:", error);
    }
}