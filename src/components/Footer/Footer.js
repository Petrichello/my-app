import TasksFilter from "../TasksFilter/TasksFilter";

import "./Footer.css";

function Footer({ tasks = 0, clearCompleted = () => {}, filterName, onFilterChange }) {
  return (
    <footer className="footer">
      <span className="todo-count">{tasks} items left</span>
      <TasksFilter filterName={filterName} onFilterChange={onFilterChange} />
      <button type="button" className="clear-completed" onClick={() => clearCompleted()}>
        Clear completed
      </button>
    </footer>
  );
}

export default Footer;
