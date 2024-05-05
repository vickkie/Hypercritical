import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TodoForm from "./TodoForm";
import RiveAnimation from "./RiveAnimation";

const Todo = ({ todos, completeTodo, handleConfirmDelete, updateTodo }) => {
  const [edit, setEdit] = useState({ id: null, value: "" });

  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    console.log(`passed,delete id- ${edit.id}`);
    setEdit({
      id: null,
      value: "",
    });
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update the order in Firebase
    const db = getDatabase();
    const todosRef = ref(db, `tasks`);
    const updates = {};
    items.forEach((todo, index) => {
      updates[`/${todo.id}`] = { ...todo, order: index };
    });
    update(todosRef, updates)
      .then(() => {
        console.log("Order updated in Firebase");
      })
      .catch((error) => {
        console.error("Error updating order:", error);
      });
  };

  // Sort todos by date before rendering
  const sortedTodos = todos.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  const lastSevenTodos = sortedTodos.slice(-7);

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="todos">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {lastSevenTodos.length > 0 ? (
              lastSevenTodos.map((todo, index) => (
                <Draggable key={todo.id.toString()} draggableId={todo.id.toString()} index={index}>
                  {(provided) => (
                    <div
                      className={todo.isComplete ? "todo-row complete" : "todo-row"}
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      <div className="move-around" {...provided.dragHandleProps}>
                        {" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="list-icon-drag"
                          viewBox="0 0 1024 1024"
                          version="1.1"
                        >
                          <path d="M469.333333 256a85.333333 85.333333 0 1 1-85.333333-85.333333 85.333333 85.333333 0 0 1 85.333333 85.333333z m-85.333333 170.666667a85.333333 85.333333 0 1 0 85.333333 85.333333 85.333333 85.333333 0 0 0-85.333333-85.333333z m0 256a85.333333 85.333333 0 1 0 85.333333 85.333333 85.333333 85.333333 0 0 0-85.333333-85.333333z m256-341.333334a85.333333 85.333333 0 1 0-85.333333-85.333333 85.333333 85.333333 0 0 0 85.333333 85.333333z m0 85.333334a85.333333 85.333333 0 1 0 85.333333 85.333333 85.333333 85.333333 0 0 0-85.333333-85.333333z m0 256a85.333333 85.333333 0 1 0 85.333333 85.333333 85.333333 85.333333 0 0 0-85.333333-85.333333z" />
                        </svg>
                      </div>{" "}
                      <div
                        key={todo.id}
                        className="taskHolder"
                        {...() => {
                          console.log(todo.id);
                        }}
                        onClick={() => completeTodo(todo.id)}
                        style={{ textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}
                      >
                        {todo.text}
                      </div>
                      <div className="icons">
                        <button onClick={() => setEdit({ id: todo.id, value: todo.text })} className="edit-icon">
                          {" "}
                          <svg height="1.5rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <title>Edit</title>
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                              {" "}
                              <path
                                d="M10.3544 11.4345L10.0029 11.079C9.9247 11.1563 9.87418 11.2572 9.85913 11.3661L10.3544 11.4345ZM16.9429 4.92002L17.2945 5.27557L17.2945 5.27557L16.9429 4.92002ZM18.96 6.91149L18.6 6.5645L18.96 6.91149ZM12.481 13.6335L12.5541 14.1281C12.6634 14.112 12.7643 14.0601 12.841 13.9805L12.481 13.6335ZM10 14L9.5047 13.9316C9.48316 14.0875 9.53629 14.2444 9.64811 14.3552C9.75992 14.466 9.91736 14.5176 10.0731 14.4946L10 14ZM18.8647 4.85417L19.1911 4.47539V4.47539L18.8647 4.85417ZM8 16.5C8.27614 16.5 8.5 16.2761 8.5 16C8.5 15.7238 8.27614 15.5 8 15.5V16.5ZM20 20.5C20.2761 20.5 20.5 20.2761 20.5 20C20.5 19.7238 20.2761 19.5 20 19.5V20.5ZM10.706 11.7901L17.2945 5.27557L16.5914 4.56448L10.0029 11.079L10.706 11.7901ZM18.6 6.5645L12.121 13.2865L12.841 13.9805L19.32 7.25847L18.6 6.5645ZM12.4079 13.1389L9.92693 13.5054L10.0731 14.4946L12.5541 14.1281L12.4079 13.1389ZM10.4953 14.0684L10.8497 11.503L9.85913 11.3661L9.5047 13.9316L10.4953 14.0684ZM18.5383 5.23294C18.9373 5.57678 18.9655 6.18525 18.6 6.5645L19.32 7.25847C20.084 6.46581 20.0251 5.19404 19.1911 4.47539L18.5383 5.23294ZM17.2945 5.27557C17.6346 4.93929 18.176 4.92073 18.5383 5.23294L19.1911 4.47539C18.4338 3.82284 17.3022 3.86162 16.5914 4.56448L17.2945 5.27557ZM8 15.5H6V16.5H8V15.5ZM6 20.5H20V19.5H6V20.5ZM3.5 18C3.5 19.3807 4.61929 20.5 6 20.5V19.5C5.17157 19.5 4.5 18.8284 4.5 18H3.5ZM6 15.5C4.61929 15.5 3.5 16.6193 3.5 18H4.5C4.5 17.1716 5.17157 16.5 6 16.5V15.5Z"
                                fill="#f84f39"
                              ></path>{" "}
                            </g>
                          </svg>
                        </button>{" "}
                        <button
                          onClick={() => {
                            handleConfirmDelete(todo.id);
                          }}
                          className="delete-icon"
                        >
                          {" "}
                          <svg height="0.95rem" xmlns="http://www.w3.org/2000/svg" viewBox="-202.667 -224 149.3 192">
                            {" "}
                            <title>Delete</title>{" "}
                            <path
                              d="M-85.3333-160H-170.6667V-53.3333H-85.3333V-160zM-165.3333-213.3333-154.6667-224H-101.3333L-90.6667-213.3333H-53.3333V-192H-202.6667V-213.3333H-165.3333zM-64-53.3333C-64-41.6-73.6-32-85.3333-32H-170.6667C-182.4-32-192-41.6-192-53.3333V-181.3333H-64V-53.3333zM-85.3333-160H-170.6667V-53.3333H-85.3333V-160z"
                              fill="#F84F39"
                            />{" "}
                          </svg>{" "}
                        </button>{" "}
                      </div>
                    </div>
                  )}
                </Draggable>
              ))
            ) : (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <RiveAnimation />
              </div>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Todo;
