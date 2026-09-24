import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateTask } from '../slice/taskSlice';

const EditTask = () => {
    
    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {tasks , isLoading , error  } = useSelector((state)=>state.taskInfo)

    
    const [formData , setFormData ] = useState({
        title : '' , 
        description : '', 
    })
  
    //find selected task 
    useEffect(()=>{
       const task = tasks.find((item)=> String(item.id)  ===  String(id)  )
       console.log(task);
       
       if(task){
          setFormData({
            title :task.title , 
            description : task.description , 
          })
       }
    }, [tasks, id])



const handleChange =(e)=>{
   const { name , value } = e.target ;
   setFormData({...formData , [name] : value})
}

const handleSubmit =(e)=>{
   e.preventDefault()
   dispatch(updateTask({
        id: id,
        title: formData.title,
        description: formData.description
    }));

    navigate('/taskilist');
}

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
  <form className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg"
   onSubmit={handleSubmit}
  >
    
    <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
      Update Task
    </h1>

    <div className="space-y-4">
      <input
        type="text"
        placeholder="Enter title"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                   outline-none focus:ring-2 focus:ring-blue-500 
                   focus:border-blue-500 transition"
        value={formData.title}
        name='title'
        onChange={handleChange}
      />

      <input
        type="text"
        placeholder="Enter description"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                   outline-none focus:ring-2 focus:ring-blue-500 
                   focus:border-blue-500 transition"
         value={formData.description}
          name='description'
          onChange={handleChange}
      />
    </div>

    <div className="flex gap-3 mt-6">
      <button
        type="submit"
        className="flex-1 bg-blue-600 text-white py-3 rounded-lg 
                   font-semibold hover:bg-blue-700 transition 
                   active:scale-95"
      >
        Update
      </button>

      <button
        type="submit"
        className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg 
                   font-semibold hover:bg-gray-300 transition 
                   active:scale-95"
      onClick={()=>navigate('/taskilist')}
      
      >
        Cancel
      </button>
    </div>

  </form>
</div>
  );
}

export default EditTask;


