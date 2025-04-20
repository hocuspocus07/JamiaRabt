import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing.jsx';
import SignupComponent from './components/SignupComponent.jsx';
import ChatComponent from './components/ChatComponent.jsx';
import Community from './pages/Community.jsx';
import Alumni from './pages/Alumni.jsx';
import UserDashboard from './pages/UserDashboard.jsx';
import About from './pages/About.jsx';
import AlumniProfile from './components/AlumniProfile.jsx';
import ProtectedRoute from './utils/ProtectedRoute.js';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/signup' element={<SignupComponent/>}/>
        <Route path='/chat' element={<ChatComponent/>}/>
        <Route path='/community' element={<Community/>}/>
        <Route path='/alumni' element={<Alumni/>}/>
        <Route path='/dashboard' element={<ProtectedRoute><UserDashboard/></ProtectedRoute>}/>
        <Route path='/about-us' element={<About/>}/>
        <Route path="/user/:id" element={<AlumniProfile />} />
      </Routes>
    </Router>
  )
}

export default App
