import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  message: "Hello World!!!",
};
const helloSlice = createSlice({
  name: "hello",
  initialState,
  // The reducers property is an object that contains the reducer functions.
  // The reducer functions are used to update the state of the application.
  reducers: {},
});
export default helloSlice.reducer;

// a Reducer is a function that takes the current state and an action and returns a new state