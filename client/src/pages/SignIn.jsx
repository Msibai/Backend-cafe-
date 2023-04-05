import "../style/sign-in.css";
import background from "../images/coffeee.jpg";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [user, setUser] = useState({});

  const submitLogin = async (email, password) => {
    const response = await fetch("/api/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const result = await response.json();
    setUser(result);
    navigate("/dashboard");
  };

  return (
    <div
      className="background-image"
      style={{ backgroundImage: `url(${background})` }}
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
          <button className="create-account-button">Create account</button>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
