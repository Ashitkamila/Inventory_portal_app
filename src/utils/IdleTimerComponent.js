// import Swal from 'sweetalert2';
import React, { useState, useEffect } from "react";
import { useRef } from "react";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@material-ui/core/Button";
import { IdleTimerProvider } from "react-idle-timer";
import { Navigate, useNavigate } from "react-router";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  //border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function IdleTimerComponent() {
  const IdleTimerRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sessionTimeoutRef = useRef(null);
  let navigate = useNavigate();

  const userLogout = () => {
    navigate("/login");
    localStorage.clear();
    clearTimeout(sessionTimeoutRef.current);
    window.location.reload();
  };

  const onIdle = () => {
    // console.log("user is Idle");
    setIsModalOpen(true);
    sessionTimeoutRef.current = setTimeout(userLogout, 8000);
  };
  const StayActive = () => {
    setIsModalOpen(false);
    clearTimeout(sessionTimeoutRef.current);
  };
  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <IdleTimerProvider
        ref={IdleTimerRef}
        timeout={9000 * 100}
        onIdle={onIdle}
      ></IdleTimerProvider>

      <Modal
        hideBackdrop
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 500 }}>
          <div className="row">
            <div className="col-md-12 col-lg-12 col-xlg 12 col-sm-4">
              <h2 id="child-modal-title">You've been idle for a while</h2>
              <h6 id="child-modal-description">
                You will be logged our Automatically
              </h6>
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <Button onClick={StayActive} variant="contained" color="secondary">
              Keep me Signed In
            </Button>
            <Button variant="contained" color="secondary" onClick={userLogout}>
              Sign Out
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
