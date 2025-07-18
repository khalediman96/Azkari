'use client';

import React, { useState } from 'react';

const Counter: React.FC = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={increment}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Count
      </button>
      <span className="text-xl font-mono bg-gray-200 px-4 py-2 rounded-md">
        {count}
      </span>
      <button
        onClick={reset}
        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
      >
        Reset
      </button>
    </div>
  );
};

export default Counter;