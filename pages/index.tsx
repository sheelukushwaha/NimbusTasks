'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle } from 'lucide-react';
import TaskItem from '../components/TaskItem';

const API = process.env.NEXT_PUBLIC_API || '/api';

interface Task {
  _id: string;
  title: string;
  completed: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  // Fetch tasks
  const fetchTasks = async () => {
    const res = await fetch(`${API}/tasks`);
    const data = await res.json();
    setTasks(data);
  };

  // Add task
  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    await fetch(`${API}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTask }),
    });
    setNewTask('');
    fetchTasks();
  };

  // Toggle task
  const toggleTask = async (id: string, completed: boolean) => {
    await fetch(`${API}/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed }),
    });
    fetchTasks();
  };

  // Delete task
  const deleteTask = async (id: string) => {
    await fetch(`${API}/tasks/${id}`, { method: 'DELETE' });
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className='max-w-2xl mx-auto p-6'>
      {/* Title */}
      <h1 className='text-3xl font-bold mb-6 text-indigo-600 flex items-center gap-2'>
        NimbusTasks <span className='text-gray-400'>✅</span>
      </h1>

      {/* Add Task Form */}
      <form
        onSubmit={addTask}
        className='flex items-center bg-white shadow rounded-xl px-4 py-2 mb-6'
      >
        <input
          type='text'
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder='Add a new task...'
          className='flex-grow px-3 py-2 border-none focus:outline-none text-gray-700'
        />
        <button
          type='submit'
          className='flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition'
        >
          <PlusCircle size={18} />
          Add
        </button>
      </form>

      {/* Task List */}
      <div className='space-y-3'>
        {tasks.length > 0 ? (
          tasks.map((task, i) => (
            <motion.div
              key={task._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <TaskItem
                id={task._id}
                title={task.title}
                completed={task.completed}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            </motion.div>
          ))
        ) : (
          <p className='text-gray-500 text-center'>No tasks yet. Add one! 🚀</p>
        )}
      </div>
    </div>
  );
}