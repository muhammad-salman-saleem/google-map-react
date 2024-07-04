import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";


function Navbar() {

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar sx={{display:"flex",justifyContent:"space-between"}}>
        <Typography variant="h4" >
          Navbar
        </Typography>
          <Box sx={{display:"flex",gap:"10px"}}>
            <Link to="/" >
              Home
            </Link>
            <Link to="/Blog" >
              Blog
            </Link>
            <Link to="/google-map" >
              Google Map
            </Link>
          </Box>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;