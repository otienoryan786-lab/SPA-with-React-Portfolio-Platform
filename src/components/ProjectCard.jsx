export default function ProjectCard({ project }) {
  const initials = project.title
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <li className="project-card">
      <div className="thumb" aria-hidden="true">{initials}</div>
      <div className="project-text">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>
    </li>
  );
}
