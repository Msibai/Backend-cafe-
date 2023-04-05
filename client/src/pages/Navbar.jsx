import { NavLink } from "react-router-dom";
// import GlobalContext from "../context/GlobalContext.jsx";
//import { useContext } from "react";

 function Navbar (props) {

    let auth = true;
//   const { auth, logout , nameVal } = useContext(GlobalContext);
//   console.log(nameVal);

  return (
    <nav>
      {auth ? (
        <ul className={props.toggle ? "menu-items show" : "menu-items"}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => props.setToggle(!props.toggle)}
            >
              Home
            </NavLink>
          </li>

          <li className="logout" >
            <a href="">Logout</a>
          </li>
          <li className="logout">
            <NavLink to="/accountdetails"className={({ isActive }) => (isActive ? "active" : "")}
                     onClick={() => {
                       if (props.toggle) {
                         props.setToggle(!props.toggle);
                       }
                     }}
            > User Name </NavLink>
          </li>

        </ul>
      ) : (
        <ul className={props.toggle ? "menu-items show" : "menu-items"}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => {
                if (props.toggle) {
                  props.setToggle(!props.toggle);
                }
              }}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="login"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => {
                if (props.toggle) {
                  props.setToggle(!props.toggle);
                }
              }}
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              to="signup"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => {
                if (props.toggle) {
                  props.setToggle(!props.toggle);
                }
              }}
            >
              Sign Up
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;