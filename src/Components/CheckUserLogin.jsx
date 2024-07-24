import React, { useEffect } from "react";
import { getCookie } from "react-use-cookie";
import { useNavigate } from "react-router-dom";

export default function CheckUserLogin(props) {
  let navigate = useNavigate();
  let cookie = getCookie("user-details");
  useEffect(() => {
    if (!cookie) {
      console.log("no cookie is there!!");
      navigate("/login", { replace: true });
    }
  }, []);
  return <div>{cookie ? props.children : null}</div>;
}
