import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Filters.module.css';
import {
  applyPlatformFilter,
  applyGenreFilter,
  applyPriceRangeFilter,
  applyRatingFilter,
  applyReleaseDateFilter,
  applyAlphabeticalSortAsc,
  applyAlphabeticalSortDesc,
  clearAllFilters
} from '../../redux/videogamesActions';
import {
  sortByRatingAsc,
  sortByRatingDesc,
  sortByPriceAsc,
  sortByPriceDesc,
  sortByReleaseDateAsc,
  sortByReleaseDateDesc,
  clearFilters,
} from '../../redux/videogamesSlice';

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

genres.sort();

const platforms = [
  "Nintendo Switch",
  "PC",
  "PlayStation 4",
  "PlayStation 5",
  "Xbox Series S/X",
];

platforms.sort();


const Filter = () => {
  const dispatch = useDispatch();
  const [resetComponent, setResetComponent] = useState(0); // Nuevo estado para reiniciar el componente Games

  const [showFilters, setShowFilters] = useState(false); // State to toggle the filter menu
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [selectedReleaseDate, setSelectedReleaseDate] = useState('');

  const handleApplyFilters = () => {
    dispatch(applyPlatformFilter(selectedPlatform));
    dispatch(applyGenreFilter(selectedGenre));
    dispatch(applyPriceRangeFilter(Number(minPrice), Number(maxPrice)));
    dispatch(applyRatingFilter(Number(selectedRating)));
    dispatch(applyReleaseDateFilter(selectedReleaseDate));
  };

  const handleSortChange = (event) => {
    const selectedSortOption = event.target.value;
    if (selectedSortOption === 'rating-asc') {
      dispatch(sortByRatingAsc());
    } else if (selectedSortOption === 'rating-desc') {
      dispatch(sortByRatingDesc());
    } else if (selectedSortOption === 'price-asc') {
      dispatch(sortByPriceAsc());
    } else if (selectedSortOption === 'price-desc') {
      dispatch(sortByPriceDesc());
    } else if (selectedSortOption === 'release-date-asc') {
      dispatch(sortByReleaseDateAsc());
    } else if (selectedSortOption === 'release-date-desc') {
      dispatch(sortByReleaseDateDesc());
    }
    else if (selectedSortOption === "alphabetical-asc") {
      dispatch(applyAlphabeticalSortAsc());
    } else if (selectedSortOption === "alphabetical-desc") {
      dispatch(applyAlphabeticalSortDesc());
    }
  };

  const handleClearFilters = () => {
    setSelectedPlatform('');
    setSelectedGenre('');
    setMinPrice('');
    setMaxPrice('');
    setSelectedRating('');
    setSelectedReleaseDate('');
    dispatch(clearFilters()); // Llamar a la acción clearFilters para limpiar los filtros
  };

  return (
    <div className={styles['filter-container']}>
      <button className={styles['filter-btn']} onClick={() => setShowFilters(!showFilters)}>
        Filter
      </button>
      {showFilters && (
        <div className={styles['filter-menu']}>
          {/* Filtros */}
          <div>
            <label>Platform:</label>
            <select value={selectedPlatform} onChange={(e) => setSelectedPlatform(e.target.value)}>
              <option value="">All</option>
              {platforms.map((platform) => (
                <option key={platform} value={platform}>
                  {platform}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Genre:</label>
            <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
              <option value="">All</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Price Range:</label>
            <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
            <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
          </div>
          <div>
            <label>Rating:</label>
            <input type="number" value={selectedRating} onChange={(e) => setSelectedRating(e.target.value)} />
          </div>
          <div>
            <label>Release Date:</label>
            <input type="date" value={selectedReleaseDate} onChange={(e) => setSelectedReleaseDate(e.target.value)} />
          </div>
          <button onClick={handleApplyFilters}>Apply Filters</button>

      {/* Ordenamientos */}
      <div>
        <label>Sort By:</label>
        <select onChange={handleSortChange}>
          <option value="">None</option>
          <option value="rating-asc">Rating (Ascending)</option>
          <option value="rating-desc">Rating (Descending)</option>
          <option value="price-asc">Price (Ascending)</option>
          <option value="price-desc">Price (Descending)</option>
          <option value="release-date-asc">Release Date (Ascending)</option>
          <option value="release-date-desc">Release Date (Descending)</option>
          <option value="alphabetical-asc">Alphabetical (Ascending)</option>
          <option value="alphabetical-desc">Alphabetical (Descending)</option>
          </select>
      </div>

      {/* Limpiar filtros */}
      <button onClick={handleClearFilters}>Clear Filters</button>
    
  </div>
  )}
</div>
);
};

export default Filter;