import React, { useState } from "react";

import "./Todoapp.css";



export default function Todoapp() {
  const [todolist, setTodoList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentValue, setCurrentValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (e) => {
    setCurrentValue(e.target.value);
  };

  const saveTodoList = (event) => {
    event.preventDefault();
    const toname = currentValue.trim();

    if (!toname) {
      alert("Please enter a todo name.");
      return;
    }

    if (editMode) {
      const isDuplicate = todolist.some(
        (item, index) => item === toname && index !== editIndex
      );

      if (isDuplicate) {
        alert("Todo Name already exists.");
        return;
      }

      const updatedList = [...todolist];
      updatedList[editIndex] = toname;
      setTodoList(updatedList);
      setEditMode(false);
      setEditIndex(null);
    } else {
      if (todolist.includes(toname)) {
        alert("Todo Name already exists.");
        return;
      }
      setTodoList([...todolist, toname]);
    }

    setCurrentValue("");
  };

  const deleteTodo = (itemToDelete) => {
    const updatedList = todolist.filter((item) => item !== itemToDelete);
    setTodoList(updatedList);
    if (editMode && todolist[editIndex] === itemToDelete) {
      setEditMode(false);
      setCurrentValue("");
    }
  };

  const editTodo = (valueToEdit) => {
 
    const index = todolist.indexOf(valueToEdit);
    setCurrentValue(valueToEdit);
    setEditIndex(index);
    setEditMode(true);
  };

  return (
    <>
      <div className="container">
        <h1>My Todo List</h1>

        <form
          onSubmit={saveTodoList}
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          {editMode && (
            <span style={{ minWidth: "30px" }}>#{editIndex + 1}</span>
          )}

          <input
            name="toname"
            type="text"
            value={currentValue}
            onChange={handleInputChange}
          />

          <button>{editMode ? "Update" : "Add"}</button>
        </form>

      
        <div className="outerDiv">
          <ul>
            {todolist.map((todo, index) => (
              <li key={index}>
                <strong>{index + 1}. </strong>
                {todo}
                <div className="actions">
                  <button className="edit-btn" onClick={() => editTodo(todo)}>
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteTodo(todo)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
