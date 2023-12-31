import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateVideoGame } from "../../../redux/videogamesActions"; // Asegúrate de importar correctamente el archivo donde se define la acción
import showAlert from "../../../components/Helpers/SwetAlert/SwetAlert1Confirmation";

import styles from "./EditGameModal.module.css"; // Estilos para el modal

const genres = [
  "Action",
  "Adventure",
  "Arcade",
  "Casual",
  "Family",
  "Fighting",
  "Indie",
  "Massively Multiplayer",
  "Platformer",
  "Puzzle",
  "RPG",
  "Shooter",
  "Simulation",
  "Sports",
  "Strategy",
];

const platforms = [
  "Nintendo Switch",
  "PC",
  "PlayStation 4",
  "PlayStation 5",
  "Xbox Series S/X",
  "Linux",
  "Android",
  "macOS",
];

function EditGameModal({ selectedGame, onClose, onSave }) {
  const [editedGame, setEditedGame] = useState(selectedGame);
  const [formattedReleaseDate, setFormattedReleaseDate] = useState(
    selectedGame.releaseDate
      ? new Date(selectedGame.releaseDate).toISOString().split("T")[0]
      : ""
  );
  const [selectedPlatforms, setSelectedPlatforms] = useState(
    selectedGame.platforms || []
  );
  const [selectedGenres, setSelectedGenres] = useState(
    selectedGame.genre || []
  );
  const [newPlatform, setNewPlatform] = useState("");
  const [newGenre, setNewGenre] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [selectedPlatformToRemove, setSelectedPlatformToRemove] = useState("");
  const [selectedGenreToRemove, setSelectedGenreToRemove] = useState("");
  const [description, setDescription] = useState(
    selectedGame.description || ""
  );

  const dispatch = useDispatch();

  const hideSuccessMessage = () => {
    setShowSuccessMessage(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "releaseDate") {
      setFormattedReleaseDate(value);
    } else if (name === "description") {
      // Agregar esta parte para manejar la descripción
      setDescription(value);
    }
    setEditedGame((prevGame) => ({
      ...prevGame,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    // Formatear la fecha en el formato esperado (yyyy-MM-dd)
    const formattedReleaseDate = new Date(editedGame.releaseDate)
      .toISOString()
      .split("T")[0];

    // Crear un nuevo objeto con la fecha formateada
    const editedGameWithFormattedDate = {
      ...editedGame,
      released: formattedReleaseDate,
      platforms: selectedPlatforms,
      genre: selectedGenres,
      description: description, // Añadir la descripción aquí
    };

    try {
      // Llamar a la acción updateVideoGame para actualizar el videojuego
      await dispatch(updateVideoGame(editedGameWithFormattedDate));
      onSave(editedGame); // Pasa el objeto del juego editado al componente padre
      setShowSuccessMessage(true); // Mostrar el mensaje de éxito
      setTimeout(hideSuccessMessage, 3000); // Ocultar el mensaje después de 3 segundos
    } catch (error) {
      console.log("Error al guardar los cambios:", error);
      // Manejo de errores si es necesario
      // ...
    }
  };

  const handleCancel = () => {
    onClose(); // Cierra el modal sin guardar cambios
  };

  const handleDeleteToggle = () => {
    setEditedGame((prevGame) => ({
      ...prevGame,
      deleted: !prevGame.deleted,
    }));
  };

  const handlePlatformChange = (e) => {
    const { value } = e.target;
    if (!selectedPlatforms.includes(value)) {
      setSelectedPlatforms((prevPlatforms) => {
        const updatedPlatforms = [...prevPlatforms, value];
        console.log("Selected Platforms:", updatedPlatforms);
        return updatedPlatforms;
      });
    }
    setSelectedPlatformToRemove(value); // Establecer la plataforma seleccionada para eliminar
  };

  const handleGenreChange = (e) => {
    const { value } = e.target;
    if (!selectedGenres.includes(value)) {
      setSelectedGenres((prevGenres) => {
        const updatedGenres = [...prevGenres, value];
        console.log("Selected Genres:", updatedGenres);
        return updatedGenres;
      });
    }
    setSelectedGenreToRemove(value); // Establecer el género seleccionado para eliminar
  };

  const handleAddPlatform = () => {
    if (newPlatform && !selectedPlatforms.includes(newPlatform)) {
      setSelectedPlatforms((prevPlatforms) => [...prevPlatforms, newPlatform]);
      setNewPlatform("");
    }
  };

  const handleAddGenre = () => {
    if (newGenre && !selectedGenres.includes(newGenre)) {
      setSelectedGenres((prevGenres) => [...prevGenres, newGenre]);
      setNewGenre("");
    }
  };

  const handleRemovePlatform = () => {
    setSelectedPlatforms((prevPlatforms) => {
      const updatedPlatforms = prevPlatforms.filter(
        (platform) => platform !== selectedPlatformToRemove
      );
      console.log("Selected Platforms after removal:", updatedPlatforms); // Log después de eliminar una plataforma
      return updatedPlatforms;
    });
  };

  const handleRemoveGenre = () => {
    setSelectedGenres((prevGenres) =>
      prevGenres.filter((genre) => genre !== selectedGenreToRemove)
    );
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <h3>Edit Game</h3>
        <form>
          <div className={styles.formGroup}>
            {editedGame.image && (
              <img
                src={editedGame.image}
                alt={`Image for ${editedGame.name}`}
                className={styles.gameImage}
              />
            )}
          </div>
          <div>
            <div className={styles.inputleft}>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={editedGame.name}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputleft}>
              <label>Price:</label>
              <input
                type="number"
                name="price"
                value={editedGame.price}
                onChange={handleChange}
              />{" "}
              {/* Cambia "Price" a "price" aquí */}
            </div>
            <div className={styles.inputleft}>
              <label>Stock:</label>
              <input
                type="number"
                name="stock"
                value={editedGame.stock}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputleft}>
              <label>Release Date:</label>
              {/* Utiliza el estado local formateado para el input de tipo date */}
              <input
                type="date"
                name="releaseDate" // Cambia "released" a "releaseDate" aquí
                value={formattedReleaseDate}
                onChange={handleChange}
              />
            </div>
          

          <div className={styles.right}>
            <div className={`${styles.row} ${styles.platform}`}>
              <div>
                <label className={styles.titulop}>Platforms:</label>
                <select
                  className={`${styles.selectField}`}
                  name="platforms"
                  onChange={handlePlatformChange}
                  multiple
                >
                  {selectedPlatforms.map((platform) => (
                    <option key={platform} value={platform}>
                      {platform}
                    </option>
                  ))}
                </select>
                <select
                  className={styles.option}
                  value={newPlatform}
                  onChange={(e) => setNewPlatform(e.target.value)}
                >
                  <option value="">Select Platform</option>
                  {platforms.map((platform) => (
                    <option key={platform} value={platform}>
                      {platform}
                    </option>
                  ))}
                </select>
                <div className={styles.patgenbot}>
                  <button type="button" onClick={handleAddPlatform}>
                    Add Platform
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      handleRemovePlatform();
                    }}
                  >
                    Remove Platform
                  </button>
                </div>
              </div>
              <div>
                <label className={styles.titulog}>Genre:</label>
                <select
                  className={`${styles.selectField}`}
                  name="genre"
                  onChange={handleGenreChange}
                  multiple
                >
                  {selectedGenres.map((genre) => (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
                <select
                  className={styles.option}
                  value={newGenre}
                  onChange={(e) => setNewGenre(e.target.value)}
                >
                  <option value="">Select Genre</option>
                  {genres.map((genre) => (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
                <div className={styles.patgenbot}>
                  <button type="button" onClick={handleAddGenre}>
                    Add Genre
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      handleRemoveGenre();
                    }}
                  >
                    Remove Genre
                  </button>
                </div>
              </div>
            </div>
            <div className={styles.descrip}>
              <label className={styles.titulod}>Description:</label>
              <textarea
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                cols={50}
              />
            </div>
          </div>
          </div>
        </form>
        {showSuccessMessage &&
          showAlert(
            "Data Update!",
            "Your information has been updated",
            "routeIcons.confirm",
            "Ok"
          )}
        <div>
          <div className={styles.modalButtons}>
            <button
              className={
                editedGame.deleted
                  ? styles.availableButton
                  : styles.deletedButton
              }
              onClick={handleDeleteToggle}
            >
              {editedGame.deleted ? "Deleted" : "Available"}
            </button>

            <div className={styles.modalButtonsr}>
              <button onClick={handleSave}>Save</button>
            </div>
            <div className={styles.modalButtonsl}>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditGameModal;
