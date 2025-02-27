
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Here you would typically handle the logout logic
    // For now, we'll just redirect to the home page
    setTimeout(() => {
      navigate('/');
    }, 1000);
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-crm-dark-gray mb-4">Logging out...</h1>
        <p className="text-crm-dark-gray/70">You will be redirected shortly.</p>
      </div>
    </div>
  );
};

export default Logout;
