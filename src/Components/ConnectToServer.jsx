import React, { useEffect, useMemo, useState } from "react";
import Home from "./Home";
import { io } from "socket.io-client";
import { SocketContext } from "./SocketContext";
import { getCookie } from "react-use-cookie";
import Msgstore from "./Msgstore";

export default function ConnectToServer() {
  let [pending_status, setStatus] = useState(false);
  console.log("pending status called!!", pending_status);
  let cookie = getCookie("user-details");

  let sock = useMemo(
    () =>
      io("http://localhost:9000", {
        auth: {
          mobile: JSON.parse(cookie).mobile,
        },
      }),
    []
  );

  useEffect(() => {
    sock.on("pending_msgs", (msgs) => {
      console.log("setting pending_msgs!!", msgs);
      let chats = JSON.parse(localStorage.getItem("chats"));
      msgs.forEach((item) => {
        if (chats[item.sender]) {
          chats[item.sender].msgs.push(item);
          chats[item.sender].unread += 1;
        } else {
          chats[item.sender] = {
            msgs: [item],
            unread: 1,
          };
        }
      });

      // update localstorage with new chats
      if (msgs.length > 0) {
        localStorage.setItem("chats", JSON.stringify(chats));
        // get the updated chats from storage.
        console.log(
          "chats in pending msgs is : ",
          JSON.parse(localStorage.getItem("chats"))
        );
        setStatus(true);
      }
    });
  }, []);

  return (
    <div>
      <SocketContext serverconn={sock}>
        <Msgstore pending_status={pending_status}>
          <Home />
        </Msgstore>
      </SocketContext>
    </div>
  );
}
