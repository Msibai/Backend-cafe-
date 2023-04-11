import { NavLink } from 'react-router-dom';
import GlobalContext from '../context/GlobalContext.jsx';
import { useContext } from 'react';

 function Navbar (props) {
 const { auth, logout , isadmin, iscustomer,isworker, user } = useContext(GlobalContext);

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
          <li>
            <NavLink
              to="/menu"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => props.setToggle(!props.toggle)}
            >
              Menu
            </NavLink>
          </li>

          <li className="logout" onClick={logout} >
            Logout
          </li>
         { iscustomer  &&
             (
                <div>
          <li className="customer-orders">
            <NavLink to="/"className={({ isActive }) => (isActive ? "active" : "")}
                     onClick={() => {
                       if (props.toggle) {
                         props.setToggle(!props.toggle);
                       }
                     }}
            > My orders </NavLink>
          </li>
          <li className="myaccount">
            <NavLink to="/myaccount"className={({ isActive }) => (isActive ? "active" : "")}
                     onClick={() => {
                       if (props.toggle) {
                         props.setToggle(!props.toggle);
                       }
                     }}
            > {user} </NavLink>
          </li> 
          </div>
          )}


          { isworker &&
            (
              <li className="workers-order-lists">
            <NavLink to="/"className={({ isActive }) => (isActive ? "active" : "")}
                     onClick={() => {
                       if (props.toggle) {
                         props.setToggle(!props.toggle);
                       }
                     }}
            > Order lists </NavLink>
          </li>

          )}
          { isadmin &&
          (
          <li className="dashboard">
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
              to="/menu"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => props.setToggle(!props.toggle)}
            >
              Menu
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
