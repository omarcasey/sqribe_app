import AppShell from "@/components/AppShell";
import withAuth from "@/components/withAuth";
import {
    Button,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/react";
import {
    collection,
    addDoc,
    Timestamp,
    getDocs,
    onSnapshot,
} from "firebase/firestore";
import { db } from "@/firebase";
import { useState, useEffect, useRef } from "react";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { FaCircleInfo, FaCirclePlay } from "react-icons/fa6";
import { MdDownloadForOffline } from "react-icons/md";

const History = () => {
    const [audioFiles, setAudioFiles] = useState([]);

    useEffect(() => {
        // Fetch audio files and set up real-time listener
        const audioFilesCollectionRef = collection(db, "audio files");
        const unsubscribe = onSnapshot(audioFilesCollectionRef, (querySnapshot) => {
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
        });

        // Clean up the listener when the component unmounts
        return () => {
            unsubscribe();
        };
    }, []);

    const audioRefs = useRef([]);

    const handlePlay = (index) => {
        const audio = audioRefs.current[index];
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    };

    const handleDownload = (fileURL) => {
        const link = document.createElement("a");
        link.href = fileURL;
        link.download = fileURL.split("/").pop();
        link.click();
    };

    return (
        <AppShell>
            <div className="w-full px-4 sm:px-10">
                <main className="flex min-h-screen flex-col items-center py-24 mx-auto max-w-7xl text-foreground">
                    <h1 className="w-full font-bold text-3xl mb-2">History</h1>
                    <p className="w-full text-foreground-500 font-medium mb-10">
                        Full list of all your generated samples, ready for download.
                    </p>
                    <div className="flex w-full mb-3 gap-4">
                        <Button
                            color="primary"
                            variant="solid"
                            className=" font-semibold text-sm"
                        >
                            Download Selected
                        </Button>
                        <Button
                            color="danger"
                            variant="flat"
                            className=" font-semibold text-sm"
                        >
                            Delete Selected
                        </Button>
                    </div>
                    <Table
                        aria-label="Example static collection table"
                        selectionMode="multiple"
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
                                                onClick={() => handlePlay(index)}
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
                                        <audio
                                            ref={(ref) => (audioRefs.current[index] = ref)}
                                            src={audioFile.fileURL}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </main>
            </div>
        </AppShell>
    );
};

export default withAuth(History);
