import NavBar from "./pages/NavBar";
import "./App.css";
import AuthProvider from "./providers/authProvider";
import Routes from "./routes";

function App() {
  return (
    <AuthProvider>
      <NavBar />
      <Routes />
    </AuthProvider>
  );
}

export default App;
