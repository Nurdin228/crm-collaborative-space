
import { useState } from 'react';
import TopNavbar from '../components/TopNavbar';
import BoardSidebar from '../components/BoardSidebar';
import KanbanBoard from '../components/KanbanBoard';
import CreateBoardModal from '../components/CreateBoardModal';
import TaskModal from '../components/TaskModal';

// Mock data
const initialBoards = [
  { id: 'board-1', name: 'Development Tasks' },
  { id: 'board-2', name: 'Marketing Campaign' },
  { id: 'board-3', name: 'Customer Support' },
];

const initialColumns = [
  {
    id: 'column-1',
    title: 'To Do',
    tasks: [
      {
        id: 'task-1',
        title: 'Research competitors',
        description: 'Analyze top 5 competitors and create a comparison report',
        priority: 'high' as const,
        dueDate: '2023-04-15',
      },
      {
        id: 'task-2',
        title: 'Update website copy',
        description: 'Rewrite homepage content to match new brand guidelines',
        priority: 'medium' as const,
      },
      {
        id: 'task-3',
        title: 'Schedule team meeting',
        priority: 'low' as const,
        dueDate: '2023-04-05',
      },
    ],
  },
  {
    id: 'column-2',
    title: 'In Progress',
    tasks: [
      {
        id: 'task-4',
        title: 'Design new logo options',
        description: 'Create 3 variations based on feedback',
        priority: 'medium' as const,
        dueDate: '2023-04-10',
      },
      {
        id: 'task-5',
        title: 'Implement authentication',
        description: 'Add login and registration functionality',
        priority: 'high' as const,
      },
    ],
  },
  {
    id: 'column-3',
    title: 'Review',
    tasks: [
      {
        id: 'task-6',
        title: 'QA testing for v2.0',
        description: 'Test all features in the latest release',
        priority: 'high' as const,
        dueDate: '2023-04-08',
      },
    ],
  },
  {
    id: 'column-4',
    title: 'Done',
    tasks: [
      {
        id: 'task-7',
        title: 'Create social media calendar',
        description: 'Plan posts for the next month',
        priority: 'medium' as const,
      },
      {
        id: 'task-8',
        title: 'Customer survey analysis',
        description: 'Compile results and present findings',
        priority: 'high' as const,
      },
    ],
  },
];

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeBoard, setActiveBoard] = useState(initialBoards[0].id);
  const [boards, setBoards] = useState(initialBoards);
  const [columns, setColumns] = useState(initialColumns);
  const [isCreateBoardModalOpen, setIsCreateBoardModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCreateBoard = (name: string) => {
    const newBoard = {
      id: `board-${Date.now()}`,
      name,
    };
    setBoards([...boards, newBoard]);
    setActiveBoard(newBoard.id);
  };

  const handleAddTask = (columnId: string) => {
    const newTask = {
      id: `task-${Date.now()}`,
      title: 'New Task',
      description: '',
    };

    setColumns(
      columns.map((column) => {
        if (column.id === columnId) {
          return {
            ...column,
            tasks: [...column.tasks, newTask],
          };
        }
        return column;
      })
    );
    
    setSelectedTask(newTask);
    setIsTaskModalOpen(true);
  };

  const handleTaskClick = (task: any) => {
    setSelectedTask(task);
    setIsTaskModalOpen(true);
  };

  const handleUpdateTask = (updatedTask: any) => {
    setColumns(
      columns.map((column) => {
        return {
          ...column,
          tasks: column.tasks.map((task) => {
            if (task.id === updatedTask.id) {
              return updatedTask;
            }
            return task;
          }),
        };
      })
    );
    setSelectedTask(updatedTask);
  };

  return (
    <div className="min-h-screen bg-white">
      <TopNavbar />
      
      <div className="pt-16 flex h-[calc(100vh-64px)]">
        <BoardSidebar
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          boards={boards}
          activeBoard={activeBoard}
          setActiveBoard={setActiveBoard}
          onCreateBoard={() => setIsCreateBoardModalOpen(true)}
        />
        
        <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
          <div className="p-6 border-b border-crm-light-gray">
            <h1 className="text-2xl font-semibold text-crm-dark-gray">
              {boards.find((board) => board.id === activeBoard)?.name || 'Kanban Board'}
            </h1>
          </div>
          
          <div className="board-container">
            <KanbanBoard
              columns={columns}
              onAddTask={handleAddTask}
              onTaskClick={handleTaskClick}
            />
          </div>
        </main>
      </div>
      
      <CreateBoardModal
        isOpen={isCreateBoardModalOpen}
        onClose={() => setIsCreateBoardModalOpen(false)}
        onCreateBoard={handleCreateBoard}
      />
      
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        task={selectedTask}
        onUpdateTask={handleUpdateTask}
      />
    </div>
  );
};

export default Index;
