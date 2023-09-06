import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <>
      <div className="main">
        {/* Checkbox for toggle switch */}
        <input type="checkbox" id="chk" aria-hidden="true" />

        {/* Signup form */}
        <div className="signup">
          <form>
            {/* Signup label */}
            <label htmlFor="" className="sig">
              {" "}
              Sign Up
            </label>

            {/* User Name input */}
            <input
              type="text"
              name="text"
              placeholder="User Name"
              required=""
            />

            {/* Email input */}
            <input type="email" name="Email" placeholder="Email" required="" />

            {/* Password input */}
            <input
              type="password"
              name="pswd"
              placeholder="Password"
              required=""
            />

            {/* Signup button */}
            <button className="sig_btn">Sign Up</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
