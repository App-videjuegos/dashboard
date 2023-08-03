import { HiUserCircle } from 'react-icons/hi'; // Importamos el icono de usuario
import styles from './AdminBar.module.css'; // Importamos los estilos del módulo

function AdminBar() {

  return (
    <div className={styles.adminBar}>
      <div className={styles.greeting}>Hi, welcome Admin</div>
      <div className={styles.userInfo}>
        <HiUserCircle className={styles.userIcon} />
        <div className={styles.userName}>Admin Name</div>
      </div>
    </div>
  );
}

export default AdminBar;