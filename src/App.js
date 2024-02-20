import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './Components/Register';
import Scanner from './Components/Scan';
import AllMembers from './Components/AllMembers';
import About from './Components/About';
import ResponsiveAppBar from './Components/ResponsiveAppBar';
import UserProfile from './Components/UserProfile';
import Apk from './Components/Apk';

function App() {
  return (
    <Router>
      <div className="App">
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/scan" element={<Scanner />} />
          <Route path='/members' element={<AllMembers />} />
          <Route path='/apk' element={<Apk />} />
          <Route path='/user-profile/:matricule' element={<UserProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
