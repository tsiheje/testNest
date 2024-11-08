import { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Container,
  InputAdornment,
  IconButton,
  Link as MuiLink
} from "@mui/material";
import { Link } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import EmailIcon from "@mui/icons-material/Email";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  });

  const validatePassword = (value) => {
    let error = "";
    if (value.length < 8) {
      error = "Au moins 8 caractères";
    } else if (!/[A-Z]/.test(value)) {
      error = "Au moins une majuscule";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      error = "Au moins un caractère spécial";
    }
    return error;
  };

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? "" : "L'adresse email n'est pas valide";
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));

    let newErrors = { ...errors };
    switch (field) {
      case "username":
        newErrors.username = validateEmail(value);
        break;
      case "password":
        newErrors.password = validatePassword(value);
        newErrors.confirmPassword = value !== formData.confirmPassword 
          ? "Les mots de passe ne correspondent pas" 
          : "";
        break;
      case "confirmPassword":
        newErrors.confirmPassword = value !== formData.password 
          ? "Les mots de passe ne correspondent pas" 
          : "";
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = {
      username: validateEmail(formData.username),
      password: validatePassword(formData.password),
      confirmPassword: formData.password !== formData.confirmPassword 
        ? "Les mots de passe ne correspondent pas" 
        : "",
    };

    setErrors(formErrors);

    if (Object.values(formErrors).every(error => error === "")) {
      try {
        const response = await axios.post("http://localhost:3001/auth/register", {
          username: formData.username,
          password: formData.password,
        });
        console.log("Inscription réussie", response.data);
      } catch (error) {
        console.error("Erreur lors de l'inscription", error.response);
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
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
                Créer un compte
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Rejoignez-nous dès maintenant
              </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  value={formData.username}
                  onChange={handleChange("username")}
                  error={!!errors.username}
                  helperText={errors.username}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  label="Mot de passe"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  value={formData.password}
                  onChange={handleChange("password")}
                  error={!!errors.password}
                  helperText={errors.password}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  label="Confirmer le mot de passe"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  value={formData.confirmPassword}
                  onChange={handleChange("confirmPassword")}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  startIcon={<PersonAddOutlinedIcon />}
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
                  S'inscrire
                </Button>

                <Box textAlign="center">
                  <Typography variant="body2" color="text.secondary">
                    Déjà inscrit ?{" "}
                    <Link to="/" style={{ textDecoration: "none" }}>
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
                        Se connecter
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

export default Register;