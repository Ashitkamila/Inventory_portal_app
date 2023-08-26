import React, { useEffect, useState } from "react";
// import Select from 'react-select'
import { makeStyles } from "@material-ui/core/styles";
import "../../assets/CSS/style.css";
import {
  Box,
  Fade,
  Grow,
  Popover,
  Slide,
  Typography,
  Zoom,
} from "@mui/material";
import Modal from "react-modal";
// import BellIcon from "../../assets/Images/bell.svg";
import BellIcon from "../../assets/Images/bell-solid 1.svg";
import ProfileIcon from "../../assets/img/Vector_arrow.png";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Swal from "sweetalert2";

import { useLocation, useNavigate } from "react-router-dom";
import userProfileIcon from "../../assets/img/user.svg";
import _ from "lodash";
import axiosFetch from "../../utils/axxiosIntercepters";
import * as sagaActions from "../../redux/sagaActions";
import { useDispatch, useSelector } from "react-redux";
import IdleTimerComponent from "../../utils/IdleTimerComponent";

document.addEventListener("wheel", function (event) {
  if (
    document.activeElement.type === "number"
    // &&
    // document.activeElement.classList.contains("noscroll")
  ) {
    document.activeElement.blur();
  }
});

function TopNavBar(props) {
 
  const userDetails = useSelector((state) => state?.userData?.AllModulesGet);

  const [userData, setUserData] = useState({});
  const [modalIsOpen, setIsOpen] = useState(false);
  const nav = useNavigate();
  const changeState = props.changeState;
  const Outlet = props.Outlet;
  const { pathname } = useLocation();

  function openModal() {
    setIsOpen(true);
  }

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  console.log(anchorEl);

  function closeModal() {
    setIsOpen(false);
  }

  Modal.setAppElement("#root");
  let nameArr = userData?.full_name?.split(" ");
  let nickName = "";
  nameArr?.map((each) => {
    nickName += each.slice(0, 1);
  });

  const changePassword = async (e) => {
    closeModal();
    // await changeCss(true);
    nav("/change_password");
  };
  const handleLogOut = async () => {
    closeModal();
    await Swal.fire({
      text: "Are you sure you want to logout?",
      showCancelButton: true,
      confirmButtonColor: "#610094",
      cancelButtonColor: "#FFFF",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then(async (res) => {
      console.log("ashit123", res.isConfirmed);
      if (res.isConfirmed) {
        // await axiosFetch.get("/auth/signOut").then(async (response) => {
        //   console.log(response);
        //   if (response.status == 200) {
        //     await localStorage.clear();
        //     await localStorage.setItem("isAuthorized", false);
        //     await changeState();
        //     console.log(response.data.message);
        //     await changeState();
        await nav("/login");
        //   } else {
        //     Swal.fire({
        //       icon: "warning",
        //       title: "Failed!",
        //       text: response.data.message,
        //     });
        //   }
        // });
      } else {
        return;
      }
    });
  };

  useEffect((e) => {
    setTimeout(async () => {
      let user = localStorage.getItem("user_info");
      setUserData(JSON.parse(user));
    });
  }, []);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <>
      <div className="home-section">
        <div className="home-content">
          <header
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ fontSize: "18px", fontWeight: "700", ml: 3, pt: 1 }}
            >
              {pathname === "/allocation"
                ? "Allocation: Manpower Attendance"
                : ""}
            </Typography>
            <ul className="nav-links">
              <li></li>
              <li>
                <img src={BellIcon} alt="Icon" />
              </li>
              <li>
                <Box
                  sx={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                  onClick={handleClick}
                  // onClick={() => setIsOpen(!modalIsOpen)}
                  aria-describedby={id}
                >
                  <label
                    className="nick-name"
                    style={{
                      width: "2.5rem",
                      height: "2.5rem",
                      cursor: "pointer",
                    }}
                  >
                   { userDetails?.data[0]?.email.charAt(0).toUpperCase()}
                  </label>
                  {/* <div className="profile-name">
                <small>{userData?.user_name}</small>
                <span>{userData?.role}</span>
              </div> */}
                  <img
                    src={ProfileIcon}
                    style={{
                      paddingRight: "15px",
                      transform: "rotate(180deg)",
                    }}
                  />
                </Box>
                <Popover
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  transitionDuration={0}
                  sx={{
                    minWidth: "230px",
                    boxShadow: " 0px 2px 12px rgba(0, 0, 0, 0.1)",
                  }}
                  // transitionDuration={{ appear: 1800, enter: 1200, exit: 1000 }}
                  // TransitionComponent={Slide}
                  elevation={10}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                >
                  <div className="user-profil">
                    <div className="subdiv" style={{ borderTop: "none" }}>
                      {/* <label className="nick">{nickName}</label>{" "} */}
                      <label className="nick"> { userDetails?.data[0]?.email?.charAt(0).toUpperCase()}</label>{" "}
                      <h6 style={{ borderTop: "none" }}>
                        {/* {userData?.full_name || ""} */}
                        { userDetails?.data[0]?.role}
                        <p>{userData?.role || ""}</p>
                      </h6>
                      <br></br>
                    </div>
                    {/* <div className="subdiv">
                    <img
                      style={{ marginRight: "1.8rem" }}
                      src={userProfileIcon}
                    />
                    <h6>Profile</h6>
                  </div> */}
                    <div className="subdiv">
                      <span
                        style={{ marginRight: "0.8rem", fontSize: "0.7em" }}
                        className="fa-passwd-reset fa-stack"
                      >
                        <i className="fa fa-undo fa-stack-2x"></i>
                      </span>
                      <button onClick={changePassword}>Change Password</button>
                    </div>
                    <div
                      className="subdiv"
                      onClick={handleLogOut}
                      style={{ cursor: "pointer" }}
                    >
                      <ExitToAppIcon style={{ marginRight: "0.8rem" }} />
                      <button style={{ background: "none" }}>Log Out</button>
                    </div>
                  </div>
                </Popover>
              </li>
            </ul>
          </header>
        </div>
      </div>
    <IdleTimerComponent/>
      <Outlet />
    </>
  );
}

export default TopNavBar;
