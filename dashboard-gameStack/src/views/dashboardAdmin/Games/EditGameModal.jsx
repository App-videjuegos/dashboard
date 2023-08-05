import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateVgames } from "../../../redux/videogamesActions"; // Asegúrate de importar correctamente el archivo donde se define la acción

import styles from "./EditGameModal.module.css"; // Estilos para el modal

function EditGameModal({ selectedGame, onClose, onSave }) {
  const [editedGame, setEditedGame] = useState(selectedGame);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedGame((prevGame) => ({
      ...prevGame,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Formatear la fecha en el formato esperado (yyyy-MM-dd)
    const formattedReleaseDate = new Date(editedGame.releaseDate).toISOString().split('T')[0];
  
    // Crear un nuevo objeto con la fecha formateada
    const editedGameWithFormattedDate = {
      ...editedGame,
      releaseDate: formattedReleaseDate,
    };
  
    // Actualizar el juego utilizando la acción updateVgames
    dispatch(updateVgames(editedGameWithFormattedDate));
    onSave(editedGame); // Pasa el objeto del juego editado al componente padre
  };

  const handleCancel = () => {
    onClose(); // Cierra el modal sin guardar cambios
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <h3>Edit Game</h3>
        <form>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={editedGame.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Rating:</label>
            <input
              type="number"
              name="rating"
              value={editedGame.rating}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Release Date:</label>
            <input
              type="date"
              name="releaseDate"
              value={editedGame.releaseDate}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={editedGame.price}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Stock:</label>
            <input
              type="number"
              name="stock"
              value={editedGame.stock}
              onChange={handleChange}
            />
          </div>
        </form>
        <div className={styles.modalButtons}>
  <div>
    <button onClick={handleSave}>Save</button>
  </div>
  <div>
    <button onClick={handleCancel}>Cancel</button>
  </div>
</div>
      </div>
    </div>
  );
}

export default EditGameModal;