import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import {
  InfoOutlined,
  EmojiObjectsOutlined,
  CheckCircleOutlined,
} from "@mui/icons-material";

const About = () => {
  return (
    <Container className="about1" id="about">
      <Typography  variant="h4" sx={{ textAlign: "center", marginBottom:"50px" ,marginTop:"50px" }}>
        About us
      </Typography>

      <Grid container spacing={3} justifyContent="center" alignItems="center" padding="30px" marginTop="-80px">
        {[
          {
            title: "Welcome to Aivatar",
            content:
              "Premier platform for AI-driven MOOC interview and aptitude preparation.",
            icon: (
              <InfoOutlined style={{ color: "blue", alignSelf: "center" }} />
            ),
          },
          {
            title: "Our Aim",
            content:
              "Empower individuals with knowledge and skills to excel in interviews and aptitude tests.",
            icon: (
              <EmojiObjectsOutlined
                style={{ color: "green", alignSelf: "center" }}
              />
            ),
          },
          {
            title: "Why Choose Us?",
            content:
              "AI-Powered Learning: Harness the power of AI for personalized learning experiences.",
            icon: (
              <CheckCircleOutlined
                style={{ color: "orange", alignSelf: "center" }}
              />
            ),
          },
        ].map((item, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: 2,
              }}
            >
              <CardMedia component="div">{item.icon}</CardMedia>
              <CardContent>
                <Typography variant="h5">{item.title}</Typography>
                <hr />
                <Typography variant="body1">{item.content}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default About;
