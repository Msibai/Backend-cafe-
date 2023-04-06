import { NavLink } from "react-router-dom";
import GlobalContext from "../context/GlobalContext.jsx";
import { useContext } from "react";

 function Navbar (props) {
 const { auth, logout , isadmin, iscustomer, user } = useContext(GlobalContext);
 console.log(auth);

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

          <li className="logout" onClick={logout} >
            <a href="/">Logout</a>
          </li>
          {iscustomer ? (
          <li className="customer-orders">
            <NavLink to="/"className={({ isActive }) => (isActive ? "active" : "")}
                     onClick={() => {
                       if (props.toggle) {
                         props.setToggle(!props.toggle);
                       }
                     }}
            > My orders </NavLink>
          </li>) : (<li className="workers-order-lists">
            <NavLink to="/"className={({ isActive }) => (isActive ? "active" : "")}
                     onClick={() => {
                       if (props.toggle) {
                         props.setToggle(!props.toggle);
                       }
                     }}
            > Order lists </NavLink>
          </li>

          )}
          
          {iscustomer ? (
          <li className="myaccount">
            <NavLink to="/myaccount"className={({ isActive }) => (isActive ? "active" : "")}
                     onClick={() => {
                       if (props.toggle) {
                         props.setToggle(!props.toggle);
                       }
                     }}
            > {user} </NavLink>
          </li>) : (<li className="dashboard">
            <NavLink to="/dashboard"className={({ isActive }) => (isActive ? "active" : "")}
                     onClick={() => {
                       if (props.toggle) {
                         props.setToggle(!props.toggle);
                       }
                     }}
            > Admin Dashboard </NavLink>
          </li>

          )}

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
              to="/signin"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => {
                if (props.toggle) {
                  props.setToggle(!props.toggle);
                }
              }}
            >
              Sign In
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/signup"
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