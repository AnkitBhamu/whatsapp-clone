import Chat from "./Components/Chat";
import Chats from "./Components/Chats";

function App() {
  return (
    <div className="grid grid-cols-[375px_1fr] pl-5 w-screen max-sm:grid-cols-[1fr]">
      <Chats />
      <Chat />
      {/* <div>Hello world!!</div> */}
    </div>
  );
}

export default App;
