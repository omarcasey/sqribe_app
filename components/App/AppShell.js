// components/AppShell.js
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoMenu } from "react-icons/io5";
import {
  Button,
  Spinner,
  Switch,
  Slider,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Listbox,
  ListboxItem,
  cn,
  ListboxSection,
  Kbd,
  Progress,
  Tooltip,
} from "@nextui-org/react";
import Image from "next/image";
import { RiLayoutMasonryFill } from "react-icons/ri";
import { SiAudiomack } from "react-icons/si";
import { FaFolder } from "react-icons/fa";
import DropdownMenuIdk from "./DropdownMenuIdk";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { db } from "@/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { FaHistory } from "react-icons/fa";
import { IoPlayCircleSharp, IoPauseCircleSharp } from "react-icons/io5";
import { TbRewindBackward10, TbRewindForward10 } from "react-icons/tb";
import { GoThumbsup, GoThumbsdown } from "react-icons/go";
import { BsDownload, BsChevronDown } from "react-icons/bs";
import { useState } from "react";
import {
  setAudioPlayerVisible,
  setAutoPlay,
  setDarkMode,
  setOpenCommandCenter,
} from "@/reducers/userSlice";
import SearchBox from "./SearchBox";
import Sidebar from "./Sidebar";
import { SearchIcon } from "../Icons/SearchIcon";
import ProjectSearch from "./ProjectSearch";
import ThemeSearch from "./ThemeSearch";

