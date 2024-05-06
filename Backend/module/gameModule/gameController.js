import { v4 as uuidv4 } from "uuid";
import { readGame, addGameDetails, addUser, readUser } from "../../db/db.js";

const getDiceValue = async (req, res, next) => {
  try {
    const userId = req.body.loggedInUserId;
    const userDB = readUser();
    const userDetailsIndex = userDB.findIndex((user) => user.id === userId);
    const userDetails = userDB[userDetailsIndex];
    if (userDetails && userDetails.gameBalance < 500) {
      throw Error("Your balance is less than 100, which is insufficient.");
    }
    const random1 = Math.floor(Math.random() * 6) + 1;
    const random2 = Math.floor(Math.random() * 6) + 1;

    const newGame = {
      gameId: uuidv4(),
      userId: userId,
      diceActualValue: random1 + random2,
      status: "DICE_ROLL_UP",
    };
    const data = readGame();
    data.push(newGame);
    addGameDetails(data);

    res.json({
      status: "success",
      message: "The dice value has been successfully fetched.",
      data: {
        gameId: newGame.gameId,
        dice1: random1,
        dice2: random2,
      },
    });
  } catch (err) {
    return res.json({
      status: "failed",
      message: err.message,
      error: err,
    });
  }
};

const getGameResult = async (req, res, next) => {
  try {
    const gameId = req.params.gameId;
    if (gameId == null || gameId == undefined) {
      throw Error("gameId is required");
    }
    const { userDicePredictValue, betAmount } = req.body;
    // Fetch game data from tabler
    const gameDb = readGame();
    const gameDetailIndex = gameDb.findIndex((game) => game.gameId === gameId);
    const gameDetails = gameDb[gameDetailIndex];
    if (!gameDetails) {
      throw Error("The game details were not found in the database");
    }
    // Fetch user details from user table
    const userDB = readUser();
    const userDetailsIndex = userDB.findIndex(
      (user) => user.id === gameDetails.userId
    );
    const userDetails = userDB[userDetailsIndex];
    if (!userDetails) {
      throw Error("The user details were not found in the database.");
    }
    let responseMessage = "Congratulations, you've won!";
    if (
      (gameDetails.diceActualValue > 7 && Number(userDicePredictValue) > 7) ||
      (gameDetails.diceActualValue < 7 && Number(userDicePredictValue) < 7)
    ) {
      userDetails["gameBalance"] += 2 * betAmount;
    } else if (
      gameDetails.diceActualValue == 7 &&
      Number(userDicePredictValue) == 7
    ) {
      userDetails["gameBalance"] += 5 * betAmount;
    } else {
      userDetails["gameBalance"] -= betAmount;
      responseMessage = "Sorry, you lost. Better luck next time!";
    }

    // update user details
    userDB[userDetailsIndex] = userDetails;
    addUser(userDB);

    // Update game details
    gameDetails["status"] = "GAME_COMPLETED";
    gameDetails["userDicePredictValue"] = userDicePredictValue;
    gameDetails["betAmount"] = betAmount;
    gameDb[gameDetailIndex] = gameDetails;
    addGameDetails(gameDb);

    res.json({
      status: "success",
      message: responseMessage,
      data: {
        gameDetails: gameDetails.diceActualValue,
        userDicePredictValue: userDicePredictValue,
      },
    });
  } catch (err) {
    return res.json({
      status: "failed",
      message: err.message,
      error: err,
    });
  }
};

export { getDiceValue, getGameResult };
