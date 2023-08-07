import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CancelSubmit from "../../../components/UtilsCreateGame/CalcelSubmit";
import SubmitGame from "../../../components/UtilsCreateGame/Submit";
import styles from "./LoadVIdeogame.module.css";
import axios from "axios";

import { validate } from "../../../components/UtilsCreateGame/CreateGameValidate";

import {
  allGenres,
  allPlatforms,
} from "../../../components/UtilsCreateGame/dataFilteredgames";

const LoadVideogame = () => {
  const [image, setImage] = useState([]);
  const token = useSelector((state) => state.usersState.userToken);
  console.log("elTokendeRegisteeeer", token);
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);

  console.log(`-------------------->>-->>>> ${date}`);
  const [inputFocusedName, setInputFocusedName] = useState(true);
  const [inputFocusedDesc, setInputFocusedDesc] = useState(true);
  const [inputFocusedDate, setInputFocusedDate] = useState(true);
  const [inputFocusedPrice, setInputFocusedPrice] = useState(true);
  const [inputFocusedrequeriments_en, setInputFocusedrequeriments_en] =
    useState(true);
  const [validateSubmit, setValidateSubmit] = useState(true);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [zoomPreview, setZoomPreview] = useState(false);

  const [stackData, setStackData] = useState({
    platforms: allPlatforms,
    genre: allGenres,
  });

  const [newVideoGame, setNewVideoGame] = useState({
    id: 1 + Math.floor(Math.random() * 999),
    name: "",
    description: "",
    image: "",
    screenShots:[],
    platforms: [],
    genre: [],
    price: "",
    requeriments_en: "",
    releaseDate: date,
  });

  console.log(`------------------------------------------ ${newVideoGame}`);
  /////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////
  useEffect(() => {
    validate(newVideoGame);
  }, [newVideoGame]);

  const validateNvg = validate(newVideoGame);

  console.log(validateNvg.name);

  ///////

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "gameShop_img"); // Reemplaza con tu unsigned_upload_preset de Cloudinary

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/deamondhero/image/upload", // Reemplaza TU_CLOUD_NAME con tu cloud_name de Cloudinary
          formData
        );
        setNewVideoGame((newVideoGame) => ({
          ...newVideoGame,
          image: response.data.secure_url,
        }));
      } catch (error) {
        console.error("Error al subir la imagen a Cloudinary:", error);
      }
    }
  };

  const handleScreenImageChange = async (e) => {
    const files = e.target.files;
     // Obtener una lista de archivos seleccionados

    const uploadPromises = Array.from(files).map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = async () => {
          try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "gameShop_img"); // Reemplaza con tu unsigned_upload_preset de Cloudinary

            const response = await axios.post(
              "https://api.cloudinary.com/v1_1/deamondhero/image/upload", // Reemplaza TU_CLOUD_NAME con tu cloud_name de Cloudinary
              formData
            );

            resolve(response.data.secure_url);
          } catch (error) {
            reject(error);
          }
        };

        reader.readAsDataURL(file);
      });
    });

    try {
      const uploadedImages = await Promise.all(uploadPromises);

      setNewVideoGame((prevVideoGame) => ({
        ...prevVideoGame,
        screenShots: [...prevVideoGame.screenShots, ...uploadedImages],
      }));
      console.log(newVideoGame)
    } catch (error) {
      alert("Could not load image.");
      console.error("Error al subir la imagen a Cloudinary:", error);
    }
  };

  ///////////////////////////

  const handleTextChange = (text) => {
    setNewVideoGame((prevVideoGame) => ({
      ...prevVideoGame,
      requeriments_en: text,
    }));
  };

  const handleTextChange2 = (text) => {
    setNewVideoGame((prevVideoGame) => ({
      ...prevVideoGame,
      description: text,
    }));
  };

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleInputChange = (inputName, inputValue) => {
    setNewVideoGame({
      ...newVideoGame,
      [inputName]: inputValue,
    });
  };

  const deleteScreen = (image) => {
    setNewVideoGame.screenShots((prevImages) => prevImages.filter((img) => img !== image));
    console.log(newVideoGame)
  };
  // const deleteScreen = (image) => {
  //   setNewVideoGame((newVideoGame) => ({
  //     ...newVideoGame,
  //     screenShots: newVideoGame.screenShots.filter((i) => i !== image),
  //   }));
  // };

  const pushItemgenre = (value) => {
    setTimeout(() => {
      setNewVideoGame((prevState) => ({
        ...prevState,
        genre: [...prevState.genre, value],
      }));

      setStackData((prevState) => ({
        ...prevState,
        genre: prevState.genre.filter((p) => p !== value),
      }));
    }, 1200);
  };

  const removeItemgenre = (value) => {
    setTimeout(() => {
      setNewVideoGame((prevState) => ({
        ...prevState,
        genre: prevState.genre.filter((p) => p !== value),
      }));

      setStackData((prevState) => ({
        ...prevState,
        genre: [...prevState.genre, value],
      }));
    }, 1200);
  };

  ///////

  const pushItemplatforms = (value) => {
    setTimeout(() => {
      setNewVideoGame((prevState) => ({
        ...prevState,
        platforms: [...prevState.platforms, value],
      }));

      setStackData((prevState) => ({
        ...prevState,
        platforms: prevState.platforms.filter((p) => p !== value),
      }));
    }, 1200);
  };

  const removeItemplatforms = (value) => {
    setTimeout(() => {
      setNewVideoGame((prevState) => ({
        ...prevState,
        platforms: prevState.platforms.filter((p) => p !== value),
      }));

      setStackData((prevState) => ({
        ...prevState,
        platforms: [...prevState.platforms, value],
      }));
    }, 1200);
  };

  return (
    <form className={styles.container}>
      <div>
        <h1 className={styles.header}>Load Videogame</h1>
        <div>
          <h1>Title</h1>
          <input
            type="text"
            placeholder="Enter Game name"
            value={newVideoGame.name}
            onBlur={() => setInputFocusedName(false)}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
          {validateNvg.name !== "" && !inputFocusedName && (
            <div className={styles.errorMessage}>{validateNvg.name}</div>
          )}
        </div>

        <div>
          <h1>Price</h1>
          <input
            type="text"
            placeholder="$999.99"
            onBlur={() => setInputFocusedPrice(false)}
            value={newVideoGame.price}
            onChange={(e) => handleInputChange("price", e.target.value)}
          />
          {validateNvg.price !== "" && !inputFocusedPrice && (
            <div className={styles.errorMessage}>{validateNvg.price}</div>
          )}
        </div>

        <div>
          <h1>Description</h1>
          <textarea
            className={styles.textarea}
            placeholder="Paste_description"
            onBlur={() => setInputFocusedDesc(false)}
            value={newVideoGame.description}
            onChange={(e) => handleTextChange2(e.target.value)}
          />
          {validateNvg.description !== "" && !inputFocusedDesc && (
            <div className={styles.errorMessage}>{validateNvg.description}</div>
          )}
        </div>

        <div>
          <h1>System Requeriments</h1>
          <textarea
            className={styles.textarea}
            placeholder="Paste_requeriments"
            onBlur={() => setInputFocusedrequeriments_en(false)}
            value={newVideoGame.requeriments_en}
            onChange={(e) => handleTextChange(e.target.value)}
          />
          {validateNvg.requeriments_en !== "" &&
            !inputFocusedrequeriments_en && (
              <div className={styles.errorMessage}>{validateNvg.requeriments_en}</div>
            )}
        </div>

        <div>
          <h1>Release date</h1>
          <div>
            <input
              type="date"
              className="date-picker-input"
              value={date}
              onChange={(e) => handleDateChange(e.target.value)}
              placeholder="Select a date"
              max={today}
            />
          </div >
          {validateNvg.releaseDate !== "" && !inputFocusedDate && (
            <div className={styles.errorMessage}>{validateNvg.releaseDate}</div>
          )}
        </div>

        <div className={styles.imageLoad}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "flex" }} // Cambia "flex" por "none" para ocultar el input por defecto
            id="imagePicker"
          />
          <label htmlFor="imagePicker">
            <div>
              {newVideoGame.image.length > 0 ? (
                <img src={image} alt="Selected" className={styles.imageLoaded} />
              ) : (
                <div>
                  <text className={styles.message}>Select one Image</text>
                </div>
              )}
            </div>
          </label>
        </div>

        <div className={styles.imageLoad}>
          <input
            type="file"
            accept="image/*"
            onChange={handleScreenImageChange}
            style={{ display: "flex" }}
            id="imagePicker"
            multiple // Habilitar la selección de múltiples imágenes
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            {newVideoGame.screenShots.length > 0 ? (
              newVideoGame.screenShots.map((imageUrl, index) => (
                <div
                  key={index}
                  onMouseEnter={() => setHoveredImage(imageUrl)}
                  onMouseLeave={() => setHoveredImage(null)}
                >
                  <img
                    src={imageUrl}
                    alt={`Selected ${index}`}
                    className={styles.imageLoad}
                  />
                  {hoveredImage === imageUrl && (
                    <div>
                      <button className={styles.deleteImage} onClick={() => deleteScreen(imageUrl)}>
                        <text >X</text>
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div>
                <text className={styles.message}>Hold ctrl to select multiple images</text>
              </div>
            )}
          </div>
        </div>

        <div>
          <h1>Select genre</h1>
          <div>
            <select onChange={(e) => pushItemgenre(e.target.value)}>
              <option value="" disabled selected>
                Add genre
              </option>
              {stackData.genre.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <select onChange={(e) => removeItemgenre(e.target.value)}>
            <option value="" disabled selected>
              Remove genre
            </option>
            {newVideoGame.genre.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
        {validateNvg.genre !== "" && !validateSubmit && (
          <div className={styles.errorMessage}>{validateNvg.genre}</div>
        )}
      </div>

      <div>
        <h1>Select platform</h1>
        <div>
          <select onChange={(e) => pushItemplatforms(e.target.value)}>
            <option value="" disabled selected>
              Add platforms
            </option>
            {stackData.platforms.map((platform) => (
              <option key={platform} value={platform}>
                {platform}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select onChange={(e) => removeItemplatforms(e.target.value)}>
            <option value="" disabled selected>
              Remove platforms
            </option>
            {newVideoGame.platforms.map((platform) => (
              <option key={platform} value={platform}>
                {platform}
              </option>
            ))}
          </select>
        </div>
        {validateNvg.platforms !== "" && !validateSubmit && (
          <div className={styles.errorMessage}>{validateNvg.platforms}</div>
        )}
      </div>

      <div className={styles.buttonContainer} >
        <button className={styles.buttonLoadGame}
          onClick={() =>
            SubmitGame(
              event,
              newVideoGame,
              setNewVideoGame,
              validateSubmit,
              setValidateSubmit,
              date,
              token
            )
          }
        >
          Load videogame
        </button>
        <button className={styles.cancel}  onClick={CancelSubmit}>Cancel</button>
      </div>
    </form>
  );
};

export default LoadVideogame;
