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

const GraphAllPackages = ({
  sensorData,
  limitData,
  id,
  showXAxis,
  minDate,
  maxDate,
  showLabel,
}) => {
  const [dataMin, setDataMin] = useState(0);
  const [dataMax, setDataMax] = useState(0);
  const [filteredDate, setFilteredData] = useState(sensorData);
  let limitMin = 0;
  let limitMax = 0;
  let yAxisMin = -5;
  let yAxisMax = 5;

  const color = [
    { r: 229, g: 115, b: 155 },
    { r: 213, g: 0, b: 0 },
    { r: 77, g: 182, b: 172 },
    { r: 136, g: 14, b: 79 },
    { r: 255, g: 160, b: 0 },
    { r: 41, g: 121, b: 255 },
    { r: 63, g: 81, b: 181 },
    { r: 139, g: 195, b: 74 },
    { r: 206, g: 147, b: 216 },
    { r: 100, g: 181, b: 246 },
    { r: 212, g: 225, b: 87 },
    { r: 124, g: 77, b: 255 },
    { r: 64, g: 196, b: 255 },
    { r: 156, g: 39, b: 176 },
    { r: 0, g: 200, b: 83 },
    { r: 3, g: 169, b: 244 },
    { r: 83, g: 109, b: 254 },
    { r: 255, g: 235, b: 59 },
    { r: 240, g: 98, b: 146 },
    { r: 76, g: 175, b: 80 },
  ];

  useEffect(() => {
    const Values = [];
    sensorData.dataset.forEach((o) =>
      o.data.map((datas) => Values.push(datas))
    );
    setDataMax(Math.max(...Values));
    setDataMin(Math.min(...Values));
  }, [sensorData]);

  useEffect(() => {
    const minDateIndex = sensorData.DatesList.indexOf(minDate);
    const maxDateIndex = sensorData.DatesList.indexOf(maxDate);
    setFilteredData(
      sensorData.DatesList.filter((date) =>
        moment(date).isBetween(minDate, maxDate, undefined, "[]")
      )
    );
  }, [minDate, maxDate, sensorData]);

  if (id === "Temperature") {
    limitMin = limitData.temp_min;
    limitMax = limitData.temp_max;
    yAxisMin = dataMin < limitMin ? dataMin - 10 : limitMin - 10;
    yAxisMax = dataMax > limitMax ? dataMax + 10 : limitMax + 10;
  }
  if (id === "Humidity") {
    limitMin = limitData.hum_min;
    limitMax = limitData.hum_max;
    yAxisMin = dataMin < limitMin ? dataMin - 10 : limitMin - 10;
    yAxisMax = dataMax > limitMax ? dataMax + 10 : limitMax + 10;
  }
  if (id === "Light") {
    limitMin = limitData.light_min;
    limitMax = limitData.light_max;
    yAxisMin = -0.5;
    yAxisMax = dataMax > limitMax ? dataMax + 10 : limitMax + 10;
  }
  if (id === "Vibration") {
    limitMin = limitData.shock_min;
    limitMax = limitData.shock_max;
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
          autoSkip: true,
          maxRotation: 90,
          minRotation: 90,
          labelOffset: -8,
          maxTicksLimit: 10,
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
        display: showLabel,
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
  const labels = sensorData.DatesList.map((date) =>
    moment(date).format("DD-MM-YY, hh:mm:ss")
  );
  const datasets = sensorData.dataset.map((pckg, i) => ({
    label: pckg.label,
    data: pckg.data,
    borderColor: `rgb(${color[i].r}, ${color[i].g}, ${color[i].b})`,
    backgroundColor: `rgba(${color[i].r}, ${color[i].g}, ${color[i].b}, 0.5)`,
  }));
  const data = {
    labels,
    datasets: datasets,
  };

  return (
    <Line
      options={options}
      data={data}
      width={"80%"}
      height={showXAxis ? "60%" : "40%"}
    />
  );
};

export default GraphAllPackages;
