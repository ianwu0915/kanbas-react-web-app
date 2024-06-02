import AddRedux from "./AddReux";
import CounterRedux from "./CounterRedux";
import HelloRedux from "./HelloRedux";
import TodoList from "./todos/TodoList";

export default function ReduxExamples() {
  return (
    <div className="container">
      <h1>Redux Examples</h1>
      <HelloRedux />
      <CounterRedux />
      <AddRedux />
      <TodoList />
    </div>
  );
}