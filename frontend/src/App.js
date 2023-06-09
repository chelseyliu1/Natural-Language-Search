import './App.css';
import React from 'react';
import Home from './pages/home';
import Display from './pages/display';
import { BrowserRouter as Router, Routes, Route }
  from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/display' element={<Display />} />
      </Routes>
    </Router>
  );
}

export default App;
