import "./index.css";

import { createRoot } from "react-dom/client";
import { useState } from "react";

import NewTaskForm from "./components/NewTaskForm/NewTaskForm";
import TaskList from "./components/TaskList/TaskList";
import Footer from "./components/Footer/Footer";

function App() {
  const [taskData, setTaskData] = useState([]);
  const [filterName, setFilter] = useState("all");
  const [maxId, setMaxId] = useState(400);

  const createTask = (label, min, sec) => {
    setMaxId((num) => num + 1);
    return {
      label,
      editing: false,
      checked: false,
      creationTime: new Date(),
      id: maxId,
      min,
      sec,
      paused: true,
    };
  };

  const addTask = (text, min, sec) => {
    if (text !== "") {
      const newTask = createTask(text, min, sec);
      setTaskData((s) => {
        const newArr = [...s, newTask];
        return newArr;
      });
    }
  };

  const editTask = (id, text) => {
    setTaskData((s) => {
      const idx = s.findIndex((el) => el.id === id);
      const oldTask = s[idx];
      const newTask = { ...oldTask, label: text, editing: false };

      const newArr = [...s.slice(0, idx), newTask, ...s.slice(idx + 1)];
      return newArr;
    });
  };

  const deleteTask = (id) => {
    setTaskData((s) => {
      const idx = s.findIndex((el) => el.id === id);

      const newArray = [...s.slice(0, idx), ...s.slice(idx + 1)];
      return newArray;
    });
  };

  const onToggleCheck = (id) => {
    setTaskData((s) => {
      const idx = s.findIndex((el) => el.id === id);
      const oldTask = s[idx];
      const newTask = { ...oldTask, checked: !oldTask.checked };

      const newArr = [...s.slice(0, idx), newTask, ...s.slice(idx + 1)];

      return newArr;
    });
  };

  const clearCompleted = () => {
    setTaskData((s) => {
      const newArray = s.filter((task) => !task.checked);
      return newArray;
    });
  };

  const onToggleEdit = (id) => {
    setTaskData((s) => {
      const idx = s.findIndex((el) => el.id === id);
      const oldTask = s[idx];
      const newTask = { ...oldTask, editing: !oldTask.editing };

      const newArr = [...s.slice(0, idx), newTask, ...s.slice(idx + 1)];
      return newArr;
    });
  };

  const onFilterChange = (filter) => {
    setFilter(filter);
  };

  const tick = (id) => {
    const idx = taskData.findIndex((el) => el.id === id);
    const { min, sec, paused } = taskData[idx];
    if (paused) return;

    if ((min === 0 || min === "0") && sec === 0) {
      setTaskData((s) => {
        const oldTask = s[idx];
        const newTask = { ...oldTask, paused: true };

        const newArr = [...s.slice(0, idx), newTask, ...s.slice(idx + 1)];
        return newArr;
      });
      return;
    }

    if (sec === 0) {
      setTaskData((s) => {
        const oldTask = s[idx];
        const newTask = { ...oldTask, min: min - 1, sec: 59 };

        const newArr = [...s.slice(0, idx), newTask, ...s.slice(idx + 1)];
        return newArr;
      });
    } else {
      setTaskData((s) => {
        const oldTask = s[idx];
        const newTask = { ...oldTask, sec: sec - 1 };

        const newArr = [...s.slice(0, idx), newTask, ...s.slice(idx + 1)];
        return newArr;
      });
    }
  };

  const onPaused = (id) => {
    setTaskData((s) => {
      const idx = s.findIndex((el) => el.id === id);
      const oldTask = s[idx];
      const newTask = { ...oldTask, paused: true };

      const newArr = [...s.slice(0, idx), newTask, ...s.slice(idx + 1)];
      return newArr;
    });
  };

  const offPaused = (id) => {
    setTaskData((s) => {
      const idx = s.findIndex((el) => el.id === id);
      const oldTask = s[idx];
      const newTask = { ...oldTask, paused: false };

      const newArr = [...s.slice(0, idx), newTask, ...s.slice(idx + 1)];
      return newArr;
    });
  };

  const updateTimer = (id, seconds) => {
    const idx = taskData.findIndex((el) => el.id === id);
    const { min, sec } = taskData[idx];
    const leftSeconds = min * 60 + sec;

    if (seconds >= 1 && seconds < 60 && seconds < leftSeconds) {
      setTaskData((s) => {
        const oldTask = s[idx];
        const newTask = { ...oldTask, sec: sec - seconds };

        const newArr = [...s.slice(0, idx), newTask, ...s.slice(idx + 1)];
        return newArr;
      });
      return;
    }

    if (seconds >= 60 && seconds < leftSeconds) {
      setTaskData((s) => {
        const oldTask = s[idx];
        const newTask = { ...oldTask, sec: Math.floor(seconds / 60), min: seconds % 60 };

        const newArr = [...s.slice(0, idx), newTask, ...s.slice(idx + 1)];
        return newArr;
      });
      return;
    }

    if (min !== 0 && sec !== 0 && seconds >= leftSeconds) {
      setTaskData((s) => {
        const oldTask = s[idx];
        const newTask = { ...oldTask, sec: 0, min: 0 };

        const newArr = [...s.slice(0, idx), newTask, ...s.slice(idx + 1)];
        return newArr;
      });
      localStorage.removeItem(`task ${id}`);
    }
  };

  const changeFilterName = (items, name) => {
    switch (name) {
      case "all":
        return items;
      case "active":
        return items.filter((item) => !item.checked);
      case "completed":
        return items.filter((item) => item.checked);
      default:
        return items;
    }
  };

  const taskCount = taskData.filter((el) => !el.checked).length;
  const visibleTasks = changeFilterName(taskData, filterName);

  return (
    <>
      <NewTaskForm addTask={addTask} />
      <section className="main">
        <TaskList
          tasks={visibleTasks}
          onDeleted={deleteTask}
          onToggleCheck={onToggleCheck}
          onToggleEdit={onToggleEdit}
          editTask={editTask}
          onPaused={onPaused}
          offPaused={offPaused}
          tick={tick}
          updateTimer={updateTimer}
        />
        <Footer
          tasks={taskCount}
          filterName={changeFilterName()}
          onFilterChange={onFilterChange}
          clearCompleted={clearCompleted}
        />
      </section>
    </>
  );
}

const app = document.querySelector(".todoapp");
const root = createRoot(app);
root.render(<App />);

export default App;
