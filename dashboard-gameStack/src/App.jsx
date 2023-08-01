import {   Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './views/NavBar/NavBar';

// Importar los componentes de las rutas
import Games from './views/dashboardAdmin/Games/Games';
import Metrics from './views/dashboardAdmin/Metrics/Metrics';
import Profile from './views/dashboardAdmin/Profile/Profile';
import Users from './views/dashboardAdmin/Users/Users';
import Register from './views/dashboardAdmin/Register/Register';
import Login from './views/dashboardAdmin/Login/Login';

function App() {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== "/" && <NavBar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/games" element={<Games />} />
        <Route path="/metrics" element={<Metrics />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/users" element={<Users />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;