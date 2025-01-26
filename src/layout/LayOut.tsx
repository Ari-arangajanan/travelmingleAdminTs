import React from "react";
import { AppProvider, Session } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { NAVIGATION } from "./Navigation";
import { Box, Typography } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useDemoRouter } from "@toolpad/core/internal";
import DashBoard from "../pages/dashBoard/DashBoard";
import UserPage from "../pages/user/UserPage";
import ServiceProvider from "../pages/serviceProvider/ServiceProvider";
import ServiceCategory from "../pages/serviceCategory/ServiceCategory";
import SystemUser from "../pages/system/sysUser/SystemUser";
import SysRole from "../pages/system/sysRole/SysRole";
import Bookings from "../pages/bookingd/Bookings";
import Services from "../pages/servicePage/Services";
import ServiceRegistration from "../serviceRegistration/ServiceRegistration";
import Payment from "../pages/payment/Payment";

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

interface LayoutProps {
  window?: () => Window;
}
const LayOut = (props: LayoutProps) => {
  const { window } = props;
  const router = useDemoRouter("/admin/dashboard");
  // Remove this const when copying and pasting into your project.
  const demoWindow = window !== undefined ? window() : undefined;

  const [session, setSession] = React.useState<Session | null>({
    user: {
      name: "Bharat Kashyap",
      email: "bharatkashyap@outlook.com",
      image: "https://avatars.githubusercontent.com/u/19550456",
    },
  });

  // A function to render the correct page based on the current route
  const renderPage = (pathname: string) => {
    switch (pathname) {
      // user management
      case "/admin/dashboard":
        return <DashBoard />;
      case "/admin/user":
        return <UserPage />;
      case "/admin/serviceProvider":
        return <ServiceProvider />;
      case "/admin/serviceCategory":
        return <ServiceCategory />;

      // service Management
      case "/admin/service/registration":
        return <ServiceRegistration />;
      case "/admin/service/services":
        return <Services />;
      case "/admin/service/bookings":
        return <Bookings />;
      case "/admin/service/payment":
        return <Payment />;

      // system
      case "/admin/system/admin/sysUser":
        return <SystemUser />;
      case "/admin/system/admin/sysRole":
        return <SysRole />;
      case "/admin/reports/admin/sales":
        return <ServiceCategory />;
      case "/admin/reports/admin/traffic":
        return <ServiceCategory />;
      case "/admin/integrations":
        return <ServiceCategory />;
      // Add cases for other segments
      default:
        return <Typography>404 Page Not Found</Typography>;
    }
  };

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession({
          user: {
            name: "Bharat Kashyap",
            email: "bharatkashyap@outlook.com",
            image: "https://avatars.githubusercontent.com/u/19550456",
          },
        });
      },
      signOut: () => {
        setSession(null);
      },
    };
  }, []);

  return (
    <AppProvider
      session={session}
      navigation={NAVIGATION}
      authentication={authentication}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <Box
          sx={{
            display: "flex",
            height: "100vh", // Full height to match the sidebar
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              p: 2, // Add padding for spacing
              overflowY: "auto", // Ensure scrollable content if needed
            }}
          >
            {renderPage(router.pathname)}
          </Box>
        </Box>
        {/* {router.pathname} */}
      </DashboardLayout>
    </AppProvider>
  );
};

export default LayOut;
