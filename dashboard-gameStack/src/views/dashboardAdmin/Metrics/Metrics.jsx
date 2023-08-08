import styles from "./Metrics.module.css"; // Importa los estilos del archivo CSS
import Tabs from "./Metricstab";
import { getAllSales } from "../../../redux/salesActions";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

function Metrics() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSales());
  }, []);

  let ArrayVentas = useSelector((state) => state.salesState.getAllSls);
  const tabs = [
    { title: "Ventas/ Fecha", content: <p>Sales Chart by Date</p> },
    { title: "Mas Vendido", content: <p>Top Selling Video Game Graph</p> },
    { title: "Ventas/ Fecha", content: <p>Grafico de Venta por Fecha</p> },
  ];
  return (
    <div className={styles["metrics-container"]}>
      <Tabs tabs={tabs} ArrayVentas={ArrayVentas}/>
    </div>
  );
}

export default Metrics;
