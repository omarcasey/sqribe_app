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
import {
  Input,
  Button,
  Card,
  CardBody,
  Divider,
  Spinner,
  Dropdown,
  Select,
  SelectItem,
} from "@nextui-org/react";
import Link from "next/link";
import withAuth from "@/components/withAuth";
import AppShell from "@/components/AppShell";
import { FaCheckCircle } from "react-icons/fa";
import { getVoices } from "@/helpers/voices";

const MakeSpeech = () => {
  const [inputText, setInputText] = useState(""); // State to store the input text
  const [selectedTask, setSelectedTask] = useState("textToSpeech"); // State to store the selected card
  const [isLoading, setIsLoading] = useState(false); // State to store the loading state
  const [voiceList, setVoiceList] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null); // State to store the selected voice ID

  useEffect(() => {
    const fetchVoices = async () => {
      const voices = await getVoices();
      setVoiceList(voices);
    };

    fetchVoices();
  }, []);

  // Function to handle the text input change
  const handleTextInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSelectVoice = (e) => {
    setSelectedVoice(e.target.value);
  };

  // Function to handle text-to-speech generation
  const handleGenerateSpeech = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/text-to-speech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: inputText,
          voiceId: selectedVoice,
        }),
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
          voice: selectedVoice,
          date: Timestamp.fromDate(new Date()),
          fileURL: result.audioUrl,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      setInputText("");
      setIsLoading(false);
    } catch (error) {
      console.error("Error converting text to speech:", error);
    }
  };

  const handleTaskSelect = (task) => {
    setSelectedTask(task);
  };


  return (
    <AppShell>
      <div className="w-full px-4 sm:px-10">
        <main className="flex flex-col items-center py-24 mx-auto max-w-7xl text-foreground">
          <h1 className="w-full font-bold text-3xl mb-2">Speech Synthesis</h1>
          <p className="w-full text-foreground-500 font-medium mb-10">
            Unleash the power of our cutting-edge technology to generate
            realistic, captivating speech in a wide range of languages.
          </p>
          <div className="border border-foreground-400 rounded-lg w-full">
            <div>
              <div className="flex flex-row py-4 px-8 gap-3">
                <div className="w-40 flex font-medium">Task</div>
                <div
                  className={`border ${
                    selectedTask === "textToSpeech"
                      ? "border-2 border-foreground"
                      : "border-foreground-400"
                  } px-4 py-3 rounded-lg hover:cursor-pointer hover:border-foreground hover:shadow w-80`}
                  onClick={() => handleTaskSelect("textToSpeech")}
                >
                  <div className="flex flex-row justify-between items-center mb-2">
                    <p className="text-sm text-foreground font-medium" onClick={() => (console.log(selectedVoice))}>
                      Text to Speech
                    </p>
                    {selectedTask === "textToSpeech" && (
                      <FaCheckCircle size={15} />
                    )}
                  </div>
                  <p className="text-tiny text-foreground-500 w-60">
                    Convert text into lifelike speech using a voice of your
                    choice.
                  </p>
                </div>
                <div
                  className={`border ${
                    selectedTask === "speechToSpeech"
                      ? "border-2 border-foreground"
                      : "border-foreground-400"
                  } px-4 py-3 rounded-lg hover:cursor-pointer hover:border-foreground hover:shadow w-80`}
                  onClick={() => handleTaskSelect("speechToSpeech")}
                >
                  <div className="flex flex-row justify-between items-center mb-2">
                    <p className="text-sm text-foreground font-medium">
                      Speech to Speech
                    </p>
                    {selectedTask === "speechToSpeech" && (
                      <FaCheckCircle size={15} />
                    )}
                  </div>
                  <p className="text-tiny text-foreground-500 w-60">
                    Create speech by combining the style and content of an audio
                    file you upload with a voice of your choice.
                  </p>
                </div>
              </div>
              <Divider />
              <div className="flex flex-row py-4 px-8 gap-3">
                <div className="w-40 flex font-medium">Settings</div>
                <div className="flex flex-col flex-1">
                  {voiceList && (
                    <Select
                      label="Select a voice"
                      placeholder="Select a voice"
                      labelPlacement="outside"
                      className="flex-1 text-black mb-4"
                      disallowEmptySelection
                      selectionMode="single"
                      variant="bordered"
                      selectedKeys={[selectedVoice]}
                      onChange={handleSelectVoice}
                    >
                      {voiceList.map((voice) => (
                        <SelectItem
                          key={voice.voice_id}
                          textValue={voice.name}
                          className="text-black"
                          value={voice.voice_id}
                        >
                          {voice.name}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                  <Select
                    label="Voice Settings"
                    labelPlacement="outside"
                    selectedKeys={["elevenlabs"]}
                    className="text-black mb-4"
                    variant="bordered"
                  >
                    <SelectItem
                      key="elevenlabs"
                      textValue="Voice Settings"
                      className="text-black"
                    >
                      Voice Settings
                    </SelectItem>
                  </Select>
                  <Select
                    label="Model"
                    labelPlacement="outside"
                    isDisabled
                    selectedKeys={["elevenlabs"]}
                    className="text-black"
                    variant="bordered"
                  >
                    <SelectItem
                      key="elevenlabs"
                      textValue="Eleven Multilingual v2"
                      className="text-black"
                    >
                      Eleven Multilingual v2
                    </SelectItem>
                  </Select>
                </div>
              </div>
              <Divider />
              <div className="flex flex-row py-4 px-8 gap-2">
                <div className="w-40 flex font-medium">Text</div>
                <div className="border border-foreground-400 p-2 rounded-lg flex-grow">
                  <textarea
                    value={inputText}
                    onChange={handleTextInputChange}
                    className="w-full h-32 resize-none bg-transparent outline-none text-foreground"
                  />
                </div>
              </div>
              <div className="flex flex-row py-4 px-8 gap-2">
                <div className="w-40"></div>
                <Button
                  onPress={handleGenerateSpeech}
                  className="bg-foreground text-foreground-50 flex-1 font-medium text-base"
                  isLoading={isLoading}
                >
                  Generate
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AppShell>
  );
};

export default withAuth(MakeSpeech);
