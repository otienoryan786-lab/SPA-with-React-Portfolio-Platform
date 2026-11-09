import { useState } from "react";
import Header from "./components/Header";
import ProjectForm from "./components/ProjectForm";
import ProjectList from "./components/ProjectList";
import SearchBar from "./components/SearchBar";
import useProjects from "./hooks/useProjects";

export default function App() {
  const { projects, addProject } = useProjects();
  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const searchTerm = query.trim().toLocaleLowerCase();
  const matchingProjects = projects.filter(
    (project) =>
      project.title.toLocaleLowerCase().includes(searchTerm) ||
      project.description.toLocaleLowerCase().includes(searchTerm)
  );
  const visibleProjects = [...matchingProjects].sort((first, second) =>
    sortOrder === "title"
      ? first.title.localeCompare(second.title)
      : second.id - first.id
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
          <div className="list-toolbar">
            <SearchBar query={query} onQueryChange={setQuery} />
            <label className="sort-control">
              <span>Sort</span>
              <select
                aria-label="Sort projects"
                value={sortOrder}
                onChange={(event) => setSortOrder(event.target.value)}
              >
                <option value="newest">Newest</option>
                <option value="title">Title A–Z</option>
              </select>
            </label>
          </div>
          <p className="result-count" aria-live="polite">
            Showing {visibleProjects.length} of {projects.length} {projects.length === 1 ? "project" : "projects"}
          </p>
          <ProjectList
            projects={visibleProjects}
            isFiltered={searchTerm.length > 0}
          />
        </section>
      </main>
    </>
  );
}
