import Body from "./components/Body";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Friends from "./components/Friends";
import ErrorPage from "./components/ErrorPage";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter baseName="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Friends />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
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
