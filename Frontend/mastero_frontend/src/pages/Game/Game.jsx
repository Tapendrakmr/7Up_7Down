/* eslint-disable react/prop-types */

import { Container, Box, Typography, Paper, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Dice from "../../Component/Dice/Dice";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CasinoIcon from "@mui/icons-material/Casino";
import LogoutIcon from "@mui/icons-material/Logout";
import Snackbar from "@mui/material/Snackbar";
import userImage from "./../../assets/userimage.jpg";
import IconButton from "@mui/material/IconButton";
import { getTransform } from "./rollDiceCall";
import { getProfile, getDiceValue, checkResult } from "../../Network/axios.js";
import DiceSound from "./../../assets/dice.mp3";

const styles = {
  container: {
    padding: "0",
    height: "52%",
  },
  item: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
    height: "100px",
    textAlign: "center",
    padding: "0 8px", // Add padding to compensate for negative margin
  },
  score: {
    position: "absolute",
    backgroundColor: "#ffffff",
    padding: "8px 30px",
    borderRadius: "10px",
    borderBottomLeftRadius: "0px",
    color: "#262626",
    fontFamily: "arial",
    display: "flex",
    fontSize: "18px",
  },
  bottom: {
    height: "100px",
    backgroundColor: "#05472A",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottomButtons: {
    height: "62px",
    backgroundColor: "#D22B2B",
    fontSize: "30px",
    padding: "15px",
    width: "62px",
    margin: "auto",
    borderRadius: "50%",
    color: "white",
    boxShadow: 10,
  },
  subContainer: {
    margin: 0,
    padding: 0,
    height: "50%",
    display: "flex",
  },
  containerButton: {
    flexBasis: "100%",
    height: "100%",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    backgroundColor: "#2e952c",
    cursor: "pointer",
    padding: "55px",
    color: "white",
    textAlign: "center",
    fontFamily: "consolas",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  },
};
const Item = ({ children, color, textColor = "white" }) => (
  <Paper style={{ ...styles.item, backgroundColor: color, color: textColor }}>
    {children}
  </Paper>
);

const Game = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetail] = useState({});
  const [dice1Transform, setDice1Transform] = useState("");
  const [dice2Transform, setDice2Transform] = useState("");
  const [predictNumber, setPredictionNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [bet, setBet] = useState(0);
  const [resultMessage, setResultMessage] = useState("");
  const token = localStorage.getItem("token");

  const rollDice = async () => {
    console.log("predictNumber", predictNumber);
    console.log("bet", bet);
    try {
      if (predictNumber != 0 && bet != 0) {
        let diceRe = await getDiceValue(token);
        console.log("🚀 ~ rollDice ~ diceRe:", diceRe);
        if (diceRe) {
          let transform1 = getTransform(diceRe.dice1);
          let transform2 = getTransform(diceRe.dice2);
          new Audio(DiceSound).play();
          setDice1Transform(transform1);
          setDice2Transform(transform2);
          let res = await checkResult(token, diceRe.gameId, predictNumber, bet);
          setResultMessage(res);
          if (res != undefined) {
            handleClick();
          }
          setTimeout(async () => {
            await setProfile();
          }, 500);
        }
        setPredictionNumber(0);
        setBet(0);
      }
    } catch (err) {
      console.error("Error rolling dice:", err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setTimeout(function () {
      navigate("/signin");
    }, 500);
  };
  const setProfile = async () => {
    const res = await getProfile(token);
    setUserDetail(res);
  };
  useEffect(() => {
    if (!token) {
      navigate("/signin");
    } else {
      setProfile();
    }
  }, []);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
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
      <Box
        height="91vh"
        width="60vh"
        bgcolor="#05933b"
        margin="auto"
        borderRadius="10px"
        sx={{
          boxShadow: 5,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box height="48%" width="100%" bgcolor="#03511f" borderRadius="10px">
          <Typography style={styles.score} variant="h6">
            <AttachMoneyIcon /> {userDetails?.gameBalance}
          </Typography>

          <Container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              gap: "50px",
            }}
          >
            <Dice transform={dice1Transform} />
            <Dice transform={dice2Transform} />
          </Container>
        </Box>

        <Container maxWidth="100%" style={styles.container}>
          <Container maxWidth="100%" style={styles.subContainer}>
            <Box
              style={
                predictNumber === 5
                  ? { ...styles.containerButton, backgroundColor: "darkblue" }
                  : styles.containerButton
              }
              id="predictionButton"
              onClick={() => setPredictionNumber(5)}
            >
              2-6
            </Box>
            <Box
              style={
                predictNumber === 7
                  ? { ...styles.containerButton, backgroundColor: "darkblue" }
                  : styles.containerButton
              }
              id="predictionButton"
              onClick={() => setPredictionNumber(7)}
            >
              7
            </Box>
            <Box
              style={
                predictNumber === 11
                  ? { ...styles.containerButton, backgroundColor: "darkblue" }
                  : styles.containerButton
              }
              id="predictionButton"
              onClick={() => setPredictionNumber(11)}
            >
              8-12
            </Box>
          </Container>

          <Container maxWidth="100%" style={styles.subContainer}>
            <Box
              style={
                bet === 100
                  ? { ...styles.containerButton, backgroundColor: "darkgreen" }
                  : { ...styles.containerButton, backgroundColor: "#01865b" }
              }
              id="betButton"
              onClick={() => setBet(100)}
            >
              Bet 100
            </Box>
            <Box
              style={
                bet === 200
                  ? { ...styles.containerButton, backgroundColor: "darkgreen" }
                  : { ...styles.containerButton, backgroundColor: "#01865b" }
              }
              id="betButton"
              onClick={() => setBet(200)}
            >
              Bet 200
            </Box>
            <Box
              style={
                bet === 500
                  ? { ...styles.containerButton, backgroundColor: "darkgreen" }
                  : { ...styles.containerButton, backgroundColor: "#01865b" }
              }
              id="betButton"
              onClick={() => setBet(500)}
            >
              Bet 500
            </Box>
          </Container>
        </Container>

        <Container maxWidth="100%" sx={styles.bottom}>
          <IconButton>
            <img
              src={userImage}
              height={60}
              width={60}
              style={{
                borderRadius: "50%",
              }}
            />
          </IconButton>
          <IconButton onClick={rollDice}>
            <CasinoIcon
              style={styles.bottomButtons}
              // onClick={rollDice}
              color="white"
              sx={{ cursor: "pointer" }}
            />
          </IconButton>
          <IconButton onClick={logout}>
            <LogoutIcon
              style={styles.bottomButtons}
              sx={{ color: "red", cursor: "pointer" }}
              // onClick={logout}
            />
          </IconButton>
        </Container>
      </Box>
      {resultMessage && resultMessage.length > 0 && (
        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
          message={resultMessage}
        />
      )}
    </Container>
  );
};

export default Game;
