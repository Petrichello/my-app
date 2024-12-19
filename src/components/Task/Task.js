import { useState, useEffect } from "react";
import "./Task.css";
import { formatDistanceToNow } from "date-fns";
import classNames from "classnames";

function Task({
  label = "",
  onDeleted = () => {},
  onToggleCheck = () => {},
  onToggleEdit = () => {},
  editTask = () => {},
  tick = () => {},
  updateTimer = () => {},
  checked = false,
  editing = false,
  onPaused,
  offPaused,
  paused,
  creationTime,
  min,
  sec,
  id,
}) {
  const [name, setName] = useState(label);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem(`task ${id}`))) {
      // получать значения из ls
      const newTaskData = JSON.parse(localStorage.getItem(`task ${id}`));

      // вычислять разницу
      const newDate = Date.now();
      const diff = Math.floor((newDate - newTaskData.date) / 1000);

      // обновлять state в index.js
      updateTimer(id, diff);
    }

    const timerID = setInterval(() => tick(id), 1000);

    return () => {
      clearInterval(timerID);
      localStorage.removeItem(`task ${id}`);
      localStorage.setItem(
        `task ${id}`,
        JSON.stringify({
          sec: `${sec}`,
          min: `${min}`,
          date: Date.now(),
        })
      );
    };
  });

  const onLabelChange = (e) => {
    setName(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (name !== "") {
      editTask(id, name.trim());
    }
  };

  const btnClass = classNames({
    completed: checked,
    editing,
  });

  let dis = "";
  if (!paused) {
    dis = true;
  } else {
    dis = false;
  }

  return (
    <li className={btnClass}>
      <div className="view">
        <input className="toggle" type="checkbox" onClick={onToggleCheck} defaultChecked={checked} />
        <label>
          <span className="title">{name}</span>
          <span className="description">
            <button
              type="button"
              aria-label="Mute volume"
              className="icon icon-play"
              onClick={offPaused}
              disabled={dis}
            />
            <button
              type="button"
              aria-label="Mute volume"
              className="icon icon-pause"
              onClick={onPaused}
              disabled={!dis}
            />
            {`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`}
          </span>
          <span className="description">
            created{" "}
            {formatDistanceToNow(new Date(creationTime), {
              includeSeconds: true,
            })}{" "}
            ago
          </span>
        </label>
        <button type="button" aria-label="Mute volume" className="icon icon-edit" onClick={onToggleEdit} />
        <button type="button" aria-label="Mute volume" className="icon icon-destroy" onClick={onDeleted} />
      </div>
      <form name="form-edit" className="form" onSubmit={onSubmit}>
        <input type="text" className="edit" onChange={onLabelChange} defaultValue={label} />
      </form>
    </li>
  );
}

export default Task;
