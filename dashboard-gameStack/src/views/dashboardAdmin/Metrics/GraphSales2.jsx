import React, { useState } from "react";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryGroup } from "victory";
import { format } from "date-fns";

const SalesByDateChart = ({ data }) => {
  // Formatear los datos para el gráfico y agrupar por fecha
  const groupedData = data.reduce((result, item) => {
    const formattedDate = format(new Date(item.date.substring(0, 10)), "dd/MM/yy");
    if (!result[formattedDate]) {
      result[formattedDate] = {
        x: formattedDate,
        y: parseFloat(item.amount),
      };
    } else {
      result[formattedDate].y += parseFloat(item.amount);
    }
    return result;
  }, {});

  const formattedData = Object.values(groupedData);

  const [selectedBar, setSelectedBar] = useState(null);

  return (
    <div>
      <VictoryChart
        theme={VictoryTheme.material}
        width={700}
        height={400}
        domainPadding={20}
        padding={{ top: 30, bottom: 50, left: 50, right: 30 }}
        style={{ border: "1px solid #ccc", borderRadius: "5px" }}
      >
        <VictoryAxis
          tickFormat={formattedData.map((item) => item.x)}
          label="Fecha"
          style={{
            axisLabel: { padding: 45 },
            tickLabels: {
              angle: -75,
              verticalAnchor: "middle",
              textAnchor: "end",
              fontSize: 8,
            },
          }}
        />

        <VictoryAxis
          dependentAxis
          tickFormat={(tick) => `$${tick}`}
          label="Ventas"
          style={{
            axisLabel: { padding: 40 },
          }}
        />

        <VictoryGroup>
          {formattedData.map((item, index) => (
            <VictoryBar
              key={index}
              data={[item]}
              x="x"
              y="y"
              labels={({ datum }) => `$${datum.y}`}
              style={{
                data: {
                  fill: index === selectedBar ? "cream" : "green",
                  shadow: index === selectedBar ? "gray" : "none",
                },
              }}
              events={[
                {
                  target: "data",
                  eventHandlers: {
                    onMouseOver: () => {
                      setSelectedBar(index);
                      return {
                        style: { fill: "cream", shadow: "gray" },
                      };
                    },
                    onMouseOut: () => {
                      setSelectedBar(null);
                      return {
                        style: { fill: "green", shadow: "none" },
                      };
                    },
                  },
                },
              ]}
            />
          ))}
        </VictoryGroup>
      </VictoryChart>
    </div>
  );
};

export default SalesByDateChart;
