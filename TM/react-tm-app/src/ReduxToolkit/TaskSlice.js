import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, BASE_URL, setAuthHeader } from "../Api/Api";
import axios from "axios";

// Thunk to fetch all tasks
export const fetchTasks = createAsyncThunk("task/fetchTasks", async (status, { rejectWithValue }) => {
    setAuthHeader(localStorage.getItem("jwt"), api);
    try {
        const { data } = await api.get("/api/tasks", { params: { status } });
        console.log("fetch tasks", data);
        return data;
    } catch (error) {
        console.log("Error fetching tasks", error);
        return rejectWithValue(error.response.data.error);
    }
});

// Thunk to fetch tasks assigned to the current user
export const fetchUsersTasks = createAsyncThunk("task/fetchUsersTasks", async (status, { rejectWithValue }) => {
    setAuthHeader(localStorage.getItem("jwt"), api);
    try {
        const { data } = await api.get("/api/tasks/user", { params: { status } });
        console.log("fetch user tasks", data);
        return data;
    } catch (error) {
        console.log("Error fetching tasks", error);
        return rejectWithValue(error.response.data.error);
    }
});

// Thunk to fetch a specific task by ID
export const fetchTasksById = createAsyncThunk("task/fetchTasksById", async (taskId, { rejectWithValue }) => {
    setAuthHeader(localStorage.getItem("jwt"), api);
    try {
        const { data } = await api.get(`/api/tasks/${taskId}`);
        console.log("fetch tasks by id", data);
        return data;
    } catch (error) {
        console.log("Error fetching tasks", error);
        return rejectWithValue(error.response.data.error);
    }
});

// Thunk to create a new task
export const createTask = createAsyncThunk("task/createTask", async (taskData, { rejectWithValue }) => {
    setAuthHeader(localStorage.getItem("jwt"), api);
    try {
        const { data } = await api.post(`/api/tasks`, taskData);
        console.log("created task", data);
        return data;
    } catch (error) {
        console.log("Error creating task", error);
        return rejectWithValue(error.response.data.error);
    }
});

// Thunk to update an existing task
export const updateTask = createAsyncThunk("task/updateTask", async ({ id, updatedTaskData }, { rejectWithValue }) => {
    setAuthHeader(localStorage.getItem("jwt"), api);
    try {
        const { data } = await api.put(`/api/tasks/${id}`, updatedTaskData);
        console.log("updated task", data);
        return data;
    } catch (error) {
        console.log("Error updating task", error);
        return rejectWithValue(error.response.data.error);
    }
});

// Thunk to assign a task to a user
export const assignedTaskToUser = createAsyncThunk("task/assignedTaskToUser", async ({ taskId, userId }, { rejectWithValue }) => {
    setAuthHeader(localStorage.getItem("jwt"), api);
    try {
        const { data } = await api.put(`/api/tasks/${taskId}/user/${userId}/assigned`);
        console.log("assigned task", data);
        return data;
    } catch (error) {
        console.log("Error assigning task", error);
        return rejectWithValue(error.response.data.error);
    }
});

// Thunk to delete a task
export const deleteTask = createAsyncThunk("task/deleteTask", async (taskId, { rejectWithValue }) => {
    setAuthHeader(localStorage.getItem("jwt"), api);
    try {
        await api.delete(`/api/tasks/${taskId}`);
        console.log("task deleted");
        return taskId;
    } catch (error) {
        console.log("Error deleting task", error);
        return rejectWithValue(error.response.data.error);
    }
});

// Task slice
const taskSlice = createSlice({
    name: 'task',
    initialState: {
        tasks: [],
        usersTask: [],
        taskDetails: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchUsersTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsersTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.usersTask = action.payload;
            })
            .addCase(fetchUsersTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchTasksById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTasksById.fulfilled, (state, action) => {
                state.loading = false;
                state.taskDetails = action.payload;
            })
            .addCase(fetchTasksById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks.push(action.payload);
            })
            .addCase(createTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = state.tasks.map(task => task._id === action.payload._id ? action.payload : task);
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(assignedTaskToUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(assignedTaskToUser.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = state.tasks.map(task => task._id === action.payload._id ? action.payload : task);
            })
            .addCase(assignedTaskToUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = state.tasks.filter(task => task._id !== action.payload);
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default taskSlice.reducer;
