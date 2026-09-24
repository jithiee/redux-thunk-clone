import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTaskToServer } from '../slice/taskSlice'

const CreateTasks = () => {

    const [formData, setFormData] = useState({
        title: '',
        description: '',
    })

    const dispatch = useDispatch()

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await dispatch(addTaskToServer(formData)).unwrap()

            setFormData({
                title: '',
                description: '',
            })

            console.log('Task created successfully')
        } catch (error) {
            console.log('Task creation failed:', error)
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">

                <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    Create Task
                </h1>

                <form
                    className="space-y-4"
                    onSubmit={handleSubmit}
                >

                    <input
                        type="text"
                        name="title"
                        placeholder="Enter title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg
                        outline-none focus:ring-2 focus:ring-blue-500
                        focus:border-blue-500 transition"
                    />

                    <input
                        type="text"
                        name="description"
                        placeholder="Enter description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg
                        outline-none focus:ring-2 focus:ring-blue-500
                        focus:border-blue-500 transition"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg
                        font-semibold hover:bg-blue-700
                        active:scale-[0.98] transition"
                    >
                        Create Task
                    </button>

                </form>

            </div>

        </div>
    )
}

export default CreateTasks