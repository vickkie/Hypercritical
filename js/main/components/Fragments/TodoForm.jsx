import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : "");

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if in edit mode or adding new todo
    if (props.edit) {
      // Editing existing todo, keep input as is
      props.onSubmit({
        id: props.edit.id,
        text: input,
      });
    } else {
      // Adding new todo, clear input
      props.onSubmit({
        id: uuidv4(),
        text: input,
      });
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      {props.edit ? (
        <div>
          <input
            placeholder="Update"
            value={input}
            onChange={handleChange}
            name="text"
            ref={inputRef}
            className="todo-input edit"
          />
          <button onClick={handleSubmit} className="todo-button edit">
            Update
          </button>
        </div>
      ) : (
        <div className="taskInputWrapper">
          <button onClick={handleSubmit} className="todo-button">
            <svg width="28px" height="28px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect opacity="0.2" x="9.92188" y="3.18848" width="2.46094" height="0.937988" fill="#F84F39" />
              <path
                d="M11.1461 6.73593C10.7871 6.73593 10.4961 7.02694 10.4961 7.38593V9.80282H8.07773C7.71875 9.80282 7.42773 10.0938 7.42773 10.4528C7.42773 10.8118 7.71875 11.1028 8.07773 11.1028H10.4961V13.5202C10.4961 13.8792 10.7871 14.1702 11.1461 14.1702C11.5051 14.1702 11.7961 13.8792 11.7961 13.5202V11.1028H14.212C14.571 11.1028 14.862 10.8118 14.862 10.4528C14.862 10.0938 14.571 9.80282 14.212 9.80282H11.7961V7.38593C11.7961 7.02694 11.5051 6.73593 11.1461 6.73593Z"
                fill="#F84F39"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.74414 5.18125C1.74414 3.99384 2.70673 3.03125 3.89414 3.03125H12.7305C13.9179 3.03125 14.8805 3.99384 14.8805 5.18125L14.8805 7.50804C14.8805 7.86703 14.5895 8.15804 14.2305 8.15804C13.8715 8.15804 13.5805 7.86703 13.5805 7.50804L13.5805 5.18125C13.5805 4.71181 13.1999 4.33125 12.7305 4.33125H3.89414C3.4247 4.33125 3.04414 4.71181 3.04414 5.18125V10.7175C3.04414 11.1869 3.4247 11.5675 3.89414 11.5675H6.34336C6.70234 11.5675 6.99336 11.8585 6.99336 12.2175C6.99336 12.5765 6.70234 12.8675 6.34336 12.8675H3.89414C2.70673 12.8675 1.74414 11.9049 1.74414 10.7175V5.18125Z"
                fill="#F84F39"
              />
            </svg>
          </button>
          <div className="todoInputWrapper">
            <input
              placeholder="Add note"
              value={input}
              onChange={handleChange}
              name="text"
              className="todo-input"
              ref={inputRef}
            />
            <svg className="todoInputBelow" viewBox="0 0 114 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1 16.1196C4.71107 13.7913 11.6544 8.97964 12.2529 11.9288C12.8515 14.8779 17.9793 19.5865 26 18.5C34.0207 17.4135 42.6341 10.5 48.5 10.5C54.3659 10.5 49.5 19.3659 64.5 18.5C79.5 17.634 85 8.5 90.5 9C96 9.5 92.5 13.5 113 13.5"
                stroke="#8F89FA"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      )}
    </form>
  );
}

export default TodoForm;
