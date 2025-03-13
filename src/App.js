import './App.css';
import FlightSearchForm from './FlightSearchForm';
import ApiHealth from './ApiHealth';

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ApiHealth />
      <FlightSearchForm />
    </div>
  );
}

export default App;
