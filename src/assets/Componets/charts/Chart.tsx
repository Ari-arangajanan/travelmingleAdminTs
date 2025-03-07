import React from "react";
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
import { Card, CardContent, Typography } from "@mui/material";

// register necessary components for chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  data: number[];
  labels: string[];
}

const Chart: React.FC<ChartProps> = ({ data, labels }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: "Sales",
        data,
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.1)",
        fill: true,
      },
    ],
  };
  return (
    <Card sx={{ width: "50%", boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Sales Details
        </Typography>
        <Line data={chartData} />
      </CardContent>
    </Card>
  );
};

export default Chart;
