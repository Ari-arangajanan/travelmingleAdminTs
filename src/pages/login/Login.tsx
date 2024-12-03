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
import UseNetworkCalls from "../../hooks/utility/UseNetworkCalls";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    userName: "",
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
    const { userName, password, rememberMe } = formData;

    // Frontend validation for empty fields
    if (!userName || !password) {
      setError("Please fill in both username and password.");
      return;
    }

    setError(""); // Clear errors
    setLoading(true); // Set loading state

    try {
      // Call the login API using getUserLogin method
      const response = await getUserloginReq({
        userName,
        password,
        rememberMe,
      });
      console.log("Login successful:", response);

      // Navigate to the home page after successful login
      navigate("/home");
    } catch (error: unknown) {
      // Handle login failure
      console.error("Login failed:", error);
      setError("Login failed. Please check your username and password.");
      alert(error);
    } finally {
      setLoading(false); // Reset loading state
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
            id="userName"
            label="User Name"
            name="userName"
            autoComplete="userName"
            autoFocus
            value={formData.userName}
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
