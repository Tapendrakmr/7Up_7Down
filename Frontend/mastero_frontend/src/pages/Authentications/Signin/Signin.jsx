import { useState, useEffect } from "react";
import axios from "../../../Network/axios";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Link, useNavigate } from "react-router-dom";
import CasinoIcon from "@mui/icons-material/Casino";
import InputAdornment from "@mui/material/InputAdornment";
import styles from "./../style/style";
import EmailIcon from "@mui/icons-material/Email";
import LockOpenIcon from "@mui/icons-material/LockOpen";

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/game");
      return;
    }
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const reqBody = {
      email: email,
      password: password,
    };
    const response = await axios.post("/user/signIn", reqBody);
    if (response.status === 200 && response.data.status == "success") {
      localStorage.setItem("token", response.data.data.token);
      navigate("/game");
    }
    setErrorMessage(response.data.message);
    setEmail("");
    setPassword("");
  };
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box>
        <Container
          maxWidth="xs"
          style={styles.formContainer}
          sx={{ padding: "0 50px" }}
        >
          <Typography variant="h4" gutterBottom style={styles.heading}>
            <CasinoIcon sx={{ fontSize: "60px" }} />
          </Typography>

          <Typography component="h1" variant="h5" style={styles.welcomeHeading}>
            Welcome Back!
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            style={styles.welcomeHeadingSecond}
          >
            Please Enter Login Details Below
          </Typography>

          <form
            autoComplete="off"
            onSubmit={handleSubmit}
            style={{ padding: "10px" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOpenIcon />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              style={styles.submitButton}
            >
              Sign In
            </Button>
          </form>
          <br />
          {errorMessage && <p>{errorMessage}</p>}
          <Grid container style={styles.navigationButton}>
            <Grid item>
              <Typography variant="h5" style={styles.navigationButton}>
                Create new Account?
                <Link to="/signup" style={{ color: "#3e3ee6" }}>
                  {" Sign Up"}
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Container>
  );
};

export default Signin;
