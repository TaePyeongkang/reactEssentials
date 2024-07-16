import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSideBar from "./components/ProjectsSideBar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProject: undefined,
    projects: [],
  });

  function handleStartAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProject: null,
      };
    });
  }

  function handleAddProject(projectData) {
	setProjectsState(prevState => {
		const projectId = Math.random();
		const newProject = {
			...projectData,
			id: projectId,
		};
		return {
			...prevState,
			selectedProjectId: undefined,
			projects: [...prevState.projects, newProject]
		}
	});
  }

  function handleCancelProject() {
	setProjectsState((prevState) => {
		return {
		  ...prevState,
		  selectedProject: undefined,
		};
	  });
  }
  function handleSelectedProject(id) {
	setProjectsState((prevState) => {
		return {
		  ...prevState,
		  selectedProjectId: id,
		};
	  });
  }

  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId);

  let content = <SelectedProject project={selectedProject}/>;

  if (projectsState.selectedProject === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelProject}/>;
  } else if (projectsState.selectedProject === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSideBar onStartAddProject={handleStartAddProject} projects={projectsState.projects} 
	  onSelectProject={handleSelectedProject}/>
      {content}
    </main>
  );
}

export default App;
