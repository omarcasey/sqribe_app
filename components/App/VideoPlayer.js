import { Slider } from "@nextui-org/react";
import React, { useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { IoMdPause } from "react-icons/io";
import { FaUndo, FaRedo } from "react-icons/fa";
import { RxEnterFullScreen } from "react-icons/rx";

const formatTime = (time) => {
  const hours = Math.floor(time / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((time % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  const milliseconds = Math.floor((time % 1) * 1000)
    .toString()
    .padStart(3, "0");
  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
};

const VideoPlayer = ({ url }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFullScreen = () => {
    const videoElement = videoRef.current;

    // Check if the document is already in fullscreen
    if (
      document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement
    ) {
      // Document is already in fullscreen, do nothing
    } else {
      // Document is not in fullscreen, enter fullscreen
      if (videoElement.requestFullscreen) {
        videoElement.requestFullscreen();
      } else if (videoElement.mozRequestFullScreen) {
        videoElement.mozRequestFullScreen();
      } else if (videoElement.webkitRequestFullscreen) {
        videoElement.webkitRequestFullscreen();
      } else if (videoElement.msRequestFullscreen) {
        videoElement.msRequestFullscreen();
      }
    }

    setIsFullScreen(!isFullScreen);
  };

  const handlePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const moveAudio = (value) => {
    const newTime = (value / 100) * duration;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleRewind = () => {
    videoRef.current.currentTime -= 10;
  };

  const handleForward = () => {
    videoRef.current.currentTime += 10;
  };

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  return (
    <div className="border border-foreground-300 rounded-xl">
      <video
        ref={videoRef}
        className="rounded-t-xl"
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
      >
        <source src={url} type="video/mp4" />
      </video>
      <Slider
        aria-label="Video progress"
        classNames={{
          track: "rounded-none h-unit-2",
          trackWrapper: "h-unit-2 rounded-none",
        }}
        color="primary"
        value={currentTime ? (currentTime / duration) * 100 : 0}
        onChange={moveAudio}
        hideThumb
      />
      <div className="px-6 p-4 flex flex-row justify-between items-center mt-2">
        <div className="flex flex-row items-center">
          {isPlaying ? (
            <IoMdPause
              size={20}
              className="text-foreground-500 hover:cursor-pointer hover:text-foreground transition-all mr-5"
              onClick={handlePlayPause}
            />
          ) : (
            <FaPlay
              size={20}
              className="text-foreground-500 hover:cursor-pointer hover:text-foreground transition-all mr-5"
              onClick={handlePlayPause}
            />
          )}
          <FaUndo
            size={18}
            className="text-foreground-500 hover:cursor-pointer hover:text-foreground transition-all mr-2"
            onClick={handleRewind}
          />
          <FaRedo
            size={18}
            className="text-foreground-500 hover:cursor-pointer hover:text-foreground transition-all"
            onClick={handleForward}
          />
        </div>
        <div className="flex flex-row text-foreground-500 text-tiny">
          <span className="font-bold">{formatTime(currentTime)}</span>
          &nbsp;&nbsp;/&nbsp;&nbsp;{formatTime(duration)}
        </div>
        <div>
          <RxEnterFullScreen
            size={25}
            className="text-foreground-500 hover:cursor-pointer hover:text-foreground transition-all"
            onClick={handleFullScreen}
          />
        </div>
      </div>
      {/* Add more custom controls here */}
    </div>
  );
};

export default VideoPlayer;
