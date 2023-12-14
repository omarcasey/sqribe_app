import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Select,
  SelectItem,
  Avatar,
  Progress,
} from "@nextui-org/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
} from "@nextui-org/react";
import { db, storage } from "@/firebase";
import {
  collection,
  addDoc,
  Timestamp,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { NextIcon } from "@/components/NextIcon";
import { getTranslateCode } from "@/helpers/getFlag";
import { languageOptions } from "@/helpers/languages";
import Navbar from "@/components/Navbar";

const Dashboard = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [selectedFileName, setSelectedFileName] = useState("");
  const [selectedFile, setselectedFile] = useState("");
  const [pasteLink, setPasteLink] = useState("");
  const [originalLanguage, setoriginalLanguage] = useState("English");
  const [translationLanguage, settranslationLanguage] = useState("Spanish");
  const [projectName, setProjectName] = useState("");
  const [isUploading, setisUploading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    const projectsCollection = collection(db, "projects");

    // Fetch projects initially
    const fetchProjects = async () => {
      try {
        const projectsSnapshot = await getDocs(projectsCollection);
        const projectsData = projectsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching projects: ", error);
      }
    };

    // Set up real-time updates
    const unsubscribe = onSnapshot(projectsCollection, (snapshot) => {
      const updatedProjects = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProjects(updatedProjects);
    });

    // Cleanup function to unsubscribe from real-time updates
    return () => unsubscribe();
  }, []);

  const handleProjectNameChange = (e) => {
    setProjectName(e.target.value);
  };

  const handlePasteLinkChange = (e) => {
    setPasteLink(e.target.value);
  };

  const handleOriginalLanguage = (e) => {
    setoriginalLanguage(e.target.value);
  };

  const handleTranslationLanguage = (e) => {
    settranslationLanguage(e.target.value);
  };

  const handleUpload = async () => {
    try {
      setisUploading(true);

      // Upload file to Firebase storage
      const storageRef = ref(storage, "files/" + selectedFileName);
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setUploadProgress(progress);
        },
        (error) => {
          // Handle unsuccessful uploads
          console.error("Error uploading file: ", error);
          setisUploading(false);
        },
        async () => {
          // Handle successful uploads on complete
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const filePath = "files/" + selectedFileName;
          console.log("File uploaded at " + filePath);

          try {
            // Call speech-to-text API
            const response = await fetch("/api/speech-to-text", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                audioPath: filePath,
                audioLanguage: getTranslateCode(originalLanguage)
              }),
            });

            if (!response.ok) {
              throw new Error(
                `Failed to convert speech to text: ${response.statusText}`
              );
            }

            // Get speech-to-text result
            const result = await response.json();
            const firstResult = result.results[0];
            console.log("Speech To Text Converted Successfully!");

            // Call translation API
            const translationResponse = await fetch("/api/translate-text", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                inputText: firstResult.transcript,
                target: getTranslateCode(translationLanguage),
              }),
            });

            if (!translationResponse.ok) {
              throw new Error(
                `Failed to translate text: ${translationResponse.statusText}`
              );
            }

            // Get translation result
            const translationResult = await translationResponse.json();
            const translatedText = translationResult.translations[0];
            console.log("Text Translated Successfully!");

            // Call text-to-speech API
            const ttsResponse = await fetch("/api/text-to-speech", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ text: translatedText }),
            });

            if (!ttsResponse.ok) {
              throw new Error(
                `Failed to convert text to speech: ${ttsResponse.statusText}`
              );
            }

            // Get text-to-speech result
            const ttsResult = await ttsResponse.json();
            const audioUrl = ttsResult.audioUrl;
            console.log("Text To Speech Converted Successfully!");

            // Add the converted text, translation, and audio URL to the audio files collection
            try {
              const docRef = await addDoc(collection(db, "projects"), {
                projectName: projectName,
                fileName: selectedFileName,
                originalLanguage: originalLanguage,
                translationLanguage: translationLanguage,
                date: Timestamp.fromDate(new Date()),
                fileURL: downloadURL,
                transcription: {
                  transcript: firstResult.transcript,
                  words: firstResult.words,
                },
                translation: {
                  text: translatedText,
                  language: getTranslateCode(translationLanguage),
                },
                translatedFileURL: audioUrl,
              });
              console.log("Document written with ID: ", docRef.id);
            } catch (e) {
              console.error("Error adding document: ", e);
            }
          } catch (error) {
            console.error(
              "Error converting text to speech or translating:",
              error
            );
          }

          // Reset state and close modal
          setProjectName("");
          setisUploading(false);
          setUploadProgress(0);
          onClose();
        }
      );
    } catch (e) {
      console.error("Error adding document: ", e);
      setisUploading(false);
    }
  };


  const openFileInput = () => {
    const fileInput = document.getElementById("fileInput");
    fileInput.click();
  };

  const handleFileSelection = (e) => {
    const selectedFile = e.target.files[0];
    setselectedFile(selectedFile);
    setSelectedFileName(selectedFile.name);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    // Add visual feedback when dragging over the dropzone (e.g., change the border color).
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    // Add visual feedback (e.g., change the border color) and allow drop events.
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    // Remove the visual feedback when leaving the dropzone.
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setSelectedFileName(droppedFile.name);
    // Do something with the dropped file, such as uploading or processing it.
    // For example, you can store it in state or call a function to handle the file.
  };

  const handleModalClose = () => {
    setProjectName("");
    setSelectedFileName("");
  };

  return (
    <div className="bg-[#0e1015]">
      <Navbar />
      <div className="flex min-h-screen flex-col items-center pb-24 pt-10">
        <div className="pt-12 flex flex-row items-center justify-center w-full px-10 gap-12 flex-wrap">
          {projects.length >= 0 && (
            <div
              className="border border-dashed border-white w-96 h-56 rounded-xl flex flex-col items-center justify-center hover:cursor-pointer hover:bg-neutral-800 transition-all"
              onClick={onOpen}
            >
              <p className="text-3xl">+</p>
              <p className="font-semibold text-xl pb-4">Upload video</p>
            </div>
          )}
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/project/${project.id}`}
              className="w-96 h-56 border border-white rounded-xl flex flex-col items-center justify-center hover:cursor-pointer hover:border-purple-400 hover:transform hover:scale-[1.03] transition-transform scale"
            >
              <Card className="w-full h-full">
                <CardHeader className="flex gap-3">
                  <Image
                    alt="nextui logo"
                    height={40}
                    radius="sm"
                    src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                    width={40}
                  />
                  <div className="flex flex-col">
                    <p className="text-md">{project.projectName}</p>
                    <p className="text-small text-default-500">
                      {project.date && project.date.toDate().toLocaleDateString()}
                    </p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody className="flex items-center justify-center">
                  <div className="bg-neutral-600 rounded-full p-3">
                    <NextIcon size={40} />
                  </div>
                </CardBody>
                <Divider />
                <CardFooter>
                  <p className="text-sm text-default-500">{project.fileName}</p>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>

        <>
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            onClose={handleModalClose}
            className="bg-neutral-900"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Upload video or audio to translate
                  </ModalHeader>
                  <ModalBody>
                    <div className="flex flex-col items-center">
                      <input
                        type="file"
                        id="fileInput"
                        accept=".mp4, .mov, .webm, .mkv, .mp3, .wav"
                        style={{ display: "none" }}
                        onChange={handleFileSelection}
                      />
                      <div
                        className="border border-dashed border-gray-500 rounded-xl h-24 flex items-center justify-center w-full hover:border-purple-800 hover:bg-neutral-800 hover:cursor-pointer transition-all"
                        onClick={openFileInput}
                        onDragEnter={handleDragEnter}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                      >
                        {selectedFileName ? (
                          <p className="text-sm text-gray-300 text-center">
                            {selectedFileName}
                          </p>
                        ) : (
                          <p className="text-sm text-gray-300 text-center">
                            Click to choose a file or drag and drop it here <br />
                            MP4, MOV, WEBM, MKV, MP3, WAV
                          </p>
                        )}
                      </div>

                      <p className="py-4">or</p>
                      <p className="w-full text-left text-white font-semibold text-sm pb-2">
                        Paste Link
                      </p>
                      <Input
                        placeholder={
                          selectedFile
                            ? "File Selected"
                            : "Youtube or Google Drive Link"
                        }
                        color={selectedFile ? "danger" : "default"}
                        size="sm"
                        className="text-black pb-4"
                        disabled={selectedFile ? true : false}
                        value={selectedFile ? "" : pasteLink}
                        onChange={handlePasteLinkChange}
                      />

                      <p className="w-full text-left text-white font-semibold text-sm pb-2">
                        Project Name
                      </p>
                      <Input
                        placeholder="My First Project"
                        color="default"
                        size="sm"
                        className="text-black pb-4"
                        value={projectName}
                        onChange={handleProjectNameChange}
                      />

                      <p className="w-full text-left text-white font-semibold text-sm pb-2">
                        Original Language
                      </p>
                      <Select
                        size="sm"
                        placeholder="Select a Language"
                        className=" text-black pb-4"
                        color="default"
                        selectedKeys={[originalLanguage]}
                        onChange={handleOriginalLanguage}
                        aria-label="Translation Language"
                        disallowEmptySelection
                      >
                        {languageOptions.map((option) => (
                          <SelectItem
                            key={option.label}
                            startContent={
                              <Avatar
                                alt={option.label}
                                className="w-6 h-6"
                                src={`https://flagcdn.com/${option.flagCode}.svg`}
                              />
                            }
                            className="text-black"
                            value={option.label}
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </Select>
                      <p className="w-full text-left text-white font-semibold text-sm pb-2">
                        Translate to
                      </p>
                      <Select
                        size="sm"
                        placeholder="Select a Language"
                        className=" text-black pb-4"
                        color="default"
                        selectedKeys={[translationLanguage]}
                        onChange={handleTranslationLanguage}
                        aria-label="Translation Language"
                        disallowEmptySelection
                      >
                        {languageOptions.map((option) => (
                          <SelectItem
                            key={option.label}
                            startContent={
                              <Avatar
                                alt={option.label}
                                className="w-6 h-6"
                                src={`https://flagcdn.com/${option.flagCode}.svg`}
                              />
                            }
                            className="text-black"
                            value={option.label}
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <div className="flex flex-col w-full">
                      <Button
                        className="w-full font-semibold text-base py-5"
                        color="secondary"
                        isLoading={isUploading}
                        onPress={handleUpload}
                      >
                        Translate
                      </Button>
                      {isUploading && (
                        <Progress
                          aria-label="Uploading..."
                          size="sm"
                          value={uploadProgress}
                          color="secondary"
                          className="w-full mt-4"
                        />
                      )}
                    </div>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      </div>
    </div>
  );
};

export default Dashboard;
