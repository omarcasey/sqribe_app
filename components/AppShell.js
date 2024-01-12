// components/AppShell.js
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Spinner, Switch, Slider } from "@nextui-org/react";
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
import { setAudioPlayerVisible, setAutoPlay } from "@/reducers/userSlice";

const AppShell = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.user.data.darkMode);
  const uid = useSelector((state) => state.user.auth.uid);
  const audioPlayerVisible = useSelector(
    (state) => state.user.audio.audioPlayerVisible
  );
  const audioFile = useSelector((state) => state.user.audio.audioFile);
  const autoPlay = useSelector((state) => state.user.audio.autoPlay);

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

  const toggleTheme = async () => {
    try {
      const userRef = doc(db, "users", uid);
      const docSnap = await getDoc(userRef);
      const currentData = docSnap.data();
      await updateDoc(userRef, {
        darkMode: !currentData.darkMode,
      });
    } catch (e) {
      console.error("Error updating darkMode: ", e);
    }
  };

  return (
    <div
      className={`flex flex-col h-screen ${
        isDarkMode ? "dark" : "light"
      } bg-default-100`}
    >
      <nav className="dark:bg-neutral-900 bg-white px-6 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image
              className="w-auto h-10 mr-4"
              src="/new logo transparent.png"
              alt=""
              width={1024}
              height={1024}
            />
            <h1 className="text-foreground font-bold text-lg">Sqribe</h1>
          </Link>
          <div className="flex flex-1 max-w-2xl justify-evenly">
            <Link
              href="/dashboard"
              className="flex items-center text-default-500 hover:text-foreground transition-all font-medium"
            >
              <RiLayoutMasonryFill
                className={`mr-2 ${
                  router.pathname === "/dashboard" ? "text-cyan-300" : ""
                }`}
              />
              <p
                className={`${
                  router.pathname === "/dashboard"
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-300"
                    : ""
                }`}
              >
                Dashboard
              </p>
            </Link>
            <Link
              href="/projects"
              className="flex items-center text-default-500 hover:text-foreground transition-all font-medium"
            >
              <FaFolder className="mr-2" />
              <p className="">Projects</p>
            </Link>
            <Link
              href="/makespeech"
              className="flex items-center text-default-500 hover:text-foreground transition-all font-medium"
            >
              <SiAudiomack
                size={20}
                className={`mr-2 ${
                  router.pathname === "/makespeech" ? "text-cyan-300" : ""
                }`}
              />
              <p
                className={`${
                  router.pathname === "/makespeech"
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-300"
                    : ""
                }`}
              >
                Speech Synthesis
              </p>
            </Link>
            <Link
              href="/history"
              className="flex items-center text-default-500 hover:text-foreground transition-all font-medium"
            >
              <FaHistory className="mr-2" />
              <p className="">History</p>
            </Link>
          </div>
          <div className="flex space-x-3 items-center">
            <Switch
              defaultSelected={isDarkMode}
              size="md"
              color="secondary"
              onChange={toggleTheme}
            />
            <DropdownMenuIdk router={router} />
            <Button
              className="px-3"
              startContent={<IoIosHelpCircleOutline size={25} />}
            >
              Help Center
            </Button>
          </div>
          {/* <Button onClick={signOut} className="text-white">
            Sign Out
          </Button> */}
        </div>
      </nav>
      <main className="flex flex-1 bg-default-100">{children}</main>
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
                  step={0.01}
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
    </div>
  );
};

export default AppShell;
