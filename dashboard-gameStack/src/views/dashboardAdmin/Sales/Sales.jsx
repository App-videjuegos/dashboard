import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./Sales.module.css";
import { convertirFecha } from "../../../components/Helpers/InvertDate";
import { getUserbyName } from "../../../redux/usersSlice";
import { getAllSales } from "../../../redux/salesActions";

let prevId = 1;

function Sales() {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usuariosPorPagina = 10;

  useEffect(() => {
    dispatch(getAllSales());
  }, [dispatch]);

  useEffect(() => {
    const app = document.getElementById("App");
    app && (app.style.display = "flex");
    return () => {
      app && (app.style.display = "block");
    };
  }, []);

  let allUsers = useSelector((state) => state.salesState.getAllSls);

  function changeHandler(e) {
    setInput(e.target.value);
    const busqueda = e.target.value.toLowerCase();
    dispatch(getUserbyName(busqueda));
  }

  // Lógica de paginación
  const indiceUltimoUsuario = currentPage * usuariosPorPagina;
  const indicePrimerUsuario = indiceUltimoUsuario - usuariosPorPagina;
  const usuariosActuales = allUsers.slice(
    indicePrimerUsuario,
    indiceUltimoUsuario
  );

  const handlePageChange = (numeroPagina) => {
    setCurrentPage(numeroPagina);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < Math.ceil(allUsers.length / usuariosPorPagina)) {
      setCurrentPage(currentPage + 1);
    }
  };
  const names = allUsers && usuariosActuales && usuariosActuales.map((i) => i);
  const fecha =
    allUsers && usuariosActuales && usuariosActuales.map((i) => i.date);
  const items =
    allUsers && usuariosActuales && usuariosActuales.map((i) => i.items.length);
  const totalprice =
    allUsers && usuariosActuales && usuariosActuales.map((i) => i.amount);
  const status =
    allUsers && usuariosActuales && usuariosActuales.map((i) => i.salesStatus);
  const order =
    allUsers && usuariosActuales && usuariosActuales.map((i) => i.id);
  return (
    <div className={styles.Container}>
      <section className={styles.FirstSection}>
        <h1>Sales</h1>
        <div className={styles.SearchBar}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search"
            onChange={changeHandler}
          />

          {/* <button className="searchButton" type="submit"  >Buscar</button> */}
        </div>
      </section>

      <div className={styles.SecondSection}>
        <section>
          <h1>Users </h1>
          {names.map((i, key) => (
            <article key={key} style={{ flexDirection: "row" }}>
              <img
                className={styles.userImage}
                src={i.user?.image}
                alt="imagen del usuario"
              />
              <span>{i.user?.user} </span>
            </article>
          ))}
        </section>
        <section>
          <h1>Order number </h1>
          {order.map((i, key) => (
            <article key={key}>
              <span>{i} </span>
            </article>
          ))}
        </section>

        <section>
          <h1>Date</h1>
          {fecha.map((i, key) => (
            <article key={key}>
              <span>{convertirFecha(i)} </span>
            </article>
          ))}
        </section>

        <section>
          <h1>Total items</h1>
          {items.map((i, key) => (
            <article key={key}>
              <span>{i} </span>
            </article>
          ))}
        </section>
        <section>
          <h1>Total price</h1>
          {totalprice.map((i, key) => (
            <article key={key}>
              <span>${i} </span>
            </article>
          ))}
        </section>

        <section>
          <h1>Status</h1>
          {status.map((i, key) => (
            <article key={key}>
              <span>{i} </span>
            </article>
          ))}
        </section>
      </div>

      <div className={styles.pagination}>
        <button onClick={goToPreviousPage}>&lt;</button>
        {Array.from({
          length: Math.ceil(allUsers.length / usuariosPorPagina),
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
  );
}

export default Sales;