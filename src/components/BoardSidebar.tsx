
import { useState } from 'react';
import { Plus, ChevronLeft, ChevronRight, MoreHorizontal, Layers } from 'lucide-react';

interface BoardSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  boards: Board[];
  activeBoard: string;
  setActiveBoard: (id: string) => void;
  onCreateBoard: () => void;
}

interface Board {
  id: string;
  name: string;
  icon?: string;
}

const BoardSidebar = ({
  isOpen,
  toggleSidebar,
  boards,
  activeBoard,
  setActiveBoard,
  onCreateBoard
}: BoardSidebarProps) => {
  return (
    <>
      <div className={`sidebar-board ${!isOpen ? 'collapsed' : ''}`}>
        <div className="flex items-center justify-between p-4 border-b border-crm-light-gray">
          <h2 className="text-lg font-medium flex items-center gap-2">
            <Layers className="w-5 h-5 text-crm-red" />
            <span>Boards</span>
          </h2>
          <button 
            onClick={toggleSidebar}
            className="p-1 hover:bg-crm-light-gray rounded-full transition-colors"
            aria-label="Close sidebar"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4">
          <button 
            onClick={onCreateBoard}
            className="w-full flex items-center justify-center gap-2 p-3 text-crm-red border border-crm-red rounded-md hover:bg-crm-red hover:text-white transition-colors mb-6"
          >
            <Plus className="w-5 h-5" />
            <span>Create New Board</span>
          </button>
          
          <div className="space-y-2">
            {boards.map((board) => (
              <button
                key={board.id}
                onClick={() => setActiveBoard(board.id)}
                className={`w-full text-left p-3 rounded-md flex items-center justify-between group transition-all duration-200 ${
                  activeBoard === board.id
                    ? 'bg-crm-red text-white'
                    : 'hover:bg-crm-light-gray'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-sm font-medium">{board.name}</span>
                </span>
                <span className={`opacity-0 group-hover:opacity-100 transition-opacity ${
                  activeBoard === board.id ? 'text-white' : 'text-crm-dark-gray'
                }`}>
                  <MoreHorizontal className="w-4 h-4" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed left-0 top-24 z-30 bg-white p-2 rounded-r-md shadow-md border border-l-0 border-crm-light-gray hover:bg-crm-off-white transition-colors"
          aria-label="Open sidebar"
        >
          <ChevronRight className="w-5 h-5 text-crm-dark-gray" />
        </button>
      )}
    </>
  );
};

export default BoardSidebar;
