// pages/[slug].js

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReusableAudioPlayer from "@/components/App/ReusableAudioPlayer";
import {
  Tabs,
  Tab,
  Spinner,
  Button,
  Avatar,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Textarea,
  Progress,
  Select,
  SelectItem,
  Tooltip,
  Skeleton,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import { IoIosArrowBack, IoIosHelpCircleOutline } from "react-icons/io";
import { HiOutlineSparkles, HiSparkles } from "react-icons/hi2";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaPlay } from "react-icons/fa";
import { IoInformationCircleOutline } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import { PiWaveform } from "react-icons/pi";
import { getFlagCode, getTranslateCode } from "@/helpers/getFlag";
import withAuth from "@/components/App/withAuth";
import { useSelector } from "react-redux";
import VideoPlayer from "@/components/App/VideoPlayer";
import { motion } from "framer-motion";
import { BsBodyText, BsTextLeft } from "react-icons/bs";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import Link from "next/link";
import ThemeSwitch from "@/components/App/ThemeSwitch";
import DropdownMenuIdk from "@/components/App/DropdownMenuIdk";
import SearchBox from "@/components/App/SearchBox";
import ProjectSearch from "@/components/App/ProjectSearch";
import { targetLanguageOptions } from "@/helpers/languages";
import { voiceOverVoices } from "@/helpers/voices";
import ThemeSearch from "@/components/App/ThemeSearch";
import Timeline from "@/components/App/Timeline";
import { PiWaveformFill } from "react-icons/pi";

