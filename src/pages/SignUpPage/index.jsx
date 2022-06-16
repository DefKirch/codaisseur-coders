import "./styles.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signUpUser } from "../../store/auth/thunks";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(signUpUser(name, email, password));
    setEmail("");
    setPassword("");
  };

  return (
    <div className="LoginPage">
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <p>
          <label>
            Name:
            <input
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </p>
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
          <button type="submit">Sign up</button>
        </p>
        <p>Already a member?</p>
        <Link to="/login">Sign in</Link>
      </form>
    </div>
  );
};

export default SignUpPage;
