import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  modules: [],
};
const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    setModules: (state, action) => {
      state.modules = action.payload;
    },
    addModule: (state, { payload: module }) => {
      const newModule: any = {
        _id: new Date().getTime().toString(),
        name: module.name,
        description: module.description || "",
        course: module.course,
        lessons: [],
      };
      console.log("new module is:", newModule);
      state.modules = [...state.modules, newModule] as any;
      console.log("modules are:", state.modules);
    },
    deleteModule: (state, { payload: moduleId }) => {
      state.modules = state.modules.filter(
        (m: any) => m._id !== moduleId);
    },
    updateModule: (state, { payload: module }) => {
      state.modules = state.modules.map((m: any) =>
        m._id === module._id ? module : m
      ) as any;
    },
    editModule: (state, { payload: moduleId }) => {
      state.modules = state.modules.map((m: any) =>
        m._id === moduleId ? { ...m, editing: true } : m
      ) as any;
    },
  },
});
export const { addModule, deleteModule, updateModule, editModule, setModules } =
  modulesSlice.actions;
export default modulesSlice.reducer;

