import dotenv from "dotenv";
dotenv.config();
const _config = {
  JWT: {
    SECRET_KEY: "Warrior_win_the_games",
  },
  serverConfig: {
    PORT: 3000,
  },
};
const config = Object.freeze(_config);
export { config };
