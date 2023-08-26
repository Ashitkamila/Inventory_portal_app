import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loginBG from "../assets/Images/loginbg.svg";
import loginBG1 from "../assets/Images/Censa.svg";
import loginlogo1 from "../assets/Images/censaLogo.png";
import Swal from "sweetalert2";
import { Nav } from "react-bootstrap";
import { Box, Typography } from "@mui/material";
import "./dummy.css";
import Config from "../Config";
import * as sagaActions from "../redux/sagaActions";
import { useDispatch, useSelector } from "react-redux";
import { getAllModulesOfSidebar } from "../redux/usersSlice";
const Login = (props) => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state?.userData?.AllModulesGet);
  console.log("userDetails123", userDetails);

  const [userData, setUserData] = useState({});
  const [focus, setFocus] = useState(true);
  const inputError = useRef(null);

  const [errorClassName, setErrorClassName] = useState("login-no-error");
  const [passwordType, setPasswordType] = useState("password");
  const nav = useNavigate();

  const authorization = async (userData) => {
    let payload = {
      email: userData.email,
      password: userData.password,
      companyCode: userData.company_code,
      portalType: "distributor",
    };
    let url = Config.REACT_APP_baseURL + "/v1/user/login";
    await axios
      .post(url, payload, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "x-api-key": Config.REACT_APP_X_API_KEY,
        },
      })
      .then(async (res) => {
        if (res.status == 200) {
          dispatch({
            type: sagaActions.GET_SIDEBAR_MODULE,
            response: res.data.data.token,
          });
          await localStorage.setItem(
            "user_info",
            JSON.stringify(res.data?.data)
          );
        }
        nav("/dashboard");
        // window.location.reload("");
      })
      .catch((err) => {
        inputError.current.focus();
        setFocus(false);
        console.log(err);
        if (
          err?.response?.data?.message === "Invalid credentials" ||
          err?.response?.data?.message ===
            "Your account is locked, please contact system admin"
        ) {
          document.getElementById("error-message-password").style.display =
            "block";
          document.getElementById("error-message").style.display = "none";
          document.getElementById("error-message-password").style.color = "red";
          document.getElementById("error-message-password").style.fontSize =
            "9px";
          document.getElementById("error-message-password").style.float =
            "left";
          if (
            err?.response?.data?.message ===
            "Your account is locked, please contact system admin"
          ) {
            document.getElementById("error-message-password").innerHTML =
              "Your account is locked, please contact system admin";
          }
        } else {
          document.getElementById("error-message-password").style.display =
            "none";
          document.getElementById("error-message").style.display = "block";
          document.getElementById("error-message").style.color = "red";
          document.getElementById("error-message").style.fontSize = "10px";
          document.getElementById("error-message").style.float = "left";
        }
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let body = {
      company_code: event.target.elements.company_code.value,
      email: event.target.elements.email.value.trim(),
      password: event.target.elements.password.value,
    };
    await authorization(body);
  };

  const togglePassword = (id) => {
    if (id === "password") {
      setPasswordType(passwordType === "password" ? "text" : "password");
    }
  };

  const forgotPassword = async (e) => {
    // await nav('/forgot_password');
    let email = document.getElementById("email").value.trim();
    localStorage.setItem("forgot_password_email", email);
    if (email === "") {
      Swal.fire({
        title: "Email",
        text: "Please provide waycool email Id",
        time: 1000,
      });
    } else {
      let payload = {
        email: email,
      };
      // toast.info(`This will send you a mail on Email ${email}.`);
      let url = Config.REACT_APP_baseURL + "v1/auth/forgot_password";

      await axios
        .post(url, payload, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "x-api-key": Config.REACT_APP_X_API_KEY,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            document.getElementById("error-message-password").style.display =
              "block";
            document.getElementById("error-message").style.display = "none";
            document.getElementById("error-message-password").style.color =
              "green";
            document.getElementById("error-message-password").style.fontSize =
              "9px";
            document.getElementById("error-message-password").style.float =
              "left";
            document.getElementById("error-message-password").innerHTML =
              "Password has been sent to your registered email address!";
          } else {
            Swal.fire({
              title: "Failure",
              text: res.data.message,
              time: 1000,
            });
          }
        })
        .catch((err) => {
          if (
            err?.response?.data?.message ===
            "Your account is locked, please contact system admin"
          ) {
            document.getElementById("error-message-password").style.display =
              "block";
            document.getElementById("error-message").style.display = "none";
            document.getElementById("error-message-password").style.color =
              "red";
            document.getElementById("error-message-password").style.fontSize =
              "9px";
            document.getElementById("error-message-password").style.float =
              "left";
            if (
              err?.response?.data?.message ===
              "Your account is locked, please contact system admin"
            ) {
              document.getElementById("error-message-password").innerHTML =
                "Your account is locked, please contact system admin";
            }
          } else {
            document.getElementById("error-message-password").style.display =
              "none";
            document.getElementById("error-message").style.display = "block";
            document.getElementById("error-message").style.color = "red";
            document.getElementById("error-message").style.fontSize = "10px";
            document.getElementById("error-message").style.float = "left";
          }
        });
    }
  };

  const check = (e) => {
    let email = e.currentTarget.value.trim();
    let inputField = document.getElementById("email");
    // if (!/(\W|^)[\w.+\-]*@waycool\.in(\W|$)/.test(email)) {
    if (inputField === "" || inputField === null || inputField === undefined) {
      inputField.setCustomValidity("Please provide valid email address");
    } else {
      inputField.setCustomValidity("");
    }
  };

  // useEffect(() => {

  // }, [userData]);

  return (
    <>
      <section>
        <div
          className="col-lg-12 login-padding"
          style={{ height: "auto", alignItems: "center" }}
        >
          <div
            className="col-6 login-bg"
            style={{
              height: "100%",
              backgroundColor: "#610094",
              backgroundImage: `url(${loginBG})`,
            }}
          >
            <div className="slideshow-container">
              <div
                id="myCarousel"
                className="carousel slide"
                data-ride="carousel"
              >
                <ol className="carousel-indicators">
                  <li
                    data-target="#myCarousel"
                    data-slide-to="0"
                    className="active"
                  ></li>
                  <li data-target="#myCarousel" data-slide-to="1"></li>
                  <li data-target="#myCarousel" data-slide-to="2"></li>
                </ol>
                <ToastContainer />
                <div className="carousel-inner" role="listbox">
                  <div className="item active">
                    <div className="login-right">
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                        }}
                      >
                        <span>
                          <img
                            src={loginlogo1}
                            alt="loginLogo1"
                            style={{ width: "180px", height: "100px" }}
                          />
                        </span>
                        <div className="login-basic">
                          <div className="login-welcome">
                            <label>
                              Real-time Monitoring Of Assets & Manpower
                            </label>
                            <p>
                              During production planning process, get a bird's
                              eye of cost of production and process efficiency.
                            </p>
                          </div>
                        </div>
                      </Box>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6" style={{ height: "100%" }} id="leftpanel">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <img src={loginBG1} style={{ width: "40px", height: "40px" }} />
              <Typography
                sx={{ fontSize: "30px", fontWeight: "600", color: "#191932" }}
              >
                Inventory Portal
              </Typography>
            </Box>
            <Box sx={{ my: 3, textAlign: "center" }}>
              <label className="login-text">Login to Inventory Portal</label>
              <Typography sx={{ color: "#667085", fontSize: "16px", mt: 3 }}>
                Please Login to Continue!{" "}
              </Typography>
            </Box>
            <form onSubmit={handleSubmit}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div className="login-fields error-input">
                  <label>Email ID / Employee ID</label>
                  <input
                    ref={inputError}
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter ID"
                    onInput={(e) => check(e)}
                    autoComplete="off"
                    className={focus ? "inputsection" : "inputsection1"}
                  />
                  <span id="error-message">
                    No user found.Please check your email id
                  </span>
                </div>

                <div className="login-fields login-margin error-input password-field">
                  <label>Password</label>
                  <input
                    type={passwordType}
                    id="password"
                    name="password"
                    placeholder="Enter Password"
                    required
                    autoComplete="off"
                    className={errorClassName}
                  />
                  {passwordType === "password" ? (
                    <i
                      className="bi bi-eye-slash"
                      id="eye-icon"
                      type="button"
                      onClick={(e) => togglePassword("password")}
                    ></i>
                  ) : (
                    <i
                      className="bi bi-eye"
                      id="eye-icon"
                      type="button"
                      onClick={(e) => togglePassword("password")}
                    ></i>
                  )}
                  <span id="error-message-password">
                    Enter correct password
                  </span>
                </div>
                {/* <ForgotPassword /> */}
                <a className="reset-pwd" onClick={forgotPassword} type="button">
                  Forgot Password?
                </a>
                <div className="login-fields error-input" id="company_code">
                  <label>Company Code</label>
                  {/* <input
                    type="text"
                    id="comapny_code"
                    name="company_code"
                    placeholder="Enter Code"
                    required
                    className={errorClassName}
                  /> */}
                  <select
                    className="dropDown errorClassName"
                    required
                    id="comapny_code"
                    name="company_code"
                  >
                    <option value="">Enter Company Code</option>
                    <option value="1000">1000</option>
                    <option value="3000">3000</option>
                    <option value="10020">10020</option>
                  </select>
                  <span>Enter correct code</span>
                </div>
                <button className="btn get-started" type="submit">
                  Get Started
                </button>
              </Box>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
export default Login;
