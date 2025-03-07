import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Card, CardContent, Typography } from "@mui/material";

interface PieChartData {
  value: number;
  color: string;
}

interface PieChartComponentProps {
  data: PieChartData[];
  colors?: string[];
  title?: string;
}
const PieChat: React.FC<PieChartComponentProps> = ({
  data,
  colors = ["#FF6384", "#36A2EB", "#FFCE56"],
  title = "Pie Chart",
}) => {
  return (
    <Card sx={{ width: "100%", boxShadow: 3, p: 2 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          {title}
        </Typography>
        <PieChart series={[{ data, innerRadius: 30 }]} colors={colors} />
      </CardContent>
    </Card>
  );
};

export default PieChat;
