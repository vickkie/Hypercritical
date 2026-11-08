import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import { useAuth } from "./AuthContext";
import { getDatabase, ref, onValue, off, update, remove } from "firebase/database";
import Swal from "sweetalert2";

function TodoList() {
  const { currentUser } = useAuth();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const todosRef = ref(db, `tasks`);
    onValue(todosRef, (snapshot) => {
      const todosData = snapshot.val();
      const todosArray = todosData ? Object.entries(todosData).map(([key, value]) => ({ id: key, ...value })) : [];
      setTodos(todosArray);
    });

    return () => off(todosRef);
  }, [currentUser]);

  const addTodo = async (todo) => {
      if (!todo.text || /^\s*$/.test(todo.text)) {
        throw new Error("Todo text is empty or only contains whitespace.");
      }
      //reject if id already exists
      const existingTodo = todos.find((t) => t.text === todo.id);
      if (existingTodo) {
        throw new Error("Item already exists.");
      }

      const db = getDatabase();
      const todosRef = ref(db, `tasks`);
      try {
        const newId = todo.id;
        // Add the new todo to the database
        await update(todosRef, { [`${newId}`]: { ...todo, id: newId, date: new Date().toISOString() } });

        // Wait for the database update to complete before updating the UI
        onValue(todosRef, (snapshot) => {
          const todosData = snapshot.val();
          const todosArray = todosData ? Object.entries(todosData).map(([key, value]) => ({ id: key, ...value })) : [];
          // Sort todos by date and slice to get the last 7
          const lastSevenTodos = todosArray.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 7);
          setTodos(lastSevenTodos);
        });
      } catch (error) {
        console.error("Error adding todo:", error);
        throw error;
      }
  };

  const updateTodo = async (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    const db = getDatabase();
    const todoRef = ref(db, `tasks/${todoId}`);
    try {
      await update(todoRef, newValue);
      // Optimized state update to avoid unnecessary re-renders
      setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === todoId ? { ...todo, ...newValue } : todo)));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleConfirmDelete = (deleteTaskid) => {
    if (deleteTaskid !== null) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          removeTodo(deleteTaskid); // Passed deleteTaskid directly to removeTodo
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: "Task id is null",
      });
    }
  };

  const removeTodo = (deleteTaskid) => {
    const db = getDatabase();
    const todoRef = ref(db, `tasks/${deleteTaskid}`);

    remove(todoRef)
      .then(() => {
        // Update the state after successful deletion
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== deleteTaskid));
      })
      .catch((error) => {
        console.error("Error removing todo:", error);
      });
  };

  const completeTodo = (id) => {
    const db = getDatabase();
    const todoRef = ref(db, `tasks/${id}`);
    update(todoRef, { isComplete: true }).then(() => {
      // Optimized state update to avoid unnecessary re-renders
      setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? { ...todo, isComplete: true } : todo)));
    });
  };

  return (
    <>
      <h1 className="task-header">Tasks</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        handleConfirmDelete={handleConfirmDelete}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default TodoList;
