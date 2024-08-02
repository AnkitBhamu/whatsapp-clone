import React from "react";
import { Call } from "@mui/icons-material";
import "../styles/VideoCall.css";

export default function CallOffer(props) {
  return (
    <div className="w-screen h-screen flex justify-center items-center fixed top-0 left-0 z-50">
      <div className="flex flex-col w-96 h-96 rounded-2xl bg-[#332c2c] items-center justify-center text-white">
        <div className="h-[200px]">
          <div className="call-container rounded-full border-white border flex justify-center items-center">
            <div className="w-28 h-28 rounded-full bg-green-700 text-white font-bold flex justify-center items-center">
              <Call
                className="call-icon"
                style={{ width: "56px", height: "56px" }}
              />
            </div>
          </div>
        </div>
        <div>+9868431722</div>
        <div className="flex gap-10 w-full my-3 items-center justify-center">
          <button
            className="h-10 w-28 bg-[green] rounded-md"
            onClick={() => {
              props.popup(false);
              props.setAction("answer");
              props.video_call_init(true);
            }}
          >
            Accept
          </button>
          <button
            className="h-10 w-28 bg-[red] rounded-md"
            onClick={() => {
              props.popup(false);
            }}
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
