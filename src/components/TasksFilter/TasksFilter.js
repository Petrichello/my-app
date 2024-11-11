import React from "react";
import "./TasksFilter.css";
import PropTypes from "prop-types";

export default class TasksFilter extends React.Component {
  static defaultProps = {
    filter: "all",
    onFilterChange: () => {},
  };

  static propTypes = {
    filter: PropTypes.oneOf(["all", "active", "completed"]),
    onFilterChange: PropTypes.func,
  };

  buttons = [
    { name: "all", label: "All" },
    { name: "active", label: "Active" },
    { name: "completed", label: "Completed" },
  ];

  render() {
    const { filter, onFilterChange } = this.props;

    const buttons = this.buttons.map(({ name, label }) => {
      const isActive = filter === name;
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
}
