import { useState } from "react";
import "./NewTaskForm.css";

function NewTaskForm({ addTask = () => {} }) {
  const [label, setLabel] = useState("");
  const [min, setMin] = useState("");
  const [sec, setSec] = useState("");

  const onLabelChange = (e) => {
    setLabel(e.target.value);
  };

  const onMinChange = (e) => {
    setMin(e.target.value);
  };

  const onSecChange = (e) => {
    setSec(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (label !== "" && min !== "" && sec !== "") {
      addTask(label.trim(), min.trim(), sec.trim());
      setLabel("");
      setMin("");
      setSec("");
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form name="new-todo-form" className="new-todo-form" type="sumbit" onSubmit={onSubmit}>
        <input
          className="new-todo"
          name="new-todo"
          placeholder="What needs to be done?"
          onChange={onLabelChange}
          value={label}
        />
        <input
          className="new-todo-form__timer"
          name="new-todo-form__min"
          type="number"
          placeholder="Min"
          onChange={onMinChange}
          value={min}
        />
        <input
          className="new-todo-form__timer"
          name="new-todo-form__sec"
          type="number"
          placeholder="Sec"
          onChange={onSecChange}
          value={sec}
        />
        <input className="hidden" type="submit" />
      </form>
    </header>
  );
}

export default NewTaskForm;
