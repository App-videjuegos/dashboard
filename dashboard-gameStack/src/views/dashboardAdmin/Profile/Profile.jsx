import {  showLocalStorageData } from '../../../components/helpers/functionsLocalStorage';
import styles from './Profile.module.css'; // Importa los estilos del archivo CSS

function Profile() {

  showLocalStorageData("logedGameStack")
  return (
    <div className={styles['profile-container']}> 
      Profile Component
    </div>
  );
}

export default Profile;