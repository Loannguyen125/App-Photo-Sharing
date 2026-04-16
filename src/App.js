import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";

export default function App() {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TopBar />
        </Grid>
        <div className="main-topbar-buffer" />

        <Grid item sm={3}>
          <Paper className="main-grid-item" elevation={3}>
            <UserList />
          </Paper>
        </Grid>

        <Grid item sm={9}>
          <Paper className="main-grid-item" elevation={3}>
            <Routes>
              <Route
                path="/"
                element={
                  <Typography variant="h5" style={{ padding: "20px" }}>
                    Please select a user from the list on the left.
                  </Typography>
                }
              />

              <Route path="/users/:userId" element={<UserDetail />} />

              <Route path="/photos/:userId" element={<UserPhotos />} />
            </Routes>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
