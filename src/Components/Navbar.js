import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import logo from "../assets/white-logo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navItems = ["Home", "About", "Projects", "Contact"];

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "black",
          opacity: "0.8",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Box
            component="img"
            src={logo}
            alt="Muhammad Ahmed"
            sx={{
              // width: "80%",
              width: { xs: "35px", sm: "50px" },
            }}
          />

          {/* Desktop Menu */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
              gap: 3,
              mr: 2,
            }}
          >
            {navItems.map((item) => (
              <Typography
                key={item}
                sx={{
                  cursor: "pointer",
                  color: "white",
                  fontSize: "15px",
                  "&:hover": { color: "#00F0FF" },
                }}
              >
                {item}
              </Typography>
            ))}
          </Box>

          {/* Desktop Button */}
          <Box
            sx={{
              display: { xs: "none", md: "block" },
              borderRadius: "50px",
              background: "linear-gradient(90deg, #00F0FF, #00458E)",
              p: "2px",
            }}
          >
            <Button
              sx={{
                borderRadius: "50px",
                backgroundColor: "#000",
                color: "#00F0FF",
                px: 3,
                fontWeight: 700,
                textTransform: "none",
                "&:hover": { backgroundColor: "#000" },
              }}
            >
              View Resume
            </Button>
          </Box>

          {/* Mobile Menu Icon */}
          <IconButton
            sx={{ display: { xs: "block", md: "none" }, color: "#00F0FF" }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            width: 250,
            backgroundColor: "#000",
            height: "100%",
          }}
        >
          <List>
            {navItems.map((item) => (
              <ListItem button key={item} onClick={() => setOpen(false)}>
                <ListItemText
                  primary={item}
                  sx={{ color: "white", textAlign: "center" }}
                />
              </ListItem>
            ))}
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Button
                sx={{
                  borderRadius: "50px",
                  background: "linear-gradient(90deg, #00F0FF, #00458E)",
                  color: "#000",
                  px: 4,
                  fontWeight: 700,
                  textTransform: "none",
                }}
              >
                View Resume
              </Button>
            </Box>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
