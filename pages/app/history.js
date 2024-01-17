import AppShell from "@/components/App/AppShell";
import withAuth from "@/components/App/withAuth";
import {
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Spinner,
} from "@nextui-org/react";
import {
  collection,
  onSnapshot,
  writeBatch,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/firebase";
import { useState, useEffect, useRef } from "react";
import { FaCircleInfo, FaCirclePlay } from "react-icons/fa6";
import { MdDownloadForOffline } from "react-icons/md";
import { query, where } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
var JSZip = require("jszip");
import { fetchAudioFile, setAudioPlayerVisible, setAutoPlay } from "@/reducers/userSlice";

const History = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.user.auth.uid);
  const isDarkMode = useSelector((state) => state.user.data.darkMode);
  const [audioFiles, setAudioFiles] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [loading, setLoading] = useState(true);
  const {
    isOpen: isOpenDeleteModal,
    onOpen: onOpenDeleteModal,
    onOpenChange: onOpenChangeDeleteModal,
    onClose: onCloseDeleteModal,
  } = useDisclosure();

  useEffect(() => {
    // Fetch audio files and set up real-time listener
    const audioFilesCollectionRef = collection(db, "audio files");
    const audioFilesQuery = query(
      audioFilesCollectionRef,
      where("user", "==", uid)
    );
    const unsubscribe = onSnapshot(audioFilesQuery, (querySnapshot) => {
      const updatedAudioFiles = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        voice: doc.data().voice,
        date: doc.data().date.toDate().toLocaleString(), // Convert timestamp to readable format
        text: doc.data().text,
        fileURL: doc.data().fileURL,
      }));

      // Sort the audio files by date in descending order
      updatedAudioFiles.sort((a, b) => new Date(b.date) - new Date(a.date));

      setAudioFiles(updatedAudioFiles);
      setLoading(false);
    });

    // Clean up the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);


  const handlePlay = (index) => {
    dispatch(setAudioPlayerVisible(true)); // Set the audio player visibility to true
    console.log("audio player visible");
  };

  const handleDownload = (fileURL) => {
    const link = document.createElement("a");
    link.href = fileURL;
    link.download = fileURL.split("/").pop();
    link.click();
  };

  const deleteSpeech = async () => {
    try {
      const audioFilesCollectionRef = collection(db, "audio files");

      const batch = writeBatch(db);

      selectedKeys.forEach((id) => {
        const docRef = doc(audioFilesCollectionRef, id);
        batch.delete(docRef);
      });

      await batch.commit();

      setSelectedKeys(new Set()); // Clear the selectedKeys set
      onCloseDeleteModal(); // Close the modal after successful deletion
    } catch (error) {
      console.error("Error deleting projects:", error);
    }
  };

  const downloadSpeech = async () => {
    try {
      const audioFilesCollectionRef = collection(db, "audio files");

      const zip = new JSZip(); // Create a new instance of JSZip

      const downloadPromises = Array.from(selectedKeys).map(async (id) => {
        const docRef = doc(audioFilesCollectionRef, id);
        const docSnapshot = await getDoc(docRef);
        const fileURL = docSnapshot.data().fileURL;
        const fileName = fileURL.split("/").pop().split("?")[0]; // Extract the file name without query parameters

        // Fetch the file content
        const response = await fetch(fileURL);
        const fileContent = await response.blob();

        // Add the file to the zip
        zip.file(fileName, fileContent);
      });

      await Promise.all(downloadPromises);

      // Generate the zip file
      const zipContent = await zip.generateAsync({ type: "blob" });

      // Create a download link for the zip file
      const link = document.createElement("a");
      link.href = URL.createObjectURL(zipContent);
      link.download = "audio_files.zip";
      link.click();

      setSelectedKeys(new Set()); // Clear the selectedKeys set
    } catch (error) {
      console.error("Error downloading files:", error);
    }
  };

  return (
    <AppShell>
      <div className="w-full px-4 sm:px-10">
        <main className="flex min-h-screen flex-col items-center py-24 mx-auto max-w-7xl text-foreground">
          <h1
            onClick={() => console.log(selectedKeys)}
            className="w-full font-bold text-3xl mb-2"
          >
            History
          </h1>
          <p className="w-full text-foreground-500 font-medium mb-10">
            Full list of all your generated samples, ready for download.
          </p>
          <div className="flex flex-row justify-between w-full px-3">
            <div className="flex w-full mb-3 gap-4">
              <Button
                color="primary"
                variant="solid"
                className=" font-semibold text-sm"
                onPress={downloadSpeech}
                isDisabled={selectedKeys.size === 0}
              >
                Download Selected
              </Button>
              <Button
                color="danger"
                variant="flat"
                className=" font-semibold text-sm"
                onPress={onOpenDeleteModal}
                isDisabled={selectedKeys.size === 0}
              >
                Delete Selected
              </Button>
            </div>
            <Button
              color="success"
              variant="ghost"
              className=" font-semibold text-sm"
              onPress={() => router.push("/app/makespeech")}
            >
              Generate +
            </Button>
          </div>
          <Table
            aria-label="Example static collection table"
            selectionMode="multiple"
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
          >
            <TableHeader>
              <TableColumn className="font-bold">Voice</TableColumn>
              <TableColumn className="font-bold">Date</TableColumn>
              <TableColumn className="font-bold">Status</TableColumn>
              <TableColumn className="font-bold">Text</TableColumn>
              <TableColumn className="font-bold">Actions</TableColumn>
            </TableHeader>
            <TableBody>
              {audioFiles.map((audioFile, index) => (
                <TableRow key={audioFile.id}>
                  <TableCell>
                    <div className="flex flex-row items-center justify-between">
                      <p className="mr-2 w-28">{audioFile.voice}</p>
                      <FaCircleInfo
                        className="text-foreground-700 ml-2"
                        size={12}
                        onClick={() => console.log(audioFiles)}
                      />
                    </div>
                  </TableCell>
                  <TableCell>{audioFile.date}</TableCell>
                  <TableCell>
                    <Chip color="success" className="bg-green-200 text-tiny">
                      Generated
                    </Chip>
                  </TableCell>
                  <TableCell>{audioFile.text}</TableCell>
                  <TableCell>
                    <div className="flex flex-row gap-2 items-center justify-center">
                      <Button
                        className="px-unit-0 h-auto min-w-0 rounded-full"
                        variant="light"
                        onClick={async () => (
                          await dispatch(setAutoPlay(true)),
                          dispatch(fetchAudioFile(audioFile.id)),
                          dispatch(setAudioPlayerVisible(true))
                        )}
                      >
                        <FaCirclePlay className="text-blue-500" size={27} />
                      </Button>
                      <Button
                        className="px-unit-0 h-auto min-w-0 rounded-full"
                        variant="light"
                        onClick={() => handleDownload(audioFile.fileURL)}
                      >
                        <MdDownloadForOffline
                          className="text-blue-900 dark:text-foreground-800 -m-[2px]"
                          size={33}
                        />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {loading && <Spinner size="lg" className="mt-10" />}
          <Modal
            isOpen={isOpenDeleteModal}
            onOpenChange={onOpenChangeDeleteModal}
            className={`${isDarkMode ? "dark" : "light"}`}
          >
            <ModalContent>
              {(onCloseDeleteModal) => (
                <>
                  <ModalHeader className="flex flex-col gap-1 text-foreground">
                    Would you like to permanently delete this generated speech
                    sample?
                  </ModalHeader>
                  <ModalBody>
                    <p className="text-foreground-500 text-sm">
                      Once deleted, this speech sample will no longer be
                      accessible.
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <div className="flex flex-row gap-4 w-full">
                      <Button
                        variant="light"
                        className="w-full"
                        onPress={onCloseDeleteModal}
                      >
                        Cancel
                      </Button>
                      <Button
                        color="danger"
                        className="w-full bg-red-600"
                        onPress={deleteSpeech}
                      >
                        Delete
                      </Button>
                    </div>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </main>
      </div>
    </AppShell>
  );
};

export default withAuth(History);
