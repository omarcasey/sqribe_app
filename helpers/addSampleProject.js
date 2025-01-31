import { db } from "@/firebase";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";

 export async function addSampleProject(uid) {
    const sourcePath = "projects/sampleProject";
    const collectionRef = collection(db, "projects"); // Reference to the collection

    try {
        // Get the source document
        const sourceDocRef = doc(db, sourcePath);
        const sourceDocSnapshot = await getDoc(sourceDocRef);

        if (sourceDocSnapshot.exists()) {
            // Extract data from the source document
            let sourceData = sourceDocSnapshot.data();

            // Modify the user field to be the uid
            sourceData = {
                ...sourceData,
                user: uid
            };

            // Add a new document to the collection (auto-generated ID)
            await addDoc(collectionRef, sourceData);

            console.log("Document duplicated successfully.");
        } else {
            console.log("Source document does not exist.");
        }
    } catch (error) {
        console.error("Error duplicating document:", error);
    }
}
