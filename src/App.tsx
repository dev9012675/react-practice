import NavBar from "./pages/NavBar";
import "./App.css";
import AuthProvider from "./providers/authProvider";
import Routes from "./routes";

function App() {
  const appUrl = import.meta.env.VITE_APP_URL;
  console.log(`App URL:${appUrl}`);
  return (
    <AuthProvider>
      <NavBar />
      <Routes />
    </AuthProvider>
  );
}

export default App;
