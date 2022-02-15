import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Context } from './Context/Context';
import LoginScreen from './Screens/LoginScreen/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen/RegisterScreen';
import HomeScreen from './Screens/HomeScreen/HomeScreen';
import SendScreen from './Screens/SendScreen/SendScreen';
import DepositScreen from './Screens/DepositScreen/DepositScreen';

import './App.scss';

function App() {
  const { user } = useContext(Context);

  // TODO: Reroute to new page instead of rendering component under wrong path
  return (
    <Router>
      <Routes>
        <Route path='/home' element={user ? <HomeScreen /> : <LoginScreen />} />
        <Route
          path='/deposit'
          element={user ? <DepositScreen /> : <LoginScreen />}
        />
        <Route path='/send' element={user ? <SendScreen /> : <LoginScreen />} />
        <Route
          exact
          path='/'
          element={user ? <HomeScreen /> : <LoginScreen />}
        />
        <Route
          path='/register'
          element={user ? <HomeScreen /> : <RegisterScreen />}
        />
      </Routes>
    </Router>
  );
}

export default App;
