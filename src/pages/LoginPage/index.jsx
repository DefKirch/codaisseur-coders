import "./styles.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/auth/thunks";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser(email, password, navigate));
    setEmail("");
    setPassword("");
  };

  return (
    <div className="LoginPage">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <p>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </p>
        <p>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </p>
        <p>
          <button type="submit">Login</button>
        </p>
        <p>No account yet?</p>
        <Link to="/signup">Sign up</Link>
      </form>
    </div>
  );
};

export default LoginPage;
