import React from 'react';

const FlightSummary = ({ totalFlightDuration, totalLayoverDuration, totalTravelTime, totalCost }) => {
  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-md">
      <h2 className="text-xl font-semibold mb-2">Summary</h2>
      <div className="text-sm text-gray-600">
        <p>
          <strong>Total Flight Duration:</strong> {totalFlightDuration}
        </p>
        <p>
          <strong>Total Layover Duration:</strong> {totalLayoverDuration}
        </p>
        <p>
          <strong>Total Travel Time:</strong> {totalTravelTime}
        </p>
        <p>
          <strong>Total Cost:</strong> ${totalCost.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default FlightSummary;