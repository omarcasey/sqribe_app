// pages/[slug].js

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import ReusableAudioPlayer from "@/components/ReusableAudioPlayer";
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
} from "@nextui-org/react";
import { IoIosArrowBack, IoIosHelpCircleOutline } from "react-icons/io";
import { IoInformationCircleOutline } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import { getFlagCode } from "@/helpers/getFlag";
import withAuth from "@/components/withAuth";
import { useSelector } from "react-redux";

const Page = () => {
  const router = useRouter();
  const [project, setProject] = useState(null);
  const isDarkMode = useSelector((state) => state.user.data.darkMode);
  const userProjects = useSelector((state) => state.user.projects);
  const loading = useSelector((state) => state.user.projectsLoading);
  const { isOpen, onOpen, onClose } = useDisclosure();

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
          router.push("/projects");
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
      className={`flex min-h-screen flex-col items-center pb-24 bg-default-100 ${
        isDarkMode ? "dark" : "light"
      }`}
    >
      <div className="w-full flex justify-between px-5 border-b-1 border-neutral-600 py-4 dark:bg-neutral-900 bg-white">
        <div className="flex items-center justify-center text-foreground">
          <div className="hover:cursor-pointer mr-3" onClick={() => router.back()}>
            <IoIosArrowBack size={25} className="" />
          </div>
          <p className="font-medium">{project.projectName}</p>
        </div>
        <div className="flex item justify-center gap-4">
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
            <div className="w-full mt-4">
              {project?.transcription?.words
                .reduce((sentences, word, index) => {
                  if (
                    index === 0 ||
                    word.start_time - sentences[sentences.length - 1].end_time >
                      0.1
                  ) {
                    // Start a new sentence if it's the first word or there's a pause of more than 0.1s
                    sentences.push({
                      sentence: [word.word],
                      start_time: word.start_time,
                      end_time: word.end_time,
                    });
                  } else {
                    // Add the word to the current sentence
                    sentences[sentences.length - 1].sentence.push(word.word);
                    sentences[sentences.length - 1].end_time = word.end_time;
                  }
                  return sentences;
                }, [])
                .map((sentence, index) => (
                  <>
                    <p className="w-full text-center text-foreground-400">
                      {formatTime(sentence.start_time)} —{" "}
                      {formatTime(sentence.end_time)}
                    </p>
                    <div className="flex flex-row px-6 gap-x-12 mt-4">
                      <p key={index} className="w-1/2 text-foreground-600">
                        {sentence.sentence.join(" ")}
                      </p>
                      <p
                        className={`w-1/2 text-foreground-600 ${
                          project.translationLanguage === "Arabic"
                            ? "text-end"
                            : ""
                        }`}
                      >
                        {project?.translation?.text}
                      </p>
                    </div>
                  </>
                ))}
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
                    <ReusableAudioPlayer
                      audioUrl={project.fileURL}
                      name={project.projectName}
                      filename={project.fileName}
                    />
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
