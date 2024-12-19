import "./TasksFilter.css";

function TasksFilter({ filterName = "all", onFilterChange = () => {} }) {
  const buttonsName = [
    { name: "all", label: "All" },
    { name: "active", label: "Active" },
    { name: "completed", label: "Completed" },
  ];

  const buttons = buttonsName.map(({ name, label }) => {
    const isActive = filterName === name;
    const classNames = isActive ? "selected" : "";

    return (
      <li key={name}>
        <button type="button" className={classNames} onClick={() => onFilterChange(name)}>
          {label}
        </button>
      </li>
    );
  });

  return <ul className="filters">{buttons}</ul>;
}

export default TasksFilter;
