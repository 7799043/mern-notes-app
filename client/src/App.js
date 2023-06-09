import './App.css';
import React, {useState, useEffect} from 'react';
import Login from './components/Login'
import Notes from './components/Notes'



function App() {
  return (
    <div className="App">
      <Notes />
      <Login />
      
    </div>
  );
}

export default App;
