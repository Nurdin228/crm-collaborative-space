
import React, { useState, useEffect, useRef } from 'react';
import TopNavbar from '../components/TopNavbar';
import ChatMessage, { MessageAttachment } from '../components/chat/ChatMessage';
import ChatInput from '../components/chat/ChatInput';
import UsersList, { User } from '../components/chat/UsersList';
import UserProfile from '../components/chat/UserProfile';
import { useNotifications } from '../context/NotificationContext';

// Sample user data
const SAMPLE_USERS: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&auto=format&fit=crop&q=80',
    status: 'online',
    lastMessage: {
      text: 'Can you review the design mockups?',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      unread: true,
    }
  },
  {
    id: '2',
    name: 'Michael Thompson',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&auto=format&fit=crop&q=80',
    status: 'away',
    lastMessage: {
      text: 'I sent the report to the client',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      unread: false,
    }
  },
  {
    id: '3',
    name: 'Jessica Williams',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&auto=format&fit=crop&q=80',
    status: 'online',
    lastMessage: {
      text: 'Meeting postponed to tomorrow',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      unread: false,
    }
  },
  {
    id: '4',
    name: 'David Chen',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&h=150&auto=format&fit=crop&q=80',
    status: 'offline',
    lastMessage: {
      text: 'Let me know when the assets are ready',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      unread: false,
    }
  },
  {
    id: '5',
    name: 'Amanda Miller',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&auto=format&fit=crop&q=80',
    status: 'online',
  },
];

// Sample extended user data for profiles
const EXTENDED_USERS = {
  '1': {
    email: 'sarah.j@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, USA',
    title: 'UI/UX Designer',
    bio: 'Creative designer with 5+ years of experience in creating user-centered digital experiences.'
  },
  '2': {
    email: 'michael.t@example.com',
    phone: '+1 (555) 987-6543',
    location: 'San Francisco, USA',
    title: 'Project Manager',
    bio: 'Experienced project manager specialized in agile methodologies and team leadership.'
  },
  '3': {
    email: 'jessica.w@example.com',
    phone: '+1 (555) 456-7890',
    location: 'Chicago, USA',
    title: 'Marketing Specialist',
    bio: 'Digital marketing expert with a passion for data-driven strategies and creative campaigns.'
  },
  '4': {
    email: 'david.c@example.com',
    phone: '+1 (555) 789-0123',
    location: 'Austin, USA',
    title: 'Software Developer',
    bio: 'Full-stack developer with expertise in React, Node.js, and cloud architecture.'
  },
  '5': {
    email: 'amanda.m@example.com',
    phone: '+1 (555) 234-5678',
    location: 'Seattle, USA',
    title: 'Content Strategist',
    bio: 'Content creator focused on developing engaging digital narratives and brand stories.'
  }
};

interface Message {
  id: string;
  content: string;
  timestamp: Date;
  senderId: string;
  attachments?: MessageAttachment[];
}

const CURRENT_USER = {
  id: 'current',
  name: 'You',
  avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&h=150&auto=format&fit=crop&q=80',
};

// Sample conversations data
const INITIAL_CONVERSATIONS: Record<string, Message[]> = {
  '1': [
    {
      id: '101',
      content: 'Hi there! Could you take a look at the design mockups I sent over yesterday?',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      senderId: '1',
    },
    {
      id: '102',
      content: 'Sure, I'll review them today.',
      timestamp: new Date(Date.now() - 1000 * 60 * 25),
      senderId: 'current',
    },
    {
      id: '103',
      content: 'Great! I particularly need feedback on the color scheme and typography.',
      timestamp: new Date(Date.now() - 1000 * 60 * 20),
      senderId: '1',
      attachments: [
        {
          id: 'a1',
          type: 'image',
          url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
          name: 'design-mockup.jpg'
        }
      ]
    },
    {
      id: '104',
      content: 'I like the overall direction. The typography works well with the brand. I'd suggest making the primary CTA buttons a bit more prominent.',
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      senderId: 'current',
    },
    {
      id: '105',
      content: 'That makes sense. I'll increase the contrast and size slightly. Here's the updated file:',
      timestamp: new Date(Date.now() - 1000 * 60 * 10),
      senderId: '1',
      attachments: [
        {
          id: 'a2',
          type: 'file',
          url: '#',
          name: 'Updated-Design-V2.pdf',
          size: '4.2 MB'
        }
      ]
    }
  ],
  '2': [
    {
      id: '201',
      content: 'The client report is ready. I've included all the performance metrics we discussed.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
      senderId: '2',
      attachments: [
        {
          id: 'a3',
          type: 'file',
          url: '#',
          name: 'Q2-Performance-Report.pdf',
          size: '2.8 MB'
        }
      ]
    },
    {
      id: '202',
      content: 'Thanks Michael. Did you address the concerns they raised in the last meeting?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
      senderId: 'current',
    },
    {
      id: '203',
      content: 'Yes, there's a dedicated section on page 5 that directly addresses those points with the updated metrics.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
      senderId: '2',
    }
  ],
  '3': [
    {
      id: '301',
      content: 'The marketing team needs to reschedule tomorrow's meeting. Are you available on Friday instead?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      senderId: '3',
    },
    {
      id: '302',
      content: 'Friday works for me. Same time?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 15),
      senderId: 'current',
    },
    {
      id: '303',
      content: 'Yes, 2pm. I'll update the calendar invite.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 30),
      senderId: '3',
    }
  ]
};

