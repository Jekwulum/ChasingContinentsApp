import React from 'react';

const FlightDetails = ({ flight }) => {
  return (
    <div className="p-4 border border-gray-200 rounded-md mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">
          {flight.airline} {flight.flight_number}
        </h3>
        <span className="text-sm text-gray-600">{flight.duration}</span>
      </div>
      <div className="text-sm text-gray-600">
        <p>
          <strong>Departure:</strong> {new Date(flight.departure_time).toLocaleString()} ({flight.origin})
        </p>
        <p>
          <strong>Arrival:</strong> {new Date(flight.arrival_time).toLocaleString()} ({flight.destination})
        </p>
        <p>
          <strong>Cost:</strong> ${flight.cost.toFixed(2)}
        </p>
        <p>
          <strong>Layover:</strong> {flight.layover} at {flight.layover_iata}
        </p>
      </div>
    </div>
  );
};

export default FlightDetails;