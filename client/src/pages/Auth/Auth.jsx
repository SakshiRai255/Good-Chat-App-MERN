import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { logIn, signUp } from "../../actions/AuthAction";
import { useNavigate } from "react-router-dom";

function Auth() {
  const initialState = {
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmPassword: "",
  };

  const loading = useSelector((state) => state.authReducer.loading);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isSignUp, setIsSignUp] = useState(false);
  const [data, setData] = useState({ initialState });
  const [confirmPassword, setConfirmPassword] = useState(true);

  // handle Change in input
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Form Submission
  const handleSubmit = (e) => {
    setConfirmPassword(true);
    e.preventDefault();
    if (isSignUp) {
      data.password === data.confirmpassword
        ? dispatch(signUp(data, navigate))
        : setConfirmPassword(false);
    } else {
      dispatch(logIn(data, navigate));
    }
  };

  // Reset Form
  const resetForm = () => {
    setConfirmPassword(confirmPassword);
    setData({ initialState });
  };

  return (
    //  Left Side
    <div className="Auth">
      <div className="a-left">
        <img src={Logo} alt="" className="AuthLogo"/>
        <div className="webName">
          <h1>Good Chat</h1>
          <h6>Good Chat! Explore the ideas throughout the world</h6>
        </div>
      </div>
      {/* Right Side */}
      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? "Register" : "Login"}</h3>

          {isSignUp && (
            <div>
              <input
                type="text"
                name="firstname"
                className="infoInput"
                placeholder="First Name"
                value={data.firstname}
                onChange={handleChange}
              />
              <input
                type="text"
                name="lastname"
                className="infoInput"
                placeholder="Last Name"
                value={data.lastname}
                onChange={handleChange}
              />
            </div>
          )}
          <div>
            <input
              type="text"
              className="infoInput"
              placeholder="User Name"
              name="username"
              value={data.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="password"
              className="infoInput"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={handleChange}
            />
            {isSignUp && (
              <input
                type="password"
                className="infoInput"
                placeholder="Confirm Password"
                name="confirmpassword"
                onChange={handleChange}
              />
            )}
          </div>
          <div>
            <span
              style={{
                display: confirmPassword ? "none" : "block",
                color: "red",
                fontSize: "12px",
                alignSelf: "flex-end",
                marginRight: "5px",
              }}
            >
              *Confirm Password is not same
            </span>
            <span
              style={{
                fontSize: "15px",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => {
                resetForm();
                setIsSignUp((prev) => !prev);
              }}
            >
              {isSignUp
                ? "Already have an account Login!"
                : "Don't have an account? Sign Up"}
            </span>
          </div>
          <button
            className="button infoButton"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : isSignUp ? "SignUp":"Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Auth;
