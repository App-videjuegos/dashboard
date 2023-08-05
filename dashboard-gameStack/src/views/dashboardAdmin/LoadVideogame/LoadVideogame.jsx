import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import CancelSubmit from "../../../components/UtilsCreateGame/calcelSubmit";
import Submit from "../../../components/UtilsCreateGame/Submit";
import DatePicker from 'react-datepicker';
import styles from "./LoadVideogame.module.css"


import { validate } from "../../../components/UtilsCreateGame/CreateGameValidate";


import { allGenres, allPlatforms } from "../../../components/UtilsCreateGame/dataFilteredgames";

import { convertirFecha } from "../../../components/Helpers/InvertDate";

const LoadVideogame = () => {
  const [image, setImage] = useState([]);
  const token = useSelector((state) => state.usersState.userToken);
  console.log("elTokendeRegisteeeer", token);
  const [imageScreen, setImageScreen] = useState([]);
  const [date, setDate] = useState(new Date());

  console.log(`-------------------->>-->>>> ${date}`);
  const [inputFocusedName, setInputFocusedName] = useState(true);
  const [inputFocusedDesc, setInputFocusedDesc] = useState(true);
  const [inputFocusedDate, setInputFocusedDate] = useState(true);
  const [inputFocusedPrice, setInputFocusedPrice] = useState(true);
  const [inputFocusedrequeriments_en, setInputFocusedrequeriments_en] =
    useState(true);
  const [validateSubmit, setValidateSubmit] = useState(true);
  const [showPicker, setShowPicker] = useState(false);

  const [stackData, setStackData] = useState({
    platforms: allPlatforms,
    genre: allGenres,
  });

  const [newVideoGame, setNewVideoGame] = useState({
    id: 1 + Math.floor(Math.random() * 999),
    name: "",
    description: "",
    image: "",
    screenShots: [],
    platforms: [],
    genre: [],
    price: "",
    requeriments_en: "",
    releaseDate: "10-12-2022",
  });

  console.log(`------------------------------------------ ${newVideoGame}`);

  useEffect(() => {
    validate(newVideoGame);
  }, [newVideoGame]);

  const validateNvg = validate(newVideoGame);

  console.log(validateNvg.name);

  const showDatePicker = () => {
    setShowPicker(true);
  };

  ///////

  const inputStyle = {
    height: Math.max(40, newVideoGame.description.length * 1.2), // Ajusta el tamaño en base a la longitud del texto
  };

  const inputStyleVar = {
    height: Math.max(40, newVideoGame.requeriments_en.length * 1.2), // Ajusta el tamaño en base a la longitud del texto
  };

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

  const handleDateChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleInputChange = (inputName, inputValue) => {
    setNewVideoGame({
      ...newVideoGame,
      [inputName]: inputValue,
    });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: false,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      const arrLks = [];
      // const arrView = []
      const uploadedImages = await Promise.all(
        result.assets.map(async (image) => {
          let imageUrl = await uploadImageAsync(image.uri);

          // arrView.push(image.uri)
          arrLks.push(imageUrl);

          console.log(`3-----${arrLks}`);
          // return arrImg
        })
      );

      setNewVideoGame((newVideoGame) => ({
        ...newVideoGame,
        image: arrLks[0],
      }));

      console.log(`4-----${newVideoGame}`);
      return arrLks;
    }
  };

  const deleteImage = () => {
    setNewVideoGame((newVideoGame) => ({
      ...newVideoGame,
      image: "",
    }));
  };

  const deleteScreen = (image) => {
    setNewVideoGame((newVideoGame) => ({
      ...newVideoGame,
      screenShots: newVideoGame.screenShots.filter((i) => !image),
    }));
  };

  const pickImageScreen = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 0.8,
    });

    console.log(result);

    if (!result.canceled) {
      const arrLks = [];
      // const arrView = []
      const uploadedImages = await Promise.all(
        result.assets.map(async (image) => {
          let imageUrl = await uploadImageAsync(image.uri);

          // arrView.push(image.uri)
          arrLks.push(imageUrl);

          console.log(`3-----${arrLks}`);
          // return arrImg
        })
      );

      setNewVideoGame((newVideoGame) => ({
        ...newVideoGame,
        screenShots: [...newVideoGame.screenShots, ...arrLks],
      }));
      console.log(`4-----${newVideoGame}`);
      return arrLks;
    }
  };

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
        <h1>Load Videogame</h1>
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
            <div>{validateNvg.name}</div>
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
            <div>{validateNvg.price}</div>
          )}
        </div>

        <div>
          <h1>Description</h1>
          <textarea
            placeholder="Paste_description"
            onBlur={() => setInputFocusedDesc(false)}
            value={newVideoGame.description}
            onChange={(e) => handleTextChange2(e.target.value)}
          />
          {validateNvg.description !== "" && !inputFocusedDesc && (
            <div>{validateNvg.description}</div>
          )}
        </div>

        <div>
          <h1>System Requeriments</h1>
          <textarea
            placeholder="Paste_requeriments"
            onBlur={() => setInputFocusedrequeriments_en(false)}
            value={newVideoGame.requeriments_en}
            onChange={(e) => handleTextChange(e.target.value)}
          />
          {validateNvg.requeriments_en !== "" &&
            !inputFocusedrequeriments_en && (
              <div>{validateNvg.requeriments_en}</div>
            )}
        </div>

        <div>
          <h1>Release date</h1>
          {/* <div>
            <div>
              <button onClick={showDatePicker}>
                {!date ? "Intesert date of birth " : convertirFecha(date)}
              </button>
            </div>
            {showPicker && (
              <DateTimePicker
                value={date}
                onChange={handleDateChange}
                mode="date"
                display="spinner"
                textColor="red"
                style={{ flex: 1 }}
              />
            )}
          </div> */}
          {validateNvg.releaseDate !== "" && !inputFocusedDate && (
            <div>{validateNvg.releaseDate}</div>
          )}
        </div>

        {/* <div>
          <label>Load videogame cover</label>
          <div>
            <button onClick={pickImage}>Load Image</button>
          </div>
          {validateNvg.image !== "" && !validateSubmit && (
            <div>{validateNvg.image}</div>
          )}
          {console.log(`5454--------------${newVideoGame.image}`)}
          {newVideoGame.image && (
            <div>
              <button onClick={() => deleteImage(newVideoGame.image)}>
                <img
                  key={newVideoGame.image}
                  src={`${newVideoGame.image}`}
                  alt="game cover"
                  style={{ margin: 5, width: 200, height: 200 }}
                />
              </button>
            </div>
          )}
        </div> */}

        {/* <div>
          <h1>Load screenshots</h1>
          <div>
            <button onClick={pickImageScreen}>Load Images</button>
          </div>
          {validateNvg.screenShots !== "" && !validateSubmit && (
            <div>{validateNvg.screenShots}</div>
          )}

          {newVideoGame.screenShots[0] &&
            newVideoGame.screenShots.map((i) => {
              return (
                <div>
                  <button onClick={() => deleteScreen(`${i}`)}>
                    <img
                      key={i}
                      src={`${i}`}
                      alt="game screenshot"
                      style={{ margin: 5, width: 200, height: 200 }}
                    />
                  </button>
                </div>
              );
            })}
        </div> */}

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
            <div>{validateNvg.genre}</div>
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
            <div>{validateNvg.platforms}</div>
          )}
        </div>

        <div>
          <button onClick={() => Submit()}>Load videogame</button>
          <button onClick={() => CancelSubmit()}>Cancel</button>
        </div>
    </form>
  );
};

export default LoadVideogame;
