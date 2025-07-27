import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

import short_img from '../assets/short.jpg';
import deepu from '../assets/deepu (2).jpg';
import deepthi from '../assets/deepthi.jpg';
import flower from '../assets/emoji.jpg'; // 🌸 Full background image
import mental from '../assets/mental.jpg';
import pottama from '../assets/pottama.jpg';
import rakshashi from '../assets/raks.jpg';
import musalamma from '../assets/musali.jpg';
import deyam from '../assets/deyyam.jpg';
import pandhi from '../assets/pandhi.jpg';

const nicknameOptions = [
  { name: 'Potti', img: short_img },
  { name: 'Deepu', img: deepu },
  { name: 'Deepthi', img: deepthi },
  { name: 'Mental', img: mental },
  { name: 'Pottama', img: pottama},
  { name: 'Rakshashi', img: rakshashi },
  { name: 'Musalamma', img: musalamma },
  { name: 'Deyyam', img: deyam },
  { name: 'Pandhi', img: pandhi},
];

const VotingPage = () => {
  const navigate = useNavigate();
  const [selectedNames, setSelectedNames] = useState([]);
  const voterRole = localStorage.getItem('voterRole');

  const handleSelect = (name) => {
    setSelectedNames((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const handleSubmit = async () => {
    if (selectedNames.length === 0) {
      alert('Please select at least one name.');
      return;
    }

    const alreadyVoted = localStorage.getItem(`hasVoted_${voterRole}`);
    const votedNames = JSON.parse(localStorage.getItem(`votedNames_${voterRole}`) || '[]');

    if (
      alreadyVoted &&
      JSON.stringify([...selectedNames].sort()) === JSON.stringify([...votedNames].sort())
    ) {
      alert("You've already voted for these names!");
      return;
    }

    try {
      for (const option of selectedNames) {
        await axios.post('http://localhost:5000/api/vote', {
          voter: voterRole,
          choice: option,
        });
      }

      localStorage.setItem(`hasVoted_${voterRole}`, 'true');
      localStorage.setItem(`votedNames_${voterRole}`, JSON.stringify(selectedNames));
      navigate('/results');
    } catch (error) {
      console.error('Vote error:', error);
      alert('Something went wrong. Try again!');
    }
  };

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center px-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${flower})` }}
    >
      <motion.div
        className="bg-white bg-opacity-90 p-6 rounded-3xl shadow-2xl w-full max-w-4xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-center text-purple-600 mb-6">
          Em NickName fix avvudham oo Nuvvey select chey 💖
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {nicknameOptions.map(({ name, img }) => (
            <motion.div
              key={name}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleSelect(name)}
              className={`cursor-pointer rounded-2xl overflow-hidden shadow-md border-4 transition duration-300 ${
                selectedNames.includes(name)
                  ? 'border-purple-500 bg-purple-100'
                  : 'border-transparent bg-gray-100 hover:border-purple-300'
              }`}
            >
              <img src={img} alt={name} className="w-full h-36 object-cover" />
              <div className="p-3 text-center font-semibold text-gray-700 text-lg">{name}</div>
            </motion.div>
          ))}
        </div>

        <motion.button
          onClick={handleSubmit}
          whileHover={{ scale: 1.03 }}
          className="mt-8 block mx-auto bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full text-lg font-bold shadow-lg transition"
        >
          Ika select chesimdhi chalu submit chey!!!
        </motion.button>
      </motion.div>
    </div>
  );
};

export default VotingPage;
