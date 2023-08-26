import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import "./App.css";
import "./modules/calender.css";
import "./modules/Style.scss";

import Sidebar from "./modules/SideNav/Sidebar";
import ChangePassword from "./modules/ChangePassword";
import ForgotPassword from "./modules/ForgotPassword";
import Login from "./modules/Login";
import TopNavBar from "./modules/SideNav/TopNavBar";

import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";

import "./modules/styles/Responsive.scss";
import "./modules/styles/Style.scss";

import { Box, Typography } from "@mui/material";
import Dashboard from "./Pages/Dashboard/dashboard";
import CreateAudit from "./Pages/StockAudits/CreateAudit";
import ValidateAudit from "./Pages/StockAudits/ValidateAudit";
import StockVarianceReport from "./Pages/StockAudits/StockVarianceReport";
import StockItem from "./Pages/StockMovementReport/StockItem";
import StockSite from "./Pages/StockMovementReport/StockSite";
import StockLedger from "./Pages/Reports/StockLedger";
import StockClosing from "./Pages/Reports/StockClosing";
import StockMovement from "./Pages/Reports/StockMovement";


const NotFoundPage = () => {
  return (
    <Box>
      <Typography>404</Typography>
      <Typography>Not Found</Typography>
    </Box>
  );
};
function GlobalImport() {
  const [inactive, setInactive] = useState(false);

  window.addEventListener("logout", () => {
    console.log("Loggingout");
  });

  const changeCss = (value) => {
    setInactive(value);
  };

  const Wrapper = ({ children }) => {
    const location = useLocation();
    useLayoutEffect(() => {
      document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);
    return children;
  };

  const Layout = () => {
    return (
      <Box className={`main-content ${inactive ? "inactive" : ""}`}>
        {/* <Sidebar changeCss={changeCss} isOpen={inactive}/> */}
        <Sidebar isOpen={inactive} changeCss={changeCss} />
        <TopNavBar Outlet={Outlet} />
      </Box>
    );
  };

  return (
    <div className="GlobalImport">
      <BrowserRouter>
        <Wrapper>
          <div>
            <Routes>
              <>
                <Route path="/login" element={<Login />} />

                <Route
                  path="/forgot_password"
                  element={
                    <ForgotPassword
                      // changeState={changeState}
                      changeCss={changeCss}
                    />
                  }
                />
                {/* <Route path="*" element={<Navigate to={"/login"} />} /> */}
              </>

              <>
                <Route
                  path="/login"
                  element={<Navigate to={"/dashboard"} />}
                />
                <Route
                  path="/change_password"
                  element={
                    <ChangePassword
                      // changeState={changeState}
                      changeCss={changeCss}
                    />
                  }
                />
                <Route element={<Layout />}>
                  <Route
                    path="/dashboard"
                    element={<Dashboard changeCss={changeCss} />}
                  />
                  <Route
                    path="/create-audit"
                    element={<CreateAudit changeCss={changeCss} />}
                  />
                  <Route
                    path="/validate-audit"
                    element={<ValidateAudit changeCss={changeCss} />}
                  />
                  <Route
                    path="/stock-variance-report"
                    element={<StockVarianceReport changeCss={changeCss} />}
                  />
                  <Route
                    path="/item-to-item"
                    element={<StockItem changeCss={changeCss} />}
                  />
                  <Route
                    path="/site-to-site"
                    element={<StockSite changeCss={changeCss} />}
                  />
                  <Route
                    path="/stock_ledger"
                    element={<StockSite changeCss={changeCss} />}
                  />
                  <Route
                    path="/stock_ledger"
                    element={<StockLedger changeCss={changeCss} />}
                  />
                  <Route
                    path="/stock_closing_report"
                    element={<StockClosing changeCss={changeCss} />}
                  />
                  <Route
                    path="/stock_movement_report"
                    element={<StockMovement changeCss={changeCss} />}
                  />
                </Route>

                <Route path="*" element={<Navigate to={"/login"} />} />
              </>
         
            </Routes>
          </div>
        </Wrapper>
      </BrowserRouter>
    </div>
  );
}

export default GlobalImport;
