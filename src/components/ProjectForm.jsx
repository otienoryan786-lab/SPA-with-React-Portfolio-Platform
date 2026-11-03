import { useState } from "react";

export default function ProjectForm({ onAddProject }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const cleanTitle = title.trim();
    const cleanDescription = description.trim();

    if (!cleanTitle || !cleanDescription) {
      setError("Enter both a project title and description.");
      return;
    }

    onAddProject({ title: cleanTitle, description: cleanDescription });
    setTitle("");
    setDescription("");
    setError("");
  }

  return (
    <section className="panel form-panel" aria-labelledby="add-project-heading">
      <p className="eyebrow">Share your work</p>
      <h2 id="add-project-heading">Add a project</h2>
      <p className="form-intro">Add a little detail to your collection.</p>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="project-title">Project title</label>
        <input
          id="project-title"
          type="text"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
            setError("");
          }}
          maxLength={100}
        />
        <label htmlFor="project-description">Description</label>
        <textarea
          id="project-description"
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
            setError("");
          }}
          maxLength={500}
        />
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="btn" type="submit">Add project</button>
      </form>
    </section>
  );
}
