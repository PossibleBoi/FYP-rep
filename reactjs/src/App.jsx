import React from 'react'
import './App.css';
import AuthUser from './components/AuthUser';
import GuestNav from './Navbar/guest';
import Auth from './Navbar/navigation';

function App() {
  const { getToken } = AuthUser();
  if (!getToken()) {
    return <GuestNav/>
  }
  else{
    return <Auth/>
  }
}

export default App;
