import React from "react";
import "./Task.css";
import { formatDistanceToNow } from "date-fns";
import PropTypes from "prop-types";
import classNames from "classnames";

export default class Task extends React.Component {
  static defaultProps = {
    label: "",
    onDeleted: () => {},
    onToggleCheck: () => {},
    onToggleEdit: () => {},
    editTask: () => {},
    checked: false,
    editing: false,
  };

  static propTypes = {
    label: PropTypes.string,
    onDeleted: PropTypes.func,
    onToggleCheck: PropTypes.func,
    onToggleEdit: PropTypes.func,
    editTask: PropTypes.func,
    checked: PropTypes.bool,
    editing: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      label: props.label,
    };
  }

  componentWillUnmount() {
    const { timerId } = this.props;
    clearInterval(timerId);
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    const { editTask, id } = this.props;
    const { label } = this.state;
    e.preventDefault();
    if (label !== "") {
      editTask(id, label.trim());
      this.setState({
        label: "",
      });
    }
  };

  render() {
    const {
      label,
      onDeleted,
      onToggleCheck,
      checked,
      editing,
      onToggleEdit,
      creationTime,
      min,
      sec,
      paused,
      offPaused,
      onPaused,
    } = this.props;

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
            <span className="title">{label}</span>
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
        <form className="form" onSubmit={this.onSubmit}>
          <input type="text" className="edit" onChange={this.onLabelChange} defaultValue={label} />
        </form>
      </li>
    );
  }
}
