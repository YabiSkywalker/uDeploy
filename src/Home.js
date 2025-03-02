import * as React from "react";
import { extendTheme, styled } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import Grid from "@mui/material/Grid";
import { getAllTickets } from "./authService";
import TicketDetails from "./TicketDetails";
import { Card, CardContent, Typography, Modal, Backdrop } from "@mui/material";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import ApiTwoToneIcon from '@mui/icons-material/ApiTwoTone';
import ScienceTwoToneIcon from '@mui/icons-material/ScienceTwoTone';
import AccountBalanceTwoToneIcon from '@mui/icons-material/AccountBalanceTwoTone';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import LockIcon from '@mui/icons-material/Lock';
import IconPositionTabs from './RequestCard';
import { Box, List, ListItem, ListItemIcon, ListItemText, Divider } from "@mui/material";


const NAVIGATION = [
  {
    kind: "header",
    title: "Clearing",
  },
  {
    segment: "RTC",
    title: "RTC",
    icon: <AccountBalanceTwoToneIcon />,
  },
  {
    kind: "divider",
   },
  {
    segment: "EDSDeP",
    title: "EDSDeP",
    icon: <ApiTwoToneIcon />,
    disabled: true,
  },
   {
    kind: "divider",
   },
   {
    segment: "SOSA",
    title: "SOSA",
    icon: <ScienceTwoToneIcon />,
    disabled: true,
  },
   {
    kind: "divider",
   },
   {
    segment: "DDS",
    title: "DDS",
    icon: <DeviceHubIcon />,
    disabled: true,
  },
   {
    kind: "divider",
   },
   {
    segment: "LOPR",
    title: "LOPR",
    icon: <DashboardIcon />,
    disabled: true,
  },
   {
    kind: "divider",
   },
    {
    segment: "KW",
    title: "Kafka Watcher",
    icon: <MonitorHeartIcon />,
    disabled: true,
  },
  /*{
    segment: "orders",
    title: "Create",
    icon: <ShoppingCartIcon />,
  }*/
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Environments",
  },
  {
    segment: "NCZ",
    title: "NCZ",
    icon: <BarChartIcon />,
    children: [
      {
        segment: "k8s-dev-01-clrg",
        title: "k8s-dev-01-clrg",
        icon: <DescriptionIcon />,
      },
      {
        segment: "k8s-dev-01-shared",
        title: "k8s-dev-01-shared",
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: "DPZ",
    title: "DPZ",
    icon: <LockIcon />,
    children: [
      {
        segment: "k8s-dev-01-clearing",
        title: "k8s-dev-01-clearing",
        icon: <DescriptionIcon />,
      },
      {
        segment: "k8s-rat-01-shared",
        title: "k8s-rat-01-shared",
        icon: <DescriptionIcon />,
      },
    ],
  },
];


const updatedNavigation = NAVIGATION.map((segment) => ({
  ...segment,
  disabled: segment.segment || false, // Ensure disabled is always defined
  sx: segment.disabled
    ? { opacity: 0.5, pointerEvents: "none", cursor: "not-allowed" }
    : {},
  children: segment.children
    ? segment.children.map((child) => ({
        ...child,
        disabled: child.disabled || false,
        sx: child.disabled
          ? { opacity: 0.5, pointerEvents: "none", cursor: "not-allowed" }
          : {},
      }))
    : undefined,
}));


const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: "class",
  breakpoints: {
    values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 },
  },
});

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);
  return {
    pathname,
    searchParams: new URLSearchParams(),
    navigate: (path) => setPathname(String(path)),
  };
}





export default function DashboardLayoutBasic(navigation, ...props) {
  const { window } = props;
  const router = useDemoRouter("/RTC");
  const demoWindow = window ? window() : undefined;
  const [loading, setLoading] = React.useState(true);


  return (
    <AppProvider
      branding={{
    title: 'uDeploy'}}
      navigation={updatedNavigation}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
            {router.pathname === "/RTC" && (
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", p: 1}} >
                    <paper sx={{ p: 3 }}>
                        <IconPositionTabs />
                    </paper>
                </Box>
            )}
      </DashboardLayout>
    </AppProvider>
  );
}

