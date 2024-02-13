import { Input } from "@nextui-org/react";
import { useState, useEffect, useRef } from "react";
import { SearchIcon } from "../Icons/SearchIcon";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const SearchBox = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const projects = useSelector((state) => state.user.projects);
  const router = useRouter();
  const selectedRef = useRef(null);

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

  const handleProjectClick = (project) => {
    setQuery(project.projectName);
    onSearch(project.projectName);
    // Navigate to the selected project
    router.push(`/app/projects/${project.id}`);
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
    }
  };

  const handleMouseEnter = (index) => {
    setSelectedProjectIndex(index);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <>
      <div className="border border-foreground-300 text-foreground-500 flex items-center justify-center w-12 text-tiny rounded-md mt-4 ml-3 pb-[2px]">
        Home
      </div>
      <Input
        variant="underlined"
        autoFocus
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="What are you looking for?"
        className=""
        classNames={{ input: "px-3 text-lg font-medium" }}
      />
      <ul className="p-3 flex flex-col gap-2 overflow-auto">
        {filteredProjects.map((project, index) => (
          <li
            key={project.id} // Assuming project objects have unique identifiers
            ref={index === selectedProjectIndex ? selectedRef : null}
            onClick={() => handleProjectClick(project)}
            onMouseEnter={() => handleMouseEnter(index)}
            className={`flex flex-row gap-4 hover:cursor-pointer items-center rounded-lg p-2 py-4 transition-all ${index === selectedProjectIndex ? "bg-blue-500" : "bg-foreground-100"}`}
          >
            <SearchIcon/>
            <p className="text-base font-light">{project.projectName}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SearchBox;
