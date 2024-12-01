import React, { useState } from "react";
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import UseNetworkCalls from "../../hooks/networkCall/UseNetworkCalls";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Install js-cookie: npm install js-cookie

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });

  const [error, setError] = useState("");
  const { getUserloginReq } = UseNetworkCalls();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form Data:", formData);
    setLoading(true);
    setError("");
    try {
      // Call the login API
      const response = await getUserloginReq({
        userName: formData.username,
        password: formData.password,
        rememberMe: formData.rememberMe,
      });
      console.log(response);

      // Save token and username in cookies
      Cookies.set("userName", response.userName, {
        expires: formData.rememberMe ? 7 : undefined, // Set cookie expiration for "Remember Me"
      });
      Cookies.set("refreshToken", response.refreshToken, {
        expires: formData.rememberMe ? 7 : undefined,
      });

      // Navigate to a different page after login
      navigate("/home");
    } catch (error) {
      setError("Invalid username or password.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
    // Implement your login logic here, such as an API call
  };
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 3,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          borderRadius: 2,
          backgroundColor: "white",
          width: "100%",
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          sx={{ mb: 2 }}
          fontFamily={"Poppins"}
        >
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1, width: "100%" }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="rememberMe"
                color="primary"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
            }
            label="Remember Me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
