import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";

export default function LineStylesDemo() {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
    const data = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          type: "line",
          label: "Dataset 1",
          borderColor: documentStyle.getPropertyValue("--blue-500"),
          borderWidth: 3,
          fill: false,
          data: [50, 25, 12, 48, 56, 76, 42],
        },
        {
          type: "bar",
          label: "Dataset 2",
          backgroundColor: documentStyle.getPropertyValue("--green-500"),
          data: [21, 84, 24, 75, 37, 65, 34],
          borderColor: "white",
          borderWidth: 2,
        },
        {
          type: "bar",
          label: "Dataset 3",
          backgroundColor: documentStyle.getPropertyValue("--red-500"),
          data: [41, 52, 24, 74, 23, 21, 32],
        },
        {
          type: "line",
          label: "Dataset 4",
          borderColor: documentStyle.getPropertyValue("--black-500"),
          borderWidth: 4,
          //dotted line
          borderDash: [15, 5],
          fill: true,
          backgroundColor: "#919191",
          tension: 0.4,
          data: [10, 15, 50, 75, 80, 70, 55],
        },
      ],
    };
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  return (
    <div className="card">
      <Chart type="line" data={chartData} options={chartOptions} />
    </div>
  );
}

export const PieChartDemo = () => {
  const [chartData, setChartData] = useState({});
  const [chartData1, setChartData1] = useState({});

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const data = {
      labels: ["A", "B", "C"],
      datasets: [
        {
          data: [540, 325, 702],
          backgroundColor: [
            documentStyle.getPropertyValue("--blue-500"),
            documentStyle.getPropertyValue("--yellow-500"),
            documentStyle.getPropertyValue("--green-500"),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue("--blue-400"),
            documentStyle.getPropertyValue("--yellow-400"),
            documentStyle.getPropertyValue("--green-400"),
          ],
        },
      ],
    };
    const data1 = {
      labels: ["1", "2", "3"],
      datasets: [
        {
          data: [30, 100, 250],
          backgroundColor: [
            documentStyle.getPropertyValue("--blue-500"),
            documentStyle.getPropertyValue("--red-500"),
            documentStyle.getPropertyValue("--green-500"),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue("--blue-400"),
            documentStyle.getPropertyValue("--red-400"),
            documentStyle.getPropertyValue("--green-400"),
          ],
        },
      ],
    };
    const options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
          },
        },
      },
    };

    setChartData(data);
    setChartData1(data1);

    setChartOptions(options);
  }, []);

  return (
    <div className="pipeChart card flex justify-content-center">
      <Chart
        type="pie"
        data={chartData}
        options={chartOptions}
        className="w-1rem"
      />
      <Chart
        type="pie"
        data={chartData1}
        options={chartOptions}
        className="w-1rem"
      />
    </div>
  );
};
