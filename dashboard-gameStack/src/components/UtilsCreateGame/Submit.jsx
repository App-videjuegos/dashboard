import { useState } from 'react';
import axios from 'axios';

const Submit = async (newVideoGame,setNewVideoGame,date,token) => {
  const [validateSubmit, setValidateSubmit] = useState(true);


  const handleSubmission = async () => {
    const config = { Authorization: token };

    try {
      console.log(newVideoGame);

      if (
        newVideoGame.name === "" ||
        newVideoGame.description === "" ||
        date === "" ||
        !newVideoGame.platforms.length ||
        !newVideoGame.genre.length ||
        newVideoGame.image === "" ||
        !newVideoGame.screenShots.length ||
        newVideoGame.price === "" ||
        newVideoGame.requeriments_en === ""
      ) {
        setValidateSubmit(false);
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

        const userResponse = window.confirm('Publication Create!\nContinue loading games?');
        if (userResponse) {
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
          });
        } else {
          // Aquí puedes realizar la navegación a la pantalla de inicio o realizar cualquier acción que desees.
          // Por ejemplo, puedes utilizar react-router-dom para la navegación si lo necesitas.
          console.log('Back to dashboard...');
        }
      }
    } catch (error) {
      window.alert("Auch...Something went wrong");
      console.log("Error en el backend:", error);
    }
  };

  return (
    <div>
      <button onClick={handleSubmission}>
        Submit
      </button>
    </div>
  );
};

export default Submit;