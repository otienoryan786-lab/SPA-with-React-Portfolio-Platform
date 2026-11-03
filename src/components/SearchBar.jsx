export default function SearchBar({ query, onQueryChange }) {
  return (
    <div className="search-bar">
      <label className="visually-hidden" htmlFor="project-search">
        Search projects
      </label>
      <input
        id="project-search"
        type="search"
        placeholder="Search projects"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
      />
    </div>
  );
}
