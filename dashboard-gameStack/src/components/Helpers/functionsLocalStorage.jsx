export const saveItemLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    console.log(`Clave "${key}" y valor "${value}" guardados en localStorage.`);
  } catch (error) {
    console.error("Error al guardar el par clave-valor en localStorage:", error);
  }
};

export const loadItemLocalStorage = (key) => {
  try {
    const value = localStorage.getItem(key);
    return value !== null ? JSON.parse(value) : null;
  } catch (error) {
    console.error("Error al obtener el valor desde localStorage:", error);
    return null;
  }
};

export const removeItemLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
    console.log("Clave eliminada exitosamente de localStorage.");
  } catch (error) {
    console.error('Error al eliminar de localStorage:', error);
  }
};

export const showLocalStorageData = () => {
  try {
    console.log('Contenido de localStorage:');
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      console.log(key, value);
    }
  } catch (error) {
    console.error('Error al obtener datos de localStorage:', error);
  }
};
