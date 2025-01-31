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
  Progress,
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
import { FaCircleInfo, FaCirclePlay, FaRegClock, FaChartLine } from "react-icons/fa6";
import { MdDownloadForOffline, MdWorkspaces } from "react-icons/md";
import { RiVipCrownFill } from "react-icons/ri";
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
  const name = useSelector((state) => state.user.auth.displayName);
  const [audioFiles, setAudioFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const data = {
    labels: ["Used Credits", "Remaining Credits"],
    datasets: [
      {
        data: [userData.subscription.usage.usedSeconds, userData.subscription.usage.remainingSeconds],
        backgroundColor: ["rgba(99, 102, 241, 0.8)", "rgba(129, 140, 248, 0.3)"],
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    cutout: "75%",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => {
            const value = context.raw;
            return `${value} seconds`;
          }
        }
      },
    },
    layout: {
      padding: 20,
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
      <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center pb-24 pt-6 max-w-[1400px] mx-auto">
            {/* Welcome Section */}
            <div className="w-full mb-8">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                    Welcome back, {name?.split(' ')[0]} 👋
                  </h1>
                  <p className="text-default-500">Here&apos;s what&apos;s happening with your projects today.</p>
                </div>
                <div className="flex items-center gap-4">
                  <Button
                    className="bg-gradient-to-r from-pink-500 to-violet-500 text-white font-medium"
                    size="lg"
                    startContent={<IoSparkles />}
                  >
                    New Project
                  </Button>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-8">
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-default-500">Total Projects</p>
                    <p className="text-2xl font-bold">{projects?.length || 0}</p>
                  </div>
                  <div className="p-3 bg-blue-500/10 rounded-full">
                    <MdWorkspaces className="w-6 h-6 text-blue-500" />
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-default-500">Used Credits</p>
                    <p className="text-2xl font-bold">{userData.usedCredits}</p>
                  </div>
                  <div className="p-3 bg-purple-500/10 rounded-full">
                    <FaChartLine className="w-6 h-6 text-purple-500" />
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-900/20 dark:to-rose-800/20 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-default-500">Remaining Credits</p>
                    <p className="text-2xl font-bold">{userData.remainingCredits}</p>
                  </div>
                  <div className="p-3 bg-rose-500/10 rounded-full">
                    <RiVipCrownFill className="w-6 h-6 text-rose-500" />
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-default-500">Recent Samples</p>
                    <p className="text-2xl font-bold">{audioFiles.length}</p>
                  </div>
                  <div className="p-3 bg-emerald-500/10 rounded-full">
                    <FaRegClock className="w-6 h-6 text-emerald-500" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-12 gap-6 w-full">
              {/* Recent Projects Section */}
              <div className="col-span-12 lg:col-span-8">
                <Card className="p-6">
                  <CardHeader className="flex justify-between px-0">
                    <div>
                      <h2 className="text-2xl font-bold">Recent Projects</h2>
                      <p className="text-default-500">Your latest work in progress</p>
                    </div>
                    <Button color="primary" variant="flat" size="sm">
                      View All
                    </Button>
                  </CardHeader>
                  <CardBody className="px-0 py-4">
                    <div className="space-y-4">
                      {projects?.slice(0, 3).map((project) => (
                        <Card
                          key={project.id}
                          className="w-full hover:bg-default-100 transition-colors cursor-pointer"
                          isPressable
                          onPress={() => router.push(`/app/projects/${project.id}`)}
                        >
                          <CardBody className="flex flex-row items-center p-4">
                            <Image
                              src={project.thumbnailURL || "/drakedont.png"}
                              alt="thumbnail"
                              width={80}
                              height={80}
                              className="rounded-lg object-cover"
                            />
                            <div className="ml-4 flex-grow">
                              <h3 className="font-semibold text-lg">{project.projectName}</h3>
                              <p className="text-default-500 text-sm">{project.fileName}</p>
                              <div className="flex items-center mt-2">
                                <Progress 
                                  size="sm" 
                                  value={40} 
                                  className="max-w-md"
                                  classNames={{
                                    indicator: "bg-gradient-to-r from-pink-500 to-violet-500",
                                  }}
                                />
                                <span className="ml-2 text-small text-default-500">40%</span>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </div>

              {/* Usage Stats Section */}
              <div className="col-span-12 lg:col-span-4">
                <Card className="p-6">
                  <CardHeader className="px-0">
                    <div>
                      <h2 className="text-2xl font-bold">Usage Stats</h2>
                      <p className="text-default-500">Your current billing cycle</p>
                    </div>
                  </CardHeader>
                  <CardBody className="flex flex-col items-center px-0">
                    <div className="relative w-48 h-48">
                      <Doughnut data={data} options={options} />
                      <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-3xl font-bold">{Math.round((userData.subscription.usage.usedSeconds / (userData.subscription.usage.usedSeconds + userData.subscription.usage.remainingSeconds)) * 100)}%</span>
                        <span className="text-default-500 text-sm">Used</span>
                      </div>
                    </div>
                    <div className="w-full mt-6 space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></div>
                          <span className="text-sm">Used Credits</span>
                        </div>
                        <span className="font-semibold">{userData.usedCredits}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-indigo-200 mr-2"></div>
                          <span className="text-sm">Remaining</span>
                        </div>
                        <span className="font-semibold">{userData.remainingCredits}</span>
                      </div>
                    </div>
                  </CardBody>
                </Card>

                {/* Quick Actions */}
                <Card className="p-6 mt-6">
                  <CardHeader className="px-0">
                    <h2 className="text-2xl font-bold">Quick Actions</h2>
                  </CardHeader>
                  <CardBody className="px-0 space-y-4">
                    <Button
                      onPress={() => router.push("/app/makespeech")}
                      className="w-full bg-gradient-to-r from-pink-500 to-violet-500 text-white"
                      size="lg"
                      startContent={<IoSparkles />}
                    >
                      New AI Speech
                    </Button>
                    <Button
                      className="w-full"
                      color="primary"
                      variant="bordered"
                      size="lg"
                      startContent={<IoMdSettings />}
                      onPress={() => router.push("/app/settings")}
                    >
                      Settings
                    </Button>
                  </CardBody>
                </Card>
              </div>

              {/* Recent Samples Table */}
              <Card className="col-span-12 p-6">
                <CardHeader className="px-0">
                  <div>
                    <h2 className="text-2xl font-bold">Recent Samples</h2>
                    <p className="text-default-500">Your latest generated audio files</p>
                  </div>
                </CardHeader>
                <CardBody className="px-0">
                  <Table aria-label="Recent audio samples">
                    <TableHeader>
                      <TableColumn className="text-md">Voice</TableColumn>
                      <TableColumn className="text-md">Date</TableColumn>
                      <TableColumn className="text-md">Status</TableColumn>
                      <TableColumn className="text-md">Text</TableColumn>
                      <TableColumn className="text-md text-center">Actions</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {audioFiles.map((audioFile) => (
                        <TableRow key={audioFile.id} className="hover:bg-default-100">
                          <TableCell>
                            <div className="flex items-center">
                              <span className="font-medium">{audioFile.voice}</span>
                              <FaCircleInfo className="text-default-400 ml-2" size={12} />
                            </div>
                          </TableCell>
                          <TableCell>{audioFile.date}</TableCell>
                          <TableCell>
                            <Chip
                              className="bg-success/10 text-success border-success/30"
                              size="sm"
                              variant="bordered"
                            >
                              Generated
                            </Chip>
                          </TableCell>
                          <TableCell>
                            <p className="truncate max-w-xs">{audioFile.text}</p>
                          </TableCell>
                          <TableCell>
                            <div className="flex justify-center gap-2">
                              <Button
                                isIconOnly
                                className="text-primary"
                                variant="light"
                                onClick={async () => {
                                  await dispatch(setAutoPlay(true));
                                  dispatch(fetchAudioFile(audioFile.id));
                                  dispatch(setAudioPlayerVisible(true));
                                }}
                              >
                                <FaCirclePlay size={24} />
                              </Button>
                              <Button
                                isIconOnly
                                className="text-primary"
                                variant="light"
                                onClick={() => handleDownload(audioFile.fileURL)}
                              >
                                <MdDownloadForOffline size={24} />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default withAuth(Dashboard);
