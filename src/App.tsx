import { useAuth0 } from "@auth0/auth0-react";
import WelcomePage from "./pages/welcomePage/welcomePage";
import HomePage from "./pages/homePage/homePage";
import { Routes, Route } from "react-router-dom";
import SignalR from "./components/signalR/chatSignalR";
import Loading from "./components/loading/loading";
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
//core
import "primereact/resources/primereact.min.css";
//icon
import "primeicons/primeicons.css";
import "./App.css";
import { RecoilRoot } from "recoil";

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <Loading></Loading>;
  }
  if (isAuthenticated) {
    //add to DB
    return (
      <RecoilRoot>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signal" element={<SignalR />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </RecoilRoot>
    );
  } else {
    return <WelcomePage></WelcomePage>;
  }
}

export default App;