const AppShell = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.user.darkMode);
  const userData = useSelector((state) => state.user.data);
  const subscription = userData?.subscription;
  const uid = useSelector((state) => state.user.auth.uid);
  const audioPlayerVisible = useSelector(
    (state) => state.user.audio.audioPlayerVisible
  );
  const audioFile = useSelector((state) => state.user.audio.audioFile);
  const autoPlay = useSelector((state) => state.user.audio.autoPlay);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioElement = document.getElementById("audio-element");

  useEffect(() => {
    if (audioElement) {
      audioElement.addEventListener("ended", handleAudioEnded);
      audioElement.addEventListener("play", handleAudioPlay);
      audioElement.addEventListener("pause", handleAudioPause);
      return () => {
        audioElement.removeEventListener("ended", handleAudioEnded);
        audioElement.removeEventListener("play", handleAudioPlay);
        audioElement.removeEventListener("pause", handleAudioPause);
      };
    }
  }, [audioElement]);

  const handleAudioPause = () => {
    setIsPlaying(false);
    dispatch(setAutoPlay(false));
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    dispatch(setAutoPlay(false));
  };

  const handleAudioPlay = () => {
    setIsPlaying(true);
    dispatch(setAutoPlay(false));
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      // Pause the audio
      setIsPlaying(false);
      audioElement.pause();
    } else {
      // Play the audio
      setIsPlaying(true);
      audioElement.play();
    }
    dispatch(setAutoPlay(false));
  };

  const handleTimeUpdate = (e) => {
    setCurrentTime(e.target.currentTime);
  };

  const handleLoadedMetadata = (e) => {
    setDuration(e.target.duration);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className={`flex flex-row h-screen ${isDarkMode ? "dark" : "light"} bg-default-100`}>
      <Sidebar />
      <div className="flex flex-col flex-1">
        {/* Enhanced Navigation Bar */}
        <nav className="dark:bg-neutral-900/90 bg-white/90 backdrop-blur-md px-6 py-3 border-b border-default-200 sticky top-0 z-40">
          <div className="flex justify-between items-center max-w-[1920px] mx-auto">
            <div className="flex items-center gap-4">
              <Button
                className="flex lg:hidden min-w-0 px-2"
                variant="light"
                isIconOnly
              >
                <IoMenu size={24} />
              </Button>
              <Tooltip content="Press ⌘K to open command center" delay={500}>
                <Button
                  startContent={<SearchIcon />}
                  endContent={
                    <div className="ml-2 border border-default-300 bg-default-100 dark:bg-default-50 text-xs flex items-center justify-center px-1.5 rounded-md py-px">
                      <span className="text-[10px]">⌘</span>K
                    </div>
                  }
                  className="text-default-700 bg-default-100 dark:bg-default-50 hidden lg:flex hover:bg-default-200 dark:hover:bg-default-100"
                  variant="flat"
                  size="md"
                  onPress={() => dispatch(setOpenCommandCenter(true))}
                >
                  Search anything...
                </Button>
              </Tooltip>
            </div>

            <div className="flex items-center gap-4">
              {/* Usage Progress */}
              <div className="w-40 bg-default-50 dark:bg-default-100 rounded-lg px-3 py-2">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-tiny text-default-600">Usage</p>
                  <p className="text-tiny text-default-600">
                    {(subscription?.usage.usedSeconds / 60).toFixed(
                      subscription?.usage.usedSeconds % 60 === 0 ? 0 : 1
                    )}/{(subscription?.usage.totalSeconds / 60).toFixed(0)} mins
                  </p>
                </div>
                <Progress
                  size="sm"
                  radius="full"
                  classNames={{
                    base: "max-w-full",
                    track: "drop-shadow-md border border-default-200",
                    indicator: "bg-gradient-to-r from-pink-500 to-violet-500",
                  }}
                  value={(subscription?.usage.usedSeconds / subscription?.usage.totalSeconds) * 100}
                />
              </div>

              <DropdownMenuIdk router={router} />
              
              <Tooltip content="Get help" delay={500}>
                <Button
                  isIconOnly
                  className="hidden lg:flex"
                  variant="flat"
                  startContent={<IoIosHelpCircleOutline size={22} />}
                />
              </Tooltip>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex flex-1 bg-default-50 dark:bg-default-100 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Enhanced Audio Player */}
      {audioFile && (
        <>
          {/* Minimized Player Button */}
          <div
            className={`fixed bottom-0 right-0 z-50 mr-6 mb-4 ${
              audioPlayerVisible ? "hidden" : "visible"
            }`}
          >
            <Button
              isIconOnly
              className="w-12 h-12 bg-foreground text-background rounded-full shadow-lg hover:scale-105 transition-transform"
              onClick={() => dispatch(setAudioPlayerVisible(true))}
            >
              <BsChevronDown className="rotate-180" size={20} />
            </Button>
          </div>

          {/* Full Audio Player */}
          <div
            className={`fixed bottom-0 left-0 z-50 w-full backdrop-blur-md ${
              isDarkMode ? "bg-background/80" : "bg-background/80"
            } ${audioPlayerVisible ? "visible" : "hidden"} transition-all duration-300 border-t border-default-200 shadow-lg`}
          >
            <div className="max-w-[1920px] mx-auto px-6 py-4">
              <div className="flex items-center gap-6">
                {/* Play/Pause Button */}
                <Button
                  isIconOnly
                  className="w-14 h-14 bg-primary text-white rounded-full shadow-lg hover:scale-105 transition-transform"
                  onClick={handlePlayPause}
                >
                  {isPlaying ? (
                    <IoPauseCircleSharp size={40} />
                  ) : (
                    <IoPlayCircleSharp size={40} />
                  )}
                </Button>

                <div className="flex-1 space-y-2">
                  {/* Audio Info */}
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">
                      {audioFile.voice}, {audioFile.date.toDate().toLocaleString()}
                    </p>
                    <div className="flex items-center gap-4">
                      <p className="text-sm text-default-600">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </p>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center gap-4">
                    <Button
                      isIconOnly
                      variant="light"
                      className="text-default-600 hover:text-primary"
                      onClick={() => {
                        const newTime = audioElement.currentTime - 10;
                        audioElement.currentTime = Math.max(0, newTime);
                        setCurrentTime(Math.max(0, newTime));
                      }}
                    >
                      <TbRewindBackward10 size={22} />
                    </Button>

                    <Button
                      isIconOnly
                      variant="light"
                      className="text-default-600 hover:text-primary"
                      onClick={() => {
                        const newTime = audioElement.currentTime + 10;
                        audioElement.currentTime = Math.min(duration, newTime);
                        setCurrentTime(Math.min(duration, newTime));
                      }}
                    >
                      <TbRewindForward10 size={22} />
                    </Button>

                    <Slider
                      size="sm"
                      color="primary"
                      step={0.001}
                      maxValue={1}
                      minValue={0}
                      value={currentTime / duration}
                      onChange={(value) => {
                        setCurrentTime(value * duration);
                        audioElement.currentTime = value * duration;
                      }}
                      classNames={{
                        base: "flex-1",
                        track: "bg-default-300",
                        filledTrack: "bg-primary",
                        thumb: "bg-primary shadow-lg",
                      }}
                    />

                    <div className="flex items-center gap-2">
                      <Button
                        isIconOnly
                        variant="light"
                        className="text-default-600 hover:text-success"
                      >
                        <GoThumbsup size={18} />
                      </Button>
                      <Button
                        isIconOnly
                        variant="light"
                        className="text-default-600 hover:text-danger"
                      >
                        <GoThumbsdown size={18} className="scale-x-[-1]" />
                      </Button>
                      <Button
                        isIconOnly
                        variant="light"
                        className="text-default-600 hover:text-primary"
                      >
                        <BsDownload size={18} />
                      </Button>
                      <Button
                        isIconOnly
                        variant="light"
                        className="text-default-600 hover:text-primary"
                        onClick={() => {
                          dispatch(setAudioPlayerVisible(false));
                          dispatch(setAutoPlay(false));
                        }}
                      >
                        <BsChevronDown size={18} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hidden Audio Element */}
            <audio
              id="audio-element"
              src={audioFile.fileURL}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              autoPlay={autoPlay}
            />
          </div>
        </>
      )}

      {/* Search Components */}
      <SearchBox />
      <ProjectSearch />
      <ThemeSearch />
    </div>
  );
};

export default AppShell;
