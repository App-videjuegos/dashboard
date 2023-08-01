import Games from './src/views/dashboardAdmin/Games/Games';
import Login from './src/views/dashboardAdmin/Login/Login';
import Metrics from './src/views/dashboardAdmin/Metrics/Metrics';
import Profile from './src/views/dashboardAdmin/Profile/Profile';
import Users from './src/views/dashboardAdmin/Users/Users';
import Register from './src/views/dashboardAdmin/Register/Register';

const routes = [
    { path: '/', component: Login, name: 'Login' },
    { path: '/games', component: Games, name: 'Games' },
    { path: '/metrics', component: Metrics, name: 'Metrics' },
    { path: '/profile', component: Profile, name: 'Profile' },
    { path: '/users', component: Users, name: 'Users' },
    { path: '/register', component: Register, name: 'Register' },
];

export default routes;