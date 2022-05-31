import React, { useContext } from "react";
import DashBoard from "./games/dashboard/pages/DashBoard";
import NavBar from "./navbar/pages/NavBar";
import BotBar from "./botbar/BotBar";
import AllGame from "./games/gamelist/pages/AllGame";
import Game from "./games/gamedetail/pages/Game";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import GameLibrary from "./games/librarylist/pages/GameLibrary";
import User from "./user/pages/User";
import UserInfo from "./user/components/UserInfo";
import UserPassword from "./user/components/UserPassword";
import CreateGame from "./user/components/CreateGame";

import UserContext from "./context/UserContext";
import FreeGame from "./games/filtergame/freegame/pages/FreeGame";
import DiscountGame from "./games/filtergame/discountgame/pages/DiscountGame";
import StoryGame from "./games/filtergame/storygame/pages/StoryGame";

const App = () => {
  const currentUser = useContext(UserContext).currentUser();

  return (
    <Router>
      <NavBar />
      <Routes>
        {currentUser && (
          <>
            <Route path="/" element={<DashBoard />} />
            <Route path="/games" element={<AllGame />}></Route>
            <Route path="/freegames" element={<FreeGame />}></Route>
            <Route path="/storygames" element={<StoryGame />}></Route>
            <Route path="/discountgames" element={<DiscountGame />}></Route>
            <Route path="/games/:gameId" element={<Game />} />
            <Route path="/library" element={<GameLibrary />}></Route>
            <Route path="/user" element={<User />}></Route>
            <Route path="/user/info" element={<UserInfo />}></Route>
            <Route path="/user/password" element={<UserPassword />}></Route>
            <Route path="/user/create" element={<CreateGame />}></Route>
            <Route path="*" element={<Navigate to="/" />}></Route>
          </>
        )}
        {!currentUser && (
          <>
            <Route path="/" element={<DashBoard />} />
            <Route path="/games" element={<AllGame />}></Route>
            <Route path="/games/:gameId" element={<Game />} />
            <Route path="/auth/signup" element={<Signup />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/" />}></Route>
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
