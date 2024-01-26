import React from "react";
import { MoonIcon } from "../Icons/MoonIcon";
import { SunIcon } from "../Icons/SunIcon";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode } from "@/reducers/userSlice";

export default function ThemeSwitch() {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.user?.darkMode);

  const toggleTheme = async () => {
    const newMode = !isDarkMode;
    dispatch(setDarkMode(newMode));
    localStorage.setItem("userDarkModePreference", newMode.toString());
  };

  return (
    <div
      className="w-[22px] h-[22px] flex items-center justify-center text-foreground-500 hover:text-foreground hover:cursor-pointer transition-all"
      onClick={toggleTheme}
    >
      {isDarkMode ? (
        <MoonIcon className="w-full h-full" />
      ) : (
        <SunIcon className="w-full h-full" />
      )}
    </div>
  );
};