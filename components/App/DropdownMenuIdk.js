import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
  User,
} from "@nextui-org/react";
import { PlusIcon } from "../Icons/PlusIcon.jsx";
import { IoMdArrowDropdown } from "react-icons/io";
import { auth } from "@/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode } from "@/reducers/userSlice";
import {
  clearUserData,
  setAuthData,
  setAuthLoading,
} from "@/reducers/userSlice.js";
import { MoonIcon } from "../Icons/MoonIcon.jsx";
import { SunIcon } from "../Icons/SunIcon.jsx";

export default function DropdownMenuIdk({ router }) {
  const isDarkMode = useSelector((state) => state.user.darkMode);
  const user = useSelector((state) => state.user.auth);
  const dispatch = useDispatch();

  const toggleTheme = async () => {
    const newMode = !isDarkMode;
    dispatch(setDarkMode(newMode));
    localStorage.setItem("userDarkModePreference", newMode.toString());
  };

  const signOut = async () => {
    try {
      router.push("/signin");
      await auth.signOut();
      // Dispatch the fetchUserData action
      dispatch(clearUserData())
        .then(() => {
          console.log("User Data Cleared");
        })
        .catch((error) => {
          console.error("Error Clearing User Data:", error);
        });
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <Dropdown
      showArrow
      radius="sm"
      className={`${isDarkMode ? "dark" : "light"}`}
      classNames={{
        base: "before:bg-default-200", // change arrow background
        content: "p-0 border-small border-divider bg-background",
      }}
    >
      <DropdownTrigger>
        <Button variant="ghost" disableRipple>
          Account
          <IoMdArrowDropdown />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Custom item styles"
        disabledKeys={["profile"]}
        className="p-3"
        itemClasses={{
          base: [
            "rounded-md",
            "text-default-500",
            "transition-opacity",
            "data-[hover=true]:text-foreground",
            "data-[hover=true]:bg-default-100",
            "dark:data-[hover=true]:bg-default-50",
            "data-[selectable=true]:focus:bg-default-50",
            "data-[pressed=true]:opacity-70",
            "data-[focus-visible=true]:ring-default-500",
          ],
        }}
      >
        <DropdownSection aria-label="Profile & Actions" showDivider>
          <DropdownItem
            isReadOnly
            key="profile"
            className="h-14 gap-2 opacity-100"
          >
            <User
              name={user.email}
              description="@dev"
              classNames={{
                name: "text-default-600",
                description: "text-default-500",
              }}
              avatarProps={{
                size: "sm",
                src: "https://avatars.githubusercontent.com/u/30373425?v=4",
              }}
            />
          </DropdownItem>
          <DropdownItem
            key="dashboard"
            onPress={() => {
              router.push("/app/dashboard");
            }}
          >
            Dashboard
          </DropdownItem>
          <DropdownItem
            key="settings"
            onPress={() => {
              router.push("/app/settings");
            }}
          >
            Settings
          </DropdownItem>
          <DropdownItem
            key="new_project"
            endContent={<PlusIcon className="text-large" />}
            onPress={() => {
              router.push("/app/projects?openModal=true");
            }}
          >
            New Project
          </DropdownItem>
        </DropdownSection>

        <DropdownSection aria-label="Preferences" showDivider>
          <DropdownItem key="quick_search" shortcut="⌘K">
            Quick search
          </DropdownItem>
          <DropdownItem
            isReadOnly
            onClick={toggleTheme}
            key="theme"
            endContent={
              <div className="border border-foreground-300 p-1 rounded-lg">
                <div className="w-[15px] h-[15px] flex items-center justify-center text-foreground-500 hover:text-foreground hover:cursor-pointer transition-all">
                  {isDarkMode ? (
                    <MoonIcon className="w-full h-full" />
                  ) : (
                    <SunIcon className="w-full h-full" />
                  )}
                </div>
              </div>
            }
          >
            Theme
          </DropdownItem>
        </DropdownSection>

        <DropdownSection aria-label="Help & Feedback">
          <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
          <DropdownItem key="logout" onPress={signOut} color="danger">
            Log Out
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
