import React, { useEffect, useState } from 'react';
import TaskItem from '../components/TaskItem';

const API = process.env.NEXT_PUBLIC_API;

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
    <div className='max-w-lg mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-4'>NimbusTasks ✅</h1>

      <form onSubmit={addTask} className='flex mb-4'>
        <input
          type='text'
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder='Add a new task...'
          className='flex-grow border rounded p-2 mr-2'
        />
        <button type='submit' className='bg-blue-500 text-white px-4 rounded'>
          Add
        </button>
      </form>

      <div>
        {tasks.map((task) => (
          <TaskItem
            key={task._id}
            id={task._id}
            title={task.title}
            completed={task.completed}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        ))}
      </div>
    </div>
  );
}