import {
  Divider,
  Input,
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
import { setOpenCommandCenter } from "@/reducers/userSlice";

const SearchBox = ({}) => {
  const [query, setQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const isDarkMode = useSelector((state) => state.user.darkMode);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const projects = useSelector((state) => state.user.projects);
  const router = useRouter();
  const dispatch = useDispatch();
  const selectedRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const openCommandCenter = useSelector(
    (state) => state.user.openCommandCenter
  );

  useEffect(() => {
    if (openCommandCenter) {
      onOpen();
      dispatch(setOpenCommandCenter(false));
    }
  }, [dispatch, onOpen, openCommandCenter]);

  document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.key === "k") {
      // Prevent the default action
      event.preventDefault();

      // User pressed Ctrl+K
      console.log("Ctrl+K pressed");
      // Add your code here to handle the Ctrl+K key combination
      setQuery("");
      onOpen();
    }
    if (event.shiftKey && event.key === "D") {
      // Prevent the default action
      event.preventDefault();

      // User pressed Ctrl+K
      console.log("Shift+D pressed");
      // Add your code here to handle the Ctrl+K key combination
      router.push("/app/dashboard");
    }
    if (event.shiftKey && event.key === "P") {
      // Prevent the default action
      event.preventDefault();

      // User pressed Ctrl+K
      console.log("Shift+P pressed");
      // Add your code here to handle the Ctrl+K key combination
      router.push("/app/projects");
    }
  });

  useEffect(() => {
    setFilteredProjects(projects);
  }, [projects]);

  useEffect(() => {
    if (selectedRef.current) {
      selectedRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedProjectIndex]);

  const handleChange = (event) => {
    const query = event.target.value;
    setQuery(query);
    const filtered = projects.filter((project) =>
      project.projectName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProjects(filtered);
    setSelectedProjectIndex(filtered.length > 0 ? 0 : -1); // Set selected project index to the first project or -1 if no projects
  };

  const handleProjectClick = async (project) => {
    setQuery(project.projectName);
    // Navigate to the selected project
    await router.push(`/app/projects/${project.id}`);
    onClose();
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      setSelectedProjectIndex((prevIndex) =>
        prevIndex < filteredProjects.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault(); // Prevent the cursor from moving to the beginning of the word
      setSelectedProjectIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    } else if (event.key === "Enter" && selectedProjectIndex !== -1) {
      handleProjectClick(filteredProjects[selectedProjectIndex]);
    } else if (event.key === "Escape") {
      setQuery("");
      console.log("Escape pressed");
      onClose();
    }
  };

  const handleMouseEnter = (index) => {
    setSelectedProjectIndex(index);
  };

  return (
    <Modal
      size="2xl"
      isOpen={isOpen}
      onClose={onClose}
      className={`${
        isDarkMode
          ? "dark bg-black border border-foreground-200"
          : "light bg-foreground-200"
      } text-foreground max-h-[30rem]`}
      hideCloseButton
      scrollBehavior="normal"
      // backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <div className="flex flex-row mt-3 mb-2">
              <input
                autoFocus
                value={query}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="What are you looking for?"
                className="text-lg w-full bg-foreground-200 dark:bg-black focus:outline-none pl-4"
              />
              <div className="border border-foreground-300 text-sm flex items-center justify-center px-2 text-foreground dark:bg-foreground-100 rounded-lg pb-[2px] mr-3 ml-2">
                Esc
              </div>
            </div>
            <Divider className="mt-2" />

            <ul className="p-3 flex flex-col gap-2 overflow-auto">
              {filteredProjects.map((project, index) => (
                <li
                  key={project.id} // Assuming project objects have unique identifiers
                  ref={index === selectedProjectIndex ? selectedRef : null}
                  onClick={() => handleProjectClick(project)}
                  onMouseEnter={() => handleMouseEnter(index)}
                  className={`flex flex-row gap-2 hover:cursor-pointer items-center justify-between rounded-lg p-2 py-3 ${
                    index === selectedProjectIndex
                      ? "bg-foreground-50"
                      : ""
                  }`}
                >
                  <div className="flex flex-row gap-2 items-center">
                    <PiVideoFill size={20} />
                    <p className="text-base font-light">
                      {project.projectName}
                    </p>
                  </div>
                  <div className="flex flex-row gap-4 items-center">
                    <p
                      className={`text-xs font-light ${
                        index === selectedProjectIndex
                          ? "text-white"
                          : "text-foreground-500"
                      }`}
                    >
                      {project.date.toDate().toLocaleDateString()}
                    </p>
                    <Image
                      alt="nextui logo"
                      height={40}
                      radius="sm"
                      src={`https://flagcdn.com/${getFlagCode(
                        project.translationLanguage
                      )}.svg`}
                      width={40}
                      className="w-6 h-6 rounded-full mr-5"
                    />
                  </div>
                </li>
              ))}
              {filteredProjects.length === 0 && (
                <div className="py-6">
                  <li className="text-center text-foreground">
                    No results found for &quot;{query}&quot;
                  </li>
                  <p className="text-foreground-400 text-center">
                    Try searching something else.
                  </p>
                </div>
              )}
            </ul>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default SearchBox;
