// Commands.js

import { Kbd } from "@nextui-org/react";
import { Router } from "next/router";
import { GrProjects } from "react-icons/gr";
import { ImShift } from "react-icons/im";
import { IoAddSharp } from "react-icons/io5";
import { RiComputerLine } from "react-icons/ri";
import { IoCopyOutline } from "react-icons/io5";
import { SlLogout } from "react-icons/sl";
import { CiChat1 } from "react-icons/ci";
import { LuFileSearch2 } from "react-icons/lu";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { GoArrowRight } from "react-icons/go";

export const Commands = [
  {
    category: "Projects",
    icon: <GrProjects size={15} className="text-foreground-500 w-8 h-4" />,
    text: "Search Projects...",
    endContent: (
      <div className="flex flex-row items-center gap-1">
        <Kbd className="h-7 w-6 px-0 flex items-center justify-center">
          <ImShift size={16} />
        </Kbd>
        <Kbd className="h-7 w-6 px-0 flex items-center justify-center font-medium">
          P
        </Kbd>
      </div>
    ),
    action: "/app/projects",
  },
  {
    category: "Projects",
    icon: <IoAddSharp size={20} className="text-foreground-500 w-8 h-6" />,
    text: "Create New Project...",
    action: "/app/projects",
  },
  {
    category: "General",
    icon: (
      <RiComputerLine
        size={20}
        className="text-foreground-500 w-8 h-6 p-[2px]"
      />
    ),
    text: "Change Theme...",
    endContent: (
      <Kbd className="h-7 w-6 px-0 flex items-center justify-center font-medium">
        T
      </Kbd>
    ),
    action: "/app/projects",
  },
  {
    category: "General",
    icon: (
      <IoCopyOutline
        size={20}
        className="text-foreground-500 w-8 h-6 p-[2px]"
      />
    ),
    text: "Copy Current URL",
    action: "/app/projects",
  },
  {
    category: "General",
    icon: (
      <SlLogout size={20} className="text-foreground-500 w-8 h-6 p-[2px]" />
    ),
    text: "Logout",
    action: "/app/projects",
  },
  {
    category: "Help",
    icon: (
      <IoIosHelpCircleOutline
        size={20}
        className="text-foreground-500 w-8 h-6 p-[2px]"
      />
    ),
    text: "Contact Support",
    action: "/app/projects",
  },
  {
    category: "Help",
    icon: (
      <CiChat1
        size={20}
        className="text-foreground-500 w-8 h-6 p-[2px]"
      />
    ),
    text: "Send Feedback...",
    action: "/app/projects",
  },
  {
    category: "Help",
    icon: (
      <LuFileSearch2
        size={20}
        className="text-foreground-500 w-8 h-6 p-[2px]"
      />
    ),
    text: "Search Docs...",
    action: "/app/projects",
  },
  {
    category: "Navigation",
    icon: (
      <GoArrowRight
        size={20}
        className="text-foreground-500 w-8 h-6 p-[2px]"
      />
    ),
    text: "Go to Dashboard",
    action: "/app/dashboard",
  },
  {
    category: "Navigation",
    icon: (
      <GoArrowRight
        size={20}
        className="text-foreground-500 w-8 h-6 p-[2px]"
      />
    ),
    text: "Go to Projects",
    action: "/app/dashboard",
  },
  {
    category: "Navigation",
    icon: (
      <GoArrowRight
        size={20}
        className="text-foreground-500 w-8 h-6 p-[2px]"
      />
    ),
    text: "Go to Speech",
    action: "/app/dashboard",
  },
];
