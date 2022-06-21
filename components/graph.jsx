import React, { useEffect, useRef, useState } from "react";
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
//import zoomPlugin from "chartjs-plugin-zoom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
  //zoomPlugin
);

const Graph = ({ sensorData, limitData, id, showXAxis }) => {
  const [dataMin, setDataMin] = useState(0);
  const [dataMax, setDataMax] = useState(0);
  let limitMin = 0;
  let limitMax = 0;
  let yAxisMin = -5;
  let yAxisMax = 5;
  let options;
  let data;

  useEffect(() => {
    const Values = sensorData.map((o) => o.sensor_value);
    setDataMax(Math.max(...Values));
    setDataMin(Math.min(...Values));
  }, [sensorData]);

  if (typeof window !== "undefined") {
    if (id === "Temperature") {
      if (limitData[0].temperature_constraint) {
        limitMin = limitData[0]?.temperature_min;
        limitMax = limitData[0]?.temperature_max;
      }
      yAxisMin = dataMin < limitMin ? dataMin - 10 : limitMin - 10;
      yAxisMax = dataMax > limitMax ? dataMax + 10 : limitMax + 10;
    }
    if (id === "Humidity") {
      if (limitData[0].humidity_constraint) {
        limitMin = limitData[0]?.humidity_min;
        limitMax = limitData[0]?.humidity_max;
      }
      yAxisMin = dataMin < limitMin ? dataMin - 10 : limitMin - 10;
      yAxisMax = dataMax > limitMax ? dataMax + 10 : limitMax + 10;
    }
    if (id === "Light") {
      if (limitData[0].light_constraint) {
        limitMin = limitData[0]?.light_min;
        limitMax = limitData[0]?.light_max;
      }
      yAxisMin = -0.5;
      yAxisMax = dataMax > limitMax ? dataMax + 10 : limitMax + 10;
    }
    if (id === "Vibration") {
      if (limitData[0].shock_constraint) {
        limitMin = limitData[0]?.shock_min;
        limitMax = limitData[0]?.shock_max;
      }
      yAxisMin = -0.5;
      yAxisMax = dataMax > limitMax ? dataMax + 2 : limitMax + 2;
    }
    options = {
      responsive: true,
      xAxisID: "xAxis",
      scales: {
        xAxis: {
          display: showXAxis,
        },
        yAxis: {
          min: Math.floor(yAxisMin),
          max: Math.ceil(yAxisMax),
          title: {
            display: true,
            text: id,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
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
        // zoom: {
        //   zoom: {
        //     wheel: {
        //       enabled: true,
        //     },
        //     pinch: {
        //       enabled: true,
        //     },
        //     mode: "y",
        //   },
        // },
      },
    };
    const labels = sensorData.map((data) =>
      moment(data.date).format("DD-MM-YY")
    );
    data = {
      labels,
      datasets: [
        {
          data: sensorData.map((data) => data.sensor_value),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    };
  }

  return <Line options={options} data={data} width={"80%"} height={"30%"} />;
};

export default Graph;
