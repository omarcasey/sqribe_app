import AppShell from "@/components/App/AppShell";
import React from "react";
import withAuth from "@/components/App/withAuth";
import PricingOptions from "@/components/Marketing/PricingOptions";
import { Badge, Button, Card, Chip, Switch } from "@nextui-org/react";
import { FaCheck } from "react-icons/fa";
import { useState } from "react";
import { useSelector } from "react-redux";
import { IoIosArrowBack, IoIosHelpCircleOutline } from "react-icons/io";
import { useRouter } from "next/router";

const Pricing = () => {
  const router = useRouter();
  const [selected, setSelected] = useState(true);
  const isDarkMode = useSelector((state) => state.user.darkMode);

  return (
    <div
      className={`flex flex-col h-screen bg-default-100 ${
        isDarkMode ? "dark" : "light"
      }`}
    >
      <nav className="w-full flex flex-row items-center justify-between px-5 border-b-1 border-neutral-600 dark:bg-neutral-900 bg-white py-4">
        <div className="flex items-center justify-center text-foreground">
          <div
            className="hover:cursor-pointer flex flex-row items-center"
            onClick={() => router.back()}
          >
            <IoIosArrowBack size={20} className="mr-3" />
            <p className="font-medium text-sm">Back</p>
          </div>
        </div>
        <p className="text-foreground text-lg">Upgrade your plan.</p>
        <div className="flex flex-row items-center gap-4">
          <Button
            className="px-3 min-w-0"
            startContent={<IoIosHelpCircleOutline size={25} />}
          ></Button>
        </div>
      </nav>
      <div className="mx-auto max-w-7xl text-foreground pt-16 flex-1">
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
            <Button onPress={() => router.push("https://buy.stripe.com/dR64hieJP6IX2pq4gg")} color="default">Select Plan</Button>
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
                <FaCheck
                  size={12}
                  className="mr-2 flex-shrink-0 text-blue-500"
                />
                <p>100 min of translated video</p>
              </li>
              <li className="flex flex-row items-center">
                <FaCheck
                  size={12}
                  className="mr-2 flex-shrink-0 text-blue-500"
                />
                <p>Voice cloning with unlimited vocabulary</p>
              </li>
              <li className="flex flex-row items-center">
                <FaCheck
                  size={12}
                  className="mr-2 flex-shrink-0 text-blue-500"
                />
                <p>SRT download</p>
              </li>
              <li className="flex flex-row items-center">
                <FaCheck
                  size={12}
                  className="mr-2 flex-shrink-0 text-blue-500"
                />
                <p>Video Captions / Subtitles</p>
              </li>
              <li className="flex flex-row items-center">
                <FaCheck
                  size={12}
                  className="mr-2 flex-shrink-0 text-blue-500"
                />
                <p>
                  Access to Sqribe Clips
                  <br />
                  (Advanced Social Media Clip Generator)
                </p>
              </li>
              <li className="flex flex-row items-center">
                <FaCheck
                  size={12}
                  className="mr-2 flex-shrink-0 text-blue-500"
                />
                <p>Unlimited Speech Synthesis (Text to speech)</p>
              </li>
              <li className="flex flex-row items-center">
                <FaCheck
                  size={12}
                  className="mr-2 flex-shrink-0 text-blue-500"
                />
                <p>AI avatar</p>
              </li>
              <li className="flex flex-row items-center">
                <FaCheck
                  size={12}
                  className="mr-2 flex-shrink-0 text-blue-500"
                />
                <p>Video Editor</p>
              </li>
              <li className="flex flex-row items-center">
                <FaCheck
                  size={12}
                  className="mr-2 flex-shrink-0 text-blue-500"
                />
                <p>
                  Remove filler words like &quot;uh&quot; and &quot;um&quot;
                </p>
              </li>
            </ul>
            <Button color="primary">Select Plan</Button>
          </Card>
          <Card className="p-4 px-6">
            <h1 className="font-semibold text-xl mb-2">Business</h1>
            <p className="text-foreground-500 text-sm mb-6">
              For small to medium sized buisness that have a smaller target
              audience
            </p>
            <p className="text-3xl font-semibold">
              {selected ? "$250" : "$300"} / month
            </p>
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
            <Button color="default">Select Plan</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Pricing);
