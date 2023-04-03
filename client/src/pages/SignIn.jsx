import "../sign-in.css"
import background from "../images/coffeee.jpg"
import {useRef } from "react";


const SignIn = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const submitLogin = async (email, password) => {

    const response = await fetch("/api/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const result = await response.json();
    console.log(result);

    console.log(email, password)
    
  }


  return (
    <div className="background-image" style={{ backgroundImage: `url(${background})` }}>
      <div className="sign-in-container">

        <h1>Back End Café</h1>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            submitLogin(emailRef.current.value, passwordRef.current.value);
          }}
          className="login-form">
          <label htmlFor="email">Email</label>
          <input ref={emailRef} type="text" id="email" name="email" placeholder="Enter email" />
          <label htmlFor="password">Password</label>
          <input ref={passwordRef} type="password" id="password" name="password" placeholder="Enter password" />
          <button type="submit">Log in</button>
        </form>
        <button className="create-account-button">Create account </button>
      </div>
    </div>
  )

}

export default SignIn;

