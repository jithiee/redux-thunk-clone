import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from '../api/axios'

const initialState = {
    tasks : [],
    isLoading : false ,
    error : '',
}


export const getTaskFromServer = createAsyncThunk(
    'tasks/getTaskFromServer' ,
    async(_ , {rejectWithValue})=>{
         try {
             const response = await api.get('/tasks')
             return response.data
        } catch (error) {
             return rejectWithValue('No task found')
        }
         
    }
)


const taskSlice = createSlice({
      name:'tasks', 
      initialState,
      reducers:{} ,
      extraReducers:(builder)=>{
        builder
        //   pending 
        .addCase(getTaskFromServer.pending ,(state , action)=>{
              state.isLoading = true
              state.error =''
        } )
        // succuss 
        .addCase(getTaskFromServer.fulfilled, (state , action)=>{
             state.isLoading = false
             state.error = ''
             state.tasks = action.payload 
        })
        // error 
        .addCase(getTaskFromServer.rejected , (state, action)=>{
                state.isLoading = false
                state.error = action.payload
                state.tasks = []
        })
        
      }
})

export default taskSlice.reducer;





