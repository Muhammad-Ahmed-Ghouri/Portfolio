import React from "react";
import { Box, Grid, Typography, Divider } from "@mui/material";

export default function About() {
  return (
    <Box sx={{ px: { xs: 3, md: 10 }, py: 10, position: "relative" }}>
      <Box container spacing={5} display={"flex"}>
        {/* Left Side */}
        <Grid item xs={12} md={5}>
          <Typography variant="h3" sx={{ fontWeight: "bold", mb: 3 }}>
            About
          </Typography>
          <Box
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: 3,
              p: 4,
              color: "#fff",
              maxWidth: 600,
              mx: "auto",
              boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: "1.1rem",
                lineHeight: 1.8,
              }}
            >
              I am a passionate web developer focused on creating modern,
              responsive, and interactive web applications. Skilled in
              JavaScript, React.js, and API integration, I aim to craft
              polished, user-friendly digital experiences.
            </Typography>
          </Box>
        </Grid>

        {/* Right Side */}
        <Grid item xs={12} md={5} sx={{ position: "relative" }}>
          {/* Experience Box */}
          <Box sx={{ display: "flex", mb: 5, alignItems: "flex-start" }}>
            <Box
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: 3,
                p: 4,
                color: "#fff",
                maxWidth: 600,
                mx: "auto",
                boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                Experience
              </Typography>
              <Typography variant="body2">
                Worked on real-world websites for multiple clients, creating
                polished and responsive web applications using modern web
                technologies.
              </Typography>
            </Box>
          </Box>

          {/* Education Box */}
          <Box sx={{ display: "flex", alignItems: "flex-start" }}>
            <Box
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: 3,
                p: 4,
                color: "#fff",
                maxWidth: 600,
                mx: "auto",
                boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                Education
              </Typography>
              <Typography variant="body2">
                University of Karachi <br />
                2023 - 2027
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}
