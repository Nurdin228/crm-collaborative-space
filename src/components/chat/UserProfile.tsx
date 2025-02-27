
import React from 'react';
import { X, Mail, Phone, MapPin } from 'lucide-react';
import { User } from './UsersList';

interface UserProfileProps {
  user: User & {
    email?: string;
    phone?: string;
    location?: string;
    title?: string;
    bio?: string;
  };
  onClose: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onClose }) => {
  return (
    <div className="w-full h-full bg-white flex flex-col animate-slide-in-right">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-crm-dark-gray">Profile</h2>
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-gray-100 rounded-full text-crm-gray transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6">
        <div className="flex flex-col items-center mb-6">
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="w-24 h-24 rounded-full object-cover mb-4" 
          />
          
          <h3 className="text-xl font-semibold text-crm-dark-gray">{user.name}</h3>
          
          {user.title && (
            <p className="text-sm text-crm-gray mt-1">{user.title}</p>
          )}
          
          <div className={`mt-2 px-2 py-1 rounded-full text-xs ${
            user.status === 'online' 
              ? 'bg-green-100 text-green-800' 
              : user.status === 'away'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-gray-100 text-gray-800'
          }`}>
            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
          </div>
        </div>
        
        {user.bio && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-crm-dark-gray mb-2">About</h4>
            <p className="text-sm text-crm-gray">{user.bio}</p>
          </div>
        )}
        
        <div className="space-y-4">
          {user.email && (
            <div className="flex items-center">
              <Mail className="w-5 h-5 text-crm-gray mr-3" />
              <div>
                <h4 className="text-xs text-crm-gray mb-1">Email</h4>
                <p className="text-sm text-crm-dark-gray">{user.email}</p>
              </div>
            </div>
          )}
          
          {user.phone && (
            <div className="flex items-center">
              <Phone className="w-5 h-5 text-crm-gray mr-3" />
              <div>
                <h4 className="text-xs text-crm-gray mb-1">Phone</h4>
                <p className="text-sm text-crm-dark-gray">{user.phone}</p>
              </div>
            </div>
          )}
          
          {user.location && (
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-crm-gray mr-3" />
              <div>
                <h4 className="text-xs text-crm-gray mb-1">Location</h4>
                <p className="text-sm text-crm-dark-gray">{user.location}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <button 
          className="w-full py-2 bg-crm-red text-white rounded-md hover:bg-crm-red/90 transition-colors"
        >
          Send Message
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
