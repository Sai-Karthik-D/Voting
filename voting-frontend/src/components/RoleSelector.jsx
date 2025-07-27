import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import flowerBg from '../assets/emoji.jpg'; // Make sure path is correct

const RoleSelector = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    localStorage.setItem('voterRole', role);
    navigate('/vote');
  };

  return (
    <div
      className="h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${flowerBg})` }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="bg-yellow-100/90 backdrop-blur-md border border-yellow-300 p-8 rounded-3xl shadow-2xl w-full max-w-md text-center"
      >
        <h1 className="text-3xl font-bold text-yellow-800 mb-6">
          🌟 Who is voting now?
        </h1>

        <div className="flex flex-col gap-5">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleRoleSelect('Karthik')}
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-8 rounded-full shadow-md transition duration-300"
          >
             Karthik
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleRoleSelect('Deepthi')}
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-8 rounded-full shadow-md transition duration-300"
          >
             Deepthi
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default RoleSelector;
