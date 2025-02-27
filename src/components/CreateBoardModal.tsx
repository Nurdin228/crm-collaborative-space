
import { useState } from 'react';
import { X } from 'lucide-react';

interface CreateBoardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateBoard: (name: string) => void;
}

const CreateBoardModal = ({ isOpen, onClose, onCreateBoard }: CreateBoardModalProps) => {
  const [boardName, setBoardName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (boardName.trim()) {
      onCreateBoard(boardName);
      setBoardName('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fade-in">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 animate-scale-in">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-crm-dark-gray">Create New Board</h2>
          <button
            onClick={onClose}
            className="text-crm-gray hover:text-crm-dark-gray"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="boardName" className="block text-sm font-medium text-crm-dark-gray mb-1">
              Board Name
            </label>
            <input
              type="text"
              id="boardName"
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
              className="w-full p-2 border border-crm-light-gray rounded-md focus:outline-none focus:border-crm-red focus:ring-1 focus:ring-crm-red"
              placeholder="Enter board name"
              autoFocus
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm border border-crm-light-gray rounded-md hover:bg-crm-light-gray transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-crm-red text-white rounded-md hover:bg-crm-red/90 transition-colors"
              disabled={!boardName.trim()}
            >
              Create Board
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBoardModal;
