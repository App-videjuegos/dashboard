import axios from "axios";
import { getAllSls, getAllSlsUser, setErrorMsg } from "./salesSlice";

export const getAllSales = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "https://pfvideojuegos-back-production.up.railway.app/sales"
      );
      const dataSales = response.data;
      dataSales
        ? dispatch(getAllSls(dataSales))
        : dispatch(setErrorMsg("No se encontraron registros de ventas"));
    } catch (err) {
      console.log(`Error: ${err}`);
      dispatch(setErrorMsg("Error al obtener los datos de ventas"));
    }
  };
};

export const getAllSalesUser = (id) => {
  return async (dispatch) => {
    console.log(`params${id}`);
    try {
      const response = await axios.get(
        `https://pfvideojuegos-back-production.up.railway.app/sales/${id}`
      );
      // console.log(`Response${JSON.stringify(response)}`)
      const dataSales = response.data;
      // console.log(`Response${dataSales}`)
      // const dataString = response.toString()
      // console.log(`DataSale${dataString}`)
      if (dataSales.length) {
        dispatch(getAllSlsUser(dataSales));
      } else {
        dispatch(setErrorMsg("No sales registration"));
      }
    } catch (err) {
      dispatch(setErrorMsg(err));
      console.log(`Error: ${err}`);
    }
  };
};