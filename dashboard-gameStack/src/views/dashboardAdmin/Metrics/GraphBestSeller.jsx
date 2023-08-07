import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const TopGamesChart = ({ data }) => {
  // Crear un objeto para contar las ventas de cada juego
  const gameSalesCounts = {};

  // Recorrer el arreglo de ventas y contar las ventas de cada juego
  data.forEach(sale => {
    sale.items.forEach(item => {
      const gameName = item.videogameName;
      if (gameSalesCounts[gameName]) {
        gameSalesCounts[gameName]++;
      } else {
        gameSalesCounts[gameName] = 1;
      }
    });
  });

  // Crear un arreglo con los datos en el formato requerido por Recharts
  const formattedData = Object.keys(gameSalesCounts).map(gameName => ({
    name: gameName.substring(0,10),
    sales: gameSalesCounts[gameName]
  }));

  return (
    <BarChart width={800} height={300} data={formattedData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" angle={-90} textAnchor="end" interval={0} fontSize={8} tick={{ fill: "#280657" }} />
      <YAxis tick={{ fill: "#280657" }} />
      <Tooltip />
      <Legend />
      <Bar dataKey="sales" fill="green" />
    </BarChart>
  );
};

export default TopGamesChart;
