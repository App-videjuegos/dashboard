// Agrega la importación de los íconos de la NavBar
import { AiOutlineHome } from 'react-icons/ai';
import { FaGamepad, FaMoneyBill } from 'react-icons/fa';
import { IoMdAnalytics } from 'react-icons/io';
import { FaUser } from 'react-icons/fa';
import { FaUsers } from 'react-icons/fa';
import { BiSolidCloudUpload } from 'react-icons/bi';
import { AiFillEye } from 'react-icons/ai'
import { AiFillEyeInvisible } from 'react-icons/ai'
import { FiLogOut } from 'react-icons/fi'; 
import {TiDeleteOutline} from 'react-icons/ti';
import {BiImageAdd} from 'react-icons/bi'
import {ImCancelCircle} from 'react-icons/im'
import {BiCheck} from 'react-icons/bi'
import { MdInsertComment } from "react-icons/md";


// Mapeo de nombres de ruta a iconos
const routeIcons = {
  Login: AiOutlineHome,
  Profile: FaUser,
  Metrics: IoMdAnalytics,
  Users: FaUsers,
  Games: FaGamepad,
  LoadGame: BiSolidCloudUpload,
  Logout: FiLogOut,
  Visible: AiFillEye,
  Invisible: AiFillEyeInvisible,
  Sales: FaMoneyBill,
  delete: TiDeleteOutline,
  addImage: BiImageAdd,
  confirm: BiCheck,
  cancel: ImCancelCircle,
  addImage: BiImageAdd,
  Comments: MdInsertComment

};

export default routeIcons;