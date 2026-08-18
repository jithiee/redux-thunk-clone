import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTaskFromServer } from '../slice/taskSlice';

const TaskList = () => {
   const {tasks , isLoading , error} =  useSelector((state)=> state.taskInfo)
  //  console.log(tasks);
   const dispatch = useDispatch()
    
  useEffect(()=>{
     dispatch(getTaskFromServer())
  }, []) 

  return (
   <div className="min-h-screen bg-gray-700 p-8">
  <div className="mx-auto max-w-4xl">
    
    {/* Heading */}
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-gray-800">
        Task Lists
      </h1>
      <hr className="mt-3 border-gray-300" />
    </div>

    {/* Task List */}
    <div className="space-y-4">
      {tasks.map((item) => (
        <div
          key={item.id}
          className="rounded-xl bg-white p-5 shadow-md transition hover:shadow-lg"
        >
          {/* Task ID */}
          <p className="mb-1 text-sm font-medium text-gray-400">
            Task #{item.id}
          </p>

          {/* Title */}
          <h2 className="mb-2 text-xl font-semibold text-gray-800">
            {item.title}
          </h2>

          {/* Description */}
          <p className="mb-4 text-gray-600">
            {item.description}
          </p>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
            >
              Delete
            </button>

            <button
              className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600"
            >
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>

  </div>
</div>
  );
}

export default TaskList;



