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
import KebabDiningIcon from "@mui/icons-material/KebabDining";
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
import HandshakeIcon from "@mui/icons-material/Handshake";
import { Navigation } from "@toolpad/core";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

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
    title: "Service Managements",
  },
  {
    segment: "admin/service",
    title: "Service Operations",
    icon: <FaceRetouchingNaturalIcon />,
    children: [
      {
        segment: "registration",
        title: "Services Registration",
        icon: <AddBusinessIcon />,
      },
      {
        segment: "services",
        title: "Services",
        icon: <KebabDiningIcon />,
      },
      {
        segment: "bookings",
        title: "Bookings",
        icon: <HandshakeIcon />,
      },
      {
        segment: "payment",
        title: "Payment",
        icon: <AccountBalanceWalletIcon />,
      },
    ],
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "System Management",
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
