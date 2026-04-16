import React, { useState, useEffect } from "react";
import {
  Typography,
  CircularProgress,
  Alert,
  Divider,
  Button,
} from "@mui/material";
import { useParams, Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

export default function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await fetchModel(`/user/${userId}`);
        setUser(result.data);
      } catch (err) {
        setError("Can not loading user data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  if (loading) return <CircularProgress style={{ margin: "20px" }} />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!user) return <Typography>Không tìm thấy dữ liệu.</Typography>;

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        {user.first_name} {user.last_name}
      </Typography>
      <Divider style={{ marginBottom: "20px" }} />

      <Typography variant="body1" paragraph>
        <strong>Location:</strong> {user.location}
      </Typography>
      <Typography variant="body1" paragraph>
        <strong>Occupation:</strong> {user.occupation}
      </Typography>
      <Typography variant="body1" paragraph>
        <strong>Description:</strong> {user.description}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        component={Link}
        to={`/photos/${user._id}`}
        style={{ marginTop: "20px" }}
      >
        View Photos
      </Button>
    </div>
  );
}
