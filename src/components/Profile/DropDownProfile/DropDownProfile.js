import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./DropDownProfile.module.css";

const DropDownProfile = () => {
  return (
    <div className={classes.DropDownProfile}>
      <NavLink to="/purchase" activeClassName={classes.active}>
        Purchase
      </NavLink>
      <NavLink to="/wishlist" activeClassName={classes.active}>
        Wishlist
      </NavLink>
      <NavLink to="/setting" activeClassName={classes.active}>
        Setting
      </NavLink>
      <NavLink to="/logout" activeClassName={classes.active}>
        Logout{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="18"
          height="18"
          viewBox="0 0 172 172"
          style={{ fill: "#000000", marginLeft: 10 }}
        >
          <g
            fill="none"
            fillRule="nonzero"
            stroke="none"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeMiterlimit="10"
            strokeDasharray=""
            strokeDashoffset="0"
            fontFamily="none"
            fontWeight="none"
            fontSize="none"
            textAnchor="none"
            style={{ mixBlendMode: "normal" }}
          >
            <path d="M0,172v-172h172v172z" fill="none"></path>
            <g fill="rgba(0, 0, 0, 0.48)" className={classes.Fill}>
              <path d="M86,6.88c-26.17935,0 -49.42112,12.74611 -63.81469,32.36422c-0.77173,0.98775 -0.94516,2.31706 -0.45269,3.46975c0.49247,1.15269 1.57289,1.94631 2.82011,2.0715c1.24722,0.12519 2.46381,-0.43787 3.17555,-1.46969c13.14707,-17.91917 34.32338,-29.55578 58.27172,-29.55578c39.9368,0 72.24,32.3032 72.24,72.24c0,39.9368 -32.3032,72.24 -72.24,72.24c-23.94833,0 -45.12093,-11.63602 -58.27172,-29.55578c-0.71174,-1.03182 -1.92834,-1.59488 -3.17555,-1.46969c-1.24722,0.12519 -2.32764,0.91881 -2.82011,2.0715c-0.49247,1.15269 -0.31904,2.482 0.45269,3.46975c14.39673,19.61752 37.63534,32.36422 63.81469,32.36422c43.6552,0 79.12,-35.4648 79.12,-79.12c0,-43.6552 -35.4648,-79.12 -79.12,-79.12zM37.77281,55.0064c-0.89371,0.02663 -1.74194,0.40014 -2.365,1.04141l-27.21766,27.21765c-0.85429,0.65168 -1.35506,1.66508 -1.35374,2.73956c0.00132,1.07448 0.50457,2.08664 1.36046,2.73623l27.21094,27.21094c0.86281,0.89867 2.14404,1.26068 3.34956,0.94641c1.20552,-0.31427 2.14696,-1.2557 2.46122,-2.46122c0.31427,-1.20552 -0.04774,-2.48675 -0.94641,-3.34956l-21.64781,-21.64781h74.25562c1.24059,0.01754 2.39452,-0.63425 3.01993,-1.7058c0.62541,-1.07155 0.62541,-2.39684 0,-3.46839c-0.62541,-1.07155 -1.77935,-1.72335 -3.01993,-1.7058h-74.25562l21.64781,-21.64781c1.01742,-0.98897 1.32333,-2.50111 0.77034,-3.80778c-0.55299,-1.30667 -1.85145,-2.13983 -3.26971,-2.098z"></path>
            </g>
          </g>
        </svg>
      </NavLink>
    </div>
  );
};

export default DropDownProfile;
