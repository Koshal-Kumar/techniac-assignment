import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "./form.css";
import Spinner from "../Components/Spinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    setEmailError("");
    setPasswordError("");

    if (!email.trim()) {
      setEmailError("Email is required.");
      isValid = false;
    }

    if (!Password.trim()) {
      setPasswordError("Password is required.");
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoader(true);

    if (!validateForm()) {
      setLoader(false);
      return;
    }

    try {
      const res = await axios.post('http://localhost:8080/api/v1/user/login', {
        email,
        Password,
      });

      console.log("Response:", res.data); // Log the response data

      if (res.data.success) {
        toast.success(res.data.message);
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Invalid email or password.");
      } else {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
      console.log("Error:", error); // Log error details
    } finally {
      setLoader(false);
    }
  };

  const handleNavigate = () => {
    setLoader(true);
    setTimeout(() => {
      navigate("/signup");
      setLoader(false);
    }, 1000);
  };

  return (
    <>
      {loader && (
        <Spinner loader={loader} style={{ width: "100%", height: "100%" }} />
      )}
      <div
        className="login-body-wrapper d-flex justify-content-center align-items-center w-100"
        style={{ height: "100vh" }}
      >
        <div className="col-md-7" style={{ height: "100%", position: "relative" }}>
          <div className="background-wrapper">
            <img src="153685422_626f4775-3aec-427d-b099-016eaaa82613.jpg" alt="background poster" />
          </div>
          <div className="login-content-wrapper d-flex gap-3 justify-content-center align-items-center">
            <h1
              style={{
                color: "white",
                margin: "0",
                fontSize: "56px",
                maxWidth: "350px",
                textAlign: "start",
              }}
            >
              Get Ready For The Quiz?
            </h1>
          </div>
        </div>
        <div
          className="col-md-5 d-flex justify-content-center align-items-center"
          style={{ background: "#F8F9FA", height: "100%" }}
        >
          <div className="login-container">
            <div className="login">
              <div className="login-box">
                <h3>Login Page</h3>
                <form onSubmit={handleLogin}>
                  <div className="mb-4">
                    <input
                      type="email"
                      className="form-control no-focus-outline"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    {emailError && (
                      <span
                        className="message-box"
                        style={{ textAlign: "end", width: "100%", fontSize: "14px", color: "red" }}
                      >
                        {emailError}
                      </span>
                    )}
                  </div>
                  <div className="mb-4">
                    <input
                      type="password"
                      className="form-control no-focus-outline"
                      placeholder="Password"
                      value={Password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    {passwordError && (
                      <span
                        className="message-box"
                        style={{ textAlign: "end", width: "100%", fontSize: "14px", color: "red" }}
                      >
                        {passwordError}
                      </span>
                    )}
                  </div>
                  <button type="submit" className="btn">
                    Submit
                  </button>
                </form>
                <div className="col">
                  <Link
                    to="#"
                    style={{
                      textDecoration: "none",
                      marginTop: "10px",
                      color: "black",
                    }}
                    onClick={() => handleNavigate()}
                  >
                    Do Not Have An Account?
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
