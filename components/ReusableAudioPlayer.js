// ReusableAudioPlayer.js

"use client";
import React, { useState, useRef, useEffect } from "react";
import { Card, CardBody, Image, Button, Slider } from "@nextui-org/react";
import { HeartIcon } from "./HeartIcon";
import { PauseCircleIcon } from "./PauseCircleIcon";
import { NextIcon } from "./NextIcon";
import { PreviousIcon } from "./PreviousIcon";
import { RepeatOneIcon } from "./RepeatOneIcon";
import { ShuffleIcon } from "./ShuffleIcon";
import { FaPlayCircle  } from "react-icons/fa";

const ReusableAudioPlayer = ({ audioUrl, name, filename }) => {
  const [liked, setLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const sliderRef = useRef(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const moveAudio = (value) => {
    if (audioRef.current) {
      const newTime = (duration * value) / 100;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = audioUrl; // Update audio source when audioUrl changes

      audioRef.current.addEventListener("loadedmetadata", () => {
        setDuration(audioRef.current.duration);
      });

      audioRef.current.addEventListener("timeupdate", () => {
        const newCurrentTime = audioRef.current.currentTime;
        setCurrentTime(newCurrentTime);
        if (sliderRef.current) {
          sliderRef.current.setValue((newCurrentTime / duration) * 100);
        }
      });

      audioRef.current.addEventListener("ended", () => {
        setIsPlaying(false);
        setCurrentTime(0);
      });
    }
  }, [audioUrl]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
      shadow="sm"
    >
      <audio ref={audioRef} src={audioUrl} />
      <CardBody>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
          <div className="relative col-span-6 md:col-span-4">
            <Image
              alt="Album cover"
              className="object-cover"
              height={200}
              shadow="md"
              src="/album-cover.png"
              width="100%"
            />
          </div>

          <div className="flex flex-col col-span-6 md:col-span-8">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-0">
                <h3 className="text-large font-semibold text-foreground/90">{name}</h3>
                <p className="text-sm text-foreground/80">{filename}</p>
                {/* <h1 className="text-large font-medium mt-2">Sqribe</h1> */}
              </div>
              <Button
                isIconOnly
                className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                radius="full"
                variant="light"
                onPress={() => setLiked((v) => !v)}
              >
                <HeartIcon
                  className={liked ? "[&>path]:stroke-transparent" : ""}
                  fill={liked ? "currentColor" : "none"}
                />
              </Button>
            </div>

            <div className="flex flex-col mt-3 gap-1">
              <Slider
                aria-label="Music progress"
                classNames={{
                  track: "bg-default-500/30",
                  thumb: "w-2 h-2 after:w-2 after:h-2 after:bg-foreground",
                }}
                color="foreground"
                defaultValue={0}
                size="sm"
                onChangeEnd={moveAudio}
              />
              <div className="flex justify-between">
                <p className="text-small">{formatTime(currentTime)}</p>
                <p className="text-small text-foreground/50">{formatTime(duration)}</p>
              </div>
            </div>

            <div className="flex w-full items-center justify-center">
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
              >
                <RepeatOneIcon className="text-foreground/80" />
              </Button>
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
              >
                <PreviousIcon />
              </Button>
              <Button
                isIconOnly
                className="w-auto h-auto data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
                onClick={togglePlay}
              >
                {isPlaying ? (
                  <PauseCircleIcon size={54} />
                ) : (
                  <FaPlayCircle  size={54} className="p-1" />
                )}
              </Button>
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
              >
                <NextIcon />
              </Button>
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
              >
                <ShuffleIcon className="text-foreground/80" />
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ReusableAudioPlayer;
