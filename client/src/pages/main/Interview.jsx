import React, { useContext, useState } from "react";
import {
  Card,
  Container,
  CardContent,
  CardMedia,
  Button,
  Select,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import QAContext from "../../context/QAContext";



const Interview = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const navigateTo = useNavigate();
  const { updateRole } = useContext(QAContext);
  

  const handleOptionChange = (e) => {
    const newRole = e.target.value;
    setSelectedOption(newRole);
    updateRole(newRole); // Update the role in the context
    navigateTo('/instructions');

  };

  return (
    <>
      <Container>
        <Card contain sx={{ p: 2, my: 3, marginTop:"80px" }}>
          <Typography variant="h4" sx={{ my: 3, textAlign: "center" }}>
            Interview Preparation
          </Typography>
          <Grid
            container
            justifyContent="center"
            alignItems="stretch" 
            spacing={5}
          >
            <Grid item xs={12} md={6}>
              <Card sx={{ minWidth: 345 }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image="https://i.postimg.cc/XYVCJQxK/inter.jpg"
                  alt="Interview Role 1"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {"Selected Role: " + selectedOption || "Select Role"}
                  </Typography>
                  <FormControl fullWidth>
                    <InputLabel id="role-select-label">
                      Select Role
                    </InputLabel>
                    <Select
                      labelId="role-select-label"
                      id="role-select"
                      value={selectedOption}
                      label="Select Role"
                      onChange={handleOptionChange}
                    >
                      <MenuItem value="Software Engineer">
                        Software Engineer
                      </MenuItem>
                      <MenuItem value="Web Developer">Web Developer</MenuItem>
                      <MenuItem value="Android Developer">
                        Android Developer
                      </MenuItem>
                    </Select>
                  </FormControl>
                  {selectedOption && (
                    <Grid container justifyContent="center" marginTop={2}>
                      <Button
                        variant="contained"
                        onClick={() =>
                          alert("Start button clicked for Role 1")
                        }
                      >
                        Start
                      </Button>
                    </Grid>
                  )}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ minWidth: 345 }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image="https://i.postimg.cc/9FfvPjxr/images.png"
                  alt="Interview Role 2"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Aptitude Preparation
                  </Typography>
                  <Grid container direction="column" justifyContent="center">
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Sharpen your numerical abilities with our Aptitude Test.
                      This test covers various topics to help you excel in
                      interviews.
                    </Typography>
                    <Button
                      variant="contained"
                    >
                      <Link
                        to={"/aptitude"}
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                        }}
                      >
                        Aptitude Test
                      </Link>
                    </Button>
                  </Grid>
                  
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  );
};

export default Interview;
