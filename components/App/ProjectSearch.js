import {
  Divider,
  Input,
  Kbd,
  Modal,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";
import { useState, useEffect, useRef } from "react";
import { SearchIcon } from "../Icons/SearchIcon";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { PiVideoFill } from "react-icons/pi";
import Image from "next/image";
import { getFlagCode } from "@/helpers/getFlag";
import {
  clearUserData,
  setOpenCommandCenter,
  setOpenProjectSearch,
} from "@/reducers/userSlice";
import { GrProjects } from "react-icons/gr";
import { ImShift } from "react-icons/im";
import { Commands } from "@/helpers/Commands";
import { auth } from "@/firebase";
import { HiMiniArrowLongRight } from "react-icons/hi2";

const ProjectSearch = ({}) => {
  const [query, setQuery] = useState("");
  const [filteredCommands, setFilteredCommands] = useState([]);
  const isDarkMode = useSelector((state) => state.user.darkMode);
  const [selectedCommandIndex, setSelectedCommandIndex] = useState(0);
  const router = useRouter();
  const dispatch = useDispatch();
  const selectedRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const openProjectSearch = useSelector(
    (state) => state.user.openProjectSearch
  );
  const projects = useSelector((state) => state.user.projects);

  useEffect(() => {
    if (openProjectSearch) {
      onOpen();
      dispatch(setOpenProjectSearch(false));
    }
  }, [dispatch, onOpen, openProjectSearch]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.shiftKey && event.key === "P") {
        event.preventDefault();
        setQuery("");
        setFilteredCommands(projects);
        onOpen();
      } else if (event.shiftKey && event.key === "D") {
        event.preventDefault();
        router.push("/app/dashboard");
      } else if (isOpen) {
        if (event.key === "ArrowDown") {
          event.preventDefault();
          setSelectedCommandIndex((prevIndex) =>
            prevIndex < filteredCommands.length - 1 ? prevIndex + 1 : prevIndex
          );
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          setSelectedCommandIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : prevIndex
          );
        } else if (event.key === "Enter" && selectedCommandIndex !== -1) {
          handleCommandClick(filteredCommands[selectedCommandIndex]);
        } else if (event.key === "Escape") {
          setQuery("");
          onClose();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, selectedCommandIndex, filteredCommands]);

  useEffect(() => {
    setFilteredCommands(projects);
  }, [projects]);

  useEffect(() => {
    if (selectedRef.current) {
      selectedRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedCommandIndex]);

  const handleChange = (event) => {
    const query = event.target.value;
    setQuery(query);
    const filtered = projects.filter((project) =>
      project.projectName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCommands(filtered);
    setSelectedCommandIndex(filtered.length > 0 ? 0 : -1); // Set selected command index to the first command or -1 if no commands
  };

  const handleCommandClick = (project) => {
    router.push(`/app/projects/${project.id}`);
    onClose();
  };

  const handleMouseEnter = (index) => {
    setSelectedCommandIndex(index);
  };

  return (
    <Modal
      size="2xl"
      isOpen={isOpen}
      onClose={onClose}
      className={`${
        isDarkMode
          ? "dark bg-black border border-foreground-200"
          : "light bg-white border border-foreground-300"
      } text-foreground max-h-[30rem]`}
      hideCloseButton
      scrollBehavior="normal"
      // backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <div className="flex flex-row items-center mt-3">
              <input
                autoFocus
                value={query}
                onChange={handleChange}
                placeholder="Search for a project..."
                className="text-lg w-full bg-white dark:bg-black focus:outline-none pl-4"
              />
              <div className="border border-foreground-300 text-sm flex items-center justify-center px-1 h-5 text-foreground dark:bg-black rounded-md mr-3 ml-2">
                Esc
              </div>
            </div>
            <Divider className="mt-2" />
            <ul className="p-3 flex flex-col gap-1 overflow-auto">
              {filteredCommands?.map((project, index) => (
                <>
                  <li
                    key={index}
                    ref={index === selectedCommandIndex ? selectedRef : null}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onClick={() => handleCommandClick(project)}
                    className={`flex flex-row gap-2 hover:cursor-pointer items-center justify-between rounded-lg px-3 py-2 ${
                      index === selectedCommandIndex
                        ? "bg-foreground-100 dark:bg-foreground-50"
                        : ""
                    }`}
                  >
                    <div className="flex flex-row gap-2 items-center">
                      <Image
                        alt="flag"
                        height={1000}
                        radius="sm"
                        src={`/new logo transparent.png`}
                        width={1000}
                        className="w-6 h-6 rounded-full mr-2"
                      />
                      <p className="text-sm font-medium">{project.projectName}</p>
                    </div>
                    <div className="flex flex-row items-center">
                      <p className="mr-8 text-foreground-500 text-sm">
                        {project.date.toDate().toLocaleDateString()}
                      </p>
                      <div className="flex flex-row gap-2 items-center">
                        <Image
                          alt="flag"
                          height={1000}
                          radius="sm"
                          src={`https://flagcdn.com/${getFlagCode(
                            project.originalLanguage
                          )}.svg`}
                          width={1000}
                          className="w-6 h-6 rounded-full"
                        />
                        <HiMiniArrowLongRight size={20} />
                        <Image
                          alt="flag"
                          height={1000}
                          radius="sm"
                          src={`https://flagcdn.com/${getFlagCode(
                            project.translationLanguage
                          )}.svg`}
                          width={1000}
                          className="w-6 h-6 rounded-full"
                        />
                      </div>
                    </div>
                  </li>
                </>
              ))}
              {filteredCommands?.length === 0 && (
                <>
                  <p className="text-foreground-500 text-center mt-4">
                    No results found for &quot;
                    <span className="font-medium">{query}</span>&quot;.
                  </p>
                  <p className="text-foreground-500 text-center text-sm mt-1 mb-4">
                    Try searching for something else.
                  </p>
                </>
              )}
            </ul>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ProjectSearch;
