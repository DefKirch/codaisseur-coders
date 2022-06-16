import "./App.css";
import { Route, Routes } from "react-router-dom";
import { bootstrapLoginState } from "./store/auth/thunks";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import LoginPage from "./pages/LoginPage";
import Toolbar from "./components/Toolbar";
import SignUpPage from "./pages/SignUpPage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(bootstrapLoginState());
  }, []);

  return (
    <div className="App">
      <Toolbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </div>
  );
}

export default App;
