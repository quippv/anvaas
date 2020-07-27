import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../../../store/actions/index";

const Logout = (props) => {
  const { onAuthLogout } = props;

  useEffect(() => {
    onAuthLogout();
  }, [onAuthLogout]);

  return <Redirect to="/" />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthLogout: () => dispatch(actions.authLogout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
