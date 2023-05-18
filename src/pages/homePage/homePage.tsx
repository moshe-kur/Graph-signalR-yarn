import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../../components/logoutButton/logoutButton";

const HomePage = () => {
  const { user } = useAuth0();

  return (
    <div className="App">
      <h2>{user?.name}</h2>
      <LogoutButton></LogoutButton>
    </div>
  );
};

export default HomePage;
