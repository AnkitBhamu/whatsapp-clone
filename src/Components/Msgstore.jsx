import { useContext, useEffect, useState, createContext } from "react";
import { servercontext } from "./SocketContext";

let msgStore = createContext();

export default function Msgstore(props) {
  let [msgs, setmsgs] = useState(JSON.parse(localStorage.getItem("chats")));
  let server_sock = useContext(servercontext);

  //   update msgs if any of pending msgs completes
  useEffect(() => {
    setmsgs(JSON.parse(localStorage.getItem("chats")));
  }, [props.pending_status]);

  //   add messages to localstorage
  function addmsg(data, mobile) {
    if (msgs[mobile]) {
      msgs[mobile].msgs = [...msgs[mobile].msgs, data];
    } else {
      msgs[mobile] = { msgs: [data], unread: 0 };
    }
    localStorage.setItem("chats", JSON.stringify(msgs));
    let new_chats = { ...msgs };
    setmsgs(new_chats);
  }

  //   registering the event handler for the first time
  useEffect(() => {
    server_sock.on("msg", (msg) => {
      addmsg(msg, msg.sender);
      let chat_container_inner = document.querySelector(
        ".chat-container-inner"
      );
      let chat_container = document.querySelector(".chat-container");
      chat_container.scrollBy(
        0,
        chat_container_inner.getBoundingClientRect().height + 10000
      );
    });
  }, []);

  return (
    <msgStore.Provider value={[msgs, setmsgs, addmsg]}>
      {props.children}
    </msgStore.Provider>
  );
}

export { msgStore, Msgstore };
