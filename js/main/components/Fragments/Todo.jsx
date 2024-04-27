import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import RiveAnimation from "./RiveAnimation";

const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: "",
    });
  };

  // Function to load and play the Rive animation
  const loadRiveAnimation = () => {
    if (window.rive) {
      new window.rive.Rive({
        src: "/task_list_states.riv",
        canvas: document.getElementById("canvas"),
        autoplay: true,
        layout: new window.rive.Layout({ fit: "cover", alignment: "center" }),
      });
    }
  };

  // Use useEffect to load the Rive animation when the component mounts
  useEffect(() => {
    loadRiveAnimation();
  }, []);

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  // Check if the todos array is empty
  if (todos.length === 0) {
    // Return the JSX for the canvas and the script to load the Rive animation
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <RiveAnimation />
      </div>
    );
  }

  return todos.map((todo, index) => (
    <div className={todo.isComplete ? "todo-row complete" : "todo-row"} key={index}>
      <div class="move-around">
        <svg height="0.95rem" xmlns="http://www.w3.org/2000/svg" viewBox="4 7 16 10.01">
          <title>Arange</title>
          <path
            d="M8 8H19M8 12H19M8 16H19M5 8V8.00999M5 12V12.01M5 16V16.01"
            stroke="#F84F39"
            stroke-width="1"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div key={todo.id} className="taskHolder" onClick={() => completeTodo(todo.id)}>
        {todo.text}
      </div>
      <div className="icons">
        <button onClick={() => setEdit({ id: todo.id, value: todo.text })} className="edit-icon">
          <svg height="0.95rem" xmlns="http://www.w3.org/2000/svg" viewBox="193.1 208.2 628.7 599">
            <title>edit</title>
            <path
              d="M335.4 744.4c17.8 13.3 37.1 24.5 57.6 33.4 14.6-11.9 30.9-21.4 48.5-28.5 22-8.8 45.1-13.2 68.5-13.2 43 0 84 14.7 117.1 41.7 20.4-8.9 39.7-20.1 57.5-33.4-2.9-18.7-3-37.7-0.3-56.6 3.4-23.5 11.1-45.8 22.8-66.2 11.7-20.5 27.1-38.3 45.6-53.1 15-11.9 31.3-21.2 49-28.1 1.3-11.4 2-22.6 2-33.5 0-10.9-0.7-22.1-2-33.5-17.6-6.8-34-16.2-48.9-28.1-18.6-14.8-34-32.7-45.7-53.1s-19.4-42.7-22.8-66.2c-2.8-18.9-2.6-37.9 0.3-56.6-17.8-13.3-37.1-24.5-57.6-33.4-33 27-74.1 41.7-117.1 41.7-23.5 0-46.6-4.5-68.5-13.2-17.6-7-33.9-16.6-48.5-28.5-20.4 8.9-39.7 20.1-57.6 33.4 3 18.7 3.1 37.7 0.3 56.6-3.4 23.5-11.1 45.8-22.9 66.2-11.7 20.4-27.1 38.3-45.6 53.1-14.9 11.9-31.3 21.2-48.9 28.1-1.3 11.3-2 22.6-2 33.5 0 11 0.7 22.2 2 33.5 17.6 6.8 34 16.2 48.9 28.1 18.6 14.8 34 32.7 45.7 53.1 21.5 37.4 29.4 80.5 22.6 122.8z M818 458.7l-1.9-12.2-11.8-3.6c-33.2-10.1-60.9-32.2-78.1-62.2-17.2-30-22.3-65.2-14.4-99.2l2.8-12-9.5-7.7c-25.6-20.8-54-37.3-84.7-49.1l-11.6-4.5-9 8.5c-25.1 23.8-57.9 36.9-92.3 36.9-34.3 0-67.1-13.1-92.4-36.9l-9-8.5-11.6 4.5c-30.6 11.9-59.1 28.4-84.6 49.1l-9.5 7.7 2.8 12c7.9 34 2.8 69.2-14.5 99.2-16.9 29.5-45.3 52.2-78 62.1l-11.7 3.6-1.9 12.2c-2.6 16.6-4 33.1-4 49.1s1.4 32.6 4 49.1L199 569l11.7 3.6c33.2 10.1 60.9 32.2 78.1 62.2 17.3 30.2 22.4 65.3 14.4 99.1l-2.8 12 9.5 7.7c25.5 20.7 53.9 37.3 84.6 49.1l11.5 4.5 9-8.5c25.2-23.8 58.1-36.9 92.4-36.9 34.5 0 67.3 13.1 92.3 36.9l9 8.5 11.6-4.5c30.7-11.9 59.2-28.4 84.6-49.1l9.5-7.7-2.8-11.9c-7.7-33.4-2.5-69.6 14.5-99.2 16.9-29.5 45.3-52.2 78.1-62.2L816 569l1.9-12.2c2.6-16.7 3.9-33.2 3.9-49.1 0.1-15.9-1.2-32.4-3.8-49z m-27.5 81.6c-17.1 6.6-33 15.7-47.5 27.2-18 14.4-33 31.7-44.3 51.6-11.4 19.8-18.8 41.4-22.2 64.3-2.7 18.3-2.6 36.8 0.3 54.9-17.3 12.9-36 23.8-55.8 32.5-32.1-26.2-71.9-40.5-113.6-40.5-22.8 0-45.2 4.3-66.5 12.9-17.1 6.8-32.9 16.1-47.1 27.6-19.9-8.7-38.6-19.5-55.9-32.5 6.6-41-1-82.9-21.8-119.3-11.4-19.9-26.4-37.2-44.4-51.6-14.4-11.5-30.4-20.6-47.5-27.2-1.3-11-2-21.9-2-32.5 0-10.6 0.7-21.5 2-32.5 17.1-6.6 33-15.7 47.5-27.2 18-14.3 33-31.7 44.3-51.5 11.4-19.8 18.9-41.4 22.2-64.3 2.7-18.3 2.5-36.8-0.3-54.9 17.4-12.9 36.1-23.8 55.9-32.5 14.2 11.5 30 20.8 47.1 27.6 21.3 8.5 43.7 12.9 66.5 12.9 41.7 0 81.5-14.3 113.6-40.5 19.9 8.7 38.6 19.5 55.9 32.5-2.9 18.1-3 36.6-0.3 54.9 3.3 22.8 10.8 44.5 22.2 64.3C710 416.3 725 433.7 743 448c14.4 11.5 30.4 20.6 47.5 27.2 1.3 11.1 2 22 2 32.5-0.1 10.6-0.8 21.5-2 32.6z M510.1 636.3c-68.9 0-125-56.1-125-125s56.1-125 125-125 125 56.1 125 125-56.1 125-125 125z m0-216.2c-50.3 0-91.3 40.9-91.3 91.3s40.9 91.3 91.3 91.3c50.3 0 91.3-40.9 91.3-91.3s-41-91.3-91.3-91.3z"
              fill="#F84F39"
            />
          </svg>
        </button>
        <button onClick={() => removeTodo(todo.id)} className="delete-icon">
          <svg height="0.95rem" xmlns="http://www.w3.org/2000/svg" viewBox="-202.667 -224 149.3 192">
            <title>Delete</title>
            <path
              d="M-85.3333-160H-170.6667V-53.3333H-85.3333V-160zM-165.3333-213.3333-154.6667-224H-101.3333L-90.6667-213.3333H-53.3333V-192H-202.6667V-213.3333H-165.3333zM-64-53.3333C-64-41.6-73.6-32-85.3333-32H-170.6667C-182.4-32-192-41.6-192-53.3333V-181.3333H-64V-53.3333zM-85.3333-160H-170.6667V-53.3333H-85.3333V-160z"
              fill="#F84F39"
            />
          </svg>
        </button>
      </div>
    </div>
  ));
};

export default Todo;
