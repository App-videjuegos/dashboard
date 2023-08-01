
import { Link } from 'react-router-dom';
import styles from './Login.module.css'; // Agrega el archivo CSS para los estilos

function Login() {
  return (
    <div className={styles.loginContainer}>
      <h2>Login Component</h2>
      <div className={styles.formContainer}>
        <input type="text" placeholder="Username" className={styles.input} />
        <input type="password" placeholder="Password" className={styles.input} />
        <Link to="/profile">
          <button className={styles.loginButton}>Login</button>
        </Link>
      </div>
    </div>
  );
}

export default Login;