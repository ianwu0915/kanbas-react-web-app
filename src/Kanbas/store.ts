import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/ModuleReducer";
import assignmentsReducer from "./Courses/Assignments/AssignmentsReducer";
const store = configureStore({
  reducer: {
    modulesReducer,
    assignmentsReducer,
  },
});
export default store;
