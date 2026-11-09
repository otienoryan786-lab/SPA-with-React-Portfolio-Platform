import ProjectCard from "./ProjectCard";

export default function ProjectList({ projects, isFiltered }) {
  if (projects.length === 0) {
    return (
      <p className="empty-state" role="status">
        {isFiltered
          ? "No projects match your search. Try another word."
          : "No projects yet. Add your first project to get started."}
      </p>
    );
  }

  return (
    <ul className="project-list" aria-label="Project list">
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          style={{ "--item-index": index }}
        />
      ))}
    </ul>
  );
}
