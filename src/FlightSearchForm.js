import React, { useState } from 'react';
import config from './config';
import FlightResult from './FlightResult';

// import { bestItinerary, bestSequence, sampleResponse } from './x';

const FlightSearchForm = () => {
  const [flightType, setFlightType] = useState("direct");
  const [startOrigin, setStartOrigin] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState(null); // To store the backend response
  const [error, setError] = useState(""); // To store error messages
  const [loading, setLoading] = useState(false);

  // const data = JSON.parse(sampleResponse["data"]);
  // console.log(data);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!startOrigin || !departureDate || !departureTime) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");

    const queryParams = new URLSearchParams({
      start_origin: startOrigin,
      departure_date: departureDate,
      departure_time: departureTime, // Already in 24-hour format
      flight_type: flightType,
      email,
    });
    console.log(queryParams.toString());

    try {
      const fetchFlightsURL = `${config.apiBaseUrl}/api/flights`;
      // const fetchFlightsURL = `${config.apiBaseUrl}/api/tests`;
      const response = await fetch(`${fetchFlightsURL}?${queryParams}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (result.status === "SUCCESS") {
        console.log('yes');
        console.log(JSON.parse(result.data.best_itinerary));
        setResult(result.data);
        setError("");
      } else {
        console.log('no');
        setError(result.message);
        setResult(null);
      }
    } catch (err) {
      setError("An error occurred while fetching flight data.");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 mt-5 bg-white rounded-lg shadow-lg">
      <h1 className="mb-6 text-2xl font-bold text-center">Chasing Continents</h1>

      <form onSubmit={handleSubmit}>
        {/* Flight Type Select */}
        <div className="mb-4">
          <label htmlFor="flightType" className="block text-sm font-medium text-gray-700">
            Flight Type
          </label>
          <select
            id="flightType"
            name="flightType"
            value={flightType}
            onChange={(e) => setFlightType(e.target.value)}
            className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="direct">Direct Flights Only</option>
            <option value="stops">Flights with Stops</option>
          </select>
        </div>

        {/* Start Origin Input */}
        <div className="mb-4">
          <label htmlFor="startOrigin" className="block text-sm font-medium text-gray-700">
            Start Origin (PUQ)
          </label>
          <input
            type="text"
            id="startOrigin"
            name="startOrigin"
            value={startOrigin}
            onChange={(e) => {
              const alphabeticValue = e.target.value.replace(/[^A-Za-z]/g, "");
              const uppercaseValue = alphabeticValue.toUpperCase();
              const truncatedValue = uppercaseValue.slice(0, 3);
              setStartOrigin(truncatedValue);
            }}
            className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter start origin"
          />
        </div>

        {/* Date of Departure Input */}
        <div className="mb-4">
          <label htmlFor="departureDate" className="block text-sm font-medium text-gray-700">
            Date of Departure
          </label>
          <input
            type="date"
            id="departureDate"
            name="departureDate"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Time of Departure Input */}
        <div className="mb-4">
          <label htmlFor="departureTime" className="block text-sm font-medium text-gray-700">
            Arrival Time at PUQ
          </label>
          <input
            type="time"
            id="departureTime"
            name="departureTime"
            value={departureTime}
            onChange={(e) => setDepartureTime(e.target.value)}
            className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-2 border rounded-md"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg
                className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Loading...
            </div>
          ) : (
            "Search Flights"
          )}
        </button>
      </form>

      {/* Display Error Message */}
      {error && (
        <div className="p-4 mt-4 text-center text-red-700 bg-red-100 border border-red-400 rounded-md">
          {error}
        </div>
      )}

      {/* Display Results */}
      {/* {result && <FlightResult data={result} />} */}
      <div className="p-6">
        {result && <FlightResult bestItinerary={JSON.parse(result.best_itinerary)} bestSequence={result.best_sequence} />}
      </div>
    </div>
  )
}

export default FlightSearchForm;