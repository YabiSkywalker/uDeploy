import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Box,
} from "@mui/material";

const TicketDetails = ({ ticket }) => {
  if (!ticket) return <Typography>No ticket data available.</Typography>;

  return (
    <Card sx={{ maxWidth: 800, margin: "20px auto", padding: 3, boxShadow: 3, borderRadius: 2 }}>

    </Card>
  );
};

export default TicketDetails;
