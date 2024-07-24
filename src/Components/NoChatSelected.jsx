import React from "react";
import logo from "../Assets/whatsapp_logo.svg";

export default function NoChatSelected() {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="flex flex-col items-center gap-3">
        <img src={logo} className="w-24" alt="" />
        <div className="text-[#00000069]">
          Send and Receive messages without keeping your phone online
        </div>
      </div>
    </div>
  );
}
