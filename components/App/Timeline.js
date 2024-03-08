import React from "react";
import { BiHide } from "react-icons/bi";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";

const Timeline = ({ segments, setTimelineVisible }) => {
  const hideTimeline = () => {
    setTimelineVisible(false);
  };
  return (
    <div
      className="h-[8.5rem] bg-foreground-50 border border-foreground-300 mt-1"
      tabIndex="0"
    >
      <div className="border-b border-foreground-300 h-8 w-full flex items-center justify-end px-3 gap-2">
        <CiCircleMinus />
        <CiCirclePlus />
        <BiHide onClick={hideTimeline} />
      </div>
      <div className="relative overflow-auto flex items-center h-24">
        {/* Render timeline clips and time intervals */}
        {segments.map((segment, index) => (
          <React.Fragment key={index}>
            {/* Timeline clip */}
            <div
              className="clip absolute bg-sky-400/25 text-white rounded-md px-2 py-1 h-12 overflow-hidden hover:border-2 hover:border-cyan-500 flex flex-col justify-around"
              style={{
                left: `${segment.start / 25}px`,
                width: `${(segment.end - segment.start) / 25}px`,
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
            {/* Time interval label */}
            <div
              className="absolute bottom-0 text-xs text-foreground-500"
              style={{ left: `${segment.start / 25}px` }}
            >
              {segment.start / 1000}{" "}
              {/* Assuming formatTime function is defined */}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
