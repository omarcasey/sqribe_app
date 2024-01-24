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
} from "@nextui-org/react";
import { IoIosArrowBack, IoIosHelpCircleOutline } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoInformationCircleOutline } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import { PiWaveform } from "react-icons/pi";
import { getFlagCode } from "@/helpers/getFlag";
import withAuth from "@/components/App/withAuth";
import { useSelector } from "react-redux";
import VideoPlayer from "@/components/App/VideoPlayer";
import { motion } from "framer-motion";

const Page = () => {
  const router = useRouter();
  const [project, setProject] = useState(null);
  const isDarkMode = useSelector((state) => state.user.data.darkMode);
  const userData = useSelector((state) => state.user.data);
  const userProjects = useSelector((state) => state.user.projects);
  const loading = useSelector((state) => state.user.projectsLoading);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editSegments, setEditSegments] = useState([]);

  useEffect(() => {
    if (project) {
      setEditSegments(project.segments);
    }
  }, [project]);

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

  function formatTime(time) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = (time % 60).toFixed(3).padStart(6, "0");
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds}`;
  }

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
        } else {
          // Redirect to the projects page if the project doesn't belong to the user
          router.push("/app/projects");
        }
      }
    };

    if (loading === "succeeded") {
      fetchData();
    }
  }, [router.query.slug, loading, userProjects]);

  if (!project) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div
      className={`flex h-screen flex-col items-center bg-default-100 ${
        isDarkMode ? "dark" : "light"
      }`}
    >
      <div className="w-full flex justify-between px-5 border-b-1 border-neutral-600 py-4 dark:bg-neutral-900 bg-white">
        <div className="flex items-center justify-center text-foreground">
          <div
            className="hover:cursor-pointer mr-3"
            onClick={() => router.back()}
          >
            <IoIosArrowBack size={25} className="" />
          </div>
          <p className="font-medium">{project.projectName}</p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <div className="w-32 mr-5">
            <p className="text-tiny mb-1 text-center text-foreground-600">
              {(userData.usedSeconds / 60).toFixed(1)} /{" "}
              {(userData.totalSeconds / 60).toFixed(0)} mins used
            </p>
            <Progress
              color="danger"
              value={(userData.usedSeconds / userData.totalSeconds) * 100}
            />
          </div>
          <Button
            className="px-3 text-white"
            startContent={<IoInformationCircleOutline size={25} />}
            color="primary"
            onPress={onOpen}
          >
            Project Info
          </Button>
          <Button
            className="px-3"
            startContent={<IoIosHelpCircleOutline size={25} />}
          >
            Help Center
          </Button>
        </div>
      </div>
      {project ? (
        <div className="flex flex-row w-full">
          <div className="w-2/3 flex flex-col">
            <div className="flex flex-row">
              <div className="w-1/2 border-b border-neutral-600 flex items-center h-14 px-5">
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
            <div className="w-full max-h-[86vh] pt-4 overflow-y-auto">
              {editSegments?.map((segment, index) => {
                const originalSegment = project.segments[index];
                const isDifferent = segment.text !== originalSegment.text;

                return (
                  <div key={index} className="flex flex-col mb-4 px-6 text-sm">
                    <div className="flex flex-row text-foreground-500 justify-center items-center gap-8 mb-4">
                      <div>
                        <Dropdown className={isDarkMode ? "dark" : "light"}>
                          <DropdownTrigger>
                            <div className="flex flex-row items-center hover:text-foreground hover:cursor-pointer transition-all">
                              <p className="mr-1">Speaker {segment.speaker}</p>
                              <IoMdArrowDropdown />
                            </div>
                          </DropdownTrigger>
                          <DropdownMenu
                            aria-label="Dropdown Variants"
                            variant="flat"
                          >
                            <DropdownItem
                              key="speaker1"
                              className="text-foreground"
                            >
                              Speaker 1
                            </DropdownItem>
                            <DropdownItem
                              key="speaker2"
                              className="text-foreground"
                            >
                              Speaker 2
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </div>
                      <p>
                        {formatTime(segment.start)} — {formatTime(segment.end)}
                      </p>
                      <div className="flex flex-row items-center hover:text-foreground hover:cursor-pointer transition-all">
                        <p className="mr-1 ">{segment.voiceId}</p>
                        <PiWaveform size={18} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 border-b border-foreground-300 text-foreground">
                      <div className="border-r border-foreground-300 p-3">
                        <Textarea
                          variant="flat"
                          minRows={1}
                          value={segment.text}
                          onChange={(e) => handleTextChange(e, index, "text")}
                        />
                      </div>
                      <div className="p-3">
                        <Textarea
                          variant="flat"
                          minRows={1}
                          isDisabled
                          value={segment.translatedText}
                          onChange={(e) =>
                            handleTextChange(e, index, "translatedText")
                          }
                        />
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
                              onClick={() => console.log(editSegments)}
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
          <div className="w-1/3 flex flex-col border-l border-neutral-600">
            <div className="border-b-1 border-neutral-600 h-14 w-full">
              <Tabs
                aria-label="Options"
                fullWidth
                variant="underlined"
                color="default"
                className="h-full"
                classNames={{ tabList: "h-full pb-0", tab: "h-full pb-0" }}
              >
                <Tab key="original" title="Original">
                  <div className="p-4 px-5">
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
                <Tab key="translated" title="Translated">
                  <div className="p-4 px-5">
                    <ReusableAudioPlayer
                      audioUrl={project.translatedFileURL}
                      name={project.projectName}
                      filename={project.fileName + " translated"}
                    />
                  </div>
                </Tab>
              </Tabs>
              <div className="px-8">
                {project.summary && (
                  <>
                    <p className="text-foreground-400 mb-2">Summary:</p>
                    <p className="text-sm text-foreground-600">
                      {project.summary}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Spinner size="lg" className="mt-32" />
      )}
      <Modal
        size={"2xl"}
        isOpen={isOpen}
        onClose={onClose}
        className={`${isDarkMode ? "dark" : "light"}`}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Project Details
              </ModalHeader>
              <ModalBody>
                <p>Project Name:</p>
                <p>Original Language:</p>
                <p>Translated Languages:</p>
                <p>Credits Used Dubbing:</p>
                <p>Credits Used:</p>
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
    </div>
  );
};

export default withAuth(Page);
