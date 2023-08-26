import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import logo from "../assets/img/Logo.svg";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Config from "../Config";

const ForgotPassword = () => {
  const [user, setUser] = useState({});
  const nav = useNavigate();

  const changePassword = async (body) => {
    await axios
      .post("/user/password_change", body, {
        headers: {
          authorization: `Bearer ${user?.token}`,
          "x-api-key": Config.REACT_APP_X_API_KEY,
        },
      })
      .then(async (res) => {
        if (res.status == 200) {
          toast.success(res.data.message);
          await localStorage.clear();
          nav("/login");
        } else {
          console.log(res.response.data.message);
          Swal.fire({
            title: "Error",
            text: res.response.data.message,
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "Something went wrong!",
          text: err.response.data.message,
        });
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(event.target.elements.new_password.value);
    if (
      event.target.elements.new_password.value !=
      event.target.elements.confirm_new_password.value
    ) {
      return toast.error("password not confirmed!");
    }
    let body = {
      email: user?.email,
      password: event.target.elements.old_password.value,
      newPassword: event.target.elements.new_password.value,
    };
    await changePassword(body);
  };

  const getUserData = () => {
    let user = localStorage.getItem("user_info");
    setUser(JSON.parse(user));
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <section>
        <div className="col-lg-12 login-padding" style={{ height: "auto" }}>
          <div
            className="col-lg-5 login-bg"
            style={{ width: "40%", height: "100%", backgroundColor: "#363C90" }}
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
                      {/* <i className="" aria-hidden="true" ></i> */}
                      <span> {/* <img src={logo} /> */}</span>
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

                  <div className="item">
                    <div className="login-right">
                      <span> {/* <img src={logo} /> */}</span>
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
                  {/* <ToastContainer /> */}
                  <div className="item">
                    <div className="login-right">
                      <span> {/* <img src={logo} /> */}</span>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-lg-7 login-leftpanel"
            style={{ width: "60%", height: "100%" }}
            id="leftpanel"
          >
            <div className="zarvis-logo">
              <span>
                {/* <img src={logo} /> */}
                Zarvis
              </span>
            </div>
            <label className="login-text">Change Password</label>
            <p>Please Enter New Password </p>
            <form className="login-form">
              <div className="login-fields error-input">
                <label>Old Password</label>
                <input
                  type="text"
                  placeholder="Old Password"
                  id="old_password"
                  required
                />
              </div>
              <div className="login-fields error-input">
                <label>Enter New Password</label>
                <input
                  type="password"
                  placeholder="New Password"
                  id="new_password"
                  required
                />
              </div>
              <div className="login-fields error-input">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  id="confirm_new_password"
                  required
                />
                <span>Confirm New Password</span>
              </div>
              <div className="login-fields error-input">
                <button className="btn btn-primary get-started" type="submit">
                  Reset Password
                </button>
                <small>
                  Note: After Clicking “Reset Password” you will be redirect to
                  the login{" "}
                </small>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;
