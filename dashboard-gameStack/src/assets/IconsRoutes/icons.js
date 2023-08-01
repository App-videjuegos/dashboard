import { AiOutlineHome } from 'react-icons/ai';
import { FaGamepad } from 'react-icons/fa';
import { IoMdAnalytics } from 'react-icons/io';
import { FaUser } from 'react-icons/fa';
import { FaUsers } from 'react-icons/fa';
import { FaUserPlus } from 'react-icons/fa';

// Mapeo de nombres de ruta a iconos
const routeIcons = {
  Login: AiOutlineHome,
  Games: FaGamepad,
  Metrics: IoMdAnalytics,
  Profile: FaUser,
  Users: FaUsers,
  Register: FaUserPlus,
};

export default routeIcons;