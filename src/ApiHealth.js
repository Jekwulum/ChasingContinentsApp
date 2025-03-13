import React, { useState, useEffect } from 'react';
import config from './config';

const ApiHealth = () => {
  const [status, setStatus] = useState("Checking API Health...");
  const [isHealthy, setIsHealthy] = useState(false);

  const checkHealth = async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/api/health`);
      if (response.ok) {
        const data = await response.json();
        if (data.status === "UP") {
          setStatus("Backend is up 🟢");
          setIsHealthy(true);
        } else {
          setStatus("Backend is down 🔴");
          setIsHealthy(false);
        }
      } else {
        setStatus("Backend is down 🔴");
        setIsHealthy(false);
      }
    } catch (error) {
      setStatus("Backend is down 🔴");
      setIsHealthy(false);
    }
  };

  // Check health every 10 seconds
  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, 10000); // Check every 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`fixed top-4 right-4 p-2 rounded-md text-sm font-semibold ${isHealthy ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}
    >
      {status}
    </div>
  )
}

export default ApiHealth;