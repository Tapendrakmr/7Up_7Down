import axios from "axios";
import config from "../config/config";
const instance = axios.create({
  baseURL: config.backend.baseURL, // Replace this with your actual base URL
  timeout: 10000, // Adjust the timeout as needed
  // headers: {
  //   "Content-Type": "application/json",
  //   // Add any common headers here
  // },
});

export const getProfile = async (token) => {
  try {
    const profileDetails = await instance.get("user/profile", {
      headers: {
        Authorization: token,
      },
    });
    if (
      profileDetails.status === 200 &&
      profileDetails.data.status == "success"
    ) {
      return profileDetails?.data?.data?.userDetails;
    }
  } catch (err) {
    console.error("Error fetching profile:", err);
  }
};
export const getDiceValue = async (token) => {
  try {
    const diceValues = await instance.post(
      "game/diceValue",
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
    if (diceValues.status === 200 && diceValues.data.status == "success") {
      return diceValues?.data?.data;
    }
  } catch (err) {
    console.error("Error fetching dice values:", err);
  }
};
export const checkResult = async (token, gameId, predictNo, betAmnt) => {
  try {
    const reqbody = {
      userDicePredictValue: predictNo,
      betAmount: betAmnt,
    };
    const result = await axios.post(
      `${config.backend.baseURL}/game/gameResult/${gameId}`,
      reqbody,
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    if (result.status === 200 && result.data.status == "success") {
      return result.data.message;
    }
    return;
  } catch (err) {
    console.error("Error checking game result:", err.message);
  }
};

export default instance;
