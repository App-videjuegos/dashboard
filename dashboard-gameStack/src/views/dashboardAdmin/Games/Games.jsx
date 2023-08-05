import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getvGamebyName,
  getvideoGames,
} from "../../../redux/videogamesActions";
import styles from "./Games.module.css";
import { convertirFecha } from "../../../components/Helpers/InvertDate";
import Filter from "../../../components/Filters/Filters";
import EditGameModal from "./EditGameModal";


let prevId = 1;

function Games() {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const videoGamesState = useSelector((state) => state.videoGamesState);
  const { videoGames, filteredVideoGames, sortBy } = videoGamesState;
  const juegosPorPagina = 10;

  const [selectedGame, setSelectedGame] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Función para abrir el modal de edición
  const openEditModal = () => {
    setShowEditModal(true);
  };

  // Función para cerrar el modal de edición
  const closeEditModal = () => {
    setShowEditModal(false);
  };

  // Función para guardar los cambios del formulario de edición
  const handleSaveEdit = (editedGame) => {
    // Implementa aquí la lógica para guardar los cambios del juego editado
    console.log("Guardando cambios del juego:", editedGame);
    // Puedes despachar la acción de Redux para actualizar el juego en el estado global aquí
  };

  const handleSelectGame = (game) => {
    if (selectedGame && selectedGame.id === game.id && showMenu) {
      // Deseleccionar el juego si ya estaba seleccionado y el menú está visible
      setSelectedGame(null);
      setShowMenu(false); // Ocultar el menú emergente al deseleccionar
    } else {
      // Seleccionar el juego si no estaba seleccionado previamente
      setSelectedGame(game);
      setShowMenu(true); // Mostrar el menú emergente al seleccionar
    }
  };

  const handleEditGame = () => {
    // Implementa aquí la lógica para editar el juego seleccionado
    console.log("Editando el juego seleccionado:", selectedGame);
    setShowMenu(false); // Ocultar el menú emergente después de editar
  };

  const handleDeleteGame = () => {
    // Implementa aquí la lógica para eliminar el juego seleccionado
    console.log("Eliminando el juego seleccionado:", selectedGame);
    setSelectedGame(null); // Reseteamos el juego seleccionado después de eliminarlo
    setShowMenu(false); // Ocultar el menú emergente después de eliminar
  };

  useEffect(() => {
    dispatch(getvideoGames());
  }, []);

  function changeHandler(e) {
    setInput(e.target.value);
    const busqueda = e.target.value.toLowerCase();
    dispatch(getvGamebyName(busqueda));
  }

  const juegosActuales =
    filteredVideoGames && filteredVideoGames.length > 0
      ? filteredVideoGames
      : videoGames;

  const juegosOrdenados = juegosActuales.slice().sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "alphabetical-asc":
        return a.name.localeCompare(b.name);
      case "alphabetical-desc":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  const indiceUltimoJuego = currentPage * juegosPorPagina;
  const indicePrimerJuego = indiceUltimoJuego - juegosPorPagina;
  const juegosPaginaActual = juegosOrdenados.slice(
    indicePrimerJuego,
    indiceUltimoJuego
  );

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
    <div className={styles["users-container"]}>
      {showEditModal && selectedGame && (
        <EditGameModal
          selectedGame={selectedGame}
          onClose={closeEditModal}
          onSave={handleSaveEdit}
        />
      )}
      <div className={styles.tableContainer}>
        <div className={styles.bar}>
          <div className={styles.userRow}>
            <div className={styles.title}>Games</div>
            <div className={styles.filters}>
              <Filter />
            </div>
            <div className={styles.SearchBar}>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Search"
                onChange={changeHandler}
              />
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
            {Array.isArray(juegosPaginaActual) &&
            juegosPaginaActual.length > 0 ? (
              juegosPaginaActual.map((e) => (
                <div
                  key={e.id}
                  className={`${styles.userRow} ${
                    selectedGame && selectedGame.id === e.id
                      ? styles.selectedRow
                      : ""
                  }`}
                  onClick={() => handleSelectGame(e)}
                >
                  <div className={styles.userTable} key={prevId++}>
                    <div className={styles.userRow}>
                      <div className={styles.userColumn1}>
                        <img
                          className={styles.userImage}
                          src={e.image}
                          alt="imagen del juego"
                        />
                      </div>
                      <div className={styles.userColumn2}>{e.price}$ </div>
                      <div className={styles.userColumn3}>{e.name}</div>
                      <div className={styles.userColumn4}>{e.id}</div>
                      <div className={styles.userColumn5}>{e.stock}</div>
                      <div className={styles.userColumn6}>
                        {convertirFecha(e.updatedAt)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.NoFundMessage}>No game(s) to display</div>
            )}
          </div>
        </div>
        {showMenu && selectedGame && (
          <div className={styles.menuContainer}>
            <button onClick={openEditModal}>Editar</button>
            <button onClick={handleDeleteGame}>Eliminar</button>
          </div>
        )}
        {/* Botones de paginación y flechas */}
        <div className={styles.pagination}>
          <button onClick={goToPreviousPage}>&lt;</button>
          {Array.from({
            length: Math.ceil(videoGames.length / juegosPorPagina),
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? styles.btnPaged : ""}
            >
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
