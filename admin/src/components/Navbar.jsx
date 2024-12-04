import React from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const Navbar = ({ settoken }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    settoken('');
    localStorage.removeItem('token'); // Clear token from storage
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
      <img className='w-[max(10%,80px)]' src={assets.logo} alt="Logo" />
      <button 
        onClick={handleLogout} 
        className='bg-gray-600 text-white px-5 py-2 sm:py-2 rounded-full text-xs sm:text-sm'
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
