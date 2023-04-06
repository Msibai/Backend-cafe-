import '../style/header.css'
import { useState } from "react";
import Navbar from "./Navbar.jsx";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
 import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



 function Header() {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <header>
        <div className="header-container">
          <div className="app-title">
            <h3> Fuel your codes with our coffee.</h3>
    
          </div>
          <div className ="small-screen-app-title">
          <h2 className="text1"> Fuel your codes </h2>
            <h2 className="text2"> with our <FontAwesomeIcon icon={faCoffee} style={{color: "#f7f9fd",}} /> </h2>
          </div>
          <div
            className={toggle ? "hamburger-lines clicked" : "hamburger-lines"}
            onClick={() => setToggle(!toggle)}
          >
            <span className="line line1"></span>
            <span className="line line2"></span>
            <span className="line line3"></span>
          </div>
          <div>
            <Navbar toggle={toggle} setToggle={setToggle} />
            
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;