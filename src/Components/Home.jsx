import React, { useState } from "react";
import Chat from "./Chat";
import Chats from "./Chats";
import "../styles/Home.css";

export default function Home() {
  let [chatselected, setChatselected] = useState("");
  return (
    <div className=" home_main grid grid-cols-[375px_1fr] pl-5 w-screen max-sm:grid-cols-[1fr]">
      <Chats chatselectorFn={setChatselected} />
      <Chat chat_person={chatselected} />
    </div>
  );
}
