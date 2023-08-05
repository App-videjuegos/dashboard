// Agrega la importación de los íconos de la NavBar
import { AiOutlineHome } from 'react-icons/ai';
import { FaGamepad } from 'react-icons/fa';
import { IoMdAnalytics } from 'react-icons/io';
import { FaUser } from 'react-icons/fa';
import { FaUsers } from 'react-icons/fa';
import { FaUserPlus } from 'react-icons/fa';
import { AiFillEye } from 'react-icons/ai'
import { AiFillEyeInvisible } from 'react-icons/ai'
// Agrega la importación del ícono de cerrar sesión
import { FiLogOut } from 'react-icons/fi'; 


// Mapeo de nombres de ruta a iconos
const routeIcons = {
  Login: AiOutlineHome,
  Games: FaGamepad,
  Metrics: IoMdAnalytics,
  Profile: FaUser,
  Users: FaUsers,
  Register: FaUserPlus,
  Logout: FiLogOut,
  Visible: AiFillEye,
  Invisible: AiFillEyeInvisible,

};

export default routeIcons;