const Chats = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [conversations, setConversations] = useState<Record<string, Message[]>>(INITIAL_CONVERSATIONS);
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { addNotification } = useNotifications();
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversations, selectedUserId]);
  
  const handleSelectUser = (userId: string) => {
    setSelectedUserId(userId);
    setShowProfile(false);
    
    // Mark user's messages as read
    const updatedUsers = SAMPLE_USERS.map(user => {
      if (user.id === userId && user.lastMessage?.unread) {
        return {
          ...user,
          lastMessage: {
            ...user.lastMessage,
            unread: false
          }
        };
      }
      return user;
    });
    
    // This would typically update state in a real app
    // setUsers(updatedUsers);
  };
  
  const handleSendMessage = (content: string, attachments: MessageAttachment[]) => {
    if (!selectedUserId) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      timestamp: new Date(),
      senderId: 'current',
      attachments: attachments.length > 0 ? attachments : undefined
    };
    
    setConversations(prev => ({
      ...prev,
      [selectedUserId]: [...(prev[selectedUserId] || []), newMessage]
    }));
    
    // Simulate a reply after a delay (for demo purposes)
    if (Math.random() > 0.5) {
      setTimeout(() => {
        const selectedUser = SAMPLE_USERS.find(user => user.id === selectedUserId);
        if (!selectedUser) return;
        
        const replyMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: `Thanks for your message! This is an automated reply from ${selectedUser.name}.`,
          timestamp: new Date(),
          senderId: selectedUserId
        };
        
        setConversations(prev => ({
          ...prev,
          [selectedUserId]: [...(prev[selectedUserId] || []), replyMessage]
        }));
        
        // Add notification
        addNotification({
          type: 'message',
          title: 'New Message',
          message: `${selectedUser.name}: Thanks for your message!`,
          sender: selectedUser.name,
          avatar: selectedUser.avatar
        });
      }, 8000 + Math.random() * 5000); // Random delay between 8-13 seconds
    }
  };
  
  const handleAvatarClick = (userId: string) => {
    if (userId === 'current') return; // Don't show profile for current user
    setSelectedUserId(userId);
    setShowProfile(true);
  };
  
  const selectedUser = SAMPLE_USERS.find(user => user.id === selectedUserId);
  const currentConversation = selectedUserId ? conversations[selectedUserId] || [] : [];
  
  // Combine user data with extended profile data
  const selectedUserWithProfile = selectedUser 
    ? { 
        ...selectedUser,
        ...EXTENDED_USERS[selectedUserId as keyof typeof EXTENDED_USERS] 
      } 
    : null;
  
  return (
    <div className="min-h-screen bg-white">
      <TopNavbar />
      
      <div className="pt-16 h-[calc(100vh-64px)]">
        <div className="h-full flex">
          <UsersList 
            users={SAMPLE_USERS}
            selectedUserId={selectedUserId}
            onSelectUser={handleSelectUser}
          />
          
          {selectedUserId ? (
            <div className="flex-1 flex">
              <div className={`flex-1 flex flex-col ${showProfile ? 'hidden md:flex' : ''}`}>
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  {selectedUser && (
                    <div className="flex items-center">
                      <div className="relative" onClick={() => setShowProfile(true)}>
                        <img 
                          src={selectedUser.avatar} 
                          alt={selectedUser.name} 
                          className="w-10 h-10 rounded-full object-cover cursor-pointer" 
                        />
                        <span 
                          className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${
                            selectedUser.status === 'online' ? 'bg-green-500' : 
                            selectedUser.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                          }`}
                        />
                      </div>
                      <div className="ml-3">
                        <h2 
                          className="font-medium text-crm-dark-gray cursor-pointer hover:text-crm-red"
                          onClick={() => setShowProfile(true)}
                        >
                          {selectedUser.name}
                        </h2>
                        <p className="text-xs text-crm-gray">
                          {selectedUser.status === 'online' ? 'Online' : 
                           selectedUser.status === 'away' ? 'Away' : 'Offline'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 overflow-y-auto p-4">
                  {currentConversation.map(message => (
                    <ChatMessage
                      key={message.id}
                      id={message.id}
                      content={message.content}
                      timestamp={message.timestamp}
                      sender={
                        message.senderId === 'current' 
                          ? CURRENT_USER 
                          : { 
                              id: message.senderId, 
                              name: SAMPLE_USERS.find(u => u.id === message.senderId)?.name || 'Unknown', 
                              avatar: SAMPLE_USERS.find(u => u.id === message.senderId)?.avatar || ''
                            }
                      }
                      isCurrentUser={message.senderId === 'current'}
                      attachments={message.attachments}
                      onAvatarClick={handleAvatarClick}
                    />
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                
                <ChatInput onSendMessage={handleSendMessage} />
              </div>
              
              {showProfile && selectedUserWithProfile && (
                <div className={`${showProfile ? 'w-full md:w-80' : 'w-0'} border-l border-gray-200`}>
                  <UserProfile 
                    user={selectedUserWithProfile}
                    onClose={() => setShowProfile(false)}
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-crm-light-gray rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="w-8 h-8 text-crm-gray" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1.5} 
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" 
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-crm-dark-gray mb-2">Your Messages</h3>
                <p className="text-crm-gray max-w-md">
                  Select a conversation or start a new one by clicking on a user from the list.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chats;
