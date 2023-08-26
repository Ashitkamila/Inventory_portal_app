import React, { useEffect, useState } from "react";
import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SubMenu,
} from "react-pro-sidebar";

import barchart from "./../../assets/Images/bar-chart.svg";

import { Link, useLocation } from "react-router-dom";
// import { height } from '@mui/system';
import "../../assets/CSS/style.css";
import HomeIcon from "../../assets/Images/home.svg";
// import ProcessInputIcon from "../../assets/Images/Process input.svg";
import ProcessInputIcon from "../../assets/Images/Processinactive.svg";

// import ProcessTypeIcon from '../../assets/Images/Process Type.svg';
// import ZarvisLogo from "../../assets/Images/Logo.svg";
import { useSelector } from "react-redux";
import ZarvisLogo from "../../assets/Images/Censa.svg";

const Sidebar = (props) => {
  //create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(props.isOpen);
  const [activePage, setActivePage] = useState(null);
  // const [inactive, setInactive] = React.useState(false);
  const [activeClassName, setActiveClassName] = useState(null);
  const [subMenuOpen, setSubMenuOpen] = useState(null);
  const [roles, setRoles] = useState({});

  const allModules = useSelector(
    (state) => state?.userData?.AllModulesGet?.data[0]?.role_access_Details
  );
  console.log("userDetails123", allModules);

  //create a custom function that will change menucollapse state from false to true and true to false

  const menuTitle = [
    "Dashboard",
    "Stock Audit",
    "Stock Movement Report",
    "Reports",
    "Master",
    "Allocation",
    "Process Type",
    "Control panel",
  ];

  let modulesFormated = {};

  allModules &&
    allModules?.forEach((module, i) => {
      if (module.access.read) {
        if (module.sub_module_name) {
          if (!modulesFormated[module.module_name]) {
            modulesFormated[module.module_name] = {
              sortValue: i,

              icon: module.module_icon,

              main: [],
            };
          }

          console.log("module", module.page_route);
          modulesFormated[module.module_name].main.push({
            route: module.page_route,

            name: module.sub_module_name,
          });
        } else {
          modulesFormated[module.module_name] = {
            sortValue: i,

            icon: module.module_icon,

            main: module.page_route,
          };
        }
      }
    });

  console.log("ashittest", { modulesFormated });

  let sortedKeys = Object.keys(modulesFormated).sort(function (a, b) {
    return modulesFormated[a].sortValue - modulesFormated[b].sortValue;
  });

  console.log("sortedKeys", { sortedKeys });
  const menuIconClick = async () => {
    await props.changeCss(!props.isOpen);
  };

  const handleSubMenuClick = (e, type) => {
    let activeTab = "";
    if (type === "subMenu") {
      activeTab = e.target.innerText;
    } else {
      activeTab = e.target.innerText || e.target.parentNode.innerText;
    }

    console.log(activeTab, subMenuOpen, "currentUrlArr");

    if (
      (subMenuOpen == null || subMenuOpen != activeTab) &&
      menuTitle.includes(activeTab)
    ) {
      setSubMenuOpen(activeTab);
      handleActive(e, type);
    }
    if (activeTab == subMenuOpen) {
      setSubMenuOpen(null);
    }
  };

  const handleActive = async (event, type) => {
    let newActive = "";

    console.log("submenu123", type);
    if (type == "subMenu") {
      let newActiveArr = event.target.parentNode.children[0].href.split("/");

      newActive = newActiveArr[newActiveArr.length - 1];
    } else {
      let newActiveArr = event.target.href?.split("/");
      newActive = newActiveArr[newActiveArr?.length - 1];
    }

    if (!event.target.classList.value.includes("active")) {
      console.log("pops1234", newActive);
      await setActiveClassName(newActive);
      console.log("oiuyt", !event.target.classList.toggle("active"));
      event.target.classList.toggle("active");
      if (activePage) {
        console.log("ashi123", activePage);
        activePage.classList.remove("active");
      }
      setActivePage(event.target);
    }
  };

  const menuNamesCodesMapping = {
    create_audit: "Stock Audit",
    validate_audit: "Stock Audit",
   stock_variance_report: "Stock Audit",
    site_to_site: "Stock Movement Report",
    item_to_item: "Stock Movement Report",
    stock_ledger: "Reports",
    stock_closing_report: "Reports",
    stock_movement_report: "Reports",
    master_material: "Master",
    master_location: "Master",
    master_storage_location: "Master",
    master_user: "Master",
    control_ruleBook: "Control panel",
    control_additional_setting: "Control panel",
  };
  let currentUrlArr = window.location.href.split("/");
  console.log("currentUrlArr", currentUrlArr);

  const getActiveTabOpen = async () => {
    if (currentUrlArr.length > 0) {
      let currentTabName = "",
        subTabName = "";
      if (currentUrlArr.length > 4) {
        currentTabName = currentUrlArr[currentUrlArr.length - 2];
        subTabName = currentUrlArr[currentUrlArr.length - 1];
        // setSubMenuOpen(menuNamesCodesMapping[subTabName])
        // setActiveClassName(subTabName);
      } else {
        currentTabName = currentUrlArr[currentUrlArr.length - 1];
      }
      setActiveClassName(subTabName || currentTabName);
      setSubMenuOpen(menuNamesCodesMapping[subTabName || currentTabName]);
    }
  };

  useEffect(() => {
    if (
      subMenuOpen === null &&
      activeClassName === null &&
      activeClassName === undefined
    ) {
      getActiveTabOpen();
    }
  }, []);

  const isActive = (subMenuRoute) => {
    console.log("asdfg1234", subMenuRoute);

    switch (subMenuRoute) {
      case "/create-audit":
        return [
          "create-audit",
          "validate-audit",
          "stock-variance-report",
        ].includes(activeClassName);

      case "/site-to-site":
        return ["site_to_site", "item_to_item"].includes(activeClassName);

      case "/report/cop":
        return ["cop", "finishGood", "processOrder"].includes(activeClassName);

      case "/process_order/reqslip":
        return ["reqslip", "activereqslip", "invoice"].includes(
          activeClassName
        );

      case "/process_order/create":
        return ["create", "create_process_order", "details"].includes(
          activeClassName
        );

      case "/manpower_management/manpower":
        return ["manpower", "tag", "tagone"].includes(activeClassName);

      case "/manpower_management/ratecard_agency":
        return [
          "ratecard_agency",

          "tagRateCard",

          "editratecard",

          "editagencyratecard",
        ].includes(activeClassName);

      case "/process_input/machine":
        return activeClassName == "machine";

      case "/process_input/process_steps":
        return activeClassName == "process_steps";

      case "/bom":
        return ["bom", "activebom", "bomdetails"].includes(activeClassName);

      default:
        break;
    }

    ["bom", "activebom", "bomdetails"].includes(activeClassName);
  };

  console.log("modul1234", modulesFormated);
  return (
    <>
      <ProSidebar collapsed={menuCollapse}>
        {/*className = "sidebar"*/}

        <SidebarHeader>
          {/* small and big change using menucollapse state */}
          {menuCollapse ? (
            <div className="ZarvisLogoName">
              <img src={ZarvisLogo} alt="logo" />
              <div className="MenuArrow" onClick={menuIconClick}>
                {/* changing menu collapse icon on click */}
                {menuCollapse ? (
                  <img src={barchart} className="sidebar-menu" />
                ) : (
                  <img src={barchart} className="sidebar-menu" />
                )}
              </div>
            </div>
          ) : (
            <div className="ZarvisLogoName">
              <img src={ZarvisLogo} alt="logo" />
              <h1 className="Zarvistext"> Inventory Portal </h1>
              <div className="MenuArrow" onClick={menuIconClick}>
                {/* changing menu collapse icon on click */}
                {menuCollapse ? (
                  <img src={barchart} className="sidebar-menu" />
                ) : (
                  <img src={barchart} className="sidebar-menu" />
                )}
              </div>
            </div>
          )}
        </SidebarHeader>
        <div className="SideBarLinks customSidebar">
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem
                onClick={(e) => handleSubMenuClick(e, null)}
                icon={<img src={HomeIcon} alt="homeIcon" />}
              >
                Dashboard
                <Link to="/dashboard" onClick={(e) => handleActive(e, null)} />
              </MenuItem>
            </Menu>
          </SidebarContent>
          <Menu iconShape="square">
            {sortedKeys.map((key, id) => {
              return Array.isArray(modulesFormated[key].main) ? (
                <SubMenu
                  title={key}
                  icon={
                    // <img src={modulesFormated[key].icon} id="menu-sub-item" />
                    <img src={ProcessInputIcon} id="menu-sub-item" />
                  }
                  onClick={(e) => handleSubMenuClick(e, "subMenu")}
                  open={subMenuOpen === key ? true : false}
                >
                  {modulesFormated[key].main.map((subMenu, ind) => {
                    return (
                      <MenuItem
                        id={
                          isActive(subMenu.route)
                            ? "pro-item-content-active"
                            : null
                        }
                      >
                        {subMenu.name}

                        <Link
                          to={subMenu.route}
                          onClick={(e) => handleActive(e, "subMenu")}
                        />
                      </MenuItem>
                    );
                  })}
                </SubMenu>
              ) : (
                <MenuItem
                  onClick={(e) => handleSubMenuClick(e, null)}
                  id={
                    isActive(modulesFormated[key].main)
                      ? "pro-item-content-active"
                      : null
                  }
                >
                  <img src={modulesFormated[key].icon} />

                  {key}

                  <Link to={modulesFormated[key].main} />
                </MenuItem>
              );
            })}
          </Menu>
        </div>
        <SidebarFooter></SidebarFooter>
      </ProSidebar>
    </>
  );
};

export default Sidebar;
