import { configureStore } from "@reduxjs/toolkit";
import helloReducer from "../Lab4/ReduxExamples/HelloRedux/helloReducer";
import counterReducer from "../Lab4/ReduxExamples/CounterRedux/counterReducer";
import addReducer from "../Lab4/ReduxExamples/AddReux/addReducer";
import todosReducer from "../Lab4/ReduxExamples/todos/todosReducer";

// The configureStore function is used to create a Redux store.
// The store is a single object that contains the state of the application.
// The state means the data that the application needs to keep track of.
// The store is created by passing a configuration object to the configureStore function.
// The configuration object is an object that contains a reducer property.

const store = configureStore({
  reducer: {
    helloReducer,
    counterReducer,
    addReducer,
    todosReducer,
  },
});
export default store;