import React, { useContext, useEffect, useMemo, useState } from "react";
import image from "../Assets/Oval.png";
import "../styles/Chats.css";
import call from "../Assets/Call.svg";
import chatsIcon from "../Assets/chats.svg";
import settings from "../Assets/settings.svg";
import { Add } from "@mui/icons-material";
import { msgStore } from "./Msgstore";

export default function Chats(props) {
  let [msgs, setmsgs, addmsg] = useContext(msgStore);
  let [newChatselected, setselected] = useState(false);

  function addNewContact() {
    let mob = document.querySelector(".new_mob").value;
    console.log("mob is : ", mob);
    msgs[mob] = { msgs: [], unread: 0 };
    localStorage.setItem("chats", JSON.stringify(msgs));
    setselected(false);
    setmsgs({ ...msgs });
  }

  return (
    <div className="h-screen pr-[3px] overflow-hidden">
      <div className=" font-myfont text-black font-bold text-[40px] h-20 flex items-center justify-between pr-2">
        <div>Chats</div>
        <div className=" text-white relative">
          <div
            className="flex h-10 w-10 rounded-full  items-center  bg-[#1DAB61] justify-center"
            onClick={() => {
              setselected(!newChatselected);
            }}
          >
            <Add />
          </div>

          {newChatselected ? (
            <div className=" bg-[#f0e9e9] shadow-[6px_6px_6px_#00000061] new_chat_popup absolute z-[100] top-[43px] left-[-224px] w-[250px] text-[12px] flex flex-col gap-5 rounded-[12px] px-3 py-3">
              <input
                type="text"
                placeholder="Enter mobile"
                className="new_mob h-10 rounded-[10px] px-3 py-3 text-black placeholder:text-black"
              />
              <button
                onClick={addNewContact}
                className="new_name h-10 bg-[green] flex justify-center items-center rounded-[10px] px-3 py-3"
              >
                Submit
              </button>
            </div>
          ) : null}
        </div>
      </div>
      {/* chats section */}
      <div className="pt-5 h-[calc(100%_-_140px)] overflow-y-scroll">
        {Object.entries(msgs).map((item, index) => (
          <div
            className="chat w-full flex gap-3 mb-2"
            key={index}
            onClick={() => {
              props.chatselectorFn(item[0]);
              msgs[item[0]].unread = 0;
              let new_msgs = { ...msgs };
              localStorage.setItem("chats", JSON.stringify(msgs));
              setmsgs(new_msgs);
            }}
          >
            <div className="w-[50px] h-[50px] shrink-0">
              <img className="h-full w-full rounded-full" src={image} alt="" />
            </div>
            <div className="grow font-myfont">
              <div className="font-[600] flex justify-between pr-2">
                <div>{item[0]}</div>
                <div className="font-myfont text-[#0000008f]">
                  {item[1].msgs.length > 0
                    ? item[1].msgs[item[1].msgs.length - 1].time
                    : null}
                </div>
              </div>
              <div className="flex gap-2 pr-2">
                <div className="text-[#8E8E93] font-myfont mb-3 max-h-[60px] line-clamp-2">
                  {item[1].msgs.length > 0
                    ? item[1].msgs[item[1].msgs.length - 1].msg
                    : "Start a new chat"}
                </div>
                {item[1].unread ? (
                  <div className="bg-[#1DAB61] flex items-center justify-center font-myfont text-white w-20 h-5 rounded-[5px]">
                    <div>{item[1].unread}</div>
                  </div>
                ) : null}
              </div>
              <div className="w-full h-[1px] bg-[#D9D9D9]"></div>
            </div>
          </div>
        ))}
      </div>

      {/* toolbar */}
      <div className=" h-[50px] flex justify-between w-full items-center px-2 pt-2 border-t-[1px] border-t-[#87707085]">
        <div className="flex flex-col h-10 gap-1">
          <img className="h-[20px]" src={call} alt="" />
          <div className="text-[#A4A2A1]">Call</div>
        </div>

        <div className="flex flex-col h-10 gap-1">
          <img className="h-[20px]" src={chatsIcon} alt="" />
          <div className="text-[#A4A2A1]">Chats</div>
        </div>

        <div className="flex flex-col h-10 gap-1">
          <img className="h-[20px]" src={settings} alt="" />
          <div className="text-[#A4A2A1]">Settings</div>
        </div>
      </div>
    </div>
  );
}
