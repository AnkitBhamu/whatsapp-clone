import React, { useRef } from "react";
import "../styles/Login.css";
import logo from "../Assets/whatsapp_logo.svg";
import call from "../Assets/whatsapp_call.svg";
import axios from "axios";
import reactUseCookie from "react-use-cookie";
import { useNavigate } from "react-router-dom";

export default function Login() {
  let mobile_ref = useRef();
  let name_ref = useRef();
  let [cookie, setcookie, delcookie] = reactUseCookie("user-details", "");
  let navigate = useNavigate();

  async function handleSubmit() {
    try {
      let response = await axios.post(
        "http://localhost:8080/api/user/register",
        {
          name: name_ref.current.value,
          mobile: mobile_ref.current.value,
        }
      );

      setcookie(JSON.stringify(response.data), {
        days: 10,
      });

      alert("User Registered Successfully!!");
      localStorage.setItem("chats", JSON.stringify({}));
      navigate("/user");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="login-main h-screen w-screen flex items-center justify-center">
      <div className="main-form-container flex flex-col items-center gap-2 px-3">
        <img src={logo} alt="" />
        <div className="font-myfont text-[40px] font-bold">
          Welcome to WhatsApp
        </div>
        <input
          type="text"
          ref={name_ref}
          placeholder="Full name"
          className="font-myfont text-[grey] outline-none h-[50px] w-full px-2 rounded-[5px] bg-[#F3F3F3]"
        />
        <input
          type="text"
          ref={mobile_ref}
          placeholder="Enter your mobile number"
          className="font-myfont text-[grey] outline-none h-[50px] w-full px-2 rounded-[5px] bg-[#F3F3F3]"
        />
        <button
          onClick={handleSubmit}
          className="w-[200px] bg-[#1EBE71] flex justify-center items-center text-white font-myfont h-[50px] rounded-[10px]"
        >
          Send
        </button>
      </div>
    </div>
  );
}
