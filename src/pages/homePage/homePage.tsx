import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../../components/logoutButton/logoutButton";
import SignalR from "../../components/signalR/chatSignalR";
import Navbar from "../../components/navbar/navbar";
import Primereact from "../../components/primereact/primereact";
import { Route, Routes } from "react-router-dom";
import Loading from "../../components/loading/loading";
import RecoilComponent from "../../components/recoil/recoilComponent";

const HomePage = () => {
  const { user } = useAuth0();

  return (
    <div className="App">
      <Navbar />
      <h2>{user?.name}</h2>
      <LogoutButton />
      <div>
        <RecoilComponent></RecoilComponent>
      </div>
      <SignalR />
      <div>
        <Primereact />
      </div>
    </div>
  );
};

export default HomePage;
