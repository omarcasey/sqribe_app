import { Button } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import { FaCheck } from "react-icons/fa";

const Survey = () => {
  return (
    <div className="flex">
      <div className="w-1/2 bg-foreground-100 p-6">
        <p className="text-foreground text-xl font-semibold mb-6">Survey:</p>
        <ul className="flex flex-col gap-2 text-sm mb-6 flex-1 text-foreground-600">
          <li className="flex flex-row items-center">
            <FaCheck size={12} className="mr-2 flex-shrink-0 text-blue-500" />
            <p>500 min of translated video</p>
          </li>
          <li className="flex flex-row items-center">
            <FaCheck size={12} className="mr-2 flex-shrink-0 text-blue-500" />
            <p>4k Export Quality</p>
          </li>
          <li className="flex flex-row items-center">
            <FaCheck size={12} className="mr-2 flex-shrink-0 text-blue-500" />
            <p>No watermark</p>
          </li>
          <li className="flex flex-row items-center">
            <FaCheck size={12} className="mr-2 flex-shrink-0 text-blue-500" />
            <p>Translate into 130+ languages</p>
          </li>
          <li className="flex flex-row items-center">
            <FaCheck size={12} className="mr-2 flex-shrink-0 text-blue-500" />
            <p>Automatic AI transcription</p>
          </li>
          <li className="flex flex-row items-center">
            <FaCheck size={12} className="mr-2 flex-shrink-0 text-blue-500" />
            <p>Advanced AI translation</p>
          </li>
          <li className="flex flex-row items-center">
            <FaCheck size={12} className="mr-2 flex-shrink-0 text-blue-500" />
            <p>Voice cloning for 28 languages with 1000 word vocabulary</p>
          </li>
        </ul>
        <div className="w-full flex items-center justify-center">
          <Button
            color="primary"
            size="lg"
            onPress={() => router.push("/app/pricing")}
          >
            View plans
          </Button>
        </div>
      </div>
      <div className="w-1/2 bg-foreground-200 p-6 flex flex-col justify-center">
        <p className="text-xs text-foreground-500">Trusted by 600,000+ users</p>
        <Image
          src={"/drakedont.png"}
          height={1000}
          width={1000}
          alt="signinidk"
          className="mt-3 border border-foreground-500 shadow-xl"
        />
      </div>
    </div>
  );
};

export default Survey;
