import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const SalesByDateChart = ({ data }) => {
  const formatedData = data.map((item) => {
    const dateObject = new Date(item.date);
    const formattedDate = `${dateObject.getMonth() + 1}/${dateObject.getDate()}/${dateObject.getFullYear().toString().slice(-2)}`;
    return { date: formattedDate, Sales: parseFloat(item.amount) }; // Convierte a número
  });

  // Calcula el valor máximo de las ventas en los datos formateados
  const maxSales = Math.max(...formatedData.map((item) => item.Sales));

  return (
    <div style={{ width: "100%", margin: "0 auto" }}>
      <LineChart width={700} height={400} data={formatedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tick={{ fill: "#280657" }} />
        <YAxis label={{ value: "Valor (de Venta)", angle: -90, position: "insideLeft", offset: -30 }} tick={{ fill: "#280657" }} domain={[0, maxSales]} />
        <Tooltip />
        <Legend verticalAlign="bottom" height={36} />
        <Line type="monotone" dataKey="Sales" stroke="green" activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  );
};

export default SalesByDateChart;
