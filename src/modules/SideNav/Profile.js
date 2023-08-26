import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Modal from "@mui/material/Modal";
// import { useNavigate } from 'react-router-dom';
// import { useNavigate } from 'react-router';
import { useNavigate } from "react-router-dom";

import { styled } from "@mui/material/styles";
import { useState, useEffect } from "react";

const style_btn = {
  position: "relative",
  left: "100px",
  top: "15px",
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const ColorButton = styled(Button)(({ theme }) => ({
  color: "black",

  "&:hover": {
    backgroundColor: "lightgray",
  },
}));

function Profile_btn() {
  const navigate = useNavigate();
  // const navigate = useNavigate();
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const user_type = sessionStorage.user_type;

  // const navigate = useNavigate();

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setAnchorEl(null);
  };

  // change_pass

  const [open_pass, setOpen_pass] = React.useState(false);
  const handleOpen_pass = () => {
    setOpen_pass(true);
    setAnchorEl(null);
  };

  const handleClose_pass = () => setOpen_pass(false);

  const [inputdata, setInputData] = useState({
    new_pass: "",
    conf_new_pass: "",
  });

  const [dis_btn, setDis_btn] = useState(true);

  const handleChange_pass = (e) => {
    e.preventDefault();
    const newdata = { ...inputdata };

    newdata[e.target.id] = e.target.value;
    setInputData(newdata);

    if (newdata && newdata.new_pass === newdata.conf_new_pass) {
      setDis_btn(false);
    } else {
      setDis_btn(true);
    }
  };

  const employee_id = sessionStorage.getItem("employee_id");

  const submit_handler = async (e) => {
    e.preventDefault();

    const data = {
      employee_id: employee_id,
      employee_password: inputdata.new_pass,
    };

    console.log(data);

    // const incomingdata = await axiosFetch.post('http://uat.waycool.in/quality_management_web_react_new/quality_digitisation/admin/changepassword', data)
    //     .then(response => {

    //         if (response.data.status == 200) {

    //             Swal.fire({
    //                 icon: 'success',
    //                 title: 'Success!',
    //                 text: 'Password Changed Successfully !!',
    //             })
    //                 .then(function () {
    //                     window.location.reload();
    //                 }
    //                 );

    //         }
    //         else {
    //             Swal.fire({
    //                 icon: 'warning',
    //                 title: 'Failed!',
    //                 text: response.data.message,
    //             })
    //         }
    //     })
    //     .catch(e => e);

    // setOpen_pass(false);
  };

  return (
    <div className="profile-icon">
      <div>
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <SettingsIcon
            style={{ color: "#00416B", marginTop: "7px" }}
            fontSize="medium"
          />
        </IconButton>
        <Menu
          style={{ position: "absolute", left: "-3vw", top: ".6cm" }}
          className="profile-popup"
          id="menu-appbar"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {auth && (
            <div>
              <MenuItem style={{ fontSize: 14 }} onClick={handleOpen_pass}>
                Change Password
              </MenuItem>
              <MenuItem style={{ fontSize: 14 }} onClick={handleLogout}>
                Log Out
              </MenuItem>
            </div>
          )}
        </Menu>
      </div>

      <div>
        <Modal
          open={open_pass}
          onClose={handleClose_pass}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div>
              <h5 style={{ marginBottom: "30px" }}>Change Password</h5>
            </div>
            <form onSubmit={submit_handler}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label>New Password</label>
                <input
                  required
                  id="new_pass"
                  value={inputdata.new_pass}
                  onChange={handleChange_pass}
                  className="reset_pass"
                  placeholder="Enter Password"
                  type="password"
                />
              </div>
              <div style={{ display: "flex", flexDirection: "coluzzmn" }}>
                <label>Confirm Password</label>
                <input
                  required
                  id="conf_new_pass"
                  value={inputdata.conf_new_pass}
                  onChange={handleChange_pass}
                  className="reset_pass"
                  placeholder="Enter confirm Password"
                  type="password"
                />
              </div>
              <Box sx={style_btn}>
                <ColorButton onClick={handleClose_pass}>Cancel</ColorButton>
                <ColorButton disabled={dis_btn} type="submit">
                  Save
                </ColorButton>
              </Box>
            </form>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default Profile_btn;
