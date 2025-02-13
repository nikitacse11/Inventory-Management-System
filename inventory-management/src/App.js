import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inventory from "./components/home";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inventory />} />
      </Routes>
    </Router>
  );
}

export default App;
