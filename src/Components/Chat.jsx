import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import image from "../Assets/Oval.png";
import video_call from "../Assets/Video_Call.svg";
import audio_call from "../Assets/Call.svg";
import "../styles/Chat.css";
import { AttachFile, Send, InsertEmoticon } from "@mui/icons-material";
import { servercontext } from "./SocketContext";
import { getCookie } from "react-use-cookie";
import NoChatSelected from "./NoChatSelected";
import { msgStore } from "./Msgstore";

export default function Chat(props) {
  let server_sock = useContext(servercontext);
  let [msgs, setmsgs, addmsg] = useContext(msgStore);
  let myNumber = useMemo(() => JSON.parse(getCookie("user-details")).mobile);

  function sendMessage() {
    let msg = document.querySelector(".msg_box").value;
    if (!msg) return;
    let date = new Date();
    let hours = date.getHours().toFixed(0).toString();
    let mins = date.getMinutes().toFixed(0).toString();
    let am_pm = hours >= 0 && hours < 12 ? "AM" : "PM";
    addmsg(
      {
        msg: msg,
        time: (hours % 12) + ":" + mins + " " + am_pm,
        sender: myNumber,
        receiver: props.chat_person,
      },
      props.chat_person
    );
    server_sock.emit("msg", {
      msg: msg,
      time: (hours % 12) + ":" + mins + " " + am_pm,
      sender: myNumber,
      receiver: props.chat_person,
    });

    let chat_container_inner = document.querySelector(".chat-container-inner");
    let chat_container = document.querySelector(".chat-container");
    if (chat_container) {
      chat_container.scrollBy(
        0,
        chat_container_inner.getBoundingClientRect().height + 10000
      );
    }
  }

  return (
    <div className=" chat-main h-screen max-sm:hidden">
      {props.chat_person ? (
        <>
          <div className="profile_details flex h-20  bg-[#F6F6F6] items-center px-4 gap-3">
            <img className="h-10 w-10 rounded-full" src={image} alt="" />

            <div className="h-20 flex flex-col justify-center">
              <div className="font-myfont font-[600]">{props.chat_person}</div>
              <div className="font-myfont text-[#8E8E93]">
                Tap here to get contact info
              </div>
            </div>

            <div className="flex grow gap-4 pr-3 justify-end items-center h-20">
              <img src={video_call} className="w-[24px]" alt="" />
              <img src={audio_call} className="w-[20px]" alt="" />
            </div>
          </div>
          {/* chat container */}
          <div className="h-[calc(100%_-_130px)] chat-container pt-3 px-6 overflow-hidden overflow-y-scroll scroll-smooth">
            <div className="chat-container-inner h-max">
              {msgs[props.chat_person].msgs.map((item, index) =>
                item.sender === myNumber ? (
                  <div
                    className="my-chat flex justify-end items-center mb-3"
                    key={index}
                  >
                    <div className="bg-[#DCF7C5] max-w-80 rounded-lg py-1 px-2">
                      <div className="font-myfont">{item.msg}</div>
                      <div className="text-[12px] font-myfont text-[#000000] opacity-60 flex justify-end">
                        {item.time}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="my-chat flex  items-center mb-3" key={index}>
                    <div className="bg-[#FAFAFA] max-w-80 rounded-lg py-1 px-2">
                      <div className="font-myfont">{item.msg}</div>
                      <div className="text-[12px] font-myfont text-[#000000] opacity-60 flex justify-end">
                        {/* {item.time} */}
                        {item.time}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* footer section */}
          <div className="flex h-[50px] items-center px-3 py-1 gap-3 bg-[#F6F6F6]">
            <div className="smiley">
              <InsertEmoticon />
            </div>
            {/* <div className="attach-files rotate-45">
          <AttachFile />
        </div> */}
            <input
              type="text"
              className=" msg_box grow h-full font-myfont placeholder:focus:outline-none px-2 outline-none bg-[#F6F6F6]"
              placeholder="Type a message"
            />
            <div className="send_icon" onClick={sendMessage}>
              <Send />
            </div>
          </div>
        </>
      ) : (
        <NoChatSelected />
      )}
    </div>
  );
}
