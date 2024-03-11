import React, { useState, useEffect } from "react";
import { BiHide } from "react-icons/bi";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import Draggable from "react-draggable";
import { AudioVisualizer } from "react-audio-visualize";
import { Slider } from "@nextui-org/react";

const Timeline = ({ segments, setTimelineVisible, audioURL, duration }) => {
  const hideTimeline = () => {
    setTimelineVisible(false);
  };

  const [audioBlob, setAudioBlob] = useState(null);
  const [scaleFactor, setScaleFactor] = useState(20);
  const [audioKey, setAudioKey] = useState(0); // Key for AudioVisualizer component

  useEffect(() => {
    fetch(audioURL)
      .then((response) => response.blob())
      .then((blob) => {
        setAudioBlob(blob);
      })
      .catch((error) => {
        console.error("Error fetching audio blob:", error);
      });
  }, [audioURL]);

  // Update audioKey whenever scaleFactor changes
  useEffect(() => {
    setAudioKey((prevKey) => prevKey + 1);
  }, [scaleFactor]);

  const zoomOut = () => {
    if (scaleFactor + 3 >= 20) {
      setScaleFactor(20);
    } else {
      setScaleFactor((prevScaleFactor) => prevScaleFactor + 3);
    }
  };

  const zoomIn = () => {
    console.log(scaleFactor);
    if (scaleFactor - 3 <= 5) {
      setScaleFactor(5);
    } else {
      setScaleFactor((prevScaleFactor) => prevScaleFactor - 3);
    }
  };

  const handleDrag = (index, newLeft, newWidth) => {
    const newSegments = [...segments];
    newSegments[index] = {
      ...newSegments[index],
      start: newLeft * scaleFactor,
      end: (newLeft + newWidth) * scaleFactor,
    };
    // Update state with the new segments
    // Here you should have a state setter to update segments
  };

  const renderTicks = () => {
    const tickElements = [];
    const interval = 5; // Show tick every 5 seconds

    for (let i = 0; i <= duration; i++) {
      const left = (i * 1000) / scaleFactor; // Convert seconds to pixels

      if (i % interval === 0) {
        // Render small line every second
        tickElements.push(
          <div
            key={i}
            className="absolute top-0 h-full bg-foreground-300"
            style={{
              left: `${left}px`,
              width: "1px",
              height: `24px`,
            }}
          ></div>
        );
        // Render tick every 5 seconds
        tickElements.push(
          <div
            key={i}
            className="absolute top-[12px] text-xs text-foreground-500"
            style={{ left: `${left + 5}px` }}
          >
            {formatTime(i)} {/* Assuming formatTime function is defined */}
          </div>
        );
      } else {
        // Render small line every second
        tickElements.push(
          <div
            key={i}
            className="absolute top-0 h-full bg-foreground-300"
            style={{
              left: `${left}px`,
              width: "1px",
              height: `12px`,
            }}
          ></div>
        );
      }
    }
    return tickElements;
  };

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
    return `${hours}:${minutes}:${seconds},${milliseconds}`;
  };

  return (
    <div
      className="h-[10.6rem] bg-foreground-50 border border-foreground-300 mt-1"
      tabIndex="0"
    >
      <div className="border-b border-foreground-300 h-8 w-full flex items-center justify-end px-3 gap-2 text-foreground">
        <CiCircleMinus onClick={zoomOut} className="hover:cursor-pointer" />
        <Slider
          size="sm"
          value={100 - scaleFactor} // Invert the value to achieve the desired behavior
          onChange={(value) => setScaleFactor(100 - value)} // Invert the value when setting scaleFactor
          step={1}
          maxValue={95}
          minValue={80}
          aria-label="Zoom"
          className="max-w-[5rem]"
          hideThumb
        />

        <CiCirclePlus onClick={zoomIn} className="hover:cursor-pointer" />
        <BiHide onClick={hideTimeline} className="hover:cursor-pointer" />
      </div>
      <div className="relative overflow-x-auto overflow-y-hidden flex items-start h-[8.5rem]">
        {/* Render timeline clips and time intervals */}
        {segments.map((segment, index) => (
          <Draggable
            key={index}
            axis="x"
            bounds="parent"
            onDrag={(e, { x, deltaX }) =>
              handleDrag(index, x, segment.end - segment.start)
            }
          >
            <div
              className="mt-9 clip absolute bg-sky-400/25 text-white rounded-md px-2 py-1 h-12 overflow-hidden hover:border-2 hover:border-cyan-500 flex flex-col justify-around"
              style={{
                left: `${segment.start / scaleFactor}px`,
                width: `${(segment.end - segment.start) / scaleFactor}px`,
              }}
            >
              <p className="text-xs text-[0.5rem] text-sky-500 font-medium tracking-tighter mb-1">
                Speaker A
              </p>
              {/* Display segment translated text with ellipsis if it overflows */}
              <p className="whitespace-nowrap overflow-hidden overflow-ellipsis text-xs text-sky-500">
                {segment.translatedText}
              </p>
            </div>
          </Draggable>
        ))}
        {/* Audio visualization */}
        {audioBlob && (
          <div className="absolute top-[70px]">
            <AudioVisualizer
              key={audioKey} // Add key prop to force re-render
              blob={audioBlob}
              width={(duration * 1000) / scaleFactor}
              height={100}
              barWidth={1}
            />
          </div>
        )}
        {/* Render ticks */}
        {renderTicks()}
      </div>
    </div>
  );
};

export default Timeline;
