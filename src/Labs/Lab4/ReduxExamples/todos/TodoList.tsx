import React, { useState } from "react";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux"; // useSelector is a hook that allows you to extract data from the Redux store state, using a selector function.

export default function TodoList() {

// The todo list from the Redux store is extracted using the useSelector hook.
  const { todos } = useSelector((state: any) => state.todosReducer);

  return (
    <div>
      <h2>Todo List</h2>
      <ul className="list-group">
        <TodoForm />
        {todos.map((todo: any) => (
          <TodoItem todo={todo} />
        ))}
      </ul>
      <hr />
    </div>
  );
}
