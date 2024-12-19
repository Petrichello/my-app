import Task from "../Task/Task";

import "./TaskList.css";

function TaskList({
  tasks = [],
  onDeleted,
  onToggleCheck,
  onToggleEdit,
  editTask,
  onPaused,
  offPaused,
  tick,
  updateTimer,
  timerId,
}) {
  const elements = tasks.map((element) => {
    const { id } = element;

    return (
      <Task
        key={id}
        {...element}
        timerId={timerId}
        onDeleted={() => onDeleted(id)}
        onToggleCheck={() => onToggleCheck(id)}
        onToggleEdit={() => onToggleEdit(id)}
        onPaused={() => onPaused(id)}
        offPaused={() => offPaused(id)}
        tick={() => tick(id)}
        editTask={editTask}
        updateTimer={updateTimer}
      />
    );
  });

  return <ul className="todo-list">{elements}</ul>;
}

export default TaskList;
