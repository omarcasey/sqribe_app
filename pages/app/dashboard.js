import AppShell from "@/components/App/AppShell";
import withAuth from "@/components/App/withAuth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Spinner,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Chip,
  Avatar,
} from "@nextui-org/react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { IoSparkles } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { useRouter } from "next/router";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  where,
  query,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { FaCircleInfo, FaCirclePlay } from "react-icons/fa6";
import { MdDownloadForOffline } from "react-icons/md";
import { db } from "@/firebase";
import {
  fetchAudioFile,
  setAudioPlayerVisible,
  setAutoPlay,
} from "@/reducers/userSlice";
import Image from "next/image";
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const router = useRouter();
  const userData = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.user.auth.uid);
  const projects = useSelector((state) => state.user.projects);
  const [audioFiles, setAudioFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const data = {
    labels: ["Used Credits", "Remaining Credits"],
    datasets: [
      {
        data: [userData.usedCredits, userData.remainingCredits],
        backgroundColor: ["rgb(125 211 252)", "rgb(14 165 233)"],
        borderWidth: 0,
        borderColor: "rgb(14 165 233)",
        hoverOffset: 20,
        borderDash: [2, 2],
      },
    ],
  };

  const options = {
    cutout: "50%", // Adjust the cutout percentage for a solid doughnut
    plugins: {
      legend: {
        display: false,
        position: "bottom",
      },
      tooltip: {
        enabled: false, // Disable tooltips on hover
      },
    },
    layout: {
      padding: {
        top: 10, // Adjust as needed
        right: 10,
        bottom: 10,
        left: 10,
      },
    },
  };

  useEffect(() => {
    // Fetch audio files and set up real-time listener
    const audioFilesCollectionRef = collection(db, "audio files");
    const audioFilesQuery = query(
      audioFilesCollectionRef,
      where("user", "==", uid),
      orderBy("date", "desc"), // Order the files by date in descending order
      limit(4) // Limit the query to 4 documents
    );
    const unsubscribe = onSnapshot(audioFilesQuery, (querySnapshot) => {
      const updatedAudioFiles = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        voice: doc.data().voice,
        date: doc.data().date.toDate().toLocaleString(), // Convert timestamp to readable format
        text: doc.data().text,
        fileURL: doc.data().fileURL,
      }));

      setAudioFiles(updatedAudioFiles);
      setLoading(false);
    });

    // Clean up the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  async function duplicateDocument() {
    // Example usage:
    const sourcePath = "projects/sZN5qfvG5dFMIrqhcbN2";
    const destinationPath = "projects/sampleProject";
    try {
      // Get the source document
      const sourceDocRef = doc(db, sourcePath);
      const sourceDocSnapshot = await getDoc(sourceDocRef);

      if (sourceDocSnapshot.exists()) {
        // Extract data from the source document
        const sourceData = sourceDocSnapshot.data();

        // Set the data to the destination document
        const destinationDocRef = doc(db, destinationPath);
        await setDoc(destinationDocRef, sourceData);

        console.log("Document duplicated successfully.");
      } else {
        console.log("Source document does not exist.");
      }
    } catch (error) {
      console.error("Error duplicating document:", error);
    }
  }

  return (
    <AppShell>
      <div className="w-full px-4 sm:px-10">
        <div className="flex flex-col items-center pb-24 pt-10 text-foreground max-w-7xl mx-auto">
          <div className="flex w-full gap-4">
            <div className="w-2/3 space-y-2">
              <h1 className="text-2xl mb-4">Recent Projects</h1>
              {projects?.slice(0, 2).map((project, index) => (
                <Card
                  key={project.id}
                  className="p-4 w-full flex flex-row items-center justify-start hover:bg-default-200"
                  isPressable
                  onPress={() => router.push(`/app/projects/${project.id}`)}
                >
                  <Image
                    src={project.thumbnailURL || "/drakedont.png"}
                    alt="thumbnail"
                    width={1000}
                    height={1000}
                    className="w-auto h-10 mr-3 rounded-lg"
                  />
                  <div className="flex flex-col">
                    <p className="text-foreground font-medium text-start">
                      {project.projectName}
                    </p>
                    <p className="text-default-500 text-xs overflow-hidden whitespace-nowrap overflow-ellipsis max-w-xs">
                      {project.fileName}
                    </p>
                  </div>
                  <div className="flex flex-row items-center justify-end ml-auto">
                    <FaCircleInfo
                      className="text-foreground-700 ml-2"
                      size={12}
                    />
                  </div>
                </Card>
              ))}
            </div>
            <div className="w-1/3">
              <h1 className="text-2xl mb-[18px]">New Features</h1>
              <Button
                onPress={() => router.push("/app/makespeech")}
                className="bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 w-full h-unit-18 mb-3 text-lg text-white"
              >
                <IoSparkles />
                AI Text To Speech
              </Button>
              <Button
                onPress={duplicateDocument}
                className="bg-gradient-to-r from-blue-400 to-emerald-400 w-full h-unit-18 mb-2 text-lg text-white"
              >
                <IoSparkles />
                Test Button
              </Button>
            </div>
          </div>
          <div className="flex flex-col mt-4 w-full">
            <h1 className="text-2xl mb-4">Recent Samples</h1>
            <Table aria-label="Example static collection table">
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
          </div>
          <div className="flex flex-col mt-8 w-full">
            <div className="flex gap-4">
              <Card className="p-4 w-full flex items-center">
                <p className="text-2xl mb-6 mt-2">Usage Statistics</p>
                <div className="flex flex-row mb-3 gap-4">
                  <div className="w-52 h-52">
                    <Doughnut data={data} options={options} />
                  </div>
                  <div className="flex flex-col justify-center gap-8">
                    <div className="flex flex-col items-center justify-center text-sm">
                      <div className="bg-sky-300 w-6 h-3 mb-1"></div>
                      <p>Used Credits:</p>
                      <p className="font-bold text-base text-warning">
                        {userData.usedCredits}
                      </p>
                    </div>
                    <div className="flex flex-col items-center justify-center text-sm">
                      <div className="bg-sky-500 w-6 h-3 mb-1"></div>
                      <p>Remaining Credits:</p>
                      <p className="font-bold text-base text-success">
                        {userData.remainingCredits}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
              <Card className="p-4 w-full flex items-center justify-around">
                <p className="">Current Plan:</p>
                <p className="text-2xl font-bold">Standard Plan</p>
                <p className="text-xl font-semibold">$10 / month</p>
                <Button color="danger" size="lg">
                  Upgrade
                </Button>
                <p>Next Billing Cycle:</p>
                <p className="font-semibold">December 28</p>
              </Card>
              <Card className="p-4 w-full flex items-center">
                <p className="text-2xl mb-6 mt-2">Billing Cycle</p>
                <div className="w-44 h-44">
                  <Doughnut data={data} options={options} />
                </div>
              </Card>
            </div>
          </div>
          <div className="flex w-full mt-8 gap-4">
            <div className="w-[25%]">
              <Card className="p-4 w-full h-full">
                <h1 className="text-2xl mb-4">User Profile</h1>
                <div className="flex items-center">
                  <Avatar size="lg" />
                  <p className="text-lg ml-3">{userData.email}</p>
                </div>
              </Card>
            </div>
            <div className="w-[12.5%]">
              <Button
                className="h-full w-full px-0 rounded-2xl"
                onPress={() => router.push("/app/settings")}
              >
                <Card className="p-4 w-full flex items-center justify-center">
                  <h1 className="text-xl mb-3">Settings</h1>
                  <IoMdSettings className="w-16 h-16 mb-3" />
                </Card>
              </Button>
            </div>
            <div className="w-[62.5%]">
              <div className="w-full h-full space-y-2 flex flex-col justify-around">
                <Card className="px-4 py-2 rounded-lg text-center">
                  <p className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-rose-400 to-lime-400 text-lg font-medium">
                    Enhance Videos with AI Captions
                  </p>
                </Card>
                <Card className="px-4 py-2 rounded-lg text-center">
                  <p className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-600 text-lg font-medium">
                    Multilingual Voice Overs in Seconds
                  </p>
                </Card>
                <Card className="px-4 py-2 rounded-lg text-center">
                  <p className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-400 text-lg font-medium">
                    Streamline Dubbing Across Languages
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default withAuth(Dashboard);
