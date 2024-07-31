import CheckUserLogin from "./Components/CheckUserLogin";
import ConnectToServer from "./Components/ConnectToServer";
import Login from "./Components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VideoCall from "./Components/VideoCall";

function App() {
  // return <ConnectToServer />;
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" Component={Login}></Route>
        <Route
          exact
          path="/user"
          Component={() => (
            <CheckUserLogin>
              <ConnectToServer />
            </CheckUserLogin>
          )}
        />
        <Route exact path="/login" Component={Login} />
        <Route exact path="/videocall" Component={VideoCall}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
