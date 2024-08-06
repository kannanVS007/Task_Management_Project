import React from 'react';
import './App.css';
import Header from './Component/Header';
import Sidebar from './Component/Sidebar';
import TimeTracker from './Component/TimeTracker';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import CustomerPage from './Component/Customer';
import ProjectPage from './Component/ProjectPage';
import TeamPage from './Component/TeamPage';
import User from './Component/User';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        
        <div className="App-body">
          <Sidebar />
          <main className="App-content">
            <Routes>
              <Route path="/time-tracker" element={<TimeTracker />} />
              <Route path="/customer" element={<CustomerPage />} /> 
              <Route path="/project" element={<ProjectPage />} /> 
              <Route path="/team" element={<TeamPage />} /> 
              <Route path="/user" element={<User/>} /> 
              {/* Add more routes here if needed */}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
