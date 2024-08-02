import React, { useContext, useEffect, useState } from "react";
import Chat from "./Chat";
import Chats from "./Chats";
import "../styles/Home.css";
import VideoCall from "./VideoCall";
import CallOffer from "./CallOffer";
import { servercontext } from "./SocketContext";

export default function Home() {
  let [chatselected, setChatselected] = useState("");
  let [videocallintiated, setvidinit] = useState(false);
  let [vidofferpopup, setpopup] = useState(false);
  let [action_type, setaction] = useState("");
  let [vid_offers, setOffers] = useState("");

  let server_sock = useContext(servercontext);

  useEffect(() => {
    //got the offer from the other clients
    server_sock.on("offers", async (vid_offers) => {
      console.log("We got video_offers from server..");
      setOffers(vid_offers);
      setpopup(true);
      setTimeout(() => {
        setpopup(false);
      }, 10000);
    });
  }, []);

  return (
    <>
      {vidofferpopup ? (
        <CallOffer
          video_call_init={setvidinit}
          setAction={setaction}
          popup={setpopup}
        />
      ) : null}
      {videocallintiated ? (
        <VideoCall
          person={chatselected}
          video_call_init={setvidinit}
          action_type={action_type}
          video_offers={action_type === "answer" ? vid_offers : null}
        />
      ) : (
        <div className=" home_main grid grid-cols-[375px_1fr] pl-5 w-screen max-sm:grid-cols-[1fr]">
          <Chats chatselectorFn={setChatselected} />
          <Chat
            chat_person={chatselected}
            video_call_init={setvidinit}
            setAction={setaction}
          />
          {/* <CallOffer /> */}
        </div>
      )}
    </>
  );
}
