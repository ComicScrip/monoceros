import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import moment from "moment";
import annotationPlugin from "chartjs-plugin-annotation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

const Graph = ({ sensorData, limitData, id }) => {
  let limitMin = 0;
  let limitMax = 0;
  if (id === "Temperature" && limitData[0].temperature_constraint) {
    limitMin = limitData[0]?.temperature_min;
    limitMax = limitData[0]?.temperature_max;
  }
  if (id === "Humidity" && limitData[0].humidity_constraint) {
    limitMin = limitData[0]?.humidity_min;
    limitMax = limitData[0]?.humidity_max;
  }
  if (id === "Light" && limitData[0].light_constraint) {
    limitMin = limitData[0]?.light_min;
    limitMax = limitData[0]?.light_max;
  }
  if (id === "Vibration" && limitData[0].shock_constraint) {
    limitMin = limitData[0]?.shock_min;
    limitMax = limitData[0]?.shock_max;
  }
  const options = {
    responsive: true,
    scales: {
      yAxis: {
        min: limitMin - 10,
        max: limitMax + 10,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      autocolors: false,
      annotation: {
        annotations: {
          box1: {
            type: "box",
            yScaleID: "yAxis",
            yMin: limitMin,
            yMax: limitMax,
            backgroundColor: "rgba(255, 99, 132, 0.25)",
            adjustScaleRange: true,
          },
        },
      },
    },
  };
  const labels = sensorData.map((data) => moment(data.date).format("DD-MM-YY"));
  const data = {
    labels,
    datasets: [
      {
        data: sensorData.map((data) => data.sensor_value),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return <Line options={options} data={data} width={"80%"} height={"50%"} />;
};

export default Graph;
