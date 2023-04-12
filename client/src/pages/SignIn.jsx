import "../style/sign-in.css";
import Gradient from "../images/gradient.jpg";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import GlobalContext from "../context/GlobalContext.jsx";

const SignIn = () => {
  const { submitLogin } = useContext(GlobalContext);

  const emailRef = useRef();
  const passwordRef = useRef();

  return (
    <div
      className="background-image"
      style={{ backgroundImage: `url(${Gradient})` }}
    >
      <div className="sign-in-container">
        <h1 className="sign-in-title">Back End Café</h1>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            submitLogin(emailRef.current.value, passwordRef.current.value);
          }}
          className="login-form"
        >
          <label htmlFor="email">Email</label>
          <input
            ref={emailRef}
            type="text"
            id="email"
            name="email"
            placeholder="Enter email"
          />
          <label htmlFor="password">Password</label>
          <input
            ref={passwordRef}
            type="password"
            id="password"
            name="password"
            placeholder="Enter password"
          />
          <button type="submit">Log in</button>
        </form>
        <Link to={"/signup"}>
          <button className="create-account-button">Create account </button>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
