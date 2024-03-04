import React from "react";
import {Navigate} from "react-router-dom";

function ProtectedAuthentication(props) {
  if (localStorage.getItem("userTokennote")) {
    return <Navigate to='/home' />;
  } else {
    return <>{props.children}</>;
  }
}

export default ProtectedAuthentication;
