import { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Container,
  InputAdornment,
  Link as MuiLink
} from "@mui/material";
import { Link } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { makeStyles } from "@mui/styles";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [errors, setErrors] = useState({
    username: "",
    password: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = { username: "", password: "" };
    let isValid = true;

    if (!formData.username.trim()) {
      newErrors.username = "Le nom d'utilisateur est requis";
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "Le mot de passe est requis";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      console.log("Envoi des données", formData);
    }
  };

  return (
    <Box
      sx={{
        height: "96vh",
        width: "98%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="sm">
        <Card
          sx={{
            backdropFilter: "blur(8px)",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: 4,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6)",
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "translateY(-4px)"
            }
          }}
        >
          <CardContent sx={{ padding: 4 }}>
            <Box textAlign="center" mb={4}>
              <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
                Bienvenue
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Connectez-vous à votre compte
              </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <TextField
                  fullWidth
                  label="Nom d'utilisateur"
                  variant="outlined"
                  error={!!errors.username}
                  helperText={errors.username}
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlineIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  type="password"
                  label="Mot de passe"
                  variant="outlined"
                  error={!!errors.password}
                  helperText={errors.password}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    background: "linear-gradient(to right, #6366f1, #ec4899)",
                    padding: "12px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: "linear-gradient(to right, #4f46e5, #db2777)",
                      transform: "scale(1.02)"
                    }
                  }}
                >
                  Se connecter
                </Button>

                <Box textAlign="center" mt={2}>
                  <Typography variant="body2" color="text.secondary">
                    Pas encore de compte ?{" "}
                    <Link to="/register" style={{ textDecoration: "none" }}>
                      <MuiLink
                        component="span"
                        sx={{
                          color: "#6366f1",
                          fontWeight: 500,
                          cursor: "pointer",
                          "&:hover": {
                            color: "#4f46e5"
                          }
                        }}
                      >
                        Inscrivez-vous
                      </MuiLink>
                    </Link>
                  </Typography>
                </Box>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Login;