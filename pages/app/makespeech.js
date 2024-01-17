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
  Chip,
  SelectSection,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Accordion,
  AccordionItem,
  Slider,
  Checkbox,
  Tooltip,
} from "@nextui-org/react";
import Link from "next/link";
import withAuth from "@/components/App/withAuth";
import AppShell from "@/components/App/AppShell";
import { FaCheckCircle, FaPlay } from "react-icons/fa";
import { getVoices } from "@/helpers/voices";
import { PiFlaskFill } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { FaCircleInfo, FaCirclePlay } from "react-icons/fa6";
import { setAudioFile, setAudioPlayerVisible, setAutoPlay } from "@/reducers/userSlice";

const MakeSpeech = () => {
  const uid = useSelector((state) => state.user.auth.uid);
  const isDarkMode = useSelector((state) => state.user.data.darkMode);
  const [inputText, setInputText] = useState(""); // State to store the input text
  const [selectedTask, setSelectedTask] = useState("textToSpeech"); // State to store the selected card
  const [isLoading, setIsLoading] = useState(false); // State to store the loading state
  const [voiceList, setVoiceList] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState("pNInz6obpgDQGcFmaJgB"); // State to store the selected voice ID
  const [stabilityValue, setStabilityValue] = useState(0.5);
  const [styleValue, setStyleValue] = useState(0);
  const [similarityValue, setSimilarityValue] = useState(0.75);
  const [speakerBoost, setSpeakerBoost] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchVoices = async () => {
      const voices = await getVoices();
      setVoiceList(voices);
    };

    fetchVoices();
  }, []);

  // Function to reset stability, style, enhancement, and speakerboost to their defaults
  const resetToDefault = () => {
    setStabilityValue(0.5);
    setStyleValue(0);
    setSimilarityValue(0.75);
    setSpeakerBoost(true);
  };

  // Function to handle the text input change
  const handleTextInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSelectVoice = (e) => {
    setSelectedVoice(e.target.value);
  };

  // Function to play the audio
  const playAudio = (audioUrl) => {
    const audio = new Audio(audioUrl);
    audio.play();
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
          stabilityValue: stabilityValue,
          similarityValue: similarityValue,
          styleValue: styleValue,
          speakerBoostValue: speakerBoost,
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
        const selectedVoiceObject = voiceList.find(
          (voice) => voice.voice_id === selectedVoice
        );
        const voiceName = selectedVoiceObject ? selectedVoiceObject.name : "";

        const docRef = await addDoc(collection(db, "audio files"), {
          text: inputText,
          voice: voiceName,
          date: Timestamp.fromDate(new Date()),
          fileURL: result.audioUrl,
          user: uid,
        });
        console.log("Document written with ID: ", docRef.id);
        await dispatch(setAutoPlay(true)),
        dispatch(
          setAudioFile({
            text: inputText,
            voice: voiceName,
            date: Timestamp.fromDate(new Date()),
            fileURL: result.audioUrl,
            user: uid,
          })
        );
        dispatch(setAudioPlayerVisible(true))
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
        <main className="flex flex-col items-center pb-24 pt-10 mx-auto max-w-7xl text-foreground">
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
                    <p
                      className="text-sm text-foreground font-medium"
                      onClick={() => console.log(voiceList)}
                    >
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
                      items={voiceList}
                      label="Select a voice"
                      placeholder="Select a voice"
                      labelPlacement="outside"
                      className="flex-1 mb-4 text-foreground-400"
                      disallowEmptySelection
                      selectionMode="single"
                      variant="bordered"
                      selectedKeys={[selectedVoice]}
                      onChange={handleSelectVoice}
                    >
                      <SelectSection
                        title="Featured"
                        classNames={{
                          heading:
                            "bg-neutral-200 flex w-full uppercase px-2 py-1 rounded-lg pl-4 tracking-wide",
                        }}
                      >
                        {voiceList
                          .filter((voice) => voice.sharing !== null)
                          .map((voice) => (
                            <SelectItem
                              key={voice.voice_id}
                              className="text-black"
                              value={voice.voice_id}
                              textValue={voice.name}
                            >
                              <div className="flex flex-row items-center justify-start gap-1 ml-2">
                                <button
                                  className="mr-3"
                                  onClick={() => playAudio(voice.preview_url)}
                                >
                                  <FaPlay size={12} />
                                </button>
                                <p className="tracking-wide">{voice.name}</p>
                                <PiFlaskFill
                                  className="text-gray-600 mr-2"
                                  size={16}
                                />
                                {voice.labels.age && (
                                  <div className="bg-pink-200 text-tiny text-foreground-500 px-3 py-1 pt-0 rounded-full">
                                    {voice.labels.age} {voice.labels.gender}
                                  </div>
                                )}
                                {voice.labels.accent && (
                                  <div className="bg-purple-100 text-tiny text-foreground-500 px-3 py-1 pt-0 rounded-full">
                                    {voice.labels.accent}
                                  </div>
                                )}
                                {voice.labels.descriptive && (
                                  <div className="bg-yellow-100 text-tiny text-foreground-500 px-3 py-1 pt-0 rounded-full">
                                    {voice.labels.descriptive}
                                  </div>
                                )}
                                {voice.labels.description && (
                                  <div className="bg-blue-100 text-tiny text-foreground-500 px-3 py-1 pt-0 rounded-full">
                                    {voice.labels.description}
                                  </div>
                                )}
                                {voice.labels.use_case && (
                                  <div className="bg-gray-200 text-tiny text-foreground-500 px-3 py-1 pt-0 rounded-full">
                                    {voice.labels.use_case}
                                  </div>
                                )}
                                {voice.labels["use case"] && (
                                  <div className="bg-red-100 text-tiny text-foreground-500 px-3 py-1 pt-0 rounded-full">
                                    {voice.labels["use case"]}
                                  </div>
                                )}
                              </div>
                            </SelectItem>
                          ))}
                      </SelectSection>
                      <SelectSection
                        title="Premade"
                        classNames={{
                          heading:
                            "bg-neutral-200 flex w-full uppercase px-2 py-1 rounded-lg pl-4 tracking-wide",
                        }}
                      >
                        {voiceList
                          .filter((voice) => voice.sharing === null)
                          .map((voice) => (
                            <SelectItem
                              key={voice.voice_id}
                              textValue={voice.name}
                              className="text-black"
                              value={voice.voice_id}
                            >
                              <div className="flex flex-row items-center justify-start gap-1 ml-2">
                                <FaPlay className="mr-3" size={12} />
                                <p className="tracking-wide">{voice.name}</p>
                                <PiFlaskFill
                                  className="text-gray-600 mr-2"
                                  size={16}
                                />
                                {voice.labels.age && (
                                  <div className="bg-pink-200 text-tiny text-foreground-500 px-3 py-1 pt-0 rounded-full">
                                    {voice.labels.age} {voice.labels.gender}
                                  </div>
                                )}
                                {voice.labels.accent && (
                                  <div className="bg-purple-100 text-tiny text-foreground-500 px-3 py-1 pt-0 rounded-full">
                                    {voice.labels.accent}
                                  </div>
                                )}
                                {voice.labels.descriptive && (
                                  <div className="bg-yellow-100 text-tiny text-foreground-500 px-3 py-1 pt-0 rounded-full">
                                    {voice.labels.descriptive}
                                  </div>
                                )}
                                {voice.labels.description && (
                                  <div className="bg-blue-100 text-tiny text-foreground-500 px-3 py-1 pt-0 rounded-full">
                                    {voice.labels.description}
                                  </div>
                                )}
                                {voice.labels.use_case && (
                                  <div className="bg-gray-200 text-tiny text-foreground-500 px-3 py-1 pt-0 rounded-full">
                                    {voice.labels.use_case}
                                  </div>
                                )}
                                {voice.labels["use case"] && (
                                  <div className="bg-red-100 text-tiny text-foreground-500 px-3 py-1 pt-0 rounded-full">
                                    {voice.labels["use case"]}
                                  </div>
                                )}
                              </div>
                            </SelectItem>
                          ))}
                      </SelectSection>
                    </Select>
                  )}

                  <Accordion variant="bordered" isCompact>
                    <AccordionItem
                      key="1"
                      aria-label="Accordion 1"
                      title={
                        <p className="text-sm text-foreground-500">
                          Voice Settings
                        </p>
                      }
                    >
                      <Divider />
                      <Slider
                        size="sm"
                        label="Stability"
                        color="foreground"
                        showTooltip={true}
                        step={0.01}
                        maxValue={1}
                        minValue={0}
                        formatOptions={{ style: "percent" }}
                        aria-label="Stability"
                        value={stabilityValue}
                        onChange={setStabilityValue}
                        className="w-full px-3 mt-4"
                        tooltipProps={{
                          color: stabilityValue < 0.3 ? "danger" : "foreground",
                          content: (
                            <p>
                              {(stabilityValue * 100).toFixed(0)}%{" "}
                              {stabilityValue < 0.3 ? "Unstable" : ""}
                            </p>
                          ),
                        }}
                        renderThumb={(props) => (
                          <div
                            {...props}
                            className="group p-1 top-1/2 bg-background border-small border-default-200 dark:border-default-400/50 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
                          >
                            <span className="transition-transform dark:bg-white bg-black rounded-full w-1 h-3 block group-data-[dragging=true]:scale-80" />
                          </div>
                        )}
                      />
                      <div className="flex flex-row justify-between mt-1 px-3 mb-6">
                        <div className="flex flex-row items-center justify-center">
                          <p className="text-tiny text-foreground-500 mr-2">
                            More variable
                          </p>
                          <Tooltip
                            className={`${
                              isDarkMode ? "light" : "dark"
                            } max-w-[16rem]`}
                            content={
                              <p className="text-foreground">
                                Increasing variability can make speech more
                                expressive with output varying between
                                re-generations. It can also lead to
                                instabilities.
                              </p>
                            }
                          >
                            <div>
                              <FaCircleInfo size={12} />
                            </div>
                          </Tooltip>
                        </div>
                        <div className="flex flex-row items-center justify-center">
                          <p className="text-tiny text-foreground-500 mr-2">
                            More Stable
                          </p>
                          <Tooltip
                            className={`${
                              isDarkMode ? "light" : "dark"
                            } max-w-[16rem]`}
                            content={
                              <p className="text-foreground">
                                Increasing stability will make the voice more
                                consistent between re-generations, but it can
                                also make it sounds a bit monotone. On longer
                                text fragments we recommend lowering this value.
                              </p>
                            }
                          >
                            <div>
                              <FaCircleInfo size={12} />
                            </div>
                          </Tooltip>
                        </div>
                      </div>

                      <Slider
                        size="sm"
                        label="Clarity + Similarity Enhancement"
                        color="foreground"
                        showTooltip={true}
                        step={0.01}
                        maxValue={1}
                        minValue={0}
                        formatOptions={{ style: "percent" }}
                        aria-label="Clarity + Similarity Enhancement"
                        value={similarityValue}
                        onChange={setSimilarityValue}
                        className="w-full px-3"
                        renderThumb={(props) => (
                          <div
                            {...props}
                            className="group p-1 top-1/2 bg-background border-small border-default-200 dark:border-default-400/50 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
                          >
                            <span className="transition-transform dark:bg-white bg-black rounded-full w-1 h-3 block group-data-[dragging=true]:scale-80" />
                          </div>
                        )}
                      />
                      <div className="flex flex-row justify-between mt-1 px-3 mb-6">
                        <div className="flex flex-row items-center justify-center">
                          <p className="text-tiny text-foreground-500 mr-2">
                            Low
                          </p>
                          <Tooltip
                            className={`${
                              isDarkMode ? "light" : "dark"
                            } max-w-[16rem]`}
                            content={
                              <p className="text-foreground">
                                Low values are recommended if background
                                artifacts are present in generated speech.
                              </p>
                            }
                          >
                            <div>
                              <FaCircleInfo size={12} />
                            </div>
                          </Tooltip>
                        </div>
                        <div className="flex flex-row items-center justify-center">
                          <p className="text-tiny text-foreground-500 mr-2">
                            High
                          </p>
                          <Tooltip
                            className={`${
                              isDarkMode ? "light" : "dark"
                            } max-w-[16rem]`}
                            content={
                              <p className="text-foreground">
                                High enhancement boosts overall voice clarity
                                and target speaker similarity. Very high values
                                can cause artifacts, so adjusting this setting
                                to find the optimal value is encouraged.
                              </p>
                            }
                          >
                            <div>
                              <FaCircleInfo size={12} />
                            </div>
                          </Tooltip>
                        </div>
                      </div>

                      <Slider
                        size="sm"
                        label="Style Exaggeration"
                        color="foreground"
                        showTooltip={true}
                        step={0.01}
                        maxValue={1}
                        minValue={0}
                        formatOptions={{ style: "percent" }}
                        aria-label="Style Exaggeration"
                        className="w-full px-3"
                        value={styleValue}
                        onChange={setStyleValue}
                        tooltipProps={{
                          color: styleValue > 0.5 ? "danger" : "foreground",
                          content: (
                            <p>
                              {(styleValue * 100).toFixed(0)}%{" "}
                              {styleValue > 0.5 ? "Unstable" : ""}
                            </p>
                          ),
                        }}
                        renderThumb={(props) => (
                          <div
                            {...props}
                            className="group p-1 top-1/2 bg-background border-small border-default-200 dark:border-default-400/50 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
                          >
                            <span className="transition-transform dark:bg-white bg-black rounded-full w-1 h-3 block group-data-[dragging=true]:scale-80" />
                          </div>
                        )}
                      />
                      <div className="flex flex-row justify-between mt-1 px-3 mb-6">
                        <div className="flex flex-row items-center justify-center">
                          <p className="text-tiny text-foreground-500 mr-2">
                            None (Fastest)
                          </p>
                        </div>
                        <div className="flex flex-row items-center justify-center">
                          <p className="text-tiny text-foreground-500 mr-2">
                            Exaggerated
                          </p>
                          <Tooltip
                            className={`${
                              isDarkMode ? "light" : "dark"
                            } max-w-[16rem]`}
                            content={
                              <p className="text-foreground">
                                High values are recommended if the style of the
                                speech should be exaggerated compared to the
                                uploaded audio. Higher values can lead to more
                                instability in the generated speech. Setting
                                this to 0.0 will greatly increase generation
                                speed and is the default setting.
                              </p>
                            }
                          >
                            <div>
                              <FaCircleInfo size={12} />
                            </div>
                          </Tooltip>
                        </div>
                      </div>
                      <div className="flex flex-row items-center justify-start px-3 mb-6">
                        <Checkbox
                          color="default"
                          isSelected={speakerBoost}
                          onValueChange={setSpeakerBoost}
                          size="sm"
                        >
                          Speaker Boost
                        </Checkbox>
                        <Tooltip
                          className={`${
                            isDarkMode ? "light" : "dark"
                          } max-w-[16rem]`}
                          content={
                            <p className="text-foreground">
                              Boost the similarity of the synthesized speech and
                              the voice at the cost of some generation speed.
                            </p>
                          }
                        >
                          <div>
                            <FaCircleInfo size={12} className="ml-2" />
                          </div>
                        </Tooltip>
                      </div>
                      <div className="px-3 mb-6">
                        <Button size="sm" onPress={resetToDefault}>
                          Reset To Default
                        </Button>
                      </div>
                    </AccordionItem>
                  </Accordion>
                  <div className="mb-4"></div>

                  <Select
                    label="Model"
                    labelPlacement="outside"
                    // isDisabled
                    selectedKeys={["elevenlabs"]}
                    className="text-foreground-400"
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
              <div className="flex flex-row py-4 px-8">
                <div className="w-40 flex font-medium">Text</div>
                <div className="flex-grow ml-3">
                  <div className="border border-foreground-400 p-2 rounded-lg w-full">
                    <textarea
                      value={inputText}
                      onChange={handleTextInputChange}
                      className="w-full h-32 resize-none bg-transparent outline-none text-foreground text-sm"
                      placeholder="Enter text to convert to speech... (in any of our supported languages!)"
                    />
                  </div>
                  <div className="text-foreground-500 text-tiny mt-2 font-medium">
                    {inputText.length} / 2500
                  </div>
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
