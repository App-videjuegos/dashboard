import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers, getUserByID, getUsersbyName } from '../../../redux/usersActions.js'
import styles from './Users.module.css'; // Importa los estilos del archivo CSS


let prevId = 1;

function Users() {
  const dispatch = useDispatch()
  const [input, setInput] = useState("");

  useEffect(() => {
    dispatch(getUsers())
    dispatch(getUserByID("888"))
  }, [])
  let allUsers = useSelector((state) => state.usersState.allUsers)

  //console.log(allUsers)

  function changeHandler(e) {
    //e.preventDefault();
    //console.log(e.target.value)    
    setInput(e.target.value);
    //console.log(e.target.value)
    const busqueda = (e.target.value).toLowerCase();
    dispatch(getUsersbyName(busqueda))

    // const resultados = allUsers.filter((usuario) => usuario.fullname.toLowerCase().includes(busqueda));
    // allUsers = resultados
    // console.log("nuevos allUsers")
    // console.log(allUsers)
    //allUsers = allUsers.includes(busqueda);
  }

  return (
    <div className={styles['users-container']}>
      <div className={styles.tableContainer}>
        <div className={styles.bar}>
          <div className={styles.userRow}>
            <div className={styles.title}>Users</div>
            <div className={styles.SearchBar}>
              <input type="text" className="searchInput" placeholder="Search" onChange={changeHandler} />
              <button className="searchButton" type="submit"  >Search</button>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.userTable}>
            <div className={styles.userRow}>
              <div className={styles.userHeaderColumn1}>User</div>
              <div className={styles.userHeaderColumn2}></div>
              <div className={styles.userHeaderColumn3}>Fullname</div>
              <div className={styles.userHeaderColumn4}>id</div>
              <div className={styles.userHeaderColumn5}>State</div>
              <div className={styles.userHeaderColumn6}>Birthday</div>
            </div>
          </div>
          {
            Array.isArray(allUsers) && allUsers.length > 0 ? (
              allUsers.map((e) => (
                <div className={styles.userTable} key={prevId++}>
                  <div className={styles.userRow}>
                    <div className={styles.userColumn1}>
                      <img className={styles.userImage} src={e.image} alt="image user" />
                    </div>
                    <div className={styles.userColumn2}>{e.user}</div>
                    {/* <div className={styles.userCell}>User = {e.user}</div> */}
                    <div className={styles.userColumn3}>{e.fullname}</div>
                    <div className={styles.userColumn4}>{e.id}</div>
                    <div className={styles.userColumn5}>{e.deleted ? "Banned" : "Allow"}</div>
                    <div className={styles.userColumn6}>{e.date.slice(0, 10)}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.NoFundMessage}>No user(s) to display</div>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default Users;