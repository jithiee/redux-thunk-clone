import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateTask } from '../slice/taskSlice';

const EditTask = () => {

    const { id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { tasks, isLoading, error } = useSelector(
        (state) => state.taskInfo
    );

    const [formData, setFormData] = useState({
        title: '',
        description: ''
    });

    // Find selected task
    useEffect(() => {

        const task = tasks.find(
            (item) => String(item.id) === String(id)
        );

        if (task) {
            setFormData({
                title: task.title,
                description: task.description
            });
        }

    }, [tasks, id]);


    // Input change
    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

    };


    // Submit
    const handleSubmit = async (e) => {

        e.preventDefault();

        const updatedTask = {
            id: Number(id),
            title: formData.title,
            description: formData.description
        };

        const result = await dispatch(
            updateTask(updatedTask)
        );

        if (updateTask.fulfilled.match(result)) {
            navigate('/');
        }

    };


    return (
        <div className="min-h-screen bg-gray-700 p-8">

            <div className="mx-auto max-w-xl">

                <div className="rounded-xl bg-white p-6 shadow-lg">

                    <h1 className="mb-6 text-3xl font-bold text-gray-800">
                        Edit Task
                    </h1>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* Title */}
                        <div>
                            <label className="mb-2 block font-medium text-gray-700">
                                Title
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter title"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                required
                            />
                        </div>


                        {/* Description */}
                        <div>
                            <label className="mb-2 block font-medium text-gray-700">
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Enter description"
                                rows="5"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                required
                            />
                        </div>


                        {/* Error */}
                        {error && (
                            <p className="font-medium text-red-500">
                                {error}
                            </p>
                        )}


                        {/* Buttons */}
                        <div className="flex gap-3">

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="rounded-lg bg-blue-500 px-5 py-3 font-medium text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {isLoading ? 'Updating...' : 'Update Task'}
                            </button>

                            <button
                                type="button"
                                onClick={() => navigate('/')}
                                className="rounded-lg bg-gray-500 px-5 py-3 font-medium text-white transition hover:bg-gray-600"
                            >
                                Cancel
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default EditTask;