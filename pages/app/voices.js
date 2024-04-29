import AppShell from "@/components/App/AppShell";
import withAuth from "@/components/App/withAuth";
import { useSelector } from "react-redux";
import React from "react";
import { Resizable } from "re-resizable";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { SiAudiomack } from "react-icons/si";

const Voices = () => {
  const userData = useSelector((state) => state.user.data);
  const subscription = userData?.subscription;

  return (
    <AppShell>
      <div className="w-full">
        <div className="flex flex-col items-center justify-center h-full">
          <Image
            src="/new logo transparent.png"
            width={1000}
            height={1000}
            alt="logo"
            className="w-72 saturate-150 -mt-20"
          />
          <h1 className="text-xl font-bold mb-4 text-foreground">Voice Clone library</h1>
          <p className="max-w-3xl text-center mb-8 text-foreground-600">
            Achieve consistent high-quality audio with Custom Voice Clone
            feature across all your videos. Create diverse voice tones to match
            the mood: from bold and cheerful to calm and formal.
          </p>
          <Button
            color="primary"
            size="lg"
            className="font-medium"
            startContent={
              <SiAudiomack
                size={20}
                className={`w-5 text-white`}
              />
            }
          >
            Upgrade to create Voice Clones
          </Button>
        </div>
      </div>
    </AppShell>
  );
};

export default withAuth(Voices);
