import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import GroupIcon from "@mui/icons-material/Group";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { Navigation } from "@toolpad/core";

export const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "admin/dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "admin/user",
    title: "User",
    icon: <GroupIcon />,
  },
  {
    segment: "admin/serviceProvider",
    title: "Service Provider",
    icon: <SettingsAccessibilityIcon />,
  },
  {
    segment: "admin/serviceCategory",
    title: "Service Category",
    icon: <ShoppingCartIcon />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "System",
  },
  {
    segment: "admin/system",
    title: "System Details",
    icon: <AdminPanelSettingsIcon />,
    children: [
      {
        segment: "admin/sysUser",
        title: "System User",
        icon: <AccountCircleIcon />,
      },
      {
        segment: "admin/sysRole",
        title: "Sys Role",
        icon: <ManageAccountsIcon />,
      },
    ],
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Analytics",
  },

  {
    segment: "admin/reports",
    title: "Reports",
    icon: <BarChartIcon />,
    children: [
      {
        segment: "admin/sales",
        title: "Sales",
        icon: <DescriptionIcon />,
      },
      {
        segment: "admin/traffic",
        title: "Traffic",
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: "admin/integrations",
    title: "Integrations",
    icon: <LayersIcon />,
  },
];
