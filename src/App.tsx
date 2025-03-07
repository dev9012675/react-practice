import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import NavBar from "./pages/NavBar";
import "./App.css";
import AuthProvider from "./providers/authProvider";
import Routes from "./routes";

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
