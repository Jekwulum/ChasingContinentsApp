import React, { useState } from 'react';
import FlightResult from './FlightResult';

const FlightSearchForm = () => {
  const [flightType, setFlightType] = useState("direct");
  const [startOrigin, setStartOrigin] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [result, setResult] = useState(null); // To store the backend response
  const [error, setError] = useState(""); // To store error messages

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!startOrigin || !departureDate || !departureTime) {
      setError("Please fill in all fields.");
      return;
    }

    const queryParams = new URLSearchParams({
      start_origin: startOrigin,
      departure_date: departureDate,
      departure_time: departureTime, // Already in 24-hour format
      flight_type: flightType,
    });
    console.log(queryParams.toString());

    try {
      const fetchFlightsURL = "https://chasingcontinentsapi.onrender.com/api/flights";
      // const fetchFlightsURL = "http://127.0.0.1:5000/api/flights";
      const response = await fetch(`${fetchFlightsURL}?${queryParams}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (result.status === "success") {
        console.log(result.data);
        setResult(result.data);
        setError("");
      } else {
        setError(result.message);
        setResult(null);
      }
    } catch (err) {
      setError("An error occurred while fetching flight data.");
      setResult(null);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Chasing Continents</h1>

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
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="direct">Direct Flights Only</option>
            <option value="stops">Flights with Stops</option>
          </select>
        </div>

        {/* Start Origin Input */}
        <div className="mb-4">
          <label htmlFor="startOrigin" className="block text-sm font-medium text-gray-700">
            Start Origin
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
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
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
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Time of Departure Input */}
        <div className="mb-4">
          <label htmlFor="departureTime" className="block text-sm font-medium text-gray-700">
            Time of Departure (24HR)
          </label>
          <input
            type="time"
            id="departureTime"
            name="departureTime"
            value={departureTime}
            onChange={(e) => setDepartureTime(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Search Flights
        </button>
      </form>

      {/* Display Error Message */}
      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {/* Display Results */}
      {/* {result && <FlightResult data={result} />} */}
    </div>
  )
}

export default FlightSearchForm;