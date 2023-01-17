import React from "react";
import style from "./todo.module.css";
import { RiDeleteBin6Line } from "react-icons/ri";

function Taskbar({ task, id, remove, change, completed,removeId}) {
  return (
    <div className={`${style.task} ${completed ? style.completed : ""}`}>
      <div className={style.wrapper}>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <form>
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => change(id)}
              style={{ cursor: "pointer" }}
            />
          </form>
          <p className={style.text}>{task}</p>
        </div>
        <div style={{ cursor: "pointer" }} onClick={() => remove(removeId)}>
          <RiDeleteBin6Line size={20} color={"red"} />
        </div>
{console.log(id)}
      </div>
    </div>
  );
}

export default Taskbar;
