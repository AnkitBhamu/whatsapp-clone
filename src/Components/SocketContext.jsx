import React, { createContext } from "react";

let servercontext = createContext();
function SocketContext(props) {
  return (
    <div>
      <servercontext.Provider value={props.serverconn}>
        {props.children}
      </servercontext.Provider>
    </div>
  );
}

export { servercontext, SocketContext };
