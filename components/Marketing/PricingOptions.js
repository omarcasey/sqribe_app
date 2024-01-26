import { Badge, Button, Card, Chip, Switch } from "@nextui-org/react";
import React from "react";
import { FaCheck } from "react-icons/fa";
import { useState } from "react";

const PricingOptions = () => {
  const [selected, setSelected] = useState(true);

  return (
    <div className="mx-auto max-w-7xl text-foreground">
      <div className="flex justify-center pt-24 pb-10">
        <h1 className="text-4xl text-center max-w-3xl">
          Universal tool with a simple and transparent{" "}
          <span className="bg-gradient-to-r from-cyan-500 to-purple-500 text-transparent bg-clip-text">
            pricing plan.
          </span>
        </h1>
      </div>
      <div className="flex justify-center items-center mb-8">
        <p
          className={`mr-3 ${
            selected ? "text-foreground-500" : ""
          } transition-all`}
        >
          Monthly
        </p>
        <Switch
          isSelected={selected}
          onValueChange={setSelected}
          aria-label="Monthly/Annual"
        />
        <p
          className={`mr-3 ${
            selected ? "" : "text-foreground-500"
          } transition-all`}
        >
          Annually
        </p>
        <div
          className={`rounded-full py-0 px-2 border text-sm ${
            selected
              ? "text-indigo-500 border-indigo-500"
              : "text-foreground-500 border-foreground-500"
          }`}
        >
          20% off
        </div>
      </div>
      <div className="gap-8 justify-center grid grid-cols-1 grid-rows-3 md:grid-cols-3 md:grid-rows-1 px-12 md:px-4">
        <Card className="p-4 px-6">
          <h1 className="font-semibold text-xl mb-2">Basic</h1>
          <p className="text-foreground-500 text-sm mb-6">
            For small to medium sized buisness that have a smaller target
            audience
          </p>
          <p className="text-3xl font-semibold">
            {selected ? "$25" : "$30"} / month
          </p>
          <p className="font-semibold mb-6">+ $1 per extra minute</p>
          <ul className="flex flex-col gap-2 text-sm mb-6 flex-1 text-foreground-500">
            <li className="flex flex-row items-center">
              <FaCheck size={12} className="mr-2 flex-shrink-0" />
              <p>25 min of translated video</p>
            </li>
            <li className="flex flex-row items-center">
              <FaCheck size={12} className="mr-2 flex-shrink-0" />
              <p>4k Export Quality</p>
            </li>
            <li className="flex flex-row items-center">
              <FaCheck size={12} className="mr-2 flex-shrink-0" />
              <p>No watermark</p>
            </li>
            <li className="flex flex-row items-center">
              <FaCheck size={12} className="mr-2 flex-shrink-0" />
              <p>Translate into 130+ languages</p>
            </li>
            <li className="flex flex-row items-center">
              <FaCheck size={12} className="mr-2 flex-shrink-0" />
              <p>Automatic AI transcription</p>
            </li>
            <li className="flex flex-row items-center">
              <FaCheck size={12} className="mr-2 flex-shrink-0" />
              <p>Advanced AI translation</p>
            </li>
            <li className="flex flex-row items-center">
              <FaCheck size={12} className="mr-2 flex-shrink-0" />
              <p>Voice cloning for 28 languages with 1000 word vocabulary</p>
            </li>
          </ul>
          <Button color="default">Try for free</Button>
        </Card>
        <Card className="p-4 px-6 border border-indigo-700">
          <div className="flex flex-row justify-between items-center mb-2">
            <h1 className="font-semibold text-xl">Creator</h1>
            <div className="rounded-md py-0 px-2 border text-sm text-blue-500 border-blue-500">
              Most Popular
            </div>
          </div>
          <p className="text-foreground-500 text-sm mb-6">
            For small to medium sized buisness that have a smaller target
            audience
          </p>
          <p className="text-3xl font-semibold">
            {selected ? "$60" : "$75"} / month
          </p>
          <p className="font-semibold mb-6">+ $0.8 per extra minute</p>
          <ul className="flex flex-col gap-2 text-sm mb-6 flex-1 text-foreground-500">
            <li className="flex flex-row items-center">
              <FaCheck size={12} className="mr-2 flex-shrink-0 text-blue-500" />
              <p>100 min of translated video</p>
            </li>
            <li className="flex flex-row items-center">
              <FaCheck size={12} className="mr-2 flex-shrink-0 text-blue-500" />
              <p>Voice cloning with unlimited vocabulary</p>
            </li>
            <li className="flex flex-row items-center">
              <FaCheck size={12} className="mr-2 flex-shrink-0 text-blue-500" />
              <p>SRT download</p>
            </li>
            <li className="flex flex-row items-center">
              <FaCheck size={12} className="mr-2 flex-shrink-0 text-blue-500" />
              <p>Video Captions / Subtitles</p>
            </li>
            <li className="flex flex-row items-center">
              <FaCheck size={12} className="mr-2 flex-shrink-0 text-blue-500" />
              <p>
                Access to Sqribe Clips<br/>(Advanced Social Media Clip Generator)
              </p>
            </li>
            <li className="flex flex-row items-center">
              <FaCheck size={12} className="mr-2 flex-shrink-0 text-blue-500" />
              <p>Unlimited Speech Synthesis (Text to speech)</p>
            </li>
            <li className="flex flex-row items-center">
              <FaCheck size={12} className="mr-2 flex-shrink-0 text-blue-500" />
              <p>AI avatar</p>
            </li>
            <li className="flex flex-row items-center">
              <FaCheck size={12} className="mr-2 flex-shrink-0 text-blue-500" />
              <p>Video Editor</p>
            </li>
            <li className="flex flex-row items-center">
              <FaCheck size={12} className="mr-2 flex-shrink-0 text-blue-500" />
              <p>Remove filler words like &quot;uh&quot; and &quot;um&quot;</p>
            </li>
          </ul>
          <Button color="primary">Try for free</Button>
        </Card>
        <Card className="p-4 px-6">
          <h1 className="font-semibold text-xl mb-2">Business</h1>
          <p className="text-foreground-500 text-sm mb-6">
            For small to medium sized buisness that have a smaller target
            audience
          </p>
          <p className="text-3xl font-semibold">{selected ? "$250" : "$300"} / month</p>
          <p className="font-semibold mb-6">+ $0.5 per extra minute</p>
          <ul className="flex flex-col gap-2 text-sm mb-6 flex-1 text-foreground-500">
            <li className="flex flex-row items-center">
              <FaCheck size={12} className="mr-2 flex-shrink-0" />
              <p>500 min of translated video</p>
            </li>
            <li className="flex flex-row items-center">
              <FaCheck size={12} className="mr-2 flex-shrink-0" />
              <p>4k Export Quality</p>
            </li>
            <li className="flex flex-row items-center">
              <FaCheck size={12} className="mr-2 flex-shrink-0" />
              <p>No watermark</p>
            </li>
            <li className="flex flex-row items-center">
              <FaCheck size={12} className="mr-2 flex-shrink-0" />
              <p>Translate into 130+ languages</p>
            </li>
            <li className="flex flex-row items-center">
              <FaCheck size={12} className="mr-2 flex-shrink-0" />
              <p>Automatic AI transcription</p>
            </li>
            <li className="flex flex-row items-center">
              <FaCheck size={12} className="mr-2 flex-shrink-0" />
              <p>Advanced AI translation</p>
            </li>
            <li className="flex flex-row items-center">
              <FaCheck size={12} className="mr-2 flex-shrink-0" />
              <p>Voice cloning for 28 languages with 1000 word vocabulary</p>
            </li>
          </ul>
          <Button color="default">Try for free</Button>
        </Card>
      </div>
    </div>
  );
};

export default PricingOptions;
