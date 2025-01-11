import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
    name: "tasks",
    initialState: {
        tasks: [],
    },
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload);
        },
        updateTask: (state, action) => {
            const { index, updatedTask } = action.payload;
            state.tasks[index] = updatedTask; 
        },
    },
});

export const { addTask , updateTask} = taskSlice.actions;
export default taskSlice.reducer;
