import { useState } from "react";
import Login from "./components/Login";
import FileUpload from "./components/FileUpload";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="dashboard">
      <header className="header">
        <div>
          <h1>StreamWeaver</h1>
          <p>High-Throughput No-Code ETL Pipeline</p>
        </div>

        <button onClick={handleLogout}>
          Logout
        </button>
      </header>

      <main className="main-content">
        <h2>Dashboard</h2>

        <p>
          Upload your CSV dataset and preview the data.
        </p>

        <FileUpload />
      </main>
    </div>
  );
}

export default App;