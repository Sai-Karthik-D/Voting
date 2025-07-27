import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import flowerBg from '../assets/emoji.jpg'; // Make sure image exists in assets

const ResultsPage = () => {
  const [voteCounts, setVoteCounts] = useState({});
  const [finalName, setFinalName] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/results');
        const allVotes = res.data.data;

        setVoteCounts(allVotes);

        const maxVotes = Math.max(...Object.values(allVotes));
        const topNames = Object.keys(allVotes).filter(
          (name) => allVotes[name] === maxVotes
        );

        const winner =
          topNames.length === 1
            ? topNames[0]
            : topNames[Math.floor(Math.random() * topNames.length)];

        setFinalName(winner);
      } catch (err) {
        console.error('Error fetching votes:', err);
      }
    };

    fetchResults();
  }, []);

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${flowerBg})` }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="bg-white/90 backdrop-blur-md border border-purple-300 p-8 rounded-3xl shadow-2xl w-full max-w-lg text-center"
      >
        <h2 className="text-3xl font-extrabold text-purple-700 mb-6">
          🎊 Voting Results 🎊
        </h2>

        <div className="flex flex-col gap-4 mb-8">
          {Object.entries(voteCounts).map(([name, count]) => (
            <div
              key={name}
              className="flex justify-between items-center px-5 py-3 bg-purple-50 border border-purple-100 rounded-lg"
            >
              <span className="text-lg font-medium text-purple-700">{name}</span>
              <span className="text-md font-bold text-pink-600">{count} vote(s)</span>
            </div>
          ))}
        </div>

        <div className="p-5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl text-white text-xl font-bold shadow-lg">
           So, Final ga nee Nickname enti antey... <br />
          <span className="text-3xl mt-2 inline-block font-extrabold animate-pulse">
            {finalName} 🎉
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default ResultsPage;
