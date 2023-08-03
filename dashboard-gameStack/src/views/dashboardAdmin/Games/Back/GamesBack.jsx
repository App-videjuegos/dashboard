import React from 'react';
import Filters from '../../../../components/Filters/Filters';
import Pagination from '../../../../components/Pagination/Pagination';
import SearchBar from '../../../../components/SearchBar/SearchBar';
import styles from './Games.module.css';

function Games() {
  const totalPages = 5; // Total de páginas para ejemplo

  return (
    <div className={styles['games-container']}>
      <div className={styles.container}>
        <div className={styles.games}>Games</div>
        <div className={styles.filters}>
          <Filters />
        </div>
        <div className={styles.searchBar}>
          <SearchBar />
        </div>
      </div>
      <hr className={styles.divider} />
      
      <div className={styles.paginationContainer}>
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}

export default Games;