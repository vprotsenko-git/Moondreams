import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import Generate from './Generate';
import Assets from './Assets';
import './App.css';

export default function App() {
  return (
    <Router>
      <header className="navbar">
        <NavLink to="/generate" className="nav-item" activeclassname="active">
          Generate
        </NavLink>
        <NavLink to="/assets" className="nav-item" activeclassname="active">
          Assets
        </NavLink>
      </header>
      <main className="main">
        <Routes>
          <Route path="/" element={<Navigate to="/generate" replace />} />
          <Route path="/generate" element={<Generate />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="*" element={<Navigate to="/generate" replace />} />
        </Routes>
      </main>
    </Router>
  );
}