import React from 'react';

const FlightResult = ({ data }) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Flight Results</h2>
      <div className="space-y-4">
        {data.map((flight, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-md">
            <p><strong>Flight Number:</strong> {flight.flightNumber}</p>
            <p><strong>Departure:</strong> {flight.departure}</p>
            <p><strong>Arrival:</strong> {flight.arrival}</p>
            <p><strong>Duration:</strong> {flight.duration}</p>
            <p><strong>Price:</strong> {flight.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FlightResult;