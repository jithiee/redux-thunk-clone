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
            
        }
         
    }
)


const taskSlice = createSlice({
      name:'tasks', 
      initialState,
      reducers:{} ,
      extraReducers:(builder)=>{
      
      }
})