const Page = () => {
  const router = useRouter();
  const [project, setProject] = useState(null);
  const isDarkMode = useSelector((state) => state.user.darkMode);
  const userData = useSelector((state) => state.user.data);
  const subscription = userData?.subscription;
  const userProjects = useSelector((state) => state.user.projects);
  const loading = useSelector((state) => state.user.projectsLoading);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editSegments, setEditSegments] = useState([]);
  const [translationLanguage, settranslationLanguage] = useState(null);
  const {
    isOpen: isOpenNewTranslateModal,
    onOpen: onOpenNewTranslateModal,
    onClose: onCloseNewTranslateModal,
  } = useDisclosure();
  const {
    isOpen: isOpenVoiceoverModal,
    onOpen: onOpenVoiceoverModal,
    onClose: onCloseVoiceoverModal,
  } = useDisclosure();
  const [translateLoading, setTranslateLoading] = useState([]);
  const [selectedVoices, setSelectedVoices] = useState({});
  const [timelineVisible, setTimelineVisible] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const handleSelectedVoice = (speaker) => (selected) => {
    setSelectedVoices((prev) => ({
      ...prev,
      [speaker]: selected,
    }));
  };

  const handleTranslationLanguage = (key) => {
    settranslationLanguage(key);
  };

  useEffect(() => {
    const fetchData = async () => {
      const slug = router.query.slug;
      if (slug) {
        // Check if the project belongs to the current user
        const projectData = userProjects?.find(
          (project) => project.id === slug
        );

        if (projectData) {
          setProject(projectData);
          setEditSegments(projectData.segments);
        } else {
          // Redirect to the projects page if the project doesn't belong to the user
          router.push("/app/projects");
        }
      }
    };

    if (loading === "succeeded") {
      fetchData();
    }
  }, [router.query.slug, loading, userProjects, router]);

  if (!project) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const handleTextChange = (e, index, type) => {
    const newSegments = [...editSegments];
    const updatedSegment = { ...newSegments[index], [type]: e.target.value };
    newSegments[index] = updatedSegment;
    setEditSegments(newSegments);
  };

  const resetText = (index, field) => {
    const updatedSegments = [...editSegments];
    updatedSegments[index][field] = project.segments[index][field];
    setEditSegments(updatedSegments);
  };

  const handleSpeakerChange = async (e, index) => {
    const speakers = project.speakers;
    const newSpeaker = {
      speaker: String.fromCharCode(65 + speakers.length),
      label: "Clone",
    };
    let newSpeakers = [...speakers]; // Declare newSpeakers outside the if statement

    if (e === "Add") {
      newSpeakers = [...speakers, newSpeaker]; // Assign the updated value
      setProject((prev) => ({
        ...prev,
        speakers: newSpeakers,
      }));
    }

    const newSegments = [...editSegments];
    const updatedSegment = {
      ...newSegments[index],
      speaker: e === "Add" ? newSpeaker.speaker : e,
    };
    newSegments[index] = updatedSegment;
    setEditSegments(newSegments);
    setProject((prev) => ({
      ...prev,
      segments: newSegments,
    }));

    try {
      const projectRef = doc(db, "projects", project.id);
      await updateDoc(projectRef, {
        speakers: newSpeakers,
        segments: newSegments,
        needsUpdate: true,
      });
    } catch (e) {
      console.error("Error updating project segments: ", e);
    }
  };

  const translateSegments = async (index) => {
    setIsSaving(true);
    setTranslateLoading((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
    const inputText = editSegments[index]["text"];
    const translationResponse = await fetch("/api/translate-text", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputText: inputText,
        target: getTranslateCode(project.translationLanguage),
      }),
    });

    if (!translationResponse.ok) {
      throw new Error(
        `Failed to translate text: ${translationResponse.statusText}`
      );
    }

    const translationResult = await translationResponse.json();
    const translatedText = translationResult.result;
    const updatedSegments = [...editSegments];
    updatedSegments[index]["translatedText"] = translatedText;
    setEditSegments(updatedSegments);
    setProject((prev) => ({
      ...prev,
      segments: updatedSegments,
    }));

    try {
      const projectRef = doc(db, "projects", project.id);
      await updateDoc(projectRef, {
        segments: updatedSegments,
        needsUpdate: true,
      });
    } catch (e) {
      console.error("Error updating project segments: ", e);
    }
    setTranslateLoading((prev) => {
      const updated = [...prev];
      updated[index] = false;
      return updated;
    });
    setIsSaving(false);
  };

  const updateDubbing = async (e) => {
    try {
      const projectRef = doc(db, "projects", project.id);
      await updateDoc(projectRef, {
        needsUpdate: false,
      });
    } catch (e) {
      console.error("Error updating project segments: ", e);
    }
  };

  function formatTime(time) {
    const seconds = (time / 1000).toFixed(3);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = (seconds % 60).toFixed(3).padStart(6, "0");
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds}`;
  }

  return (
    <div
      className={`flex flex-col h-screen bg-default-100 ${
        isDarkMode ? "dark" : "light"
      }`}
    >
      {project ? (
        <>
          <nav className="w-full flex flex-row justify-between px-5 border-b-1 border-neutral-600 dark:bg-neutral-900 bg-white py-4">
            <div className="flex items-center justify-center text-foreground">
              <div
                className="hover:cursor-pointer mr-3"
                onClick={() => router.back()}
              >
                <IoIosArrowBack size={25} className="" />
              </div>
              <p className="font-medium">{project.projectName}</p>
              <div className={`${isSaving ? "flex" : "hidden"} bg-foreground-200 rounded-full flex-row items-center px-3 py-[6px] ml-8`}>
                <Spinner size="sm" className="" color="primary" />
                <p className="ml-3 text-sm">Saving</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="w-32 mr-2">
                <p className="text-tiny mb-1 text-center text-foreground-600">
                  {(subscription?.usage.usedSeconds / 60).toFixed(
                    subscription?.usage.usedSeconds % 60 === 0 ? 0 : 1
                  )}{" "}
                  / {(subscription?.usage.totalSeconds / 60).toFixed(0)} mins
                  used
                </p>
                <Progress
                  disableAnimation
                  color="danger"
                  value={
                    (subscription?.usage.usedSeconds /
                      subscription?.usage.totalSeconds) *
                    100
                  }
                />
              </div>
              <DropdownMenuIdk router={router} />
              <Button
                className="px-3 text-white min-w-0"
                startContent={<IoInformationCircleOutline size={25} />}
                color="primary"
                onPress={onOpen}
              ></Button>
              <Button
                className="px-3 min-w-0"
                startContent={<IoIosHelpCircleOutline size={25} />}
              ></Button>
            </div>
          </nav>
          <div className="flex-1 flex overflow-hidden">
            <div className="w-2/3 flex flex-col">
              <div className="flex flex-row flex-shrink-0">
                <div className="w-1/2 border-b border-neutral-600 flex items-center h-14 px-5 justify-between">
                  <div className="flex items-center justify-center">
                    <Avatar
                      alt="English"
                      className="w-5 h-5 mr-3"
                      src={`https://flagcdn.com/${getFlagCode(
                        project.originalLanguage
                      )}.svg`}
                    />
                    <p className="font-medium text-foreground">
                      {project.originalLanguage}
                    </p>
                  </div>
                </div>
                <div className="w-1/2 border border-t-0 border-r-0 border-neutral-600 flex items-center h-14 px-5 justify-between">
                  <div className="flex items-center justify-center">
                    <Avatar
                      alt="English"
                      className="w-5 h-5 mr-3"
                      src={`https://flagcdn.com/${getFlagCode(
                        project.translationLanguage
                      )}.svg`}
                    />
                    <p className="font-medium text-foreground">
                      {project.translationLanguage}
                    </p>
                  </div>
                  <Button
                    color="default"
                    variant="light"
                    className="flex items-center justify-center group hover:cursor-pointer"
                    onPress={onOpenNewTranslateModal}
                  >
                    <GoPlus
                      size={20}
                      className="mr-1 text-foreground-500 group-hover:text-foreground transition-all"
                    />
                    <p className="text-xs text-foreground-500 font-medium group-hover:text-foreground transition-all">
                      Translate to a different language
                    </p>
                  </Button>
                </div>
              </div>
              <div className="w-full pt-4 overflow-auto">
                {editSegments.map((segment, index) => {
                  const originalSegment = project.segments[index];
                  const isDifferent = segment.text !== originalSegment?.text;
                  return (
                    <div
                      key={index}
                      className="flex flex-col mb-4 px-6 text-sm"
                    >
                      <div className="flex flex-row text-foreground-500 justify-center items-center gap-8 mb-4">
                        <div>
                          <Dropdown
                            className={`${
                              isDarkMode ? "dark" : "light"
                            } border border-foreground-300 w-40 !min-w-0`}
                          >
                            <DropdownTrigger>
                              <div className="flex flex-row items-center hover:text-foreground hover:cursor-pointer transition-all">
                                <p className="mr-1">
                                  Speaker {segment.speaker}
                                </p>
                                <IoMdArrowDropdown />
                              </div>
                            </DropdownTrigger>
                            <DropdownMenu
                              aria-label="Dropdown Variants"
                              variant="flat"
                              onAction={(key) =>
                                handleSpeakerChange(key, index)
                              }
                            >
                              {project.speakers?.map((speaker) => (
                                <DropdownItem
                                  key={speaker.speaker}
                                  className="text-foreground"
                                >
                                  <p>Speaker {speaker.speaker}</p>
                                </DropdownItem>
                              ))}
                              <DropdownItem
                                key={"Add"}
                                className="text-blue-600 data-[hover=true]:text-blue-500"
                              >
                                <div className="flex flex-row items-center">
                                  <GoPlus size={20} className="w-5 mr-1" />{" "}
                                  <p className="font-medium">Add Speaker</p>
                                </div>
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </div>
                        <p>
                          {formatTime(segment.start)} —{" "}
                          {formatTime(segment.end)}
                        </p>
                        <div
                          className="flex flex-row items-center hover:text-foreground hover:cursor-pointer transition-all"
                          onClick={onOpenVoiceoverModal}
                        >
                          <p className="mr-1 ">
                            {voiceOverVoices.find(
                              (voice) => voice.voiceId === segment.voiceId
                            ) || "Clone"}
                          </p>
                          <PiWaveform size={18} />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 border-b border-foreground-300 text-foreground">
                        <div className="border-r border-foreground-300 p-3">
                          <Textarea
                            variant="flat"
                            minRows={1}
                            maxRows={200}
                            value={segment.text}
                            onChange={(e) => handleTextChange(e, index, "text")}
                          />
                        </div>
                        <div className="p-3">
                          <Skeleton
                            className="rounded-lg"
                            isLoaded={!translateLoading[index]}
                          >
                            <p
                              className={`p-2 text-foreground italic ${
                                project.translationLanguage === "Arabic"
                                  ? "text-right"
                                  : ""
                              }`}
                            >
                              {segment.translatedText}
                            </p>
                          </Skeleton>
                        </div>
                        {isDifferent && (
                          <motion.div
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="col-span-2 flex items-center justify-center mb-3 mt-1"
                          >
                            <div className="flex flex-row gap-8 ml-3 font-semibold text-sm">
                              <p
                                className="text-foreground-500 hover:cursor-pointer hover:text-foreground transition-all"
                                onClick={() => resetText(index, "text")}
                              >
                                Cancel
                              </p>
                              <p
                                className="text-blue-800 hover:cursor-pointer"
                                onClick={() => translateSegments(index)}
                              >
                                Translate
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="w-1/3 flex flex-col border-l border-neutral-600 justify-between">
              <div className="w-full overflow-y-auto">
                <Tabs
                  aria-label="Options"
                  fullWidth
                  variant="underlined"
                  className="pt-5"
                  defaultSelectedKey={"translated"}
                >
                  <Tab key="original" title="Original" className="pb-0">
                    <div className="p-4 pb-2 px-5">
                      {project.fileName.endsWith(".mp4") ? (
                        <VideoPlayer url={project.fileURL} />
                      ) : (
                        <ReusableAudioPlayer
                          audioUrl={project.fileURL}
                          name={project.projectName}
                          filename={project.fileName}
                        />
                      )}
                    </div>
                  </Tab>
                  <Tab key="translated" title="Translated" className="pb-0">
                    <div className="p-4 pb-2 px-5">
                      {project.fileName.endsWith(".mp4") ? (
                        <VideoPlayer url={project.translatedFileURL} />
                      ) : (
                        <ReusableAudioPlayer
                          audioUrl={project.fileURL}
                          name={project.projectName}
                          filename={project.fileName}
                        />
                      )}
                      {project.needsUpdate === true && (
                        <div className="bg-blue-500 w-full flex items-center justify-center rounded-xl mt-2 px-4 py-3 mb-2">
                          <p className="text-sm text-white text-center">
                            <span className="font-semibold">
                              This is an old version!{" "}
                            </span>
                            Click Redub to see the updates 👀
                          </p>
                        </div>
                      )}
                    </div>
                  </Tab>
                </Tabs>
                <div className="flex flex-row px-6 gap-2 mb-2">
                  <Button
                    className="min-w-0 px-2 border border-blue-500"
                    variant="light"
                    onPress={onOpenVoiceoverModal}
                  >
                    <PiWaveformFill size={25} />
                  </Button>
                  <Button color="primary" className="flex-1 font-semibold">
                    Apply Changes
                  </Button>
                </div>
                <div className="flex flex-row px-6 gap-2 mb-2">
                  <Button
                    className="min-w-0 px-10 border border-foreground-300 font-semibold"
                    variant="light"
                  >
                    Lip-Sync <span className="font-light">beta</span>
                  </Button>
                  <Button
                    color="default"
                    className="flex-1 font-semibold border border-blue-500"
                  >
                    Download
                  </Button>
                </div>
                <div className="px-8">
                  {project.transcription.summary && (
                    <>
                      <p className="text-foreground-400 mb-2">Summary:</p>
                      <p className="text-sm text-foreground-600">
                        {project.transcription.summary
                          .split("-")
                          .filter((item) => item.trim() !== "") // Filter out empty items
                          .map((item, index) => (
                            <li className="mb-4" key={index}>
                              {item}
                            </li>
                          ))}
                      </p>
                    </>
                  )}
                </div>
              </div>
              <div
                className={` ${
                  timelineVisible ? "hidden" : "flex"
                } flex-row w-full gap-4 px-5 mb-5 pt-5 border-t border-neutral-600`}
              >
                <Button
                  className="flex-1"
                  color="default"
                  variant="bordered"
                  onPress={() => setTimelineVisible(true)}
                >
                  Open Timeline
                </Button>
                {/* <Button
                  className="flex-1"
                  color="primary"
                  onPress={updateDubbing}
                  isDisabled={!project.needsUpdate}
                >
                  Redub
                </Button> */}
              </div>
            </div>
          </div>
          {timelineVisible && (
            <Timeline
              segments={editSegments}
              setEditSegments={setEditSegments}
              setTimelineVisible={setTimelineVisible}
              setIsSaving={setIsSaving}
              audioURL={project.fileURL}
              duration={project.duration}
            />
          )}
        </>
      ) : (
        <Spinner size="lg" className="mt-32" />
      )}
      <Modal
        size={"2xl"}
        isOpen={isOpen}
        onClose={onClose}
        className={`${isDarkMode ? "dark" : "light"} text-foreground`}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Project Details
              </ModalHeader>
              <ModalBody>
                <div className="">
                  <p>Project Name: {project.projectName}</p>
                  <p>Original Language: {project.originalLanguage}</p>
                  <p>Translated Languages: {project.translationLanguage}</p>
                  <p>
                    Total Minutes Used: {formatTime(project.duration * 1000)}
                  </p>
                  <p className="mt-5 underline">Breakdown</p>
                  <p>Minutes used in first Dubbing:</p>
                  <p>Minutes used Redubbing:</p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        size={"md"}
        isOpen={isOpenNewTranslateModal}
        onClose={onCloseNewTranslateModal}
        className={`${isDarkMode ? "dark" : "light"} text-foreground`}
        backdrop="blur"
      >
        <ModalContent>
          {(onCloseNewTranslateModal) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Choose language for translation
              </ModalHeader>
              <ModalBody>
                <div className="text-sm">
                  <p>
                    We&apos;ll reuse this project&apos;s video transcription so
                    you don&apos;t need to proofread it twice.{" "}
                    <Link href="#" className="text-blue-600 font-semibold">
                      Learn more
                    </Link>{" "}
                    how to effectively utilize this feature.
                  </p>
                  <p className="mt-5 font-semibold mb-2">Translate to</p>
                  <Autocomplete
                    variant="flat"
                    placeholder="Select a language"
                    size="sm"
                    className="text-foreground pb-4"
                    selectedKeys={[translationLanguage]}
                    onSelectionChange={handleTranslationLanguage}
                    startContent={
                      <Avatar
                        alt={translationLanguage}
                        className="w-8 h-6 mr-1"
                        src={`https://flagcdn.com/${getFlagCode(
                          translationLanguage
                        )}.svg`}
                      />
                    }
                  >
                    {targetLanguageOptions.map((option) => (
                      <AutocompleteItem
                        key={option.label}
                        textValue={option.label}
                        className="text-black"
                      >
                        <div className="flex gap-2 items-center">
                          <Avatar
                            alt={option.label}
                            className="w-6 h-6 mr-1"
                            src={`https://flagcdn.com/${option.flagCode}.svg`}
                          />
                          <p>{option.label}</p>
                        </div>
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onPress={onCloseNewTranslateModal}
                  className="w-full"
                >
                  Translate
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        size={"md"}
        isOpen={isOpenVoiceoverModal}
        onClose={onCloseVoiceoverModal}
        className={`${isDarkMode ? "dark" : "light"} text-foreground`}
        backdrop="blur"
      >
        <ModalContent>
          {(onCloseVoiceoverModal) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                Choose voiceover for speakers
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row text-sm">
                    <p className="w-1/2">Original Speaker</p>
                    <p className="w-1/2">VoiceOver</p>
                  </div>
                  {project.speakers.map((speaker, index) => (
                    <div className="flex flex-row gap-3" key={index}>
                      <div className="border-2 border-foreground-200 flex-1 rounded-md p-2 flex items-center text-sm pl-4">
                        Speaker {speaker.speaker}
                      </div>
                      <Select
                        size="sm"
                        color="default"
                        variant="bordered"
                        className={`${
                          isDarkMode ? "dark" : "light"
                        } text-foreground w-1/2`}
                        selectedKeys={[selectedVoices[speaker.speaker]]}
                        onChange={handleSelectedVoice(speaker.speaker)}
                        aria-label="Voiceover Selection"
                        disallowEmptySelection
                        startContent={
                          selectedVoices[speaker.speaker] === "Clone" ? (
                            <HiSparkles className="text-foreground w-5" />
                          ) : (
                            <FaPlay className="text-foreground w-3 mr-1 ml-1" />
                          )
                        }
                      >
                        <SelectItem
                          key={"Clone"}
                          className="text-black"
                          value={"Clone"}
                          startContent={
                            <HiSparkles className="text-black w-4" />
                          }
                        >
                          Clone
                        </SelectItem>
                        {voiceOverVoices.map((voice) => (
                          <SelectItem
                            key={voice.label}
                            className="text-black"
                            value={voice.label}
                            startContent={
                              <FaPlay className="text-black w-2 mx-1" />
                            }
                          >
                            {voice.label}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                  ))}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="flat"
                  onPress={onCloseVoiceoverModal}
                  className="w-full"
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={onCloseVoiceoverModal}
                  className="w-full"
                >
                  Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <SearchBox />
      <ProjectSearch />
      <ThemeSearch />
    </div>
  );
};

export default withAuth(Page);
