import path, { dirname } from "path";
import fs from "fs";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const userDBFilePath = path.join(__dirname, "user.json");
const gameDBFilePath = path.join(__dirname, "game.json");

function readUser() {
  const data = fs.readFileSync(userDBFilePath);
  return JSON.parse(data);
}

function addUser(data) {
  fs.writeFileSync(userDBFilePath, JSON.stringify(data, null, 2));
}

function readGame() {
  const data = fs.readFileSync(gameDBFilePath);
  return JSON.parse(data);
}

function addGameDetails(data) {
  fs.writeFileSync(gameDBFilePath, JSON.stringify(data, null, 2));
}

export { readUser, addUser, readGame, addGameDetails };
