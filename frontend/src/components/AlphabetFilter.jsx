import React from 'react';
import { Button } from "@/components/ui/button";

const AlphabetFilter = ({ onLetterSelect, selectedLetter }) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="flex flex-wrap gap-2">
      {alphabet.map((letter) => (
        <Button
          key={letter}
          variant={selectedLetter === letter ? "default" : "outline"}
          onClick={() => onLetterSelect(letter)}
          className={`
            ${selectedLetter === letter
              ? 'bg-yellow-400 text-black'
              : 'bg-gray-800 text-white'}
            hover:bg-yellow-500
          `}
        >
          {letter}
        </Button>
      ))}
       <Button
        variant={!selectedLetter ? "default" : "outline"}
        onClick={() => onLetterSelect(null)}
        className={`
          ${!selectedLetter
            ? 'bg-yellow-400 text-black'
            : 'bg-gray-800 text-white'}
          hover:bg-yellow-500
        `}
      >
        All
      </Button>
    </div>
  );
};

export default AlphabetFilter;
