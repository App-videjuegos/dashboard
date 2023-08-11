import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateComment } from '../../../redux/commentsActions'
import { convertirFecha } from "../../../components/Helpers/InvertDate";

import styles from "./EditGameModal.module.css"; // Estilos para el modal

function EditGameModal({ selectedComment, onClose, onSave }) {
  const [editedGame, setEditedGame] = useState(selectedComment);
  const dispatch = useDispatch();




  const handleCancel = () => {
    onClose(); // Cierra el modal sin guardar cambios
  };
  const handleDelete = (e) => {
    console.log("desde modal",e)
    dispatch(updateComment(e.id,true))
    handleCancel()
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <h3>Delete Comment</h3>
        <form>
          <div>
            <label>User:</label>
            {/* <input
              type="text"
              name="name"
              value={editedGame.name}
              onChange={handleChange}
            /> */}
            <p className="deleteModal-text"><b>{editedGame.user ? editedGame.user : "Guest"}</b></p>
          </div>
          <div>
            <label>Comment:</label>
            {/* <input
              type="number"
              name="rating"
              value={editedGame.rating}
              onChange={handleChange}
            /> */}
            <p className="deleteText"><b>{editedGame.comment}</b></p>
          </div>
          <div>
            <label>User ID:</label>
            {/* <input
              type="date"
              name="releaseDate"
              value={editedGame.releaseDate}
              onChange={handleChange}
            /> */}
            <p><b>{editedGame.userId}</b></p>
          </div>
          <div>
            <label>Game ID:</label>
            {/* <input
              type="number"
              name="price"
              value={editedGame.price}
              onChange={handleChange}
            /> */}
            <p><b>{editedGame.videogameId}</b></p>
          </div>
          <div>
            <label>Date:</label>
            {/* <input
              type="number"
              name="stock"
              value={editedGame.stock}
              onChange={handleChange}
            /> */}
            <p><b>{convertirFecha(editedGame.createdAt)}</b></p>
          </div>
        </form>
        <div className={styles.modalButtons}>
  <div>
    <button onClick={()=>handleDelete(editedGame)}>Delete</button>
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