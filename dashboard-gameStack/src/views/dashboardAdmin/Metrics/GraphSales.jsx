import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const SalesByDateChart = ({ data }) => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Agrupar las ventas por fecha y sumar las ventas en la misma fecha
    const groupedSales = {};

    data.forEach((item) => {
      const date = item.date.substring(0, 10); // Obtener solo la fecha (sin hora)
      if (groupedSales[date]) {
        groupedSales[date] += parseFloat(item.amount);
      } else {
        groupedSales[date] = parseFloat(item.amount);
      }
    });

    // Crear un arreglo con los datos en el formato requerido por Recharts
    const formattedData = Object.keys(groupedSales).map((date) => ({
      date: date.substring(0, 10),
      sales: groupedSales[date],
    }));

    setFilteredData(formattedData); // Actualizar la data filtrada al iniciar
  }, [data]);

  const handleFilterClick = () => {
    // Filtrar la data según las fechas seleccionadas
    const formattedStartDate = startDate
      ? new Date(startDate).toISOString().substring(0, 10)
      : null;
    const formattedEndDate = endDate
      ? new Date(endDate).toISOString().substring(0, 10)
      : null;

    const filtered = data.filter((item) => {
      const itemDate = item.date.substring(0, 10);
      return (
        (!formattedStartDate || itemDate >= formattedStartDate) &&
        (!formattedEndDate || itemDate <= formattedEndDate)
      );
    });

    const groupedSales = {};

    filtered.forEach((item) => {
      const date = item.date.substring(0, 10);
      if (groupedSales[date]) {
        groupedSales[date] += parseFloat(item.amount);
      } else {
        groupedSales[date] = parseFloat(item.amount);
      }
    });

    const formattedFilteredData = Object.keys(groupedSales).map((date) => ({
      date: date.substring(0, 10),
      sales: groupedSales[date],
    }));

    setFilteredData(formattedFilteredData); // Actualizar la data filtrada
  };
  return (
    <div style={{ width: "100%", margin: "0 auto", overflowX: "auto" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          width: "90%",
          margin: "0 auto",
          backgroundColor: "#6B35E8",
          padding: "10px",
          height: "50px",
          borderRadius: "8px",
        }}
      >
        <div
          style={{
            margin: "0 2px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <label htmlFor="startDate" style={{ marginRight: "5px" }}>
            Start date:
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div
          style={{
            margin: "0 2px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <label htmlFor="endDate">End date:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button onClick={handleFilterClick}>Apply Filter</button>
      </div>

      <BarChart
        width={700}
        height={400}
        data={filteredData}
        layout="horizontal"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          angle={-90}
          textAnchor="end"
          tick={{ fill: "#280657", fontSize: 12 }}
          height={90}
          label={{
            value: "Date",
            angle: 0,
            position: "insideBottom",
            offset: -0,
            style: {
              fill: "white",
              fontWeight: "bold",
              whiteSpace: "pre",
            },
          }}
        />

        <YAxis
          domain={["auto", "auto"]}
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
          tick={{ fill: "#280657", fontSize: "12" }}
          tickFormatter={(value) => `$${value}`}
        />

        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            color: "#fff",
          }}
          labelStyle={{ fontWeight: "bold" }}
          formatter={(value, name) => `$${value} `}
          cursor={{ fill: "rgba(0, 0, 0, 0.2)" }}
        />

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
