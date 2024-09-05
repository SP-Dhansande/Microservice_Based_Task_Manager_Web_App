import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, setAuthHeader } from "../Api/Api";
export const submitTask = createAsyncThunk("submissions/submitTask",
    async ({ taskId, githubUrl }) => {
        setAuthHeader(localStorage.getItem("jwt"), api)
        try {
            const { data } = await api.post(`/api/submissions?task_id=${taskId}&github_Url=${githubUrl}`, {}

            );
            console.log("submitted tasks", data)
            return data;

        }
        catch (error) {
            console.log("Error submiteed tasks", error);
            throw Error(error.response.data.error)
        }

    });
export const fetchAllSubmission = createAsyncThunk("submissions/fetchAllSubmission",
    async () => {
        setAuthHeader(localStorage.getItem("jwt"), api)
        try {
            const { data } = await api.get(`/api/submissions`

            );
            console.log("fetch tasks", data)
            return data;

        }
        catch (error) {
            console.log("Error submiteed tasks", error);
            throw Error(error.response.data.error)
        }

    });

export const fetchSubmissionsByTaskId = createAsyncThunk("submissions/fetchSubmissionsByTaskId",
    async (taskId) => {
        setAuthHeader(localStorage.getItem("jwt"), api);
        try {
            const { data } = await api.get(`/api/submissions/task/${taskId}`

            );
            console.log("fetch tasks", data)
            return data;

        }
        catch (error) {
            console.log("Error submiteed tasks", error);
            throw Error(error.response.data.error)
        }

    });
export const acceptDeclineSubmissions = createAsyncThunk("submissions/acceptDeclineSubmissions ",
    async ({id,status}) => {
        setAuthHeader(localStorage.getItem("jwt"), api)
        try {
            const { data } = await api.put(`/api/submissions/${id}?status=${status}`, {}

            );
            console.log("accept tasks", data)
            return data;

        }
        catch (error) {
            console.log("Error submiteed tasks", error);
            throw Error(error.response.data.error)
        }

    });
    const submissionSlice= createSlice({
        name: "submission",
        initialState: {
            submissions: [],
            status:'',
            error: null,
        },
        reducers: {},
        extraReducers:(builder)=> {
            builder
            .addCase(submitTask.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(submitTask.fulfilled, (state, action) => {
                state.status ='succeeded'
                state.submissions.push(action.payload);
            })
            .addCase(submitTask.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(fetchAllSubmission.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchAllSubmission.fulfilled, (state, action) => {
                state.status ='succeeded'
                state.submissions = action.payload;
            })
            .addCase(fetchAllSubmission.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(fetchSubmissionsByTaskId.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchSubmissionsByTaskId.fulfilled, (state, action) => {
                state.status ='succeeded'
                state.submissions = action.payload;
            })
            .addCase(fetchSubmissionsByTaskId.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(acceptDeclineSubmissions.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(acceptDeclineSubmissions.fulfilled, (state, action) => {
                state.status ='succeeded'
                state.submissions = state.submissions.map((item) => item.id === action.payload.id? action.payload : item)
            })
            .addCase(acceptDeclineSubmissions.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

           



            
        },


    });
    export default submissionSlice.reducer;
