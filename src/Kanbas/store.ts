import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/ModuleReducer";
import assignmentsReducer from "./Courses/Assignments/AssignmentsReducer";
import accountReducer from "./Account/reducer";
const store = configureStore({
  reducer: {
    modulesReducer,
    assignmentsReducer,
    accountReducer,
  },
});
export default store;
