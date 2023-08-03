import React, { useState } from 'react';
import { HiFilter } from 'react-icons/hi'; // Importamos el icono de filtro
import styles from './Filters.module.css'; // Importamos los estilos del módulo

function Filters() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles.filtersContainer}>
      <button className={styles.filterButton} onClick={toggleMenu}>
        <HiFilter className={styles.filterIcon} />
        Filters
      </button>
      {isMenuOpen && (
        <div className={styles.menu}>
          {/* Aquí puedes agregar los elementos del menú de filtros */}
          {/* Por ejemplo: */}
          <div>Filter 1</div>
          <div>Filter 2</div>
          <div>Filter 3</div>
        </div>
      )}
    </div>
  );
}

export default Filters;