import "./App.css";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Profile from "./components/Profile/Profile";
import Chat from "./pages/Chat/Chat";

function App() {
  const user = useSelector((state) => state.authReducer.authData);

  return (
    <div
      className="App"
      style={{
        height:
          window.location.href === "http://localhost:3000/chat"
            ? "calc(100vh - 2rem)"
            : "auto",
      }}
    >
      <div className="blur" style={{ top: "-18%", right: "0" }}></div>
      <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="home" /> : <Navigate to="auth" />}
        />
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="../auth" />}
        />
        <Route
          path="/auth"
          element={user ? <Navigate to="../home" /> : <Auth />}
        />
        <Route
          path="/profile/:id"
          element={user ? <Profile /> : <Navigate to="../auth" />}
        />

        <Route path ='/chat' element={user? <Chat/> : <Navigate to="../auth"/> }/>

      </Routes>
    </div>
  );
}

export default App;
