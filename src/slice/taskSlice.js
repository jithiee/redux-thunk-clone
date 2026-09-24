import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from '../api/axios'

const initialState = {
    tasks : [],
    isLoading : false ,
    error : '',
}

// Get 
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

// Delete 
export const deleteTask = createAsyncThunk(
    'task/deleteTask', 
    async(id , {rejectWithValue})=>{
         try {
            await api.delete(`/tasks/${id}`)
            return id
         } catch (error) {
            return rejectWithValue('No task found')
         }
    }
)
//Post 
export const addTaskToServer = createAsyncThunk(
    'task/addTaskToServer' , 
    async(formData , {rejectWithValue})=>{
       try {
          const response = await api.post('/tasks' , formData)
          return response.data
       } catch (error) {
         return rejectWithValue({error : 'no task created '})
       }
    }
)
// put
export const updateTask = createAsyncThunk(
    'task/updateTask', 
    async(task , {rejectWithValue})=>{
         try {
           const response =  await api.put(`/tasks/${task.id}` , task )
            return response.data
         } catch (error) {
            return rejectWithValue({error :'no task updated'})
         } 
    }
)


const taskSlice = createSlice({
      name:'tasks', 
      initialState,
      reducers:{} ,
      extraReducers:(builder)=>{
        builder
        // =============== Get tasks ======================
        //   pending 
        .addCase(getTaskFromServer.pending ,(state , action)=>{
              state.isLoading = true
              state.error =''
        } )
        // succuss 
        .addCase(getTaskFromServer.fulfilled, (state , action)=>{
             state.isLoading = false
             state.tasks = action.payload 
        })
        // error 
        .addCase(getTaskFromServer.rejected , (state, action)=>{
                state.isLoading = false
                state.error = action.payload
                state.tasks = []
        })

        // =================== Delete task ==============
        .addCase(deleteTask.pending ,(state , action)=>{
               state.isLoading = true
               state.error = ''
        } )
        .addCase(deleteTask.fulfilled , (state , action)=>{
            state.isLoading = false
            state.tasks = state.tasks.filter((task)=> task.id !== action.payload)
        })
        .addCase(deleteTask.rejected , (state, action)=>{
            state.isLoading = false
            state.error = action.payload
        })
        //============= create task =========================
        .addCase(addTaskToServer.pending, (state) => {
            state.isLoading = true
            state.error = ''
        })

        .addCase(addTaskToServer.fulfilled, (state, action) => {
            state.isLoading = false
            state.tasks.push(action.payload)
        })

        .addCase(addTaskToServer.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload?.error || 'No task created'
        })
                //=========update task =================
        .addCase(updateTask.pending , (state, action)=>{
            state.isLoading = true
            state.error = ''
        })
        .addCase(updateTask.fulfilled , (state, action)=>{
            state.isLoading = false

            // state.tasks = state.tasks.map((item)=> 
            //     item.id === action.payload.id ? action.payload : item
            // )
            const index = state.tasks.findIndex((item)=> item.id  === action.payload.id)
            if(index !== -1){
                state.tasks[index] = action.payload
            }
            // console.log(index);

            

        })
        .addCase(updateTask.rejected , (state , action)=>{
            state.isLoading  = false
            state.error = action.payload?.error || 'No task updated'
        })

       
      }
})

export default taskSlice.reducer;





