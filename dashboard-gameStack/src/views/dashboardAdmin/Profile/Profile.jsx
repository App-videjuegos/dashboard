import { loadItemLocalStorage, showLocalStorageData } from "../../../components/Helpers/functionsLocalStorage";
import React, { useState, useEffect } from "react";
import axios from 'axios'
import styles from "./Profile.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
// import { uploadImageAsync } from '../../../components/Helpers/uploadImage';
import { getUsersbyName, updateUser } from '../../../redux/usersActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { convertirFecha } from '../../../components/Helpers/InvertDate'
import { useNavigate } from "react-router-dom";

const Profile = () => {

  // showLocalStorageData("logedGameStack"); //VERRRRRRRRRRRRRRRRRRRRR

  const loged = useSelector((state) => state.usersState.isLogged);

  const [isLoading, setIsLoading] = useState(true);
  const [dataUser, setDataUser] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState()

  const navigate = useNavigate()

  const getDataFromAsyncStorage = async () => {
    try {
      const data = await showLocalStorageData("logedGameStack");
      if (data !== null) {
        console.log("Valor almacenado en showLocalStorageData:", data);
        const parsedData = JSON.parse(data);
        dispatch(getUsersbyName(parsedData.user)); // Despachar la acción antes de actualizar el estado
        setDataUser(parsedData);
        console.log("Console Log de parseData", parsedData);

        // Realiza las operaciones que necesites con los datos obtenidos
        // ...
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      } else {
        console.log("No se encontró ningún valor en showLocalStorageData");
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Error al acceder a showLocalStorageData:", error);
      setIsLoading(false);
    }
  };


  useEffect(() => {
    setTimeout(() => {
      getDataFromAsyncStorage();
      setImage(loged.image);
    }, 1000);
  }, []);

  console.log("Console log dataUser:", dataUser);

  const imageUser =
  "https://res.cloudinary.com/deamondhero/image/upload/v1690180824/imageUser_g1mimk.png";

// const [image, setImage] = useState(loged.image);
// console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", image);


const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({ //VERRRRRRRRRRRRRRRRRR
    mediaTypes: ImagePicker.MediaTypeOptions.All, //VERRRRRRRRRRRRRRRRRRRRRRRRR
    allowsMultipleSelection: false,
    allowsEditing: true,
    aspect: [4, 4],
    quality: 0.5,
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

  setImage(arrLks[0]);
  console.log(`4-----${image}`);
  console.log(`46-----${arrLks}`);
  return arrLks;
}
};

const onSubmit = async (values) => {
  const userData = {
    ...values,
    id: dataUser.id,
    userAdmin: true,
    image: image,
  };

  console.log(`Antes del try`, userData);
  const objupdatedUser = {};
try {
  
  // Verifica cada propiedad y agrega solo las que no sean nulas
  if (userData.id) objupdatedUser.id = userData.id;
  if (userData.user) objupdatedUser.user = userData.user;
  if (userData.fullname) objupdatedUser.fullname = userData.fullname;
  if (userData.pass) objupdatedUser.pass = userData.pass;
  if (userData.userAdmin) objupdatedUser.userAdmin = userData.userAdmin;
  if (userData.email) objupdatedUser.email = userData.email;
  if (userData.date) objupdatedUser.date = userData.date;
  if (userData.image) objupdatedUser.image = userData.image;
  if (userData.phone) objupdatedUser.phone = userData.phone;
  if (userData.tac) objupdatedUser.tac = userData.tac;
  if (userData.newsLetter) objupdatedUser.newsLetter = userData.newsLetter;

  // Aquí utilizamos el ID directamente desde el estado loged (suponiendo que loged es un estado)
  // objupdatedUser.id = loged.id;

  console.log("LOGEDID------------------>", loged);

  console.log("LOGEDID------------------>", dataUser.id);

  console.log("OBJUSR----------------------------------->", objupdatedUser);



    console.log("objupdateUser.id:",objupdatedUser);
    await updateUser(objupdatedUser);
    navigate("/")
    console.log("Datos actualizados exitosamente.");
    console.log(`Después del try`, objupdatedUser);
} catch (error) {
  console.error("Error al actualizar los datos:", error);

  // Supongo que updateUser es una función que realiza una solicitud PUT al backend
  // pero aquí no se muestra cómo se implementa updateUser, asegúrate de que esté correctamente implementada

        // Si la función updateUser es asíncrona, asegúrate de esperar su resultado con "await" o usar ".then()"
        
      }
      // const response = await updateUser(objupdatedUser);
      // console.log(`Respuesta del servidor:`, response.data);
  
  
  
    };




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
        // setNewVideoGame((newVideoGame) => ({
        //   ...newVideoGame,
        //   image: response.data.secure_url,
      // }
      // ));
        console.log(response.data.secure_url); 


      } catch (error) {
        console.error("Error al subir la imagen a Cloudinary:", error);
      }
    }
  };

  return (
    <div className={styles["profile-container"]}>
      <div className={styles.formContainer}>     

      <Formik      
      initialValues={{
        user: "",
        pass: "",
        fullname: "",
        email: "",
        date: "",
        phone: "",
      }}
      validate={(values) => {
        let errors = {};
      
        if (values.user && values.user.length < 3) {
          errors.user = "User must be at least 5 characters long";
        }

        if (values.pass && values.pass.length < 5) {
          errors.pass = "Password must be at least 5 characters long";
        }
      
        if (values.fullname && values.fullname.length < 3) {
          errors.fullname = "Please enter your full name";
        }
      
        if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
          errors.email = "Please enter a valid email address";
        }
      
        if (values.phone && !/^\d+$/.test(values.phone)) {
          errors.phone = "Please enter a valid phone number";
        }
      
        return errors;
      }}   
          
      
      image={image}
      onSubmit={onSubmit}

      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          image,
        }) => {
          return(
    <div className={styles.inputContainer}>
      
      <label htmlFor="imagePicker" style={{borderRadius:"50%"}}>
        {image ? (
          <img src={image} alt="Selected" width="200" />
        ) : (
          <div style={{ display: "flex", borderRadius:"10px", border: "1px solid grey", width:"100%", alignContent:"center", justifyContent:"center", textAlign:"center"}}>
            <span style={{color:"#280657", width:"100%"}}>Seleccione una imagen</span>
          </div>
        )}
      </label>
      <br></br>
        <input
          style={{ display: "flex", borderRadius:"10px", border: "1px solid grey", width:"95%", alignContent:"center", justifyContent:"center", textAlign:"center"}}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          id="imagePicker"
        />

      <br></br>

      <div className={styles.inputContainer}>
            <div className={styles.inputWithIcon}>
                <input
                className={styles.input}
                type="text"
                value={values.user}
                placeholder={dataUser.user}
                onChange={handleChange("user")}
                onBlur={handleBlur("user")}
                />
               <FontAwesomeIcon icon={faPencil} className={styles.crossIcon} />
                {errors.user && touched.user && (
                    <span style={styles.error}>{errors.user}</span>
                  )}
             </div>
      </div>

      <div className={styles.inputContainer}>
            <div className={styles.inputWithIcon}>
                <input
                  className={styles.input}
                  value={values.pass}
                  type="password"
                  placeholder="•••••••••"
                  secureTextEntry
                  onChange={handleChange("pass")}
                  onBlur={handleBlur("pass")}
                />
                <FontAwesomeIcon icon={faPencil} className={styles.crossIcon} />
                  {errors.pass && touched.pass && (
                    <span style={styles.error}>{errors.pass}</span>
                  )}
            </div>
      </div>

            <div className={styles.inputContainer}>
                <div className={styles.inputWithIcon}>
                  <input
                  className={styles.input}
                  value={values.fullname}
                  type="text"
                  placeholder={dataUser.fullname}
                  onChange={handleChange("fullname")}
                    onBlur={handleBlur("fullname")}
                  />
                  <FontAwesomeIcon icon={faPencil} className={styles.crossIcon} />
                  {errors.fullname && touched.fullname && (
                    <span style={styles.error}>{errors.fullname}</span>
                  )}
                </div>
              </div>

              <div className={styles.inputContainer}>
                <div className={styles.inputWithIcon}>
                  <input
                  className={styles.input}
                  value={values.email}
                  type="email"
                  placeholder={dataUser.email}
                  onChange={handleChange("email")}
                  onBlur={handleBlur("email")}
                  />
                  <FontAwesomeIcon icon={faPencil} className={styles.crossIcon} />
                  {errors.email && touched.email && (
                    <span style={styles.error}>{errors.email}</span>
                  )}
                </div>
              </div>

              <div className={styles.inputContainer}>
                <div className={styles.inputWithIcon}>
                <input
                className={styles.input}
                value={values.date}
                placeholder={convertirFecha(dataUser.date)}
                onChange={handleChange("date")}
                onBlur={handleBlur("date")}              
                />
                 <FontAwesomeIcon icon={faPencil} className={styles.crossIcon} />
                </div>
              </div>

              <div className={styles.inputContainer}>
                <div className={styles.inputWithIcon}>
                  <input
                  className={styles.input}
                  value={values.phone}
                  // type="tel"
                  placeholder={dataUser.phone}
                  onChange={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                  />
                  <FontAwesomeIcon icon={faPencil} className={styles.crossIcon} />
                  {errors.phone && touched.phone && (
                    <span style={styles.error}>{errors.phone}</span>
                  )}
                </div>
              </div>

              <br></br>

                  <button
                  className={styles.miniButton}
                  type="submit"
                  onClick={onSubmit}
                  >                   
                    <span className={styles.buttonText}>
                      Change date
                    </span>                   
                  </button>                
        </div>       
        );
        }}
      </Formik>
      </div>
    </div>
  );
}

export default Profile;

