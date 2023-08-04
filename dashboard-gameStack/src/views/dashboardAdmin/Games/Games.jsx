import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getvGamebyName, getVGameByID, getvideoGames } from '../../../redux/videogamesActions'; 
import styles from './Games.module.css';
import { convertirFecha } from '../../../components/Helpers/InvertDate';
import Filter from '../../../components/Filters/Filters';
import { clearFilters } from '../../../redux/videogamesSlice';

let prevId = 1;

function Games() {
  const dispatch = useDispatch();
  const [input, setInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const videoGamesState = useSelector((state) => state.videoGamesState);
  const { videoGames, filteredVideoGames, sortBy } = videoGamesState;
  const juegosPorPagina = 10;
  const resetComponent = useSelector((state) => state.videoGamesState.resetComponent); // Agregar este selector para escuchar cambios en el estado resetComponent
  

  useEffect(() => {
    console.log("Reset component changed. Resetting the current page.");
    setCurrentPage(1); // Reiniciamos la página actual al limpiar los filtros
  }, [resetComponent]);

  useEffect(() => {
    dispatch(getvideoGames());
  }, []);

  function changeHandler(e) {
    setInput(e.target.value);
    const busqueda = e.target.value.toLowerCase();
    dispatch(getvGamebyName(busqueda));
  }

  // Lógica para obtener los videojuegos actuales (filtrados o no) según la página actual y el estado de ordenamiento
const juegosActuales = filteredVideoGames.length > 0 ? filteredVideoGames : videoGames;
const juegosOrdenados = juegosActuales.slice().sort((a, b) => {
  // Implementar la lógica de ordenamiento según el estado de ordenamiento en videoGamesState
  switch (sortBy) {
    case 'rating-asc':
      return a.rating - b.rating;
    case 'rating-desc':
      return b.rating - a.rating;
    case 'price-asc':
      return a.price - b.price;
    case 'price-desc':
      return b.price - a.price;
    case 'release-date-asc':
      return new Date(a.releaseDate) - new Date(b.releaseDate);
    case 'release-date-desc':
      return new Date(b.releaseDate) - new Date(a.releaseDate);
    case 'alphabetical-asc':
      return a.name.localeCompare(b.name);
    case 'alphabetical-desc':
      return b.name.localeCompare(a.name);
    default:
      return 0;
  }
});

const indiceUltimoJuego = currentPage * juegosPorPagina;
const indicePrimerJuego = indiceUltimoJuego - juegosPorPagina;
const juegosPaginaActual = juegosOrdenados.slice(indicePrimerJuego, indiceUltimoJuego);


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

  const handleClearFilters = () => {
    dispatch(clearFilters());
    setCurrentPage(1); // También es necesario restablecer la página actual al limpiar los filtros
  };
  

  
  // console.log("Estado videoGames:", videoGames);
  // console.log("Estado filteredVideoGames:", filteredVideoGames);
  
  return (
    <div className={styles['users-container']}>
      <div className={styles.tableContainer}>
        <div className={styles.bar}>
          <div className={styles.userRow}>
            <div className={styles.title}>Games</div>
            <Filter />
            <button onClick={handleClearFilters}>Clear Filters</button>
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
            {Array.isArray(juegosPaginaActual) && juegosPaginaActual.length > 0 ? (
    juegosPaginaActual.map((e) => (
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