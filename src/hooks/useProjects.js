import { useEffect, useState } from "react";
import initialProjects from "../data/initialProjects";

const STORAGE_KEY = "project-showcase:projects";

function isProjectList(value) {
  if (!Array.isArray(value)) return false;

  const ids = new Set();
  return value.every((project) => {
    if (
      !project ||
      !Number.isSafeInteger(project.id) ||
      project.id < 1 ||
      typeof project.title !== "string" ||
      !project.title.trim() ||
      typeof project.description !== "string" ||
      !project.description.trim() ||
      ids.has(project.id)
    ) {
      return false;
    }

    ids.add(project.id);
    return true;
  });
}

function loadProjects() {
  try {
    const savedProjects = window.localStorage.getItem(STORAGE_KEY);
    if (savedProjects === null) return initialProjects;

    const parsedProjects = JSON.parse(savedProjects);
    return isProjectList(parsedProjects) ? parsedProjects : initialProjects;
  } catch (error) {
    console.warn("Could not load saved projects; showing starter projects.", error);
    return initialProjects;
  }
}

export default function useProjects() {
  const [projects, setProjects] = useState(loadProjects);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (error) {
      console.warn("Could not save projects to browser storage.", error);
    }
  }, [projects]);

  function addProject({ title, description }) {
    setProjects((currentProjects) => {
      const nextId =
        currentProjects.reduce((highestId, project) => Math.max(highestId, project.id), 0) + 1;
      return [{ id: nextId, title, description }, ...currentProjects];
    });
  }

  return { projects, addProject };
}
