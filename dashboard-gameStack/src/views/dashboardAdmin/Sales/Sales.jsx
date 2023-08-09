/* eslint-disable no-undef */
import styles from "./Sales.module.css";
import { convertirFecha } from "../../../components/Helpers/InvertDate";
import { useSelector, useDispatch } from "react-redux";
import { getAllSales } from "../../../redux/salesActions";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

function Sales() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSale, setSelectedSale] = useState(null);
  const [filteredSales, setFilteredSales] = useState([]); // Agregar estado para los resultados filtrados
  const salesperpage = 10;
  const sales = useSelector((state) => state.salesState.getAllSls);

  useEffect(() => {
    dispatch(getAllSales());
  }, [dispatch]);

  useEffect(() => {
    setFilteredSales(sales);
  }, [sales]);

  function changeHandler(e) {
    const busqueda = e.target.value.toLowerCase();
    const filteredResults = sales.filter(
      (sale) =>
        sale.id.toLowerCase().includes(busqueda) ||
        sale.user?.user.toLowerCase().includes(busqueda)
    );
    setFilteredSales(filteredResults); // Actualizar los resultados filtrados
  }

  useEffect(() => {
    const app = document.getElementById("App");
    app && (app.style.display = "flex");
    return () => {
      app && (app.style.display = "block");
    };
  }, []);

  const lastsaleindex = currentPage * salesperpage;
  const indicePrimerUsuario = lastsaleindex - salesperpage;
  const usuariosActuales = filteredSales.slice(
    indicePrimerUsuario,
    lastsaleindex
  );
  if (!sales || sales.length === 0) {
    return <div>No hay ventas disponibles.</div>;
  }

  const handlePageChange = (numeroPagina) => {
    setCurrentPage(numeroPagina);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < Math.ceil(sales.length / salesperpage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // // eslint-disable-next-line react-hooks/rules-of-hooks, no-unused-vars
  // const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = (sale) => {
    setSelectedSale(sale);
    setModalOpen(true); // Agregar esta línea para abrir el modal
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setSelectedSale(null);
  };

  return (
    <div className={styles.Container}>
      <section className={styles.FirstSection}>
        <h1 className={styles.title1}>Sales</h1>
        <div className={styles.SearchBar}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search"
            onChange={changeHandler}
          />
        </div>
      </section>

      <div className={styles.SecondSection}>
        <section>
          <h1>Users</h1>
          {usuariosActuales.map((sale, key) => (
            <article key={key} style={{ flexDirection: "row" }}>
              <img
                className={styles.userImage}
                src={sale.user?.image}
                alt="imagen del usuario"
              />
              <span>{sale.user?.user} </span>
            </article>
          ))}
        </section>
        {/* Resto de las secciones */}
        <section>
          <h1>Order number</h1>
          {usuariosActuales.map((sale, key) => (
            <article key={key}>
              <span>{sale.id.substring(1, 8)} </span>
            </article>
          ))}
        </section>
        <section>
          <h1>Date</h1>
          {usuariosActuales.map((sale, key) => (
            <article key={key}>
              <span>{convertirFecha(sale.date)} </span>
            </article>
          ))}
        </section>
        <section>
          <h1>Total items</h1>
          {usuariosActuales.map((sale, key) => (
            <article key={key}>
              <span>{sale.items.length} </span>
            </article>
          ))}
        </section>
        <section>
          <h1>Total price</h1>
          {usuariosActuales.map((sale, key) => (
            <article key={key}>
              <span>${sale.amount} </span>
            </article>
          ))}
        </section>

        <section>
          <h1>Status</h1>
          {usuariosActuales.map((sale, key) => (
            <article
              key={key}
              style={{ display: "flex", alignItems: "center" }}
            >
              <span
                style={{
                  display: "flex",
                  color: "#00D37B",
                  alignItems: "center",
                }}
              >
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className={styles.crossIconAllow}
                />

                {sale.salesStatus}
                <span
                  onClick={() => handleOpenModal(sale)}
                  style={{
                    marginLeft: "15px",
                    padding: "4px",
                    backgroundColor: "#007bff",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Purchase
                </span>
              </span>
              {/* Agregar el botón para abrir el modal */}
            </article>
          ))}
        </section>
      </div>

      <div className={styles.ThirdSection}>
        {/* Muestra el modal si selectedSale no es null */}
        {selectedSale && (
          <div className={styles.modalContainer}>
            {/* contenido del modal */}
            <div className={styles.modalContent}>
              <h2 className={styles.modalTitle}>Purchase Details</h2>
              <div className={styles.gameItemContainer}>
                <div className={styles.gameItemName}>
                  Order number: {selectedSale.id.substring(1, 8)}
                </div>

                <img
                  className={styles.gameItemImage}
                  src={selectedSale.user?.image}
                  alt="User"
                />
                <div className={styles.gameItemName}>
                  User: {selectedSale.user?.user}
                </div>
                <div className={styles.gameItemQuantity}>
                  Total Items: {selectedSale.items.length}
                </div>
                <div className={styles.gameItemPrice}>
                  Total Price: ${selectedSale.amount}
                </div>
                <div className={styles.saleValue}>
                  Status: {selectedSale.salesStatus}
                </div>

                <div className={styles.saleValue}>
                  Date: {convertirFecha(selectedSale.date)}
                </div>
              </div>
              <button className={styles.closeButton} onClick={handleCloseModal}>
                Close
              </button>
            </div>
          </div>
        )}

        <div className={styles.pagination}>
          <button onClick={goToPreviousPage}>&lt;</button>
          {Array.from({
            length: Math.ceil(filteredSales.length / salesperpage),
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? styles.btnPaged : ""}
            >
              {index + 1}
            </button>
          ))}
          <button onClick={goToNextPage}>&gt;</button>
        </div>
      </div>
    </div>
  );
}

export default Sales;
