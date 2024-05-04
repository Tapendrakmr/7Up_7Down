import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/Authentications/Signin/Signin";
import Signup from "./pages/Authentications/Signup/Signup";
import Game from "./pages/Game/Game";
import DefaultPage from "./pages/Default/Default";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/game" element={<Game />} />
          <Route path="*" element={<DefaultPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
