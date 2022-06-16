import "./styles.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/auth/selectors";
import { logoutUser } from "../../store/auth/slice";

const Toolbar = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  return (
    <div className="Toolbar">
      <NavLink to="/">
        <p>Home</p>
      </NavLink>

      {/* check if user has token:
    - Select token from reduxState
    - configure auth selector to select token
    - If user has token -> display "username + log out button" 
    - If user is not logged in -> display "log in" with button*/}
      {user ? (
        <div className="LogOut">
          <p>Hi {user.name}!</p>
          <p>
            <button onClick={() => dispatch(logoutUser())}>Log out</button>
          </p>
        </div>
      ) : (
        <NavLink to="/login">
          <p>Login</p>
        </NavLink>
      )}
    </div>
  );
};

export default Toolbar;
