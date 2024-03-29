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
    <div
      className={`flex flex-row h-screen ${
        isDarkMode ? "dark" : "light"
      } bg-default-100`}
    >
      <Sidebar />
      <div className="flex flex-col flex-1">
        <nav className="dark:bg-neutral-900 bg-white px-6 py-3 border-b border-foreground-300">
          <div className="flex justify-between items-center">
            <Button
              startContent={<SearchIcon />}
              endContent={
                <div className="ml-2 border border-foreground-400 dark:border-foreground-300 bg-white dark:bg-foreground-100 text-xs flex items-center justify-center px-1 text-foreground-500 rounded-lg pt-[3px] pb-[2px]">
                  <span className="text-[10px]">⌘</span>K
                </div>
              }
              className="text-foreground-500 bg-foreground-200 dark:bg-foreground-200 hidden lg:flex"
              size="md"
              onPress={() => dispatch(setOpenCommandCenter(true))}
            >
              Command Center...
            </Button>
            <Button className="flex lg:hidden min-w-0 px-2" variant="flat">
              <IoMenu size={30} />
            </Button>
            <div className="flex space-x-3 items-center">
              <div className="w-32 mr-2">
                <p className="text-tiny mb-1 text-center text-foreground-600">
                  {(subscription?.usage.usedSeconds / 60).toFixed(
                    subscription?.usage.usedSeconds % 60 === 0 ? 0 : 1
                  )}{" "}
                  / {(subscription?.usage.totalSeconds / 60).toFixed(0)} mins
                  used
                </p>
                <Progress
                  disableAnimation
                  color="danger"
                  value={
                    (subscription?.usage.usedSeconds /
                      subscription?.usage.totalSeconds) *
                    100
                  }
                />
              </div>
              <DropdownMenuIdk router={router} />
              <Button
                className="px-3 min-w-0 hidden lg:flex"
                startContent={<IoIosHelpCircleOutline size={25} />}
              ></Button>
            </div>
          </div>
        </nav>
        <main className="flex flex-1 bg-default-100 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* <main className="flex flex-1 bg-default-100">{children}</main> */}
      {audioFile && (
        <div
          className={`fixed bottom-0 right-0 z-50 w-10 h-10 mr-6 mb-4 rounded-full ${
            isDarkMode ? "bg-white" : "bg-black"
          } bg-opacity-80 backdrop-filter backdrop-blur-sm hover:cursor-pointer hover:bg-opacity-100 ${
            audioPlayerVisible ? "hidden" : "visible"
          } transition-all}`}
        >
          <div className="w-full h-full flex items-center justify-center">
            <BsChevronDown
              className="text-foreground-50 hover:cursor-pointer rotate-180"
              size={20}
              onClick={() => {
                dispatch(setAudioPlayerVisible(true));
              }}
            />
          </div>
        </div>
      )}
      {audioFile && (
        <div
          className={`fixed bottom-0 left-0 z-50 w-full ${
            isDarkMode ? "bg-black" : "bg-white"
          } bg-opacity-50 h-[6.7rem] backdrop-filter backdrop-blur-sm ${
            audioPlayerVisible ? "visible" : "hidden"
          } transition-all}`}
        >
          <div className="w-full h-full flex items-center px-6">
            {isPlaying ? (
              <IoPauseCircleSharp
                size={70}
                className={`text-foreground-700 hover:cursor-pointer hover:text-foreground`}
                onClick={handlePlayPause}
              />
            ) : (
              <IoPlayCircleSharp
                size={70}
                className={`text-foreground-700 hover:cursor-pointer hover:text-foreground`}
                onClick={handlePlayPause}
              />
            )}

            <div className="flex flex-col ml-5 flex-1 h-full justify-between py-5 pb-6">
              <p className="text-foreground-800 text-sm text-[13px] font-bold tracking-wider">
                <span className=" tracking-tight">{audioFile.voice}</span>,{" "}
                {audioFile.date.toDate().toLocaleString()}
              </p>
              <div className="flex flex-row">
                <TbRewindBackward10
                  className="text-foreground-500 mr-5 hover:cursor-pointer hover:text-foreground"
                  size={22}
                  onClick={() => {
                    const newTime = audioElement.currentTime - 10;
                    if (newTime >= 0) {
                      setCurrentTime(newTime);
                      audioElement.currentTime = newTime;
                    } else {
                      setCurrentTime(0);
                      audioElement.currentTime = 0;
                    }
                  }}
                />
                <TbRewindForward10
                  className="text-foreground-500 mr-4 hover:cursor-pointer hover:text-foreground"
                  size={22}
                  onClick={() => {
                    const newTime = audioElement.currentTime + 10;
                    if (newTime <= duration) {
                      setCurrentTime(newTime);
                      audioElement.currentTime = newTime;
                    } else {
                      setCurrentTime(duration);
                      audioElement.currentTime = duration;
                    }
                  }}
                />
                <Slider
                  size="sm"
                  color="foreground"
                  step={0.001}
                  maxValue={1}
                  minValue={0}
                  formatOptions={{ style: "percent" }}
                  aria-label="Clarity + Similarity Enhancement"
                  className="flex flex-1 px-3"
                  value={currentTime / duration}
                  onChange={(value) => {
                    setCurrentTime(value * duration);
                    audioElement.currentTime = value * duration;
                  }}
                />
                <p className="text-foreground-500 text-sm mr-6">
                  {formatTime(currentTime)}&nbsp;&nbsp; /&nbsp;&nbsp;{" "}
                  {formatTime(duration)}
                </p>
                <GoThumbsup
                  className="mr-1 text-foreground-500 hover:cursor-pointer hover:text-foreground-400"
                  size={20}
                />
                <GoThumbsdown
                  className="mr-5 scale-x-[-1] text-foreground-500 hover:cursor-pointer hover:text-foreground-400"
                  size={20}
                />
                <BsDownload
                  className="mr-6 text-foreground-500 hover:cursor-pointer hover:text-foreground"
                  size={20}
                />
                <BsChevronDown
                  className="mr-2 text-foreground-500 hover:cursor-pointer hover:text-foreground-400"
                  size={20}
                  onClick={() => {
                    dispatch(setAudioPlayerVisible(false));
                    dispatch(setAutoPlay(false));
                  }}
                />
              </div>
            </div>
            <audio
              id="audio-element"
              src={audioFile.fileURL}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              autoPlay={autoPlay}
            />
          </div>
          {/* Content for the semi-transparent bar */}
        </div>
      )}
      <SearchBox />
      <ProjectSearch />
      <ThemeSearch />
    </div>
  );
};

export default AppShell;
