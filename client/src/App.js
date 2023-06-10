import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Login from './components/Login'
import Notes from './components/Notes'


function App() {
  const [isLogin, setIsLogin] = useState(false)

return (
  <div className='App'>
{
  isLogin ? < Notes /> : < Login/>
}
  </div>
);
}


export default App;
