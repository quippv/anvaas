import React, { useState } from "react";
import classes from "./Layout.module.css";

import Toolbar from "../../components/Toolbar/Toolbar";
import Navigation from "../../components/Navigation/Navigation";

const Layout = (props) => {
  const [openSideBar, setOpenSideBar] = useState(false);

  const openSideBarHandler = () => {
    setOpenSideBar(!openSideBar);
  };

  return (
    <div className={classes.Layout}>
      <Navigation
        open={openSideBar}
        closed={openSideBarHandler}
        gotoHandler={props.gotoHandler}
      />
      <div className={classes.Main}>
        <Toolbar
          openSideBar={openSideBarHandler}
          signIn={props.signIn}
          signUp={props.signUp}
        />
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
