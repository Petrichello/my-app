import "./index.css";

import { createRoot } from "react-dom/client";
import React from "react";

import NewTaskForm from "./components/NewTaskForm/NewTaskForm";
import TaskList from "./components/TaskList/TaskList";
import Footer from "./components/Footer/Footer";

export default class App extends React.Component {
  maxId = 100;

  state = {
    taskData: [],
    filter: "all",
  };

  addTask = (text) => {
    if (text !== "") {
      const newTask = this.createTask(text);

      this.setState(({ taskData }) => {
        const newArr = [...taskData, newTask];

        return {
          taskData: newArr,
        };
      });
    }
  };

  editTask = (id, text) => {
    this.setState(({ taskData }) => {
      const idx = taskData.findIndex((el) => el.id === id);
      const oldTask = taskData[idx];
      const newTask = { ...oldTask, label: text, editing: false };

      const newArr = [...taskData.slice(0, idx), newTask, ...taskData.slice(idx + 1)];

      return {
        taskData: newArr,
      };
    });
  };

  deleteTask = (id) => {
    this.setState(({ taskData }) => {
      const idx = taskData.findIndex((el) => el.id === id);

      const newArray = [...taskData.slice(0, idx), ...taskData.slice(idx + 1)];

      return {
        taskData: newArray,
      };
    });
  };

  onToggleCheck = (id) => {
    this.setState(({ taskData }) => {
      const idx = taskData.findIndex((el) => el.id === id);
      const oldTask = taskData[idx];
      const newTask = { ...oldTask, checked: !oldTask.checked };

      const newArr = [...taskData.slice(0, idx), newTask, ...taskData.slice(idx + 1)];

      return {
        taskData: newArr,
      };
    });
  };

  clearCompleted = () => {
    this.setState(({ taskData }) => {
      const newArray = taskData.filter((task) => !task.checked);

      return {
        taskData: newArray,
      };
    });
  };

  onToggleEdit = (id) => {
    this.setState(({ taskData }) => {
      const idx = taskData.findIndex((el) => el.id === id);
      const oldTask = taskData[idx];
      const newTask = { ...oldTask, editing: !oldTask.editing };

      const newArr = [...taskData.slice(0, idx), newTask, ...taskData.slice(idx + 1)];

      return {
        taskData: newArr,
      };
    });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  createTask(label) {
    return {
      label,
      editing: false,
      checked: false,
      creationTime: new Date(),
      id: this.maxId++,
    };
  }

  filter(items, filter) {
    switch (filter) {
      case "all":
        return items;
      case "active":
        return items.filter((item) => !item.checked);
      case "completed":
        return items.filter((item) => item.checked);
      default:
        return items;
    }
  }

  render() {
    const { taskData, filter } = this.state;
    const taskCount = taskData.filter((el) => !el.checked).length;
    const visibleTasks = this.filter(taskData, filter);

    return (
      <>
        <NewTaskForm addTask={this.addTask} />
        <section className="main">
          <TaskList
            tasks={visibleTasks}
            onDeleted={this.deleteTask}
            onToggleCheck={this.onToggleCheck}
            onToggleEdit={this.onToggleEdit}
            editTask={this.editTask}
          />
          <Footer
            tasks={taskCount}
            filter={filter}
            onFilterChange={this.onFilterChange}
            clearCompleted={this.clearCompleted}
          />
        </section>
      </>
    );
  }
}

const app = document.querySelector(".todoapp");
const root = createRoot(app);
root.render(<App />);
