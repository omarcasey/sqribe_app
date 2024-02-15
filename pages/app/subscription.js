import AppShell from "@/components/App/AppShell";
import withAuth from "@/components/App/withAuth";
import { Button, Card, Divider, Switch } from "@nextui-org/react";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";

const Subscription = () => {
  const userData = useSelector((state) => state.user.data);
  const subscription = userData?.subscriptions[0];
  const [selected, setSelected] = useState(true);
  let basicButtonLabel;
  let creatorButtonLabel;
  let businessButtonLabel;

  if (subscription.planID === "Basic Plan") {
    basicButtonLabel = "Cancel Subscription";
  } else if (
    subscription.planID === "Creator Plan" ||
    subscription.planID === "Business Plan"
  ) {
    basicButtonLabel = "Downgrade";
  } else {
    basicButtonLabel = "Select Plan";
  }

  if (subscription.planID === "Creator Plan") {
    creatorButtonLabel = "Cancel Subscription";
  } else if (subscription.planID === "Basic Plan") {
    creatorButtonLabel = "Downgrade";
  } else if (subscription.planID === "Business Plan") {
    creatorButtonLabel = "Upgrade";
  } else {
    creatorButtonLabel = "Select Plan";
  }

  if (subscription.planID === "Business Plan") {
    businessButtonLabel = "Cancel Subscription";
  } else if (
    subscription.planID === "Creator Plan" ||
    subscription.planID === "Basic Plan"
  ) {
    businessButtonLabel = "Upgrade";
  } else {
    businessButtonLabel = "Select Plan";
  }

  return (
    <AppShell>
      <div className="w-full">
        <div className="flex flex-col items-center pb-24 pt-10">
          <Card className="flex flex-col w-full max-w-[90%]">
            <div className="flex flex-row justify-between items-center px-10 my-4 mb-6">
              <h1 className="text-xl font-medium">Subscription</h1>
              <Button>Manage Subscription</Button>
            </div>
            <Divider className="" />
            <div className="flex flex-row items-center px-10 my-4 text-sm">
              <p className="w-[27rem]">Subscription plan</p>
              <p>{subscription?.planID}</p>
            </div>
            <Divider className="" />
            <div className="flex flex-row items-center px-10 my-4 text-sm">
              <p className="w-[27rem]">Subscription status</p>
              <div className="bg-green-300 rounded-full py-[2px] px-2 text-black text-xs font-medium">
                Active
              </div>
            </div>
            <Divider className="" />
            <div className="flex flex-row items-center px-10 my-4 text-sm">
              <p className="w-[27rem]">Minutes used</p>
              <p className="mr-4">
                {(subscription?.usage.usedSeconds / 60).toFixed(2)}
              </p>
              <p>
                ({(subscription?.usage.totalSeconds / 60).toFixed(0)} included)
              </p>
            </div>
            <Divider className="" />
            <div className="flex flex-row items-center px-10 my-4 text-sm">
              <p className="w-[27rem]">Next minute reset in</p>
              <p>8 days</p>
            </div>
            <Divider className="" />
            <div className="flex flex-row items-center px-10 my-4 text-sm">
              <p className="w-[27rem]">Billing Period</p>
              <p className="mr-5">Monthly</p>
              <p className="text-blue-400 font-medium text-xs border rounded-lg px-2 py-[2px] border-indigo-800 hover:cursor-pointer">Switch to Yearly</p>
            </div>
            <Divider className="" />
            <div className="flex flex-row items-center px-10 my-4 text-sm">
              <p className="w-[27rem]">Next invoice in</p>
              <p>8 days</p>
            </div>
            <Divider className="" />
            <div className="flex flex-row items-center px-10 my-4 text-sm">
              <p className="w-[27rem]">Next invoice</p>
              <p>$35</p>
            </div>
            <Divider className="" />
            <div className="flex flex-row items-center px-10 my-4 text-sm">
              <div className="flex flex-col">
                <p className="w-[27rem]">Enable usage based billing</p>
                <p className="text-xs text-foreground-500">
                  (Surpass 100 minutes for $0.8 per extra minute)
                </p>
              </div>
              <Switch
                defaultSelected
                aria-label="Usage based billing"
                size="sm"
              />
            </div>
          </Card>
          <h1 className="w-[90%] mt-16 text-2xl font-semibold ml-5">Plans</h1>
          <div className="mx-auto max-w-[90%] text-foreground pt-4 flex-1">
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
                    <p>
                      Voice cloning for 28 languages with 1000 word vocabulary
                    </p>
                  </li>
                </ul>
                <Button
                  onPress={() =>
                    router.push("https://buy.stripe.com/dR64hieJP6IX2pq4gg")
                  }
                  color="default"
                >
                  {basicButtonLabel}
                </Button>
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
                <Button color="primary">{creatorButtonLabel}</Button>
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
                    <p>
                      Voice cloning for 28 languages with 1000 word vocabulary
                    </p>
                  </li>
                </ul>
                <Button color="default">{businessButtonLabel}</Button>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default withAuth(Subscription);
