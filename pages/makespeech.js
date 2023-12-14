"use client";
import {
    collection,
    addDoc,
    Timestamp,
    getDocs,
    onSnapshot,
} from "firebase/firestore";
import { db } from "@/firebase";
import { useState, useEffect } from "react";
import { Input, Button, Card, CardBody, Divider } from "@nextui-org/react";
import Link from "next/link";
import Navbar from "@/components/Navbar";


export default function MakeSpeech() {
    const [inputText, setInputText] = useState(""); // State to store the input text
    const [audioFiles, setAudioFiles] = useState([]);

    // Function to handle the text input change
    const handleTextInputChange = (e) => {
        setInputText(e.target.value);
    };

    // Function to handle text-to-speech generation
    const handleGenerateSpeech = async () => {
        try {
            const response = await fetch("/api/text-to-speech", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: inputText }),
            });

            if (!response.ok) {
                throw new Error(
                    `Failed to convert text to speech: ${response.statusText}`
                );
            }

            const result = await response.json();
            console.log("Text To Speech Converted Successfully!");

            // Add the converted text to the audio files collection
            try {
                const docRef = await addDoc(collection(db, "audio files"), {
                    text: inputText,
                    transcription: "",
                    date: Timestamp.fromDate(new Date()),
                    fileURL: result.audioUrl,
                });
                console.log("Document written with ID: ", docRef.id);
            } catch (e) {
                console.error("Error adding document: ", e);
            }
            setInputText("");
        } catch (error) {
            console.error("Error converting text to speech:", error);
        }
    };

    useEffect(() => {
        // Fetch audio files and set up real-time listener
        const audioFilesCollectionRef = collection(db, "audio files");
        const unsubscribe = onSnapshot(audioFilesCollectionRef, (querySnapshot) => {
            const updatedAudioFiles = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                text: doc.data().text,
                fileURL: doc.data().fileURL,
            }));

            setAudioFiles(updatedAudioFiles);
        });

        // Clean up the listener when the component unmounts
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <div className="bg-[#0e1015]">
            <Navbar />
            <main className="flex min-h-screen flex-col items-center pb-24 pt-10">
                <div className="mx-auto max-w-3xl py-24">
                    <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                        <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-200 ring-1 ring-gray-200/10 hover:ring-gray-200/30 transition-all">
                            Explore the power of Artifical Intelligence. &nbsp;
                        </div>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl pb-12">
                            Demo
                        </h1>
                        <div className="flex items-center justify-center w-full pb-6 gap-4">
                            <Input
                                type="text"
                                label="Text to Speech"
                                size="sm"
                                color="default"
                                className="text-black"
                                value={inputText}
                                onChange={handleTextInputChange} // Handle input text change
                            />
                            <Button
                                className="px-10 py-6 text-white"
                                color="success"
                                onClick={handleGenerateSpeech} // Handle text-to-speech generation
                            >
                                Generate
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-col items-center">
                        <h1 className="py-4 text-lg font-semibold text-green-500">
                            List of Audio Files
                        </h1>
                        <div className="flex flex-col max-w-7xl px-5 space-y-4">
                            {audioFiles.map((audioFile) => (
                                <Card key={audioFile.id} className="flex-1">
                                    <CardBody>
                                        <p className="mb-4">{audioFile.text}</p>
                                        <audio src={audioFile.fileURL} controls className="w-full"></audio>
                                    </CardBody>
                                </Card>
                            ))}
                        </div>
                        <p className="mt-20 text-lg leading-8 text-gray-200">
                            AI-Powered Multilingual Content Solutions <br />
                            <Divider className="my-4" /> Sqribe.ai streamlines your video
                            production with automated captions, voice overs, translations, and
                            dubbing in multiple languages, powered by advanced AI algorithms.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
