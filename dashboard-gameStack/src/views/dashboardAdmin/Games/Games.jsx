import styles from './Games.module.css'; // Importa los estilos del archivo CSS

function Games() {
  return (
    <div className={styles['games-container']}> {/* Utiliza la clase del CSS Module */}
      Games Component
    </div>
  );
}

export default Games;