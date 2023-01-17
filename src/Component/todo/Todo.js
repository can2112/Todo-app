import React, { useEffect, useState } from "react";
import Taskbar from "./Taskbar";
import style from "./todo.module.css";
import { IoIosAdd } from "react-icons/io";

function Todo() {
  const [task, setTask] = useState("");
  const [data, setData] = useState([]);

  function handleChange(e) {
    setTask(e.target.value);
  }

  function loadTasks() {
    let savedTask = localStorage.getItem("Task:saved");
    if (savedTask) {
      setData(JSON.parse(savedTask));
    }
  }

  function addTasks(newTask) {
    localStorage.setItem("Task:saved", JSON.stringify(newTask));
    setData(newTask);
  }

  function handleSubmit(e) {
    let incomingData = {
      task: task,
      id: crypto.randomUUID(),
      completed: false,
    };
    e.preventDefault();
    let newData = [...data, incomingData];
    addTasks(newData);
    setTask("");
  }

  function removeTask(id) {
    const removed = data.filter((res) => res.id !== id);
    addTasks(removed);
  }

  const onChangeCompleted = (taskId) => {
    const updatedTask = [...data];
    updatedTask[taskId].completed = !updatedTask[taskId].completed;
    setData(updatedTask);
    addTasks(updatedTask);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className={style.container}>
      <h2 style={{ color: "white" }}>TODOLIST</h2>
      <form onSubmit={handleSubmit}>
        <div className={style.cover}>
          <input
            type="text"
            className={style.search}
            name="task"
            value={task}
            placeholder="Name of task..."
            onChange={(e) => handleChange(e)}
          />
          <button className={style.button} type="submit">
            <IoIosAdd color="white" size={35} />
            <p>Add</p>
          </button>
        </div>
      </form>
      <hr style={{ width: "52%", borderRadius: "5px" }} />
      {data.map((res, index) => {
        return (
          <div key={index}>
            <Taskbar
              task={res.task}
              remove={removeTask}
              id={index}
              removeId={res.id}
              change={onChangeCompleted}
              completed={res.completed}
              data={data}
            />
          </div>
        );
      })}
    </div>
  );
}

export default Todo;
