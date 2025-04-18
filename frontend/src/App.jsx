import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing.jsx';
import Signup from './pages/SIgnup.jsx';
import ChatComponent from './components/ChatComponent.jsx';
import Community from './pages/Community.jsx';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/chat' element={<ChatComponent/>}/>
        <Route path='/community' element={<Community/>}/>
      </Routes>
    </Router>
  )
}

export default App
