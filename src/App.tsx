import { useAuth0 } from "@auth0/auth0-react";
import WelcomePage from "./pages/welcomePage/welcomePage";
import "./App.css";
import HomePage from "./pages/homePage/homePage";

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  if (isAuthenticated) {
    //add to DB
    return <HomePage></HomePage>;
  } else {
    return <WelcomePage></WelcomePage>;
  }
}

export default App;
