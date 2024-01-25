import React from "react";
import {Switch, VisuallyHidden, toggle, useSwitch} from "@nextui-org/react";
import { MoonIcon } from "../Icons/MoonIcon";
import { SunIcon } from "../Icons/SunIcon";
import { useSelector } from "react-redux";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

const ThemeSwitch = (props) => {
  const {
    Component, 
    slots, 
    isSelected, 
    getBaseProps, 
    getInputProps, 
    getWrapperProps
  } = useSwitch(props);

  const isDarkMode = useSelector((state) => state.user?.data?.darkMode);
  const uid = useSelector((state) => state.user?.auth?.uid);

  const toggleTheme = async () => {
    try {
      const userRef = doc(db, "users", uid);
      const docSnap = await getDoc(userRef);
      const currentData = docSnap.data();
      await updateDoc(userRef, {
        darkMode: !currentData.darkMode,
      });
    } catch (e) {
      console.error("Error updating darkMode: ", e);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Component {...getBaseProps()}>
          <VisuallyHidden>
            <input {...getInputProps()} onChange={toggleTheme} />
          </VisuallyHidden>
          <div
            {...getWrapperProps()}
            className={slots.wrapper({
              class: [
                "w-8 h-8",
                "flex items-center justify-center",
                "rounded-lg bg-default-100 hover:bg-default-200",
              ],
            })}
          >
            {isSelected ? <SunIcon/> : <MoonIcon/>}
          </div>
      </Component>
    </div>
  )
}


export default function App() {
  return <ThemeSwitch/>
}
