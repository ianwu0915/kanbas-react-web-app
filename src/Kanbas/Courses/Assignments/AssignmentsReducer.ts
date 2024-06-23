import {createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../Database";
const initialState = {
    assignments: [],
};

const assignmentSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        setAssignments: (state, action) => {
            state.assignments = action.payload;
        },

        // Add a new assignment given the assignment object with name and course
        addAssignment: (state, { payload: assignment }) => {
            const newAssignment = { 
                _id: new Date().getTime().toString(),
                title: assignment.title,
                course: assignment.course,
                description: assignment.description,
                points: assignment.points,
                startDate: assignment.startDate,
                startTime: "12:00am",
                dueDate: assignment.dueDate,
                dueTime: "11:59pm",
            };
            // state.assignments = [...state.assignments, newAssignment] as any;
            state.assignments = [...state.assignments, newAssignment] as any;
        }, 
        
        // Filter out the assignment with the given assignmentId
        deleteAssignment: (state, { payload: assignmentId }) => {
            state.assignments = state.assignments.filter((a: any) => a._id !== assignmentId);
        },

        // Update the assignment with the given assignment object
        updateAssignment: (state, {payload: assignment}) => {
            state.assignments = state.assignments.map((a: any) => a._id === assignment._id ? assignment : a) as any;
        },

        editAssignment: (state, { payload: assignmentId }) => {
            state.assignments = state.assignments.map((a: any) => a._id === assignmentId ? {...a, editing: true} : a) as any;
        }


    }
});

export const { addAssignment, deleteAssignment, updateAssignment, editAssignment, setAssignments } = assignmentSlice.actions;
export default assignmentSlice.reducer;