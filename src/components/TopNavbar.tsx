
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, MessageSquare, FileText, BarChart2, Trello, Search, ZoomIn } from 'lucide-react';

const TopNavbar = () => {
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navItems = [
    { name: 'Kanban', path: '/', icon: <Trello className="w-5 h-5" /> },
    { name: 'Documents', path: '/documents', icon: <FileText className="w-5 h-5" /> },
    { name: 'Chats', path: '/chats', icon: <MessageSquare className="w-5 h-5" /> },
    { name: 'Reports', path: '/reports', icon: <FileText className="w-5 h-5" /> },
    { name: 'KPI', path: '/kpi', icon: <BarChart2 className="w-5 h-5" /> },
    { name: 'Zoom', path: '/zoom', icon: <ZoomIn className="w-5 h-5" /> },
  ];

  return (
    <header className="h-16 bg-white border-b border-crm-light-gray fixed top-0 left-0 right-0 z-40 shadow-sm">
      <div className="flex items-center justify-between px-6 h-full">
        <div className="flex items-center">
          <Link
            to="/"
            className="text-xl font-semibold text-crm-red mr-10 flex items-center gap-2"
          >
            <Trello className="w-6 h-6" />
            <span>CRM System</span>
          </Link>
          
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          {isSearchOpen ? (
            <div className="relative flex items-center animate-fade-in">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-md border border-crm-light-gray focus:outline-none focus:border-crm-red focus:ring-1 focus:ring-crm-red"
                autoFocus
              />
              <Search className="absolute left-3 w-5 h-5 text-crm-gray" />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-3 text-crm-gray hover:text-crm-red"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-crm-dark-gray hover:text-crm-red transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          )}

          <Link
            to="/logout"
            className="p-2 text-crm-dark-gray hover:text-crm-red transition-colors flex items-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden sm:inline">Logout</span>
          </Link>
          
          <button className="p-2 text-crm-dark-gray hover:text-crm-red transition-colors md:hidden">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
