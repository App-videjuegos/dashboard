import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getvGamebyName, getVGameByID, getvideoGames } from '../../../redux/videogamesActions'; 
import styles from './Games.module.css';
import { convertirFecha } from '../../../components/Helpers/InvertDate';


let prevId = 1;

function Games() {
  const dispatch = useDispatch();
  const [input, setInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const videoGames = useSelector((state) => state.videoGamesState.videoGames);
  const juegosPorPagina = 10;



  useEffect(() => {
    dispatch(getvideoGames());
  }, []);

  function changeHandler(e) {
    setInput(e.target.value);
    const busqueda = e.target.value.toLowerCase();
    dispatch(getvGamebyName(busqueda));
  }

  const indiceUltimoJuego = currentPage * juegosPorPagina;
  const indicePrimerJuego = indiceUltimoJuego - juegosPorPagina;
  const juegosActuales = videoGames.slice(indicePrimerJuego, indiceUltimoJuego);

  const handlePageChange = (numeroPagina) => {
    setCurrentPage(numeroPagina);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < Math.ceil(videoGames.length / juegosPorPagina)) {
      setCurrentPage(currentPage + 1);
    }
  };

  
  // console.log("Estado videoGames:", videoGames);
  // console.log("Estado filteredVideoGames:", filteredVideoGames);
  
  return (
    <div className={styles['users-container']}>
      <div className={styles.tableContainer}>
        <div className={styles.bar}>
          <div className={styles.userRow}>
            <div className={styles.title}>Games</div>
            <div className={styles.SearchBar}>
              <input type="text" className={styles.searchInput} placeholder="Search" onChange={changeHandler} />
            </div>
          </div>
        </div>
        <div>
          <div className={styles.tableTable}>
            <div className={styles.userTable}>
              <div className={styles.userRow}>
                <div className={styles.userHeaderColumn1}>Game/Price</div>
                <div className={styles.userHeaderColumn2}></div>
                <div className={styles.userHeaderColumn3}>Name</div>
                <div className={styles.userHeaderColumn4}>ID</div>
                <div className={styles.userHeaderColumn5}>Stocke</div>
                <div className={styles.userHeaderColumn6}>Upload date</div>
              </div>
            </div>
            {Array.isArray(juegosActuales) && juegosActuales.length > 0 ? (
              juegosActuales.map((e) => (
                <div className={styles.userTable} key={prevId++}>
                  <div className={styles.userRow}>
                    <div className={styles.userColumn1}>
                      <img className={styles.userImage} src={e.image} alt="imagen del juego" />
                    </div>
                     <div className={styles.userColumn2}>{e.price}$ </div> 
                    <div className={styles.userColumn3}>{e.name}</div>
                    <div className={styles.userColumn4}>{e.id}</div> 
                     <div className={styles.userColumn5}>{e.stock}</div> 
                     <div className={styles.userColumn6}>{convertirFecha(e.updatedAt)}</div> 
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.NoFundMessage}>No game(s) to display</div>
            )}
          </div>
        </div>
        {/* Botones de paginación y flechas */}
        <div className={styles.pagination}>
          <button onClick={goToPreviousPage}>&lt;</button>
          {Array.from({ length: Math.ceil(videoGames.length / juegosPorPagina) }).map((_, index) => (
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

export default Games;