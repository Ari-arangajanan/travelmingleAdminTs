import { Avatar, Box, Card, Typography } from "@mui/material";
import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  changeType: "increase" | "decrease"; // Controls green/red color
  icon: React.ReactNode;
  iconBg?: string; // Background color for icon
}
const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changeType,
  icon,
  iconBg: iconBg = "bg-blue-100",
}) => {
  return (
    <Card
      sx={{
        minWidth: 275,
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      {/* Header: Title & Icon */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="body2" color="textSecondary">
          {title}
        </Typography>
        <Avatar sx={{ bgcolor: iconBg, width: 48, height: 48 }}>{icon}</Avatar>
      </Box>

      {/* Value */}
      <Typography variant="h4" fontWeight="bold">
        {value}
      </Typography>

      {/* Change Percentage */}
      <Typography
        variant="body2"
        sx={{
          display: "flex",
          alignItems: "center",
          color: changeType === "increase" ? "success.main" : "error.main",
        }}
      >
        {changeType === "increase" ? "⬆" : "⬇"} {change}
      </Typography>
    </Card>
  );
};

export default StatCard;
