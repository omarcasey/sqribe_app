// pages/[slug].js

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import ReusableAudioPlayer from "@/components/ReusableAudioPlayer";
import { Tabs, Tab, Spinner, Button, Avatar } from "@nextui-org/react";
import { IoIosArrowBack, IoIosHelpCircleOutline } from "react-icons/io";
import { IoInformationCircleOutline } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import { getFlagCode } from "@/helpers/getFlag";
import withAuth from "@/components/withAuth";
import { useTheme } from "@/components/ThemeContext";

const Page = () => {
  const router = useRouter();
  const [project, setProject] = useState(null);
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      const slug = router.query.slug;
      if (slug) {
        // Fetch Firestore document based on the slug
        const docRef = doc(db, "projects", slug);
        const docSnap = await getDoc(docRef);
        setProject(docSnap.data());
      }
    };

    fetchData();
  }, [router.query.slug]);

  return (
    <div
      className={`flex min-h-screen flex-col items-center pb-24 bg-default-100 ${
        isDarkMode ? "dark" : "light"
      }`}
    >
      <div className="w-full flex justify-between px-5 border-b-1 border-neutral-600 py-4 dark:bg-neutral-900 bg-white">
        <div className="flex items-center justify-center text-foreground">
          <Link href="/projects">
            <IoIosArrowBack size={25} className="mr-3" />
          </Link>
          <p className="font-medium">{project && project.projectName}</p>
        </div>
        <div className="flex item justify-center gap-4">
          <Button
            className="px-3 text-white"
            startContent={<IoInformationCircleOutline size={25} />}
            color="primary"
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
              <p className="text-center text-gray-400">
                00:00:00,008 — 00:00:47,500
              </p>
            </div>
            <div className="flex px-6 gap-x-12 mt-4">
              <div className="w-1/2">
                <p className="text-gray-300">
                  {project?.transcription?.transcript}
                </p>
              </div>
              <div className="w-1/2">
                <p
                  className={`text-gray-300 ${
                    project.translationLanguage === "Arabic" ? "text-end" : ""
                  }`}
                >
                  {project?.translation?.text}
                </p>
              </div>
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
    </div>
  );
};

export default withAuth(Page);
