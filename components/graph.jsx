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

const Graph = ({ sensorData, limitData, id, showXAxis, minDate, maxDate }) => {
  const [dataMin, setDataMin] = useState(0);
  const [dataMax, setDataMax] = useState(0);
  const [filteredData, setFilteredData] = useState(sensorData);
  let limitMin = 0;
  let limitMax = 0;
  let yAxisMin = -5;
  let yAxisMax = 5;

  useEffect(() => {
    const Values = sensorData.map((o) => o.sensor_value);
    setDataMax(Math.max(...Values));
    setDataMin(Math.min(...Values));
  }, [sensorData]);

  useEffect(() => {
    setFilteredData(
      sensorData.filter((dataset) =>
        moment(dataset.date).isBetween(minDate, maxDate, undefined, "[]")
      )
    );
  }, [minDate, maxDate, sensorData]);

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
  const options = {
    responsive: true,
    xAxisID: "xAxis",
    scales: {
      xAxis: {
        display: showXAxis,
        ticks: {
          autoSkip: false,
          maxRotation: 90,
          minRotation: 90,
        },
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
      zoom: {
        pan: {
          enable: true,
          mode: "x",
        },
        limits: {
          x: { min: minDate, max: maxDate },
        },
      },
    },
  };
  const labels = filteredData.map((data) =>
    moment(data.date).format("DD-MM-YY, hh:mm:ss")
  );
  // const labels = ["15-05-21", "20-05-21", "25-05-21", "31-05-21"].map((date) =>
  //   moment(date).format("DD-MM-YY, hh:mm:ss")
  // );
  const data = {
    labels,
    datasets: [
      {
        data: filteredData.map((data) => data.sensor_value),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} width={"80%"} height={"30%"} />;
};

export default Graph;
