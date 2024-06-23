import { createSlice } from "@reduxjs/toolkit";
import { add } from "../../Labs/Lab3/Math";
const initialState = {
  currentUser: null,
};
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});
export const { setCurrentUser } = accountSlice.actions;
export default accountSlice.reducer;
