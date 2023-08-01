import {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { getUsers, getUserByID } from '../../../redux/usersActions.js'

function Users() {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getUsers())
    dispatch(getUserByID("888"))
  },[])

  return <div>User Component</div>;
}

export default Users;