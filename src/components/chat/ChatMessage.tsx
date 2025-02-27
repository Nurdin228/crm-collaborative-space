
import React from 'react';
import { FileIcon, ImageIcon } from 'lucide-react';

export interface MessageAttachment {
  id: string;
  type: 'image' | 'file';
  url: string;
  name: string;
  size?: string;
}

export interface ChatMessageProps {
  id: string;
  content: string;
  timestamp: Date;
  sender: {
    id: string;
    name: string;
    avatar: string;
  };
  isCurrentUser: boolean;
  attachments?: MessageAttachment[];
  onAvatarClick: (userId: string) => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  content,
  timestamp,
  sender,
  isCurrentUser,
  attachments,
  onAvatarClick
}) => {
  const messageTime = new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  return (
    <div className={`flex mb-4 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      {!isCurrentUser && (
        <div className="mr-3 flex-shrink-0" onClick={() => onAvatarClick(sender.id)}>
          <img 
            src={sender.avatar} 
            alt={sender.name} 
            className="w-8 h-8 rounded-full object-cover cursor-pointer" 
          />
        </div>
      )}
      
      <div className={`max-w-[75%]`}>
        {!isCurrentUser && (
          <div className="text-xs text-crm-gray mb-1 ml-1">
            <span 
              className="font-medium text-crm-dark-gray hover:text-crm-red cursor-pointer"
              onClick={() => onAvatarClick(sender.id)}
            >
              {sender.name}
            </span>
          </div>
        )}
        
        <div className={`rounded-2xl px-4 py-2 inline-block ${
          isCurrentUser 
            ? 'bg-crm-red text-white rounded-tr-sm' 
            : 'bg-gray-100 text-crm-dark-gray rounded-tl-sm'
        }`}>
          <div className="whitespace-pre-wrap break-words">{content}</div>
          
          {attachments && attachments.length > 0 && (
            <div className="mt-2 space-y-2">
              {attachments.map(attachment => (
                <div key={attachment.id}>
                  {attachment.type === 'image' ? (
                    <div className="rounded-md overflow-hidden">
                      <img 
                        src={attachment.url} 
                        alt={attachment.name}
                        className="max-w-full h-auto" 
                      />
                    </div>
                  ) : (
                    <a
                      href={attachment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center p-2 rounded ${
                        isCurrentUser 
                          ? 'bg-white/10 hover:bg-white/20' 
                          : 'bg-white hover:bg-gray-50'
                      } transition-colors`}
                    >
                      <FileIcon className={`w-4 h-4 mr-2 ${isCurrentUser ? 'text-white' : 'text-blue-500'}`} />
                      <div className="overflow-hidden">
                        <div className={`text-sm truncate ${isCurrentUser ? 'text-white' : 'text-crm-dark-gray'}`}>
                          {attachment.name}
                        </div>
                        {attachment.size && (
                          <div className={`text-xs ${isCurrentUser ? 'text-white/70' : 'text-crm-gray'}`}>
                            {attachment.size}
                          </div>
                        )}
                      </div>
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
          
          <div className={`text-xs mt-1 text-right ${
            isCurrentUser ? 'text-white/70' : 'text-crm-gray'
          }`}>
            {messageTime}
          </div>
        </div>
      </div>
      
      {isCurrentUser && (
        <div className="ml-3 flex-shrink-0" onClick={() => onAvatarClick(sender.id)}>
          <img 
            src={sender.avatar} 
            alt={sender.name} 
            className="w-8 h-8 rounded-full object-cover cursor-pointer" 
          />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
