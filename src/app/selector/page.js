'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// Import the list from your new external file
import { ALL_ASSETS } from '../../data/quizData'; 

// Curated list of 15 colors based on your screenshot
const RANDOM_COLORS = [
  "#f4b4d4", "#b2d67a", "#98ccd3", "#a89634", 
  "#7dd3e0", "#bef264", "#fef08a", "#a7f3d0",
  "#fb7185", "#818cf8", "#fbbf24", "#34d399",
  "#f472b6", "#a78bfa", "#22d3ee"
];

export default function SelectorPage() {
  const [quizData, setQuizData] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  // Function to generate the exact structure of your original QUIZ_DATA
  const generateLevel = () => {
    const shuffledAssets = [...ALL_ASSETS].sort(() => 0.5 - Math.random());
    const pickedAssets = shuffledAssets.slice(0, 4);
    
    // Shuffle colors and pick 4 unique ones for this level
    const shuffledColors = [...RANDOM_COLORS].sort(() => 0.5 - Math.random());
    
    const target = pickedAssets[Math.floor(Math.random() * 4)];

    setQuizData({
      word: target.label,
      options: pickedAssets.map((item, index) => ({
        id: index + 1, // Matches your 1, 2, 3, 4 ID style
        src: item.src,
        // Overriding the asset color with a random color from our list
        color: shuffledColors[index], 
        label: item.label
      }))
    });
    setSelectedId(null);
  };

  // Run once on mount to start the game
  useEffect(() => {
    generateLevel();
  }, []);

  const handleChoice = (option) => {
    if (selectedId) return;
    setSelectedId(option.id);

    // Logic: If label matches the center word, it's correct
    if (option.label === quizData.word) {
      setTimeout(() => {
        generateLevel();
      }, 1000);
    } else {
      setTimeout(() => setSelectedId(null), 1000);
    }
  };

  // Prevent crash while data is generating
  if (!quizData) return <div className="fixed inset-0 bg-black" />;

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden bg-black">
      
      {/* Navbar Spacer */}
      <div className="h-20 w-full flex-shrink-0" />

      {/* THE GRID CONTAINER */}
      <main className="flex-1 grid grid-cols-2 grid-rows-2 w-full relative">
        {quizData.options.map((option) => (
          <div
            key={option.id}
            onClick={() => handleChoice(option)}
            style={{ backgroundColor: option.color }}
            className={`relative flex items-center justify-center transition-opacity duration-200
              ${selectedId && selectedId !== option.id ? 'opacity-40' : 'opacity-100'}
            `}
          >
            <motion.img
              src={option.src}
              alt=""
              /* Maintained your preferred sizing */
              className="w-40 h-40 md:w-64 md:h-64 object-contain"
              initial={{ scale: 1 }}
              animate={selectedId === option.id ? { scale: 1.1 } : { scale: 1 }}
            />
          </div>
        ))}

        {/* PERFECTLY CENTERED WORD - MOVED 1px UP */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h1 
            className="text-4xl md:text-6xl font-black tracking-tight text-[#2d3436] whitespace-nowrap"
            style={{ 
              paintOrder: 'stroke fill',
              WebkitTextStroke: '6px #fff',
              lineHeight: '1',
              /* This precisely shifts the text 1 pixel up */
              marginTop: '-1px' 
            }}
          >
            {quizData.word}
          </h1>
        </div>

        {/* FOOTER BAR */}
        <div className="absolute bottom-4 left-4 pointer-events-none flex items-center gap-1 text-[11px] font-bold text-black/40 uppercase tracking-tighter">
          <span className="text-lg">←</span> sign in to save your progress
        </div>
      </main>
    </div>
  );
}