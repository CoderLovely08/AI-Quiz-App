import React from "react";
import { Typography, Container, Grid, Paper, Button } from "@mui/material";
import BannerImage from "/images/banner.png";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {

  const navigate = useNavigate(); 

  const handleGetStartedClick = () => {
    navigate("/interview"); 
  };

  return (
    <Container className="containmain" sx={{ my: 3, marginTop:"50px",  marginBottom:"-500px"}}>
      <Paper elevation={3} sx={{ p: 3, display: "flex", justifyContent: 'center', alignItems: "center" }}>
        <Grid container spacing={3} justifyContent="center" alignItems='center'>
          {/* Left side: Text content */}
          <Grid item xs={12} md={6} alignItems='center'>
            <div style={{ textAlign: "left", alignItems: "center" }}>
              <Typography variant="h4">
                Preparation is a door to possibilities
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                Unlock your potential with Aivatar. Master interviews, ace
                aptitude tests, and own your future! Prepare for success with
                our comprehensive platform.
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                sx={{ mt: 3 }}
                onClick={handleGetStartedClick} // Add onClick event handler
              >
                Get Started
              </Button>
            </div>
          </Grid>

          {/* Right side: Image */}
          <Grid item xs={12} md={6}>
            <img
              src={BannerImage}
              alt="model"
              style={{ width: "80%", height: "auto", borderRadius: 8 }}
            />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default HeroSection;
