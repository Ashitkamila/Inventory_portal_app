import React from 'react';
import { NavLink,useLocation } from 'react-router-dom';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const MenuItem = (props) => {
    const { name, subMenus, iconClassName, onClick, to, exact, } = props;
    const [expand, setExpand] = React.useState(false);
   
    const location = useLocation();


    return (
        <li onClick={onClick} className="mt-2">
            <NavLink
                exact
                to={to}
                onClick={() => setExpand(!expand)}
                className="menu-item"
            >
                <div className="menu-item-icon">
                    <i className={iconClassName}></i>
                </div>
                <span >
                    <span>{name}</span>
                    {
                        name === "Master" || name === "Transaction" ? (
                            <span>
                                {
                                    expand ? (<KeyboardArrowUpIcon/>) : (<KeyboardArrowDownIcon/>)


                                }
                            </span>
                        ) : ""
                    }
                </span>
            </NavLink>
            {
                subMenus && subMenus.length > 0 ? (
                    <ul className={`sub-menu ${expand ? "active" : ""}`}>
                        {
                            subMenus.map((menu) =>
                                <li key={menu.id}>
                                    <NavLink className="nav-link" to={menu.to}>
                                        <span className="menu-item-icon" style={{position:"relative",right:"1rem"}}>
                                            <i className={menu.idolClassName}></i>
                                        </span>
                                        <span>{menu.name}</span>
                                    </NavLink>
                                </li>
                            )
                        }
                    </ul>
                ) : null
            }

        </li>
    )
}
export default MenuItem;