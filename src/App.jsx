import CreatePlayer from "./pages/createPlayer";
import Dashboard from "./pages/dashboard";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/signup";
import Login from "./pages/login";
import About from "./pages/about";
import PrivateRoute from "./routes/privateRoute";
import AuthRoute from "./routes/authRoute";
import PlayerProfile from "./pages/playerprofile";

const App = () => {
  return (
    <div>
      <Routes>
        <Route element={<AuthRoute />}>
          <Route index element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/createPlayer" element={<CreatePlayer />} />
          <Route path="/about" element={<About />} />
          <Route path="/player/:playerId" element={<PlayerProfile />} />

        </Route>
      </Routes>
    </div>
  );
};

export default App;
