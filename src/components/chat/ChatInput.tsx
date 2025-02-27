
import React, { useState, useRef } from 'react';
import { Smile, Paperclip, Image, Send } from 'lucide-react';
import { MessageAttachment } from './ChatMessage';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

interface ChatInputProps {
  onSendMessage: (message: string, attachments: MessageAttachment[]) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState<MessageAttachment[]>([]);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = () => {
    if (message.trim() || attachments.length > 0) {
      onSendMessage(message, attachments);
      setMessage('');
      setAttachments([]);
      setIsEmojiPickerOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const addEmoji = (emoji: any) => {
    setMessage(prev => prev + emoji.native);
    setIsEmojiPickerOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'file' | 'image') => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newAttachments: MessageAttachment[] = [];
    
    Array.from(files).forEach(file => {
      const attachment: MessageAttachment = {
        id: Date.now() + Math.random().toString(),
        type: type,
        url: URL.createObjectURL(file),
        name: file.name,
        size: formatFileSize(file.size)
      };
      newAttachments.push(attachment);
    });

    setAttachments(prev => [...prev, ...newAttachments]);
    e.target.value = '';
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const removeAttachment = (id: string) => {
    setAttachments(prev => prev.filter(attachment => attachment.id !== id));
  };

  return (
    <div className="border-t border-gray-200 p-4">
      {attachments.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {attachments.map(attachment => (
            <div 
              key={attachment.id} 
              className="relative bg-gray-100 rounded-md p-2 pr-8 flex items-center"
            >
              {attachment.type === 'image' ? (
                <ImageIcon className="w-4 h-4 mr-2 text-blue-500" />
              ) : (
                <Paperclip className="w-4 h-4 mr-2 text-blue-500" />
              )}
              <span className="text-sm truncate max-w-[150px]">{attachment.name}</span>
              <button 
                className="absolute top-1 right-1 w-5 h-5 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600"
                onClick={() => removeAttachment(attachment.id)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
      
      <div className="flex items-end">
        <div className="flex-1 bg-gray-100 rounded-2xl overflow-hidden">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="w-full p-3 bg-transparent resize-none focus:outline-none max-h-32"
            rows={message.split('\n').length > 3 ? 3 : message.split('\n').length || 1}
          />
          
          <div className="flex items-center px-3 py-2">
            <div className="relative">
              <button 
                onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
                className="p-1 rounded-full text-crm-gray hover:text-crm-red hover:bg-gray-200 transition-colors"
              >
                <Smile className="w-5 h-5" />
              </button>
              
              {isEmojiPickerOpen && (
                <div className="absolute bottom-10 left-0 z-10">
                  <Picker 
                    data={data} 
                    onEmojiSelect={addEmoji}
                    theme="light"
                  />
                </div>
              )}
            </div>
            
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="p-1 rounded-full text-crm-gray hover:text-crm-red hover:bg-gray-200 transition-colors ml-1"
            >
              <Paperclip className="w-5 h-5" />
              <input 
                type="file" 
                ref={fileInputRef}
                className="hidden"
                onChange={(e) => handleFileChange(e, 'file')}
                multiple
              />
            </button>
            
            <button 
              onClick={() => imageInputRef.current?.click()}
              className="p-1 rounded-full text-crm-gray hover:text-crm-red hover:bg-gray-200 transition-colors ml-1"
            >
              <Image className="w-5 h-5" />
              <input 
                type="file" 
                ref={imageInputRef}
                className="hidden"
                accept="image/*"
                onChange={(e) => handleFileChange(e, 'image')}
                multiple
              />
            </button>
          </div>
        </div>
        
        <button
          onClick={handleSendMessage}
          disabled={!message.trim() && attachments.length === 0}
          className={`ml-3 p-3 rounded-full ${
            message.trim() || attachments.length > 0
              ? 'bg-crm-red text-white'
              : 'bg-gray-200 text-gray-400'
          }`}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
