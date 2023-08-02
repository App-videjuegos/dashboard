import axios from "axios";
import { getAllUsers, getUserById, usrMsgErr, getUserbyName, notFoundUsersError, setErrorMsg } from './usersSlice.js'


// export const getUsers=()=>(dispatch)=> {
//     axios("https://pfvideojuegos-back-production.up.railway.app/user/888")
//     .then(res=>dispatch(getAllUsers(res.data.results)))
//     .catch(e=>console.log(e))
// }
let estado=0
export const getUsers = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `https://pfvideojuegos-back-production.up.railway.app/user`
      );

      const dataUsers = response.data;

      if (dataUsers) {
        dispatch(getAllUsers(dataUsers));
      } else {
        dispatch(usrMsgErr("No user registration"));
      }
    } catch (error) {
      console.log(`Error: ${error}`);
      dispatch(usrMsgErr(error));
    }
  };
};

export const getUserByID = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `https://pfvideojuegos-back-production.up.railway.app/user/${id}`
      );

      const dataUser = response.data;

      if (dataUser) {
        dispatch(getUserById(dataUser));
      } else {
        dispatch(usrMsgErr("No user registration"));
      }
    } catch (err) {
      console.log(`Error: ${err}`);
      dispatch(usrMsgErr(err));
    }
  };
};


export const getUsersbyName =(query)=> (dispatch=>{
  console.log("esto me llega de query",query)
  fetch(`https://pfvideojuegos-back-production.up.railway.app/user?user=${query}`)
          .then(response =>{
              estado= response.status
              return response.json()
          })
          .then(json =>{
              if(estado ===200)
              // {
                 if(json.includes('No se encontraron videojuegos con el nombre') ) 
                      //  alert('No se encontraron videojuegos con ese Nombre')
                      dispatch(notFoundUsersError())
                  else 
                      dispatch(getUserbyName(json))
            
          }).catch(error =>{
              alert("error", error)
              dispatch(setErrorMsg(error))
          })
 
})

