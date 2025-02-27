import React, { useState } from 'react';
import { Search, CircleUserRound } from 'lucide-react';

export interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  lastMessage?: {
    text: string;
    timestamp: Date;
    unread: boolean;
  };
}

interface UsersListProps {
  users: User[];
  selectedUserId: string | null;
  onSelectUser: (userId: string) => void;
}

const UsersList: React.FC<UsersListProps> = ({ users, selectedUserId, onSelectUser }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const getStatusColor = (status: User['status']) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-gray-400';
      case 'away': return 'bg-yellow-500';
      default: return 'bg-gray-400';
    }
  };
  
  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const messageDate = new Date(timestamp);
    
    // If the message was today, show the time
    if (messageDate.toDateString() === now.toDateString()) {
      return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    // If the message was yesterday, show "Yesterday"
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    if (messageDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }
    
    // Otherwise, show the date
    return messageDate.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };
  
  return (
    <div className="border-r border-gray-200 w-72 h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-1 focus:ring-crm-red"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-crm-gray w-5 h-5" />
        </div>
      </div>
      
      <div className="overflow-y-auto flex-1">
        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <div
              key={user.id}
              onClick={() => onSelectUser(user.id)}
              className={`p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                selectedUserId === user.id ? 'bg-gray-100' : ''
              }`}
            >
              <div className="flex items-center">
                <div className="relative flex-shrink-0">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <span 
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(user.status)}`}
                  />
                </div>
                
                <div className="ml-3 flex-1 overflow-hidden">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-crm-dark-gray truncate">{user.name}</h3>
                    {user.lastMessage && (
                      <span className="text-xs text-crm-gray whitespace-nowrap">
                        {formatTimestamp(user.lastMessage.timestamp)}
                      </span>
                    )}
                  </div>
                  
                  {user.lastMessage && (
                    <div className="flex items-center justify-between mt-1">
                      <p className={`text-sm truncate ${
                        user.lastMessage.unread 
                          ? 'text-crm-dark-gray font-medium' 
                          : 'text-crm-gray'
                      }`}>
                        {user.lastMessage.text}
                      </p>
                      
                      {user.lastMessage.unread && (
                        <span className="w-2 h-2 rounded-full bg-crm-red ml-2 flex-shrink-0" />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-6 text-center text-crm-gray">
            <CircleUserRound className="w-12 h-12 mx-auto mb-2 opacity-30" />
            <p>No users found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersList;
