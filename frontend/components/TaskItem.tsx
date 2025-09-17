import React from 'react';

interface TaskItemProps {
  id: string;
  title: string;
  completed: boolean;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  id,
  title,
  completed,
  onToggle,
  onDelete,
}) => {
  return (
    <div className='flex justify-between items-center p-2 border rounded mb-2'>
      <div
        onClick={() => onToggle(id, !completed)}
        className={`cursor-pointer ${
          completed ? 'line-through text-gray-400' : ''
        }`}
      >
        {title}
      </div>
      <button
        onClick={() => onDelete(id)}
        className='text-red-500 hover:text-red-700'
      >
        ✕
      </button>
    </div>
  );
};

export default TaskItem;