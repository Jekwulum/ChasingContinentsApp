import React from 'react';

const FlightSequence = ({ sequence }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Flight Sequence</h2>
      <div className="flex space-x-1 justify-evenly">
        {sequence.map((airport, index) => (
          <span key={index} className="bg-blue-100 text-sm text-blue-800 px-2 py-1 rounded-full">
            {airport}
          </span>
        ))}
      </div>
    </div>
  );
};

export default FlightSequence;