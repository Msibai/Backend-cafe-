import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../style/signUp.css";
import Gradient from "../images/gradient.jpg";

function SignUp() {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();

  const registerUser = async (name, phoneNumber, email, password) => {
    const response = await fetch("/api/users", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phoneNumber, email, password }),
    });
    const result = await response.json();
    if (response.ok) {
      setError(false);
      setIsRegister(true);
    } else {
      setIsRegister(false);
      setError(result.messages);
    }
  };

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    reset({
      name: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  }, [isRegister]);

  if (isRegister) {
    setInterval(() => {
      navigate("/signin");
    }, 1000);
  }

  return (
    <div
      className="background-image"
      style={{ backgroundImage: `url(${Gradient})` }}
    >
      <form
        className="signup-form"
        onSubmit={handleSubmit((data) =>
          registerUser(data.name, data.phoneNumber, data.email, data.password)
        )}
      >
        <h1 className="sign-up-title">Sign Up</h1>
        {error && <p className="error-message">{error}</p>}
        {isRegister && (
          <p className="success-message">Thank you for your registration!</p>
        )}
        <div className="group">
          <p className="error-message">{errors.name?.message}</p>
          <label htmlFor="name">Name</label>
          <input
            {...register("name", {
              required: "Please Enter Your Name!",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters long!",
              },
            })}
            type="text"
            id="name"
            className={`${errors.name && "input-error"}`}
          />
        </div>
        <div className="group">
          <p className="error-message">{errors.phoneNumber?.message}</p>

          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            {...register("phoneNumber", {
              required: "Please enter your phone number!",
            })}
            type="tel"
            id="phoneNumber"
            className={`${errors.phoneNumber && "input-error"}`}
          />
        </div>
        <div className="group">
          <p className="error-message">{errors.email?.message}</p>
          <label htmlFor="email">Email</label>
          <input
            {...register("email", {
              required: "Please Enter Your Email!",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please Enter A Valid Email!",
              },
            })}
            type="email"
            id="email"
            className={`${errors.email && "input-error"}`}
          />
        </div>
        <div className="group">
          <p className="error-message">{errors.password?.message}</p>
          <label htmlFor="password">Password</label>
          <input
            {...register("password", {
              required: "Please Enter Your Password",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long!",
              },
            })}
            type="password"
            id="password"
            className={`${errors.password && "input-error"}`}
          />
        </div>
        <div className="group">
          <p className="error-message">{errors.confirmPassword?.message}</p>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            {...register("confirmPassword", {
              required: "Please Confirm Your Password",
              validate: (match) => {
                const password = getValues("password");
                return match === password || "Passwords should match!";
              },
            })}
            type="password"
            id="confirmPassword"
            className={`${errors.confirmPassword && "input-error"}`}
          />
        </div>
        <button className="submit-button">SIGN UP</button>
      </form>
    </div>
  );
}

export default SignUp;
