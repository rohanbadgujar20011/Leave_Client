import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, BrowserRouter as Router } from "react-router-dom";
import AllRoute from "./AllRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./context/AuthContext";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <AllRoute />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
