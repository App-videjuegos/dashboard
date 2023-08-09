import React from "react";
import styles from "./ViewDataUserModal.module.css";

function ViewDataUserModal({ user, onClose }) {
    const handleClosed = () => {
        onClose(); // Cierra el modal sin guardar cambios
      };
      return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <h3>Data User</h3>
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Full Name:</strong> {user.fullname}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>User:</strong> {user.user}</p>
        <p><strong>Admin:</strong> {user.userAdmin ? "Yes" : "No"}</p>
        <p><strong>News Letter:</strong> {user.newsLetter ? "Subscribed" : "Not Subscribed"}</p>
        <p><strong>TAC:</strong> {user.tac ? "Accepted" : "Not Accepted"}</p>
        <p><strong>Deleted:</strong> {user.deleted ? "Yes" : "No"}</p>
        <p><strong>Created At:</strong> {user.createdAt}</p>
        <p><strong>Updated At:</strong> {user.updatedAt}</p>
        <p><strong>Date:</strong> {user.date}</p>
        <p><strong>Password:</strong> {user.password}</p>
        <p><strong>Image:</strong></p>
        <img src={user.image} alt="User Image" />
        <button onClick={handleClosed}>Close</button>
      </div>
    </div>
  );
}

export default ViewDataUserModal;
