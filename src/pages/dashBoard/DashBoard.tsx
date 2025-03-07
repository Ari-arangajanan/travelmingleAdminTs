import { FaUser, FaBox, FaDollarSign, FaClock } from "react-icons/fa";
import StatCard from "../../assets/Componets/StatCard";
import Chart from "../../assets/Componets/charts/Chart";
import { Box } from "@mui/material";
import PieChat from "../../assets/Componets/charts/PieChat";

const DashBoard = () => {
  // Sample statistics data
  const stats = [
    {
      title: "Total Users",
      value: "40,689",
      change: "8.5% Up from yesterday",
      changeType: "increase" as "increase",
      icon: <FaUser size={24} className="text-blue-600" />,
      iconBg: "bg-blue-100",
    },
    {
      title: "Total Orders",
      value: "10,293",
      change: "1.3% Up from last week",
      changeType: "increase" as "increase",
      icon: <FaBox size={24} className="text-yellow-600" />,
      iconBg: "bg-yellow-100",
    },
    {
      title: "Total Sales",
      value: "$89,000",
      change: "4.3% Down from yesterday",
      changeType: "decrease" as "decrease",
      icon: <FaDollarSign size={24} className="text-green-600" />,
      iconBg: "bg-green-100",
    },
    {
      title: "Total Pending",
      value: "2,040",
      change: "1.8% Up from yesterday",
      changeType: "increase" as "increase",
      icon: <FaClock size={24} className="text-red-600" />,
      iconBg: "bg-red-100",
    },
  ];

  // Sample sales data
  const salesData = {
    labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
    data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 1000)),
  };
  return (
    <Box>
      <Box
        display={"flex"}
        gap={2}
        justifyContent={"left"}
        flexWrap={"wrap"}
        sx={{
          maxHeight: "500px", // Adjust the height as needed
          overflowY: "auto", // Enables vertical scrolling
          padding: 2,
          border: "1px solid #ccc", // Optional: adds a border for better visibility
        }}
      >
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </Box>

      {/* Sales Chart */}
      <Box
        mt={4}
        display={"flex"}
        gap={2}
        justifyContent={"left"}
        flexWrap={"wrap"}
      >
        <Box display={"flex"} gap={2} justifyContent={"left"} width={"100%"}>
          <Chart data={salesData.data} labels={salesData.labels} />
          <Chart data={salesData.data} labels={salesData.labels} />
        </Box>
        <Box display={"flex"} gap={2} justifyContent={"left"} width={"100%"}>
          {/* Pie Chart */}
          <PieChat
            data={[
              { value: 30, color: "green" },
              { value: 40, color: "blue" },
              { value: 30, color: "orange" },
            ]}
            title={"Order Status"}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default DashBoard;
