import './App.css';
import AuthUser from './components/AuthUser';
import Guest from './navbar/guest';
import Auth from './navbar/authd';

function App() {
  const { getToken } = AuthUser();
  if (!getToken()) {
    return <Guest />
  }
  else{
    return <Auth/>
  }
}

export default App;
