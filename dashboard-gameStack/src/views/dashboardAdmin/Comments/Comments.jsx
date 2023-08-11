import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getComments,updateComment,getCommentsbyName} from '../../../redux/commentsActions';
import { convertirFecha } from "../../../components/Helpers/InvertDate";
import styles from './Comments.module.css';
import EditGameModal from "./EditGameModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck, faCircleXmark, faPen, faStreetView } from '@fortawesome/free-solid-svg-icons';


function Comments() {
  const dispatch = useDispatch();
  const [input, setInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  
  const [selectedComment, setSelectedComment] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false)
  const usuariosPorPagina = 10;

  useEffect(() => {
    dispatch(getComments());
    // dispatch(getUserByID('888'));
  }, []);

  let allComments = useSelector((state) => state.commentsState.allComments);
  console.log("comments",allComments)

  function compararHorasDescendente(a, b) {
    const horaA = new Date(a.reviewDate).getTime(); // Obtener el tiempo en milisegundos
    const horaB = new Date(b.reviewDate).getTime();
    return horaB - horaA; // Cambio en la comparación para orden descendente por hora
  }
  
  // Ordenar los comentarios por hora de manera descendente antes de realizar la paginación
  allComments = [...allComments].sort(compararHorasDescendente);

  function changeHandler(e) {
    setInput(e.target.value);
    const busqueda = e.target.value.toLowerCase();
    dispatch(getCommentsbyName(busqueda));
  }

  // Función para cerrar el modal de edición
  const closeEditModal = () => {
    setShowEditModal(false);
  };

  const handleSaveEdit = (editedGame) => {
    // Implementa aquí la lógica para guardar los cambios del juego editado
    console.log("Guardando cambios del juego:", editedGame);
    // Puedes despachar la acción de Redux para actualizar el juego en el estado global aquí
  };




  const handleEditClick = (user) => {
    const updatedUser = { deleted: !user.deleted, id: user.id };

    dispatch(updateComment(updatedUser)); // Actualiza el estado global

  };
  

  // Lógica de paginación
  const indiceUltimoUsuario = currentPage * usuariosPorPagina;
  const indicePrimerUsuario = indiceUltimoUsuario - usuariosPorPagina;

  if(allComments.length > 0){


    const usuariosActuales = allComments.slice(indicePrimerUsuario, indiceUltimoUsuario);



    const handlePageChange = (numeroPagina) => {
      setCurrentPage(numeroPagina);
    };
  
    const goToPreviousPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };
  
    const goToNextPage = () => {
      if (currentPage < Math.ceil(allComments.length / usuariosPorPagina)) {
        setCurrentPage(currentPage + 1);
      }
    };
  
    return (
      <div className={styles['users-container']}>
              {showEditModal && selectedComment && (
        <EditGameModal
          selectedComment={selectedComment}
          onClose={closeEditModal}
          onSave={handleSaveEdit}
        />
      )}
        <div className={styles.tableContainer}>
          <div className={styles.bar}>
            <div className={styles.userRow}>
              <div className={styles.title}>Comments</div>
              <div className={styles.SearchBar}>
                <input type="text" className={styles.searchInput} placeholder="Search" onChange={changeHandler} />
                {/* <button className="searchButton" type="submit"  >Buscar</button> */}
              </div>
            </div>
          </div>
          <div>
            <div className={styles.tableTable}>
              <div className={styles.userTable}>
                <div className={styles.userRow}>
                  <div className={styles.userHeaderColumn1}>User</div>
                  <div className={styles.userHeaderColumn2}></div>
                  <div className={styles.userHeaderColumn3}>Comments</div>
                  <div className={styles.userHeaderColumn4}>Status</div>
                  <div className={styles.userHeaderColumn5}>Game ID</div>
                  <div className={styles.userHeaderColumn6}>Date</div>
                </div>
              </div>
              {Array.isArray(usuariosActuales) && usuariosActuales.length > 0 ? (
                usuariosActuales.slice()
                .sort(compararHorasDescendente).map((e) => (
             
                //     <div
                //   key={e.id}
                //   className={`${styles.userRow} 
                //   }`} 
                //   onClick={() => handleSelectComment(e)}
                // >  
                  
                  <div className={styles.userTable} key={e.id}>
                    <div className={styles.userRow}>
                      <div className={styles.userColumn2}>{e.user ? e.user: "Guest"}</div>
                      <div className={styles.userColumn3}>{e.comment}</div>
                      <div className={styles.userColumn5}>{e.deleted ? (
                        <span>
                          <FontAwesomeIcon icon={faCircleXmark} className={styles.crossIcon} />
                          <span className={styles.red}>Banned</span>
                          <FontAwesomeIcon icon={faPen} className={styles.editIcon} onClick={() => handleEditClick(e)} />
                        </span>
                      ) : (
                        <span>
                          <FontAwesomeIcon icon={faCircleCheck} className={styles.crossIconAllow} />
                          <span className={styles.green}>Allow</span>
                          <FontAwesomeIcon icon={faPen} className={styles.editIcon} onClick={() => handleEditClick(e)} />
                        </span>
                      )}</div>
                      <div className={styles.userColumn5}>{e.videogameId}</div>
                      <div className={styles.userColumn6}>{convertirFecha(e.reviewDate)}</div>
                      {/* <button className= {styles.buttonDelete} onClick={ openEditModal}>
        <FontAwesomeIcon className={styles.icon} icon={faTrash} />
      </button> */}
                    </div>
                  </div>
                  // </div>

                  
                ))
              ) : (
                <div className={styles.NoFundMessage}>No comment(s) to display</div>
              )}
            </div>
          </div>
          {/* Botones de paginación y flechas */}
          <div className={styles.pagination}>
            <button onClick={goToPreviousPage}>&lt;</button>
            {Array.from({ length: Math.ceil(allComments.length / usuariosPorPagina) }).map((_, index) => (
              <button key={index} onClick={() => handlePageChange(index + 1)} className={currentPage === index + 1 ? styles.btnPaged : ''}>
                {index + 1}
              </button>
            ))}
            <button onClick={goToNextPage}>&gt;</button>
          </div>
        </div>
  
      </div>
    );
  }
  }
 

export default Comments;