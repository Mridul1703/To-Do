"use client";
import { useState } from "react";

export default function Home() {
  const [task, setTask] = useState([]);
  const [heading, setHeading] = useState("");
  const [desc, setDesc] = useState("");
  const [editTask, setEditTask] = useState(null);

  const handleHeading = (e) => {
    setHeading(e.target.value);
  };

  const handleDesc = (e) => {
    setDesc(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!heading.trim() && !desc.trim()) {
      return;
    }

    if (editTask !== null) {
      const updatedTasks = task.map((task) =>
        task.id === editTask ? { ...task, heading, desc } : task
      );
      setTask(updatedTasks);
    } else {
      setTask([...task, { id: task.length, heading, desc }]);
    }

    setHeading("");
    setDesc("");
  };

  const handleDelete = (taskId) => {
    setTask(task.filter((task) => task.id !== taskId));
  };

  const handleEdit = (taskId) => {
    if (editTask === taskId) {
      setHeading("");
      setDesc("");
      setEditTask(null);
    } else {
      const tasktoEdit = task.find((task) => task.id === taskId);
      setHeading(tasktoEdit.heading);
      setDesc(tasktoEdit.desc);
      setEditTask(taskId);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-lightSkyBlue flex items-center justify-center relative">
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-4 text-center">TO-DO</h1>

            <form onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row gap-2">
                <input
                  onChange={handleHeading}
                  value={heading}
                  placeholder="Task Heading"
                  className="p-2 border rounded-md w-full md:w-1/2"
                ></input>
                <input
                  onChange={handleDesc}
                  value={desc}
                  placeholder="Task Description"
                  className="p-2 border rounded-md w-full md:w-1/2 mt-2 md:mt-0"
                ></input>
              </div>
              <button
                type="submit"
                className="bg-darkBlue hover:bg-evenDarkerBlue text-white font-bold py-2 px-4 rounded mt-2 w-full"
              >
                {editTask !== null ? "Update Task" : "Add Task"}
              </button>
            </form>

            <ul className="list-none p-0 mt-4">
              {task.length === 0 ? (
                <h3 className="text-gray-400">No Tasks Available</h3>
              ) : (
                task.map((task) => (
                  <li
                    key={task.id}
                    className="my-2 bg-white shadow rounded-lg p-4 transition-transform duration-200 ease-in-out hover:-translate-x-1"
                  >
                    <h2 className="font-semibold text-lg mb-2">
                      {task.heading}
                    </h2>
                    <p>{task.desc}</p>
                    <div className="flex justify-end space-x-2 mt-2">
                      <button
                        onClick={() => handleDelete(task.id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleEdit(task.id)}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded ml-2"
                      >
                        {editTask === task.id ? "Cancel Edit" : "Edit"}
                      </button>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
