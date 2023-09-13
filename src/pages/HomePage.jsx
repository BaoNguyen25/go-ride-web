import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import { Box } from "@mui/material";
import axios from "axios";
import Stomp from 'stompjs';
import SockJS from 'sockjs-client/dist/sockjs';

import io from 'socket.io-client';


// Define your Google Maps API key
const apiKey = "AIzaSyCCqm6B_WNT1UxOjt0InsHocTxT9QjgeAc"; // Replace with your API key

export default function HomePage() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  var stompClient = Stomp.client('ws://ktpm-goride.onrender.com/ws');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // Geocode source location
    geocodeLocation(data.get("address"))
      .then((sourceLatLng) => {
        // Geocode destination location
        return geocodeLocation(data.get("destination")).then(
          (destLatLng) => {
            const loginPayload = {
              username: data.get("name"),
              phone: data.get("phone"),
              sourceLocation: sourceLatLng,
              destinationLocation: destLatLng,
            };

            // Retrieve the token from localStorage
            const token = localStorage.getItem("token");

            // Add the token to the Authorization header
            const headers = {
              Authorization: `Bearer ${token}`,
            };
            console.log(headers)
            console.log(loginPayload)
            axios
              .post(
                "https://ktpm-goride.onrender.com/api/user/booking",
                loginPayload,
                { headers } // Include the headers in the request
              )
              .then((response) => {
                // Handle the response
                console.log(response.data);
                
                // const socket = new SockJS('ws://ktpm-goride.onrender.com/ws'); // Replace with your WebSocket URL
                // stompClient.connect("")
                const newBooking = {
                  senderID: "64cb92d60c5d5a626256670c",
                  receiverID: response.data.drivers[0].id,
                  latitude: sourceLatLng.latitude,
                  longitude: sourceLatLng.longitude,
                  desLat: destLatLng.latitude,
                  desLng: destLatLng.longitude,
                  message: 'New booking created',
                  bookingId: response.data.bookingId
                }
                console.log(newBooking)
                stompClient.send("/app/sendLocation", {},JSON.stringify(newBooking));

                // Emit a notification to the WebSocket server
                // socket.emit('/app/sendLocation', {
                  // message: 'New booking created',
                  // latitude: sourceLatLng.latitude,
                  // longitude: sourceLatLng.longitude,
                  // desLat: destLatLng.latitude,
                  // desLng: destLatLng.longitude,
                  // receiverID: response.data[0],
                // });
                })
              .catch((err) => console.log(err));
          }
        );
      })
      .catch((err) => console.error(err));
  };

  const geocodeLocation = (location) => {
    return new Promise((resolve, reject) => {
      // Construct the URL for the Geocoding API request
      const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        location
      )}&key=${apiKey}`;
      console.log(location)
      // Make a GET request to the Geocoding API
      axios
        .get(geocodeURL)
        .then((response) => {
          if (response.data.status === "OK" && response.data.results.length > 0) {
            // Extract the latitude and longitude from the first result
            const result = response.data.results[0];
            const latLng = result.geometry.location;
            const newLatLng = {
              "latitude": latLng.lat,
              "longitude": latLng.lng,
            }
            
            resolve(newLatLng);
          } else {
            // If the response status is not "OK," reject with the status
            reject(response.data.status);
          }
        })
        .catch((error) => {
          // Reject with the error message
          console.log(error.message)
          reject(error.message);
        });
    });
  };
  
  

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Go Ride Call Center
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 1 }}
      >
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Typography component="h1" variant="h4" align="center">
              Customer Information
            </Typography>
            <React.Fragment>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="name"
                    name="name"
                    label="Name"
                    fullWidth
                    autoComplete="name"
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="phone"
                    name="phone"
                    label="Phone Number"
                    fullWidth
                    autoComplete="phone"
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="address"
                    name="address"
                    label="Address"
                    fullWidth
                    autoComplete="address"
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="destination"
                    name="destination"
                    label="Destination"
                    fullWidth
                    autoComplete="destination"
                    variant="standard"
                  />
                </Grid>
                {/* Include the form fields for source and destination locations here */}
              </Grid>
            </React.Fragment>
            <Typography align="center">
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </Typography>
          </Paper>
          <Copyright />
        </Container>
      </Box>
    </React.Fragment>
  );
}

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
