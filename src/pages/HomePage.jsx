import * as React from "react";
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

export default function HomePage() {
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
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
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
                  id="adrress"
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
            </Grid>
          </React.Fragment>
          <Typography align="center">
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Submit
            </Button>
          </Typography>
        </Paper>
        <Copyright />
      </Container>
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
