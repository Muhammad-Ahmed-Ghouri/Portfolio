import React from "react";
import { Box, Typography, Button } from "@mui/material";

export default function About() {
  const steps = [
    {
      title: "Experience",
      field: "Front-End Developer",
      chip: "Worked on real-world websites for multiple clients",
    },
    {
      title: "Education",
      field: "BS - Computer Science",
      chip: "2025 - 2028 (Ongoing)",
    },
    {
      title: "Development",
      field: "Software & Website Development",
      chip: "Turning problems into digital solutions",
    },
  ];

  return (
    <Box
      container
      display={"flex"}
      justifyContent={"space-around"}
      width={"90%"}
      margin={"150px auto"}
      sx={{
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      {/* Left Side */}
      <Box item xs={12} md={5} width={"50%"}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            mb: 3,
            color: "white",
            fontWeight: "lighter",
            fontSize: {
              xs: "1rem",
              sm: "1rem",
              md: "1.5rem",
              lg: "2rem",
              xl: "3rem",
            },
          }}
        >
          About me
        </Typography>
        <Box
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: 3,
            padding: "15px 20px",
            color: "#fff",
            mx: "auto",
            boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontSize: {
                xs: "0.5rem",
                md: "0.7rem",
                lg: "1rem",
                xl: "1.2",
              },
              lineHeight: 1.8,
              marginBottom: "20px",
            }}
          >
            I am a MERN Stack Developer focused on building modern, high-quality
            web applications that deliver real business value.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: {
                xs: "0.5rem",
                md: "0.7rem",
                lg: "1rem",
                xl: "1.2",
              },
              lineHeight: 1.8,
              marginBottom: "20px",
            }}
          >
            I turn ideas and complex problems into clean, scalable digital
            solutions, with a strong focus on usability, reliability, and
            performance.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: {
                xs: "0.5rem",
                md: "0.7rem",
                lg: "1rem",
                xl: "1.2",
              },
              lineHeight: 1.8,
              marginBottom: "20px",
            }}
          >
            Responsive websites and custom software delivered for startups,
            businesses, and individuals, with a focus on clear communication and
            meaningful results.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: {
                xs: "0.5rem",
                md: "0.7rem",
                lg: "1rem",
                xl: "1.2",
              },
              lineHeight: 1.8,
            }}
          >
            I help clients bring their ideas to life through well-crafted,
            impactful digital solutions.
          </Typography>
        </Box>
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            borderRadius: "50px",
            background: "linear-gradient(90deg, #00F0FF, #00458E)",
            p: "2px",
            margin: "20px 0",
            width: "max-content",
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
            Let’s Build Something
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "45%",
        }}
      >
        {steps.map((step, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              margin: "10px 0",
              width: "100%",
              zIndex: 1,
            }}
          >
            <Box display={"flex"} height={"100%"}>
              <Box
                sx={{
                  width: "3px",
                  height: "100%",
                  background:
                    "linear-gradient(to bottom, #2C6CBC, #71C3F7, #F6F6F6)",
                  zIndex: 0,
                  margin: "0 25px 0 5px",
                }}
              />
              <Box
                sx={{
                  width: "13px",
                  height: "13px",
                  position: "absolute",
                  backgroundColor: "#BBC7DC",
                  boxShadow: "0 0 20px #BBC7DC",
                  borderRadius: "30px",
                }}
              />
            </Box>
            {/* Step Content */}
            <Box
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: 3,
                padding: "20px",
                color: "#fff",
                boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
                width: { xs: "100%", md: "85%", xl: "90%" },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  mb: 1,
                  color: "rgb(191, 219, 254)",
                  fontWeight: 500,
                  fontSize: {
                    xs: "0.8rem",
                    md: "1rem",
                    lg: "1.4rem",
                    xl: "1.5",
                  },
                }}
              >
                {step.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: {
                    xs: "0.5rem",
                    md: "0.7rem",
                    lg: "1rem",
                    xl: "1.2",
                  },
                }}
              >
                {step.field}
              </Typography>
              <Typography
                variant="body2"
                color="rgb(191, 219, 254)"
                sx={{
                  border: "1px solid rgb(191, 219, 254)",
                  width: "max-content",
                  padding: "3px 20px",
                  margin: "10px 0",
                  borderRadius: "30px",
                  fontSize: {
                    xs: "0.3rem",
                    md: "0.5rem",
                    lg: "0.8rem",
                    xl: "1",
                  },
                }}
              >
                {step.chip}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
