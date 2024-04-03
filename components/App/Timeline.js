import React, { useState, useEffect } from "react";
import { BiHide } from "react-icons/bi";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import Draggable from "react-draggable";
import { AudioVisualizer } from "react-audio-visualize";
import { Slider } from "@nextui-org/react";
import { Resizable } from "re-resizable";
import { Rnd } from "react-rnd";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

const Timeline = ({
  segments,
  setEditSegments,
  setTimelineVisible,
  setIsSaving,
  audioURL,
  duration,
  projectId
}) => {
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

  const handleResize = async (index, direction, ref, d, position) => {
    const newSegments = [...segments];
    const originalStart = segments[index].start;
    const originalEnd = segments[index].end;
    let newStart = newSegments[index].start;
    let newEnd = newSegments[index].end;

    if (direction === "left") {
      // Check if resizing left is within bounds
      if (
        index > 0 &&
        newStart - d.width * scaleFactor < newSegments[index - 1].end
      ) {
        newStart = newSegments[index - 1].end;
      } else {
        newStart -= d.width * scaleFactor;
      }
    } else if (direction === "right") {
      // Check if resizing right is within bounds
      if (
        index < segments.length - 1 &&
        newEnd + d.width * scaleFactor > segments[index + 1].start
      ) {
        newEnd = segments[index + 1].start;
      } else {
        newEnd += d.width * scaleFactor;
      }
    }

    newSegments[index] = {
      ...newSegments[index],
      start: newStart,
      end: newEnd,
    };
    setEditSegments(newSegments);

    const UndoObject = {
      type: "resize",
      index: index,
      oldStart: originalStart,
      oldEnd: originalEnd,
    };

    try {
      const projectRef = doc(db, "projects", projectId);
      await updateDoc(projectRef, {
        historyOfActions: arrayUnion(UndoObject),
        segments: newSegments,
        needsUpdate: true,
      });
    } catch (e) {
      console.error("Error updating project segments: ", e);
    }
  };

  const handleDrag = (index, d) => {
    const newSegments = [...segments];
    let currentWidth = newSegments[index].end - newSegments[index].start;
    console.log("currentWidth", currentWidth);
    let newStart = d.x * scaleFactor;
    console.log("newStart", newStart);
    console.log("d.x", d.x);
    let newEnd = newStart + currentWidth;

    // Check if dragging is within bounds
    if (index === 0 && newStart < 0) {
      newStart = 0;
      newEnd = newStart + currentWidth;
    } else if (index > 0 && newStart < newSegments[index - 1].end) {
      newStart = newSegments[index - 1].end;
      newEnd = newStart + newSegments[index].end - newSegments[index].start;
    } else if (
      index < segments.length - 1 &&
      newEnd > segments[index + 1].start
    ) {
      newEnd = segments[index + 1].start;
      newStart = newEnd - newSegments[index].end + newSegments[index].start;
    }

    newSegments[index] = {
      ...newSegments[index],
      start: newStart,
      end: newEnd,
    };
    setEditSegments(newSegments);
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
        {segments.map((segment, index) => {
          const segmentWidth = (segment.end - segment.start) / scaleFactor;
          const leftPosition = segment.start / scaleFactor + "px";
          let maxwidthfr;
          if (index === segments.length - 1) {
            maxwidthfr = (duration * 1000 - segment.start) / scaleFactor;
            console.log("last")
          } else {
            maxwidthfr =
              (segments[index + 1].start - segment.start) / scaleFactor;
          }
          console.log(index + "maxwidthfr", maxwidthfr);

          return (
            <Rnd
              key={index}
              size={{
                width: (segment.end - segment.start) / scaleFactor,
                height: 48,
              }}
              position={{
                x: segment.start / scaleFactor,
                y: 36,
              }}
              // maxWidth={maxwidthfr}
              enableResizing={{
                top: false,
                right: true,
                bottom: false,
                left: true,
                topRight: false,
                bottomRight: false,
                bottomLeft: false,
                topLeft: false,
              }}
              onResize={(e, direction, ref, delta, position) => {
                // Handle resizing logic here
                // handleResize(index, direction, ref, delta, position);
              }}
              // bounds="parent"
              onResizeStop={(e, direction, ref, delta, position) => {
                // Handle resizing logic here
                handleResize(index, direction, ref, delta, position);
              }}
              onDragStop={(e, d) => {
                // Handle dragging logic here
                handleDrag(index, d);
              }}
              dragAxis="x"
              disableDragging={true}
              className="mt-9 clip absolute bg-sky-400/25 text-white rounded-md px-2 py-1 h-12 overflow-hidden flex flex-col justify-around group"
            >
              {/* Black circles at segment edges */}
              <div
                className="absolute top-0 h-full w-1 bg-sky-400 group-hover:bg-orange-600 transition-all"
                style={{ left: 0 }}
              />
              <div
                className="absolute top-0 h-full w-1 bg-sky-400 group-hover:bg-orange-600 transition-all"
                style={{ right: 0 }}
              />
              <p className="text-xs text-[0.5rem] text-sky-500 font-medium tracking-tighter mb-1">
                Speaker A
              </p>
              {/* Display segment translated text with ellipsis if it overflows */}
              <p className="whitespace-nowrap overflow-hidden overflow-ellipsis text-xs text-sky-500">
                {segment.translatedText}
              </p>
            </Rnd>
          );
        })}

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
