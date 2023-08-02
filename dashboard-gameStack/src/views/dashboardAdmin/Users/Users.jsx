import {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { getUsers, getUserByID } from '../../../redux/usersActions.js'
import styles from './Users.module.css'; // Importa los estilos del archivo CSS

function Users() {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getUsers())
    dispatch(getUserByID("888"))
  },[])

  return (
    <div className={styles['users-container']}> 
      Users Component
    </div>
  );
}

export default Users;