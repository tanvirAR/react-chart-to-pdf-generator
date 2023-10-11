import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from "chart.js";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale
);

export default function LineChart(props: any) {
  const { chartData, options } = props;

  return (
    <Line data={chartData} options={options} width={"100%"} height={"100%"} />
  );
}
