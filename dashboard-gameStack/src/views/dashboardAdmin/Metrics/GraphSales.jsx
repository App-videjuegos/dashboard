import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const SalesByDateChart = ({ data }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredData, setFilteredData] = useState(data);

  const handleFilterClick = () => {
    // Filtrar la data según las fechas seleccionadas
    const filtered = data.filter((item) => {
      const itemDate = new Date(item.date.substring(0, 10));
      return (
        (!startDate || itemDate >= startDate) &&
        (!endDate || itemDate <= endDate)
      );
    });
    setFilteredData(filtered);
  };

  // Crear un objeto para almacenar las ventas agrupadas por fecha
  const groupedSales = {};

  // Agrupar las ventas por fecha y sumar las ventas en la misma fecha
  filteredData.forEach((item) => {
    const date = item.date.substring(0, 10); // Obtener solo la fecha (sin hora)
    if (groupedSales[date]) {
      groupedSales[date] += parseFloat(item.amount);
    } else {
      groupedSales[date] = parseFloat(item.amount);
    }
  });

  // Crear un arreglo con los datos en el formato requerido por Recharts
  const formattedData = Object.keys(groupedSales).map((date) => ({
    date: date.substring(2, 10),
    sales: groupedSales[date],
  }));

  return (
    <div style={{ width: "100%", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          width: "90%",
          margin: "0 auto",
          backgroundColor: "#6B35E8",
          padding: "10px",
        }}
      >
        <div>
          <label htmlFor="startDate">Start date:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(new Date(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="endDate">End date:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(new Date(e.target.value))}
          />
        </div>
        <button onClick={handleFilterClick}>Apply Filter</button>
      </div>

      <BarChart width={700} height={400} data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          angle={-90}
          textAnchor="end"
          label={{
            value: "Date",
            angle: 0,
            position: "outside",
            dy: +50,
            dx: 0,
            style: {
              fill: "white",
              fontWeight: "bold",
              whiteSpace: "pre",
            },
          }}
          tick={{ fill: "#280657", fontSize: 12 }}
        />
        <YAxis
          label={{
            value: "Amount sold per day",
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
        <Tooltip />
        <Legend verticalAlign="top" align="center" height={36} />
        <Bar
          dataKey="sales"
          fill="green"
          label={{
            position: "top",
            fill: "white",
            formatter: (value) => `$${value}`,
            fontSize: 11,
          }}
        />
      </BarChart>
    </div>
  );
};

export default SalesByDateChart;
