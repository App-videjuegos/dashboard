import axios from "axios";
import showAlert from "../Helpers/SwetAlert/SwetAlert1Confirmation";

const SubmitGame = async (
  event,
  newVideoGame,
  setNewVideoGame,
  validateSubmit,
  setValidateSubmit,
  date,
  token
) => {
  event.preventDefault();
  const config = { Authorization: token };

  try {
    console.log(newVideoGame);

    if (
      newVideoGame.name === "" ||
      newVideoGame.description === "" ||
      date === "" ||
      newVideoGame.platforms.length === 0 || // Corregí la verificación de longitud
      newVideoGame.genre.length === 0 || // Corregí la verificación de longitud
      newVideoGame.image === "" ||
      newVideoGame.screenShots.length === 0 || // Corregí la verificación de longitud
      newVideoGame.price === "" ||
      newVideoGame.requeriments_en === ""
    ) {
      setValidateSubmit(false);
      showAlert(
        "Information is missing",
        "You must fill in all the fields",
        "routeIcons.confirm",
        "Ok"
      )
    } else {
      await axios.post(
        "https://pfvideojuegos-back-production.up.railway.app/games",
        {
          id: newVideoGame.id,
          name: newVideoGame.name,
          releaseDate: newVideoGame.releaseDate,
          description: newVideoGame.description,
          image: newVideoGame.image,
          screenShots: newVideoGame.screenShots,
          platforms: newVideoGame.platforms,
          genre: newVideoGame.genre,
          price: newVideoGame.price,
          requeriments_en: newVideoGame.requeriments_en,
        },
        config
      );

      showAlert(
        "Video game Created!",
        "The video game has been successfully created",
        "routeIcons.confirm",
        "Ok",
        setNewVideoGame({
          id: 1 + Math.floor(Math.random() * 999),
          name: "",
          description: "",
          releaseDate: "",
          image: "",
          screenShots: [],
          platforms: [],
          genre: [],
          price: "",
          requeriments_en: "",
        })
      );
    }
  } catch (error) {
    showAlert(
      "Something went wrong",
      error.response.data.message,
      "routeIcons.cancel",
      "Ok"
    );
    console.log("Error:", error.response.data.message);
  }
};

export default SubmitGame;
