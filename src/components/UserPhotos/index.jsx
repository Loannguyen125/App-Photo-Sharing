import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useParams, Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

export default function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetchModel(`/photosOfUser/${userId}`);
        setPhotos(result.data);
      } catch (err) {
        setError("Can not load photo list");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  if (loading) return <CircularProgress style={{ margin: "20px" }} />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (photos.length === 0)
    return (
      <Typography style={{ padding: "20px" }}>
        Người dùng này chưa có ảnh nào.
      </Typography>
    );

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h5" gutterBottom>
        Photos
      </Typography>
      {photos.map((photo) => (
        <Card key={photo._id} style={{ marginBottom: "30px" }}>
          <CardMedia
            component="img"
            image={require(`../../images/${photo.file_name}`)}
            alt="User uploaded photo"
          />
          <CardContent>
            <Typography variant="caption" color="textSecondary">
              Đăng lúc: {new Date(photo.date_time).toLocaleString()}
            </Typography>
            <Divider style={{ margin: "15px 0" }} />

            <Typography variant="subtitle1" gutterBottom>
              Bình luận:
            </Typography>
            {photo.comments ? (
              photo.comments.map((c) => (
                <div
                  key={c._id}
                  style={{
                    marginBottom: "15px",
                    paddingLeft: "10px",
                    borderLeft: "3px solid #1976d2",
                  }}
                >
                  <Typography variant="subtitle2">
                    <Link
                      to={`/users/${c.user._id}`}
                      style={{ textDecoration: "none", color: "#1976d2" }}
                    >
                      {c.user.first_name} {c.user.last_name}
                    </Link>
                    <span
                      style={{
                        marginLeft: "10px",
                        color: "gray",
                        fontSize: "0.8rem",
                        fontWeight: "normal",
                      }}
                    >
                      {new Date(c.date_time).toLocaleString()}
                    </span>
                  </Typography>
                  <Typography variant="body2">{c.comment}</Typography>
                </div>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                Chưa có bình luận nào.
              </Typography>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
