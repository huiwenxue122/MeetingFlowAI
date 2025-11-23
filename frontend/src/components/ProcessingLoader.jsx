import React from 'react';

const ProcessingLoader = ({ status }) => {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 my-8 text-center animate-pulse">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        🤖 AI Is Thinking...
      </h2>
      <p className="text-gray-600 text-lg">
        {status}
      </p>
    </div>
  );
};

export default ProcessingLoader;
