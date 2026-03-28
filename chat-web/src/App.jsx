import Body from "./components/Body";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Friends from "./components/Friends";
import Chat from "./components/Chat";
import ErrorPage from "./components/ErrorPage";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Body />}>
              <Route index element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/friends" element={<Friends />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/chat/:chatId" element={<Chat />} />
              <Route path="*" element={<ErrorPage code={404} />} />
            </Route>
            <Route path="*" element={<ErrorPage code={404} />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
