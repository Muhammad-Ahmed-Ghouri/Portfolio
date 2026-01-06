import React from "react";
import profileImage from "../assets/profileImage.jpg";
import { Box, Typography, Grid } from "@mui/material";

export default function BannerContent() {
  return (
    <Box
      sx={{
        px: { xs: 3, md: 10 },
        py: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: {
          xs: "linear-gradient(to top, rgba(4, 52, 103, 1) 0%, rgba(4, 52, 103, 1) 8%, #000000 25%, #000000 100%)",
          sm: "linear-gradient(to right, rgba(4, 52, 103, 1) 0%, rgba(4, 52, 103, 1) 8%, #000000 25%, #000000 100%)",
        },
        height: "max-content",
      }}
    >
      <Grid
        container
        justifyContent={"center"}
        sx={{
          display: { xs: "none", sm: "flex" },
          flexDirection: { xs: "column", sm: "row" },
          margin: "60px 0",
        }}
        alignItems="center"
      >
        {/* Left Side */}
        <Grid item xs={12} md={6} width={"48%"}>
          <Box sx={{ position: "relative" }}>
            {/* Main heading */}
            <Box sx={{ position: "relative", padding: "30px 0" }}>
              <Typography
                variant="body1"
                sx={{
                  position: "absolute",
                  top: "0",
                  right: "0",
                  border: "2px solid grey",
                  width: "35%",
                }}
              ></Typography>

              <Typography
                variant="h2"
                sx={{
                  fontSize: {
                    xs: "1.55rem",
                    sm: "1.55rem",
                    md: "2rem",
                    lg: "2.8rem",
                    xl: "3.8rem",
                  },
                  color: "White",
                  fontFamily: "'Lilita One' !important",
                  fontWeight: "500",
                }}
              >
                Meet Muhammad Ahmed
              </Typography>

              <Typography
                sx={{
                  color: "rgb(191, 219, 254)",
                  fontWeight: 500,
                  fontSize: {
                    xs: "0.8rem",
                    md: "1rem",
                    lg: "1.4rem",
                    xl: "1.5",
                  },
                  marginTop: "10px",
                }}
              >
                Front-End Web Developer
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  border: "2px solid",
                  borderImage: "linear-gradient(90deg, #00F0FF, #00458E) 1",
                  width: "25%",
                }}
              ></Typography>
            </Box>
          </Box>

          {/* Description */}
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "0.8rem", md: "1rem" },
              color: "rgb(222, 226, 230)",
              margin: "20px 20px 20px 0",
              width: "90%",
            }}
          >
            Building modern and responsive web applications using JavaScript,
            React.js, and API integration. Transforming ideas into engaging
            digital experiences.
          </Typography>
        </Grid>

        {/* Right Side - Image */}
        <Grid item xs={12} md={6} width={"48%"} sx={{ textAlign: "center" }}>
          <Box
            component="img"
            src={profileImage}
            alt="Muhammad Ahmed"
            sx={{
              width: "80%",
              borderRadius: "10px",
            }}
          />
        </Grid>
      </Grid>

      {/* For mobile */}
      <Grid
        container
        justifyContent={"center"}
        sx={{
          display: { xs: "flex", sm: "none" },
          flexDirection: { xs: "column", sm: "row" },
        }}
        alignItems="center"
      >
        {/* Top Side - Image */}
        <Grid item xs={12} md={6} width={"100%"} sx={{ textAlign: "center" }}>
          <Box
            component="img"
            src={profileImage}
            alt="Muhammad Ahmed"
            sx={{
              width: "70vw",
              maxHeight: "70vh",
              borderRadius: "10px",
            }}
          />
        </Grid>

        {/* Bottom Side */}
        <Grid item xs={12} md={6} width={"100%"}>
          <Box sx={{ position: "relative" }}>
            {/* Main heading */}
            <Box sx={{ position: "relative", padding: "30px 0" }}>
              <Typography
                variant="body1"
                sx={{
                  position: "absolute",
                  top: "0",
                  right: "0",
                  border: "2px solid grey",
                  width: "35%",
                }}
              ></Typography>

              <Typography
                variant="h2"
                sx={{
                  fontSize: {
                    xs: "1.55rem",
                    sm: "1.55rem",
                    md: "2rem",
                    lg: "2.8rem",
                    xl: "3.8rem",
                  },
                  color: "White",
                  fontFamily: "'Lilita One' !important",
                  fontWeight: "500",
                }}
              >
                Meet Muhammad Ahmed
              </Typography>

              <Typography
                sx={{
                  color: "rgb(191, 219, 254)",
                  fontWeight: 500,
                  fontSize: {
                    xs: "0.8rem",
                    md: "1rem",
                    lg: "1.4rem",
                    xl: "1.5",
                  },
                  marginTop: "10px",
                }}
              >
                Front-End Web Developer
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  border: "2px solid",
                  borderImage: "linear-gradient(90deg, #00F0FF, #00458E) 1",
                  width: "25%",
                }}
              ></Typography>
            </Box>
          </Box>

          {/* Description */}
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "0.8rem", md: "1rem" },
              color: "rgb(222, 226, 230)",
              margin: "20px 20px 20px 0",
              width: "90%",
            }}
          >
            Building modern and responsive web applications using JavaScript,
            React.js, and API integration. Transforming ideas into engaging
            digital experiences.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
