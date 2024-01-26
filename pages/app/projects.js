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
  Spinner,
} from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  cn,
} from "@nextui-org/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  CheckboxGroup,
  Checkbox,
} from "@nextui-org/react";
import { db, storage } from "@/firebase";
import {
  collection,
  addDoc,
  Timestamp,
  getDocs,
  onSnapshot,
  query,
  where,
  getDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { NextIcon } from "@/components/Icons/NextIcon";
import { getFlagCode, getTranslateCode } from "@/helpers/getFlag";
import { languageOptions } from "@/helpers/languages";
import withAuth from "@/components/App/withAuth";
import AppShell from "@/components/App/AppShell";
import { useAuth } from "@/components/App/authContext";
import { IoSparkles } from "react-icons/io5";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { HiTrash } from "react-icons/hi2";
import { MdSimCardDownload } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import Image from "next/image";

const Projects = ({ openModal }) => {
  const isDarkMode = useSelector((state) => state.user.darkMode);
  const projects = useSelector((state) => state.user.projects);
  const uid = useSelector((state) => state.user.auth.uid);
  const router = useRouter();

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    isOpen: isOpenRenameModal,
    onOpen: onOpenRenameModal,
    onOpenChange: onOpenChangeRenameModal,
    onClose: onCloseRenameModal,
  } = useDisclosure();
  const {
    isOpen: isOpenDeleteModal,
    onOpen: onOpenDeleteModal,
    onOpenChange: onOpenChangeDeleteModal,
    onClose: onCloseDeleteModal,
  } = useDisclosure();
  const [selectedFileName, setSelectedFileName] = useState("");
  const [selectedFile, setselectedFile] = useState("");
  const [pasteLink, setPasteLink] = useState("");
  const [originalLanguage, setoriginalLanguage] = useState("English");
  const [translationLanguage, settranslationLanguage] = useState("Spanish");
  const [projectName, setProjectName] = useState("");
  const [isUploading, setisUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [drag, setDrag] = useState(false);
  const [newName, setNewName] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [AIsummary, setAIsummary] = useState(false);

  const [dropdownStates, setDropdownStates] = useState(
    projects?.map(() => false) || []
  );

  const handleDropDownState = (index, state) => {
    if (state == "both") {
      dropdownStates[index] = !dropdownStates[index];
    } else {
      dropdownStates[index] = state;
    }
    setDropdownStates([...dropdownStates]);
  };

  useEffect(() => {
    // Check if the openModal query parameter is true and open the modal
    const openModalQueryParam = router.query.openModal === "true";
    if (openModalQueryParam) {
      onOpen();
    }
  }, [router.query.openModal]);

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

  const handleUploadNew = async () => {};

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
          const filePath =
            "files/" +
            selectedFileName.replace(/ /g, "%20").replace(/#/g, "%23");
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
                audioLanguage: getTranslateCode(originalLanguage),
              }),
            });

            if (!response.ok) {
              throw new Error(
                `Failed to convert speech to text: ${response.statusText}`
              );
            }

            // Get speech-to-text result
            const result = await response.json();
            const deepgramResult = result.result;
            console.log("Speech To Text Converted Successfully!");
            console.log(deepgramResult);

            const segments = await Promise.all(
              deepgramResult.results.channels[0].alternatives[0].paragraphs.paragraphs.flatMap(
                async (paragraph, index) => {
                  const sentences = await Promise.all(
                    paragraph.sentences.map(async (sentence) => {
                      const translationResponse = await fetch(
                        "/api/translate-text",
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            inputText: sentence.text,
                            target: getTranslateCode(translationLanguage),
                          }),
                        }
                      );

                      if (!translationResponse.ok) {
                        throw new Error(
                          `Failed to translate text: ${translationResponse.statusText}`
                        );
                      }

                      const translationResult =
                        await translationResponse.json();
                      const translatedText = translationResult.translations[0];

                      return {
                        text: sentence.text,
                        translatedText: translatedText,
                        start: sentence.start,
                        end: sentence.end,
                        speaker: 1,
                        paragraph: index,
                        voiceId: "Adam",
                      };
                    })
                  );

                  return sentences;
                }
              )
            );

            const segmentsSentences = [].concat(...segments);
            console.log(segmentsSentences);

            // Initialize an empty array to store paragraphs
            const segmentsParagraphs = [];

            // Initialize variables to track paragraph details
            let currentParagraph = -1;
            let paragraphStart = null;
            let paragraphEnd = null;
            let paragraphText = "";
            let paragraphTranslatedText = "";
            let voiceId = null;
            let speaker = null;

            // Loop through the sentence objects
            segmentsSentences.forEach((sentence) => {
              // If the current sentence belongs to a new paragraph
              if (sentence.paragraph !== currentParagraph) {
                // If this is not the first iteration, push the previous paragraph details into the paragraphsArray
                if (currentParagraph !== -1) {
                  segmentsParagraphs.push({
                    start: paragraphStart,
                    end: paragraphEnd,
                    text: paragraphText,
                    translatedText: paragraphTranslatedText,
                    voiceId: voiceId,
                    speaker: speaker,
                  });
                }
                // Reset paragraph variables for the new paragraph
                currentParagraph = sentence.paragraph;
                paragraphStart = sentence.start;
                paragraphEnd = sentence.end;
                paragraphText = sentence.text;
                paragraphTranslatedText = sentence.translatedText;
                voiceId = sentence.voiceId;
                speaker = sentence.speaker;
              } else {
                // If the current sentence belongs to the same paragraph, update paragraph details
                paragraphEnd = sentence.end;
                paragraphText += " " + sentence.text; // Concatenate text
                paragraphTranslatedText += " " + sentence.translatedText; // Concatenate translatedText
              }
            });

            // Push the last paragraph into paragraphsArray (since the loop ends before pushing the last one)
            segmentsParagraphs.push({
              start: paragraphStart,
              end: paragraphEnd,
              text: paragraphText,
              translatedText: paragraphTranslatedText,
              voiceId: voiceId,
              speaker: speaker,
            });

            // Now paragraphsArray contains the desired array of paragraphs
            console.log(segmentsParagraphs);

            let summaryResult;
            if (AIsummary) {
              // Call Summarize API
              const summaryResponse = await fetch("/api/summarize", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  transcript:
                    deepgramResult.results.channels[0].alternatives[0]
                      .transcript,
                }),
              });

              // Get Summary Result
              const summaryData = await summaryResponse.json();
              summaryResult = summaryData.summary;
              console.log("Transcript Summarized Successfully!");
            }

            // Call translation API
            const translationResponse = await fetch("/api/translate-text", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                inputText:
                  deepgramResult.results.channels[0].alternatives[0].transcript,
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
            // console.log("Starting text to speech...")
            // const ttsResponse = await fetch("/api/text-to-speech", {
            //   method: "POST",
            //   headers: {
            //     "Content-Type": "application/json",
            //   },
            //   body: JSON.stringify({ text: translatedText }),
            // });

            // if (!ttsResponse.ok) {
            //   throw new Error(
            //     `Failed to convert text to speech: ${ttsResponse.statusText}`
            //   );
            // }

            // // Get text-to-speech result
            // const ttsResult = await ttsResponse.json();
            // const audioUrl = ttsResult.audioUrl;
            // console.log("Text To Speech Converted Successfully!");
            const audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";



            // Add the converted text, translation, and audio URL to the audio files collection
            try {
              const docRef = await addDoc(collection(db, "projects"), {
                projectName: projectName,
                user: uid,
                fileName: selectedFileName,
                originalLanguage: originalLanguage,
                translationLanguage: translationLanguage,
                date: Timestamp.fromDate(new Date()),
                fileURL: downloadURL,
                duration: deepgramResult.metadata.duration,
                transcription: {
                  transcript:
                    deepgramResult.results.channels[0].alternatives[0]
                      .transcript,
                  words:
                    deepgramResult.results.channels[0].alternatives[0].words,
                },
                translation: {
                  text: translatedText,
                  language: getTranslateCode(translationLanguage),
                },
                segmentsSentences: segmentsSentences,
                segmentsParagraphs: segmentsParagraphs,
                translatedFileURL: audioUrl,
                summary: summaryResult || null,
              });
              console.log("Document written with ID: ", docRef.id);
              try {
                const userRef = doc(db, "users", uid);
                const docSnap = await getDoc(userRef);
                const currentData = docSnap.data();
                await updateDoc(userRef, {
                  usedSeconds:
                    currentData.usedSeconds + deepgramResult.metadata.duration,
                  remainingSeconds:
                    currentData.remainingSeconds -
                    deepgramResult.metadata.duration,
                });
              } catch (e) {
                console.error("Error updating credits: ", e);
              }
            } catch (e) {
              console.error("Error adding document: ", e);
            }
          } catch (error) {
            console.error(
              "Error converting text to speech or translating:",
              error
            );
          }

          // Close modal
          onClose();
        }
      );
    } catch (e) {
      console.error("Error adding document: ", e);
      setisUploading(false);
    }
  };

  const handleDownload = async (fileUrl, fileName) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const openFileInput = () => {
    if (!isUploading) {
      const fileInput = document.getElementById("fileInput");
      fileInput.click();
    }
  };

  const handleFileSelection = (e) => {
    const selectedFile = e.target.files[0];
    setselectedFile(selectedFile);
    setSelectedFileName(selectedFile?.name);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    // Add visual feedback when dragging over the dropzone (e.g., change the border color).
    setDrag(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    // Add visual feedback (e.g., change the border color) and allow drop events.
    setDrag(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDrag(false);
    // Remove the visual feedback when leaving the dropzone.
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setselectedFile(droppedFile);
    setSelectedFileName(droppedFile.name);
    // Do something with the dropped file, such as uploading or processing it.
    // For example, you can store it in state or call a function to handle the file.
  };

  const handleModalClose = () => {
    setProjectName("");
    setselectedFile("");
    setSelectedFileName("");
    setisUploading(false);
    setUploadProgress(0);
    onClose();
    setAIsummary(false);
  };

  const updateProjectName = async () => {
    try {
      const projectRef = doc(db, "projects", selectedProject.id); // Assuming "id" is the field that uniquely identifies a project
      await updateDoc(projectRef, { projectName: newName });

      // Optionally, you can update the local state or Redux store with the new project name
      // This step depends on how you manage the state of projects in your application
      // For example, if you use Redux:
      // dispatch(updateProjectNameAction(selectedProject.id, newName));

      onCloseRenameModal(); // Close the modal after successful update
    } catch (error) {
      console.error("Error updating project name:", error);
    }
  };

  const deleteProject = async () => {
    try {
      const projectRef = doc(db, "projects", selectedProject.id); // Assuming "id" is the field that uniquely identifies a project
      await deleteDoc(projectRef);

      // Optionally, you can update the local state or Redux store to remove the deleted project
      // This step depends on how you manage the state of projects in your application
      // For example, if you use Redux:
      // dispatch(deleteProjectAction(selectedProject.id));

      onCloseDeleteModal(); // Close the modal after successful deletion
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <AppShell>
      <div className="w-full">
        {/* <Navbar /> */}
        <div className="flex flex-col items-center pb-24 pt-16">
          <div className="flex flex-row items-center justify-center w-full px-10 gap-6 flex-wrap">
            <div
              className="border border-dashed border-foreground-400 text-foreground w-96 h-56 rounded-xl flex flex-col items-center justify-center hover:cursor-pointer hover:bg-white hover:dark:bg-neutral-900 transition-all"
              onClick={onOpen}
            >
              <p className="text-3xl">+</p>
              <p className="font-semibold text-xl pb-4">Upload video</p>
            </div>
            {projects?.map((project, index) => (
              <Link
                onMouseLeave={() => {
                  handleDropDownState(index, false);
                }}
                key={project.id}
                href={`/app/projects/${project.id}`}
                className="w-96 h-56 border border-foreground-400 rounded-xl flex flex-col items-center justify-center hover:cursor-pointer hover:border-purple-500 transition-all hover:shadow-xl"
              >
                <Card className="w-full h-full dark:hover:bg-foreground-100 group">
                  <CardHeader className="flex justify-between">
                    <div className="flex gap-3">
                      <Image
                        alt="nextui logo"
                        height={40}
                        radius="sm"
                        src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                        width={40}
                        className="w-10 h-10"
                      />
                      <div className="flex flex-col">
                        <p className="text-md">{project.projectName}</p>
                        <p className="text-small text-default-500">
                          {project.date &&
                            project.date.toDate().toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Dropdown
                      isOpen={dropdownStates[index]}
                      className={`${
                        isDarkMode ? "dark bg-foreground-100" : "light"
                      } !w-44 !min-w-0`}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <DropdownTrigger>
                        <Button
                          onClick={(e) => {
                            e.preventDefault();
                            handleDropDownState(index, "both");
                          }}
                          variant="light"
                        >
                          <IoEllipsisHorizontalSharp size={20} />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        variant="faded"
                        aria-label="Dropdown menu with icons"
                        className=" text-foreground"
                      >
                        <DropdownItem
                          key="view"
                          startContent={
                            <FaEye className="text-gray-400" size={15} />
                          }
                          onPress={() => {
                            handleDropDownState(index, false);
                            router.push(`/app/projects/${project.id}`);
                          }}
                        >
                          View file
                        </DropdownItem>
                        <DropdownItem
                          key="rename"
                          startContent={
                            <MdEditSquare className="text-gray-400" size={15} />
                          }
                          onPress={() => {
                            handleDropDownState(index, false);
                            setSelectedProject(project);
                            setNewName(project.projectName);
                            onOpenRenameModal();
                          }}
                        >
                          Rename file
                        </DropdownItem>
                        <DropdownItem
                          key="download"
                          startContent={
                            <MdSimCardDownload
                              className="text-gray-400"
                              size={15}
                            />
                          }
                          onPress={() => {
                            handleDropDownState(index, false);
                            handleDownload(
                              project.translatedFileURL,
                              project.fileName
                            );
                          }}
                        >
                          Download file
                        </DropdownItem>
                        <DropdownItem
                          key="delete"
                          className="text-danger"
                          color="danger"
                          startContent={<HiTrash size={15} />}
                          onPress={() => {
                            handleDropDownState(index, false);
                            setSelectedProject(project);
                            onOpenDeleteModal();
                          }}
                        >
                          Delete file
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </CardHeader>
                  <Divider />
                  <CardBody className="flex items-center justify-center">
                    <div className="bg-foreground-200 rounded-full p-3 group-hover:scale-[1] transition-all !duration-500 scale-0">
                      <NextIcon size={40} />
                    </div>
                  </CardBody>
                  <Divider />
                  <CardFooter>
                    <p className="text-sm text-default-500">
                      {project.fileName}
                    </p>
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
              className={`${isDarkMode ? "dark" : "light"}`}
              isDismissable={!isUploading}
              hideCloseButton={isUploading}
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1 text-foreground">
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
                          className={`border border-dashed border-gray-500 rounded-xl h-24 flex items-center justify-center w-full hover:border-purple-800 hover:bg-foreground-100 hover:cursor-pointer transition-all ${
                            drag ? "border-purple-800 bg-foreground-100" : ""
                          }`}
                          onClick={openFileInput}
                          onDragEnter={handleDragEnter}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                        >
                          {selectedFileName ? (
                            <p className="text-sm text-default-500 text-center">
                              {selectedFileName}
                            </p>
                          ) : (
                            <p className="text-sm text-default-500 text-center">
                              Click to choose a file or drag and drop it here{" "}
                              <br />
                              MP4, MOV, WEBM, MKV, MP3, WAV
                            </p>
                          )}
                        </div>

                        <p className="py-4 text-foreground">or</p>
                        <p className="w-full text-left text-foreground font-semibold text-sm pb-2">
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
                          className="text-foreground pb-4"
                          disabled={selectedFile ? true : false}
                          value={selectedFile ? "" : pasteLink}
                          onChange={handlePasteLinkChange}
                          isDisabled={isUploading}
                        />

                        <p className="w-full text-left text-foreground font-semibold text-sm pb-2">
                          Project Name
                        </p>
                        <Input
                          placeholder="My First Project"
                          color="default"
                          size="sm"
                          className="pb-4 text-foreground"
                          value={projectName}
                          onChange={handleProjectNameChange}
                          isDisabled={isUploading}
                        />

                        <p className="w-full text-left text-foreground font-semibold text-sm pb-2">
                          Original Language
                        </p>
                        <Select
                          size="sm"
                          placeholder="Select a Language"
                          color="default"
                          className={`${
                            isDarkMode ? "dark" : "light"
                          } text-foreground pb-4`}
                          selectedKeys={[originalLanguage]}
                          onChange={handleOriginalLanguage}
                          aria-label="Original Language"
                          disallowEmptySelection
                          isDisabled={isUploading}
                          startContent={
                            <Avatar
                              alt={originalLanguage}
                              className="w-7 h-6 mr-1"
                              src={`https://flagcdn.com/${getFlagCode(
                                originalLanguage
                              )}.svg`}
                            />
                          }
                        >
                          {languageOptions.map((option) => (
                            <SelectItem
                              key={option.label}
                              startContent={
                                <Avatar
                                  alt={option.label}
                                  className="w-6 h-6 mr-1"
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
                        <p className="w-full text-left text-foreground font-semibold text-sm pb-2">
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
                          isDisabled={isUploading}
                          startContent={
                            <Avatar
                              alt={originalLanguage}
                              className="w-7 h-6 mr-1"
                              src={`https://flagcdn.com/${getFlagCode(
                                translationLanguage
                              )}.svg`}
                            />
                          }
                        >
                          {languageOptions.map((option) => (
                            <SelectItem
                              key={option.label}
                              startContent={
                                <Avatar
                                  alt={option.label}
                                  className="w-6 h-6 mr-1"
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
                        <div className="w-full mt-2 mb-2">
                          <CheckboxGroup
                            orientation="horizontal"
                            color="danger"
                            isDisabled={isUploading}
                          >
                            <Checkbox
                              isSelected={AIsummary}
                              onValueChange={setAIsummary}
                            >
                              <div className="flex items-center">
                                <IoSparkles className="text-sky-300" />
                                <p className="ml-1 mr-4 font-medium text-sm">
                                  AI Summary
                                </p>
                              </div>
                            </Checkbox>
                            <Checkbox isDisabled value="thumbnail">
                              <div className="flex items-center">
                                <IoSparkles className="text-sky-300" />
                                <p className="ml-1 font-medium text-sm">
                                  AI Thumbnail
                                </p>
                              </div>
                            </Checkbox>
                          </CheckboxGroup>
                        </div>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <div className="flex flex-col w-full">
                        <Button
                          className="w-full font-semibold text-base py-5"
                          color="secondary"
                          isDisabled={!selectedFile || !projectName}
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
            <Modal
              isOpen={isOpenRenameModal}
              onOpenChange={onOpenChangeRenameModal}
              className={`${isDarkMode ? "dark" : "light"}`}
            >
              <ModalContent>
                {(onCloseRenameModal) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1 text-foreground">
                      Rename Project
                    </ModalHeader>
                    <ModalBody>
                      <p className="text-foreground text-sm">Name</p>
                      <Input
                        size="sm"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        autoFocus
                      />
                    </ModalBody>
                    <ModalFooter>
                      <div className="flex flex-row gap-4 w-full">
                        <Button
                          color="danger"
                          variant="light"
                          className="w-full"
                          onPress={onCloseRenameModal}
                        >
                          Cancel
                        </Button>
                        <Button
                          color="primary"
                          className="w-full"
                          onPress={updateProjectName}
                        >
                          Save
                        </Button>
                      </div>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
            <Modal
              isOpen={isOpenDeleteModal}
              onOpenChange={onOpenChangeDeleteModal}
              className={`${isDarkMode ? "dark" : "light"}`}
            >
              <ModalContent>
                {(onCloseDeleteModal) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1 text-foreground">
                      Would you like to permanently delete this project?
                    </ModalHeader>
                    <ModalBody>
                      <p className="text-foreground-500 text-sm">
                        Once deleted, this video will no longer be accessible.
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
                          onPress={deleteProject}
                        >
                          Delete
                        </Button>
                      </div>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </>
        </div>
      </div>
    </AppShell>
  );
};

export default withAuth(Projects);
