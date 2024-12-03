import React from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Footer() {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#000000', top: 'auto', bottom: 0 }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="caption">
              ©2024 hyota maki
          </Typography>
        </Box>
      </Container>
    </AppBar>
  )
}