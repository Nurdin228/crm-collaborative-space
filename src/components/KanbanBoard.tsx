
import { useState } from 'react';
import { Plus, MoreHorizontal, Move } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority?: 'low' | 'medium' | 'high';
  labels?: string[];
  assignee?: string;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

interface KanbanBoardProps {
  columns: Column[];
  onAddTask: (columnId: string) => void;
  onTaskClick: (task: Task) => void;
}

const KanbanBoard = ({ columns, onAddTask, onTaskClick }: KanbanBoardProps) => {
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [draggedColumn, setDraggedColumn] = useState<string | null>(null);

  const handleDragStart = (task: Task, columnId: string) => {
    setDraggedTask(task);
    setDraggedColumn(columnId);
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
    setDraggedColumn(null);
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex gap-6 h-full">
      {columns.map((column) => (
        <div key={column.id} className="kanban-column">
          <div className="kanban-title">
            <span className="flex items-center gap-1">
              {column.title}
              <span className="kanban-badge">{column.tasks.length}</span>
            </span>
            <button className="text-crm-gray hover:text-crm-dark-gray">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {column.tasks.map((task) => (
              <div
                key={task.id}
                draggable
                onDragStart={() => handleDragStart(task, column.id)}
                onDragEnd={handleDragEnd}
                onClick={() => onTaskClick(task)}
                className={`card-task ${draggedTask?.id === task.id ? 'task-dragging' : ''}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-sm">{task.title}</h3>
                  <button className="text-crm-gray opacity-0 hover:opacity-100 group-hover:opacity-100 hover:text-crm-dark-gray transition-opacity">
                    <Move className="w-4 h-4" />
                  </button>
                </div>
                
                {task.description && (
                  <p className="text-xs text-crm-dark-gray/70 mb-3 line-clamp-2">{task.description}</p>
                )}
                
                <div className="flex items-center justify-between mt-2">
                  {task.priority && (
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  )}
                  
                  {task.dueDate && (
                    <span className="text-xs text-crm-dark-gray/70">
                      {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <button
            onClick={() => onAddTask(column.id)}
            className="mt-3 flex items-center justify-center w-full p-2 text-sm text-crm-dark-gray/70 hover:text-crm-red border border-dashed border-crm-light-gray hover:border-crm-red rounded-md transition-colors"
          >
            <Plus className="w-4 h-4 mr-1" />
            <span>Add Task</span>
          </button>
        </div>
      ))}
      
      <div className="kanban-column border border-dashed border-crm-light-gray bg-transparent flex items-center justify-center">
        <button 
          className="flex flex-col items-center justify-center text-crm-dark-gray/70 hover:text-crm-red transition-colors"
        >
          <Plus className="w-6 h-6 mb-2" />
          <span className="text-sm">Add Column</span>
        </button>
      </div>
    </div>
  );
};

export default KanbanBoard;
