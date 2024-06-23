import React from "react";
import { useSelector, useDispatch } from "react-redux";
// import action creators from todosReducer that take in the todo object
import { addTodo, updateTodo, setTodo } from "./todosReducer";

export default function TodoForm() {
    // The todo object from the Redux store is extracted using the useSelector hook.
    const { todo } = useSelector((state: any) => state.todosReducer);
    const dispatch = useDispatch();
    return (
      <li className="list-group-item">
        <button onClick={() => dispatch(addTodo(todo))}

                id="wd-add-todo-click"> Add </button>
        <button onClick={() => dispatch(updateTodo(todo))}

                id="wd-update-todo-click"> Update </button>
        <input value={todo.title}
          onChange={ (e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
          />
      </li>
    );
  }
  