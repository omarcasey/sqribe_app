// Commands.js

import { Kbd } from "@nextui-org/react";
import { Router } from "next/router";
import { GrProjects } from "react-icons/gr";
import { ImShift } from "react-icons/im";
import { IoAddSharp } from "react-icons/io5";

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
    icon: <IoAddSharp size={25} className="text-foreground-500 w-8 h-6" />,
    text: "Create New Project...",
    action: "/app/projects",
  },
];
