import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import loginBG from "../assets/Images/loginbg.svg";
import logo from "../assets/img/Logo.svg";
import Config from "../Config";
import axiosFetch from "../utils/axxiosIntercepters";
import { showAlert } from "../utils/showAlert";
const eye = <FontAwesomeIcon icon={faEye} />;

const ChangePassword = (props) => {
  const [user, setUser] = useState({});
  const [locationKeys, setLocationKeys] = useState([]);
  const [passwordTypeNew, setPasswordTypeNew] = useState("password");
  const [passwordTypeNewConfirm, setPasswordTypeNewConfirm] =
    useState("password");
  const [oldPassword, setOldPassword] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordShown, setPasswordShown] = useState("");
  const nav = useNavigate();
  const { state } = useLocation();
  const { changeState } = props;

  const handlePasswordChange = (evnt) => {
    setPasswordInput(evnt.target.value);
  };

  const confirmPasswordChange = (evnt) => {
    setPasswordShown(evnt.target.value);
  };

  const togglePassword = (id) => {
    switch (id) {
      case "new_password":
        setPasswordTypeNew(
          passwordTypeNew === "password" ? "text" : "password"
        );
        break;
      case "confirm_new_password":
        setPasswordTypeNewConfirm(
          passwordTypeNewConfirm === "password" ? "text" : "password"
        );
        break;
    }
  };

  const changePassword = async (body) => {
    console.log("user?.token==>", user?.token);
    let check = "Bearer" + " " + user?.token.toString();
    console.log("check", check);
    await axiosFetch
      .post("/user/password_change", body, {
        headers: {
          Authorization: "Bearer" + " " + user?.token.toString(),
          "x-api-key": Config.REACT_APP_X_API_KEY,
        },
      })
      .then(async (res) => {
        if (res.status === 200) {
          showAlert("success", res.data.message);
          nav("/bom");
        } else {
          showAlert("warning", res.data.message);
        }
      })
      .catch((err) => {
        showAlert("warning", err.response.data.message);
      });
  };

  const handleLogout = () => {
    sessionStorage.clear();
  };

  const handleOldPassword = (event) => {
    setOldPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // if (
    //   event.target.elements.new_password.value !=
    //   event.target.elements.confirm_new_password.value
    // ) {
    //   return toast.error("password not confirmed!");
    // }
    let passwordMatchStatus = validateNewPassword();

    if (!passwordMatchStatus) {
      showAlert("warning", "Entered passwords are not matching");
      return;
    }
    // if (passwordMatchStatus) {
    //   showAlert("success", "Entered passwords matching");
    // }

    if (passwordMatchStatus) {
      let body = {
        email: user?.email,
        password: oldPassword,
        newPassword: passwordInput,
      };
      await changePassword(body);
    }
    return;
  };

  const validateNewPassword = () => {
    let matchStatus = passwordInput.toString() === passwordShown.toString();
    return matchStatus;
  };

  const getUserData = () => {
    let user = localStorage.getItem("user_info");
    setUser(JSON.parse(user));
  };

  const backToPrevious = async () => {
    await nav(-1);
  };

  // window.onpopstate = async () => {
  //   await props.changeCss(true);
  //   await changeState();
  // };

  useEffect(() => {
    getUserData();
    if (state?.from === "tempAttempt") {
      props.changeState();
    }
  }, []);

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
              backgroundColor: "#363C90",
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
                          {" "}
                          <img src={logo} />
                        </span>
                        <div className="login-basic">
                          <div className="login-welcome">
                            <label>Welcome to Zarvis.</label>
                            <p>
                              Please fill in the details below so that we can
                              get in contact with you
                            </p>
                          </div>
                        </div>
                      </Box>
                    </div>
                  </div>

                  <div className="item">
                    <div className="login-right">
                      <span>
                        {" "}
                        <img src={logo} />
                      </span>
                      <div className="login-basic">
                        <div className="login-welcome">
                          <label>Welcome to Zarvis.</label>
                          <p>
                            Please fill in the details below so that we can get
                            in contact with you
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*  <div className="item">
                    <div className="login-right">
                      <span>
                        {" "}
                        <img src={logo} />
                      </span>
                      <div className="login-basic">
                        <div className="login-welcome">
                          <label>Tool That Plans, Tracks, And Analyzes </label>
                          <p>
                            The costs and inputs involved in any process-driven
                            activity.
                          </p>
                        </div>
                      </div>
                    </div>
                      </div>*/}
                </div>
              </div>
            </div>
          </div>
          <div className="col-6" id="leftpanel">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <img src={logo} style={{ width: "40px", height: "40px" }} />
              <Typography
                sx={{ fontSize: "30px", fontWeight: "600", color: "#191932" }}
              >
                Zarvis
              </Typography>
            </Box>
            <Box sx={{ my: 5, textAlign: "center" }}>
              <label className="login-text">Change Password</label>
              <Typography sx={{ color: "#667085", fontSize: "16px", mt: 5 }}>
                Please Enter New Password
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
                  <label>
                    {state?.from === "tempAttempt" ? "Temporary" : "Old"}{" "}
                    Password
                  </label>
                  <input
                    type="text"
                    placeholder={
                      state?.from === "tempAttempt"
                        ? "Temporary Password"
                        : "Old Password"
                    }
                    id="old_password"
                    required
                    value={oldPassword}
                    onChange={handleOldPassword}
                  />
                </div>
                <div className="login-fields error-input">
                  <label>Enter New Password</label>
                  <input
                    type={passwordTypeNew}
                    onChange={handlePasswordChange}
                    placeholder="New Password"
                    id="new_password"
                    required
                  />
                  {passwordTypeNew === "password" ? (
                    <i
                      className="bi bi-eye-slash"
                      id="eye-icon"
                      type="button"
                      onClick={(e) => togglePassword("new_password")}
                    ></i>
                  ) : (
                    <i
                      className="bi bi-eye"
                      id="eye-icon"
                      type="button"
                      onClick={(e) => togglePassword("new_password")}
                    ></i>
                  )}
                  <span>New Password</span>
                </div>
                <div className="login-fields error-input">
                  <label>Confirm New Password</label>
                  <input
                    type={passwordTypeNewConfirm}
                    value={passwordShown}
                    onChange={confirmPasswordChange}
                    placeholder="Confirm New Password"
                    id="confirm_new_password"
                    required
                  />
                  {passwordTypeNewConfirm === "password" ? (
                    <i
                      className="bi bi-eye-slash"
                      id="eye-icon"
                      type="button"
                      onClick={(e) => togglePassword("confirm_new_password")}
                    ></i>
                  ) : (
                    <i
                      className="bi bi-eye"
                      id="eye-icon"
                      type="button"
                      onClick={(e) => togglePassword("confirm_new_password")}
                    ></i>
                  )}
                  <span>Confirm New Password</span>
                </div>
                <div className="login-fields error-input">
                  <button
                    className="btn btn-primary get-started"
                    type="submit"
                    style={{ width: "100%" }}
                  >
                    Reset Password
                  </button>
                  <Typography sx={{ fontSize: "12px", opacity: "0.7", mt: 2 }}>
                    Note: After Clicking “Reset Password” you will be redirect
                    to the login{" "}
                  </Typography>
                  {state?.from !== "tempAttempt" ? (
                    <button
                      className="btn btn-primary get-started"
                      type="button"
                      style={{ width: "100%" }}
                      onClick={backToPrevious}
                    >
                      Cancel
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
              </Box>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
export default ChangePassword;
