import Games from './src/views/dashboardAdmin/Games/Games';
import LoadVideogame from './src/views/dashboardAdmin/LoadVideogame/LoadVideogame';
import Metrics from './src/views/dashboardAdmin/Metrics/Metrics';
import Profile from './src/views/dashboardAdmin/Profile/Profile';
import Users from './src/views/dashboardAdmin/Users/Users';

const routes = [
    // { path: '/', component: Login, name: 'Login' },
    { path: '/games', component: Games, name: 'Games' },
    { path: '/metrics', component: Metrics, name: 'Metrics' },
    { path: '/profile', component: Profile, name: 'Profile' },
    { path: '/users', component: Users, name: 'Users' },
    { path: '/LoadVideogame', component: LoadVideogame, name: 'LoadGame' },
];

export default routes;