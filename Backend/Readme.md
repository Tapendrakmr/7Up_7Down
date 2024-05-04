### Steps to run project

- cd Backend
- run npm install
- run command to start server `npm run start`

## API avaialable

### Add New User

- **URL**: `http://localhost:3000/api/v1/user/signup`
- **Method**: POST
- **Description**: Add a new user to the system.
- **Request Body**:
  - `email` (string, required): The email address of the user.
  - `password` (string, required): The password for the user's account.

### Login User

- **URL**: `http://localhost:3000/api/v1/user/signin`
- **Method**: POST
- **Description**: Login user.
- **Request Body**:
  - `email` (string, required): The email address of the user.
  - `password` (string, required): The password for the user's account.

### User Profile

- **URL**: `http://localhost:3000/api/v1/user/profile`
- **Method**: GET
- **Description**: Get loggedIn user profile.

### Get Dice Values

- **URL**: `http://localhost:3000/api/v1/game/diceValue`
- **Method**: POST
- **Description**: Get both random values.
- **Response**: dice1,dice2, gameId.

### User predict dice and bet value

- **URL**: `http://localhost:3000/api/v1/game/gameResult/:gameId?`
- **Method**: POST
- **Description**: API to fetch result of game.
- **Request Body**:
  - `userDicePredictValue` (number, required): User predicted sum of dice values.
  - `betAmount` (number, required): User bet amount.
