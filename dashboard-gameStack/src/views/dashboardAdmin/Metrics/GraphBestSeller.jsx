import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const TopGamesChart = ({ data }) => {
  // Crear un objeto para contar las ventas de cada juego
  const gameSalesCounts = {};

  // Recorrer el arreglo de ventas y contar las ventas de cada juego
  data.forEach((sale) => {
    sale.items.forEach((item) => {
      const gameName = item.videogameName;
      if (gameSalesCounts[gameName]) {
        gameSalesCounts[gameName]++;
      } else {
        gameSalesCounts[gameName] = 1;
      }
    });
  });

  // Crear un arreglo con los datos en el formato requerido por Recharts
  const formattedData = Object.keys(gameSalesCounts).map((gameName) => ({
    name: gameName,
    // name: gameName.substring(0, 10),
    sales: gameSalesCounts[gameName],
  }));

  return (
    <BarChart width={800} height={400} data={formattedData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="name"
        angle={-90}
        textAnchor="end" // Alinea el contenido hacia la derecha
        interval={0}
        fontSize={9}
        tick={{ fill: "#280657" }}
        height={175}
        tickFormatter={(value) => value.substring(0, 25)} // Mostrar los primeros 12 caracteres
        dx={-5} // Ajusta la posición horizontal del contenido
        label={{
          value: "Title",
          angle: 0,
          position: "insideBottom", // Cambia la posición a "insideBottom"
          offset: 20, // Aplica un offset negativo para mover las etiquetas hacia arriba
          style: {
            fill: "white",
            fontWeight: "bold",
            whiteSpace: "pre",
          },
        }}
      />
      <YAxis
        domain={["auto", "auto"]} // Ajusta el rango del eje Y automáticamente
        label={{
          value: "Amount sold ",
          angle: -90,
          position: "outside",
          dy: 0,
          dx: -30,
          style: {
            fill: "white",
            fontWeight: "bold",
            whiteSpace: "pre",
          },
        }}
        tick={{ fill: "#280657" }}
      />
      <Tooltip
        contentStyle={{ backgroundColor: "rgba(0, 0, 0, 0.8)", color: "#fff" }} // Estilos del tooltip
        labelStyle={{ fontWeight: "bold" }} // Estilos de la etiqueta del tooltip
        formatter={(value, name) => `#${value} `} // Formato del contenido del tooltip
        cursor={{ fill: "rgba(0, 0, 0, 0.2)" }} // Cursor personalizado
      />
      {/* <Legend /> */}
      <Bar dataKey="sales" fill="green" />
    </BarChart>
  );
};

export default TopGamesChart;
