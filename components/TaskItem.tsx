import { Trash2, CheckCircle, Circle } from 'lucide-react';

interface TaskItemProps {
  id: string;
  title: string;
  completed: boolean;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export default function TaskItem({
  id,
  title,
  completed,
  onToggle,
  onDelete,
}: TaskItemProps) {
  return (
    <div className='flex items-center justify-between bg-white shadow-sm rounded-xl px-4 py-3 hover:shadow-md transition'>
      {/* Task Title */}
      <div
        className='flex items-center gap-3 cursor-pointer'
        onClick={() => onToggle(id, !completed)}
      >
        {completed ? (
          <CheckCircle className='text-green-500' />
        ) : (
          <Circle className='text-gray-400' />
        )}
        <span
          className={`${
            completed ? 'line-through text-gray-400' : 'text-gray-800'
          }`}
        >
          {title}
        </span>
      </div>

      {/* Delete Button */}
      <button
        onClick={() => onDelete(id)}
        className='text-red-500 hover:text-red-700 transition'
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}