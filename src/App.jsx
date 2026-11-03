import { useState } from "react";
import Header from "./components/Header";
import ProjectForm from "./components/ProjectForm";
import ProjectList from "./components/ProjectList";
import SearchBar from "./components/SearchBar";
import useProjects from "./hooks/useProjects";

export default function App() {
  const { projects, addProject } = useProjects();
  const [query, setQuery] = useState("");
  const searchTerm = query.trim().toLocaleLowerCase();
  const visibleProjects = projects.filter(
    (project) =>
      project.title.toLocaleLowerCase().includes(searchTerm) ||
      project.description.toLocaleLowerCase().includes(searchTerm)
  );

  return (
    <>
      <Header />
      <main className="layout">
        <ProjectForm onAddProject={addProject} />
        <section className="panel list-panel" aria-label="Projects">
          <div className="list-heading">
            <div>
              <p className="eyebrow">Selected work</p>
              <h2>Recent projects</h2>
            </div>
            <span className="project-count">
              {projects.length} {projects.length === 1 ? "project" : "projects"}
            </span>
          </div>
          <SearchBar query={query} onQueryChange={setQuery} />
          <ProjectList
            projects={visibleProjects}
            isFiltered={searchTerm.length > 0}
          />
        </section>
      </main>
    </>
  );
}
