
import { useState, useEffect } from 'react';
import { X, Calendar, Tag, User, Clock, AlignLeft } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority?: 'low' | 'medium' | 'high';
  labels?: string[];
  assignee?: string;
}

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  onUpdateTask: (task: Task) => void;
}

const TaskModal = ({ isOpen, onClose, task, onUpdateTask }: TaskModalProps) => {
  const [editedTask, setEditedTask] = useState<Task | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setEditedTask(task);
    setIsEditing(false);
  }, [task]);

  if (!isOpen || !task || !editedTask) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedTask({
      ...editedTask,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateTask(editedTask);
    setIsEditing(false);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fade-in">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl h-full max-h-[80vh] flex flex-col animate-scale-in">
        <div className="flex items-center justify-between p-4 border-b border-crm-light-gray">
          {isEditing ? (
            <input
              type="text"
              name="title"
              value={editedTask.title}
              onChange={handleChange}
              className="text-xl font-semibold w-full outline-none border-b-2 border-crm-red pb-1"
              autoFocus
            />
          ) : (
            <h2 className="text-xl font-semibold text-crm-dark-gray">{task.title}</h2>
          )}
          
          <div className="flex items-center space-x-2">
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-1 text-sm border border-crm-light-gray rounded-md hover:bg-crm-light-gray transition-colors"
              >
                Edit
              </button>
            )}
            <button
              onClick={onClose}
              className="text-crm-gray hover:text-crm-dark-gray"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-crm-dark-gray mb-1 flex items-center">
                  <AlignLeft className="w-4 h-4 mr-2" /> Description
                </label>
                <textarea
                  name="description"
                  value={editedTask.description || ''}
                  onChange={handleChange}
                  className="w-full p-3 border border-crm-light-gray rounded-md h-32 focus:outline-none focus:border-crm-red focus:ring-1 focus:ring-crm-red"
                  placeholder="Add a description..."
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-crm-dark-gray mb-1 flex items-center">
                    <Calendar className="w-4 h-4 mr-2" /> Due Date
                  </label>
                  <input
                    type="date"
                    name="dueDate"
                    value={editedTask.dueDate || ''}
                    onChange={handleChange}
                    className="w-full p-2 border border-crm-light-gray rounded-md focus:outline-none focus:border-crm-red focus:ring-1 focus:ring-crm-red"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-crm-dark-gray mb-1 flex items-center">
                    <Tag className="w-4 h-4 mr-2" /> Priority
                  </label>
                  <select
                    name="priority"
                    value={editedTask.priority || ''}
                    onChange={handleChange}
                    className="w-full p-2 border border-crm-light-gray rounded-md focus:outline-none focus:border-crm-red focus:ring-1 focus:ring-crm-red"
                  >
                    <option value="">None</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-crm-dark-gray mb-1 flex items-center">
                  <User className="w-4 h-4 mr-2" /> Assignee
                </label>
                <input
                  type="text"
                  name="assignee"
                  value={editedTask.assignee || ''}
                  onChange={handleChange}
                  className="w-full p-2 border border-crm-light-gray rounded-md focus:outline-none focus:border-crm-red focus:ring-1 focus:ring-crm-red"
                  placeholder="Assign to..."
                />
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-sm border border-crm-light-gray rounded-md hover:bg-crm-light-gray transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-crm-red text-white rounded-md hover:bg-crm-red/90 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div>
              <div className="flex items-center space-x-4 mb-6">
                {task.priority && (
                  <span className={`px-3 py-1 rounded-full text-sm ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                )}
                
                {task.dueDate && (
                  <span className="flex items-center text-sm text-crm-dark-gray/70">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                )}
                
                {task.assignee && (
                  <span className="flex items-center text-sm text-crm-dark-gray/70">
                    <User className="w-4 h-4 mr-1" />
                    {task.assignee}
                  </span>
                )}
              </div>
              
              {task.description ? (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-crm-dark-gray mb-2 flex items-center">
                    <AlignLeft className="w-4 h-4 mr-2" /> Description
                  </h3>
                  <p className="text-crm-dark-gray/80 whitespace-pre-line">{task.description}</p>
                </div>
              ) : (
                <div className="mb-6 p-4 border border-dashed border-crm-light-gray rounded-md text-center text-crm-dark-gray/50">
                  No description provided
                </div>
              )}
              
              <div className="border-t border-crm-light-gray pt-4">
                <h3 className="text-sm font-medium text-crm-dark-gray mb-2">Activity</h3>
                <div className="flex items-start mb-4">
                  <div className="w-8 h-8 rounded-full bg-crm-light-gray flex items-center justify-center mr-3">
                    <User className="w-4 h-4 text-crm-dark-gray" />
                  </div>
                  <div className="flex-1">
                    <textarea
                      placeholder="Add a comment..."
                      className="w-full p-3 border border-crm-light-gray rounded-md focus:outline-none focus:border-crm-red focus:ring-1 focus:ring-crm-red"
                    />
                    <button className="mt-2 px-3 py-1 text-sm bg-crm-red text-white rounded-md hover:bg-crm-red/90 transition-colors">
                      Comment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
