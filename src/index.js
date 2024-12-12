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

  addTask = (text, min, sec) => {
    if (text !== "") {
      const newTask = this.createTask(text, min, sec);

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

  onPaused = (id) => {
    this.setState(({ taskData }) => {
      const idx = taskData.findIndex((el) => el.id === id);
      const oldTask = taskData[idx];
      const newTask = { ...oldTask, paused: true };

      const newArr = [...taskData.slice(0, idx), newTask, ...taskData.slice(idx + 1)];

      return {
        taskData: newArr,
      };
    });
  };

  offPaused = (id) => {
    const { taskData } = this.state;
    this.setState(() => {
      const idx = taskData.findIndex((el) => el.id === id);
      const oldTask = taskData[idx];
      const newTask = { ...oldTask, paused: false };

      const newArr = [...taskData.slice(0, idx), newTask, ...taskData.slice(idx + 1)];

      return {
        taskData: newArr,
      };
    });
    this.tick(id);
  };

  tick = (id) => {
    const timerId = setInterval(() => {
      const { taskData } = this.state;
      const idx = taskData.findIndex((el) => el.id === id);
      const { min, sec, paused } = taskData[idx];
      if (paused) return clearInterval(timerId);

      if ((min === 0 || min === "0") && sec === 0) {
        this.setState(() => {
          const oldTask = taskData[idx];
          const newTask = { ...oldTask, paused: true };

          const newArr = [...taskData.slice(0, idx), newTask, ...taskData.slice(idx + 1)];

          return {
            taskData: newArr,
          };
        });
        return clearInterval(timerId);
      }

      if (sec === 0) {
        this.setState(() => {
          const oldTask = taskData[idx];
          const newTask = { ...oldTask, min: min - 1, sec: 59 };

          const newArr = [...taskData.slice(0, idx), newTask, ...taskData.slice(idx + 1)];

          return {
            taskData: newArr,
          };
        });
      } else {
        this.setState(() => {
          const oldTask = taskData[idx];
          const newTask = { ...oldTask, sec: sec - 1 };

          const newArr = [...taskData.slice(0, idx), newTask, ...taskData.slice(idx + 1)];

          return {
            taskData: newArr,
          };
        });
      }
      return 1;
    }, 1000);
  };

  createTask(label, min, sec) {
    return {
      label,
      editing: false,
      checked: false,
      creationTime: new Date(),
      id: this.maxId++,
      min,
      sec,
      paused: true,
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
            onPaused={this.onPaused}
            offPaused={this.offPaused}
            tick={this.tick}
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
