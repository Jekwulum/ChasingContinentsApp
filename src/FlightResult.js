import React from 'react';
import FlightDetails from './FlightDetails';
import FlightSequence from './FlightSequence';
import FlightSummary from './FlightSummary';

const FlightResult = ({ bestSequence, bestItinerary }) => {
  console.log(`bestSequence: ${bestSequence}`);
  console.log(`bestItinerary: ${bestItinerary}`);
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Your Flight Itinerary</h1>

      {/* Flight Sequence */}
      <FlightSequence sequence={bestSequence} />

      {/* Flight Details */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Flight Details</h2>
        {bestItinerary.flights.map((flight, index) => (
          <FlightDetails key={index} flight={flight} />
        ))}
      </div>

      {/* Summary */}
      <FlightSummary
        totalFlightDuration={bestItinerary.total_flight_duration}
        totalLayoverDuration={bestItinerary.total_layover_duration}
        totalTravelTime={bestItinerary.total_travel_time}
        totalCost={bestItinerary.total_cost}
      />
    </div>
  );
};

export default FlightResult;