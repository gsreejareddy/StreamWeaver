import { useState } from "react";
import Login from "./components/Login";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      return;
    }

    const fileName = selectedFile.name.toLowerCase();

    if (!fileName.endsWith(".csv")) {
      setFile(null);
      setMessage("Please select a CSV file.");
      return;
    }

    setFile(selectedFile);
    setMessage("");
    setPreview([]);
    setRowCount(0);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a CSV file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setMessage("Uploading and processing...");

      const response = await fetch(
        "http://localhost:5000/api/upload",
        {
          method: "POST",
          body: formData
        }
      );

      const data = await response.json();

      setMessage(data.message);
      setPreview(data.preview || []);
      setRowCount(data.rowCount || 0);
    } catch (error) {
      console.error(error);
      setMessage("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-layout">

      {/* Sidebar */}
      <aside className="sidebar">

        <div className="brand">
          <div className="brand-icon">S</div>

          <div>
            <h1>StreamWeaver</h1>
            <span>Data Platform</span>
          </div>
        </div>

        <nav className="sidebar-nav">

          <p className="nav-title">MAIN MENU</p>

          <button className="nav-item active">
            <span>⌂</span>
            Dashboard
          </button>

          <button className="nav-item">
            <span>⇄</span>
            Pipelines
          </button>

          <button className="nav-item">
            <span>▣</span>
            Datasets
          </button>

          <button className="nav-item">
            <span>◈</span>
            Analytics
          </button>

          <p className="nav-title">MANAGEMENT</p>

          <button className="nav-item">
            <span>◷</span>
            History
          </button>

          <button className="nav-item">
            <span>⚙</span>
            Settings
          </button>

        </nav>

        <div className="sidebar-bottom">

          <div className="help-card">
            <strong>Need Help?</strong>

            <p>
              Check your pipeline activity and dataset status.
            </p>
          </div>

          <button
            className="logout-button"
            onClick={handleLogout}
          >
            ↪ Logout
          </button>

        </div>

      </aside>

      {/* Main Content */}
      <main className="dashboard-content">

        {/* Top Bar */}
        <header className="topbar">

          <div>

            <p className="welcome-label">
              Dashboard
            </p>

            <h2>
              Welcome Back, Sreeja 👋
            </h2>

            <p className="welcome-text">
              Manage your datasets and ETL pipelines from one place.
            </p>

          </div>

          <div className="topbar-actions">

            <div className="profile">

              <div className="profile-avatar">
                S
              </div>

              <div>
                <strong>Sreeja</strong>
                <span>Data User</span>
              </div>

            </div>

          </div>

        </header>

        {/* Metrics */}
        <section className="metrics-grid">

          <div className="metric-card">

            <div className="metric-icon blue">
              ▣
            </div>

            <div>
              <p>Total Datasets</p>
              <h3>24</h3>
              <span className="metric-positive">
                +12% this month
              </span>
            </div>

          </div>

          <div className="metric-card">

            <div className="metric-icon purple">
              ≋
            </div>

            <div>
              <p>Rows Processed</p>
              <h3>5.2M</h3>
              <span className="metric-positive">
                +18% this month
              </span>
            </div>

          </div>

          <div className="metric-card">

            <div className="metric-icon orange">
              ⇄
            </div>

            <div>
              <p>Active Pipelines</p>
              <h3>8</h3>
              <span className="metric-neutral">
                2 running now
              </span>
            </div>

          </div>

          <div className="metric-card">

            <div className="metric-icon green">
              ✓
            </div>

            <div>
              <p>Success Rate</p>
              <h3>96%</h3>
              <span className="metric-positive">
                +3.2% this month
              </span>
            </div>

          </div>

        </section>

        {/* Workspace */}
        <section className="workspace-grid">

          {/* Upload Area */}
          <div className="main-workspace">

            <div className="section-heading">

              <div>

                <h3>
                  Upload Dataset
                </h3>

                <p>
                  Start a new data processing workflow.
                </p>

              </div>

              <span className="status-badge">
                Ready
              </span>

            </div>

            {/* Single Upload Box */}
            <div className="upload-dashboard-area">

              <div className="cloud-icon">
                ☁
              </div>

              <h3>
                Upload your dataset
              </h3>

              <p>
                Drag and drop your CSV file here,
                or select a file from your computer.
              </p>

              <input
                type="file"
                accept=".csv"
                id="dataset-file"
                onChange={handleFileChange}
                hidden
              />

              <label
                htmlFor="dataset-file"
                className="select-file-button"
              >
                Select File
              </label>

              <span className="upload-hint">
                Supported format: CSV • Maximum size: 5GB
              </span>

            </div>

            {/* Selected File */}
            {file && (

              <div className="selected-file-card">

                <div>

                  <strong>
                    {file.name}
                  </strong>

                  <span>
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </span>

                </div>

                <button
                  className="upload-action-button"
                  onClick={handleUpload}
                  disabled={loading}
                >
                  {loading
                    ? "Processing..."
                    : "Upload Dataset"}
                </button>

              </div>

            )}

            {/* Message */}
            {message && (

              <div className="upload-result">

                {message}

              </div>

            )}

            {/* Dataset Information */}
            {rowCount > 0 && (

              <div className="dataset-info">

                <h3>
                  Dataset Information
                </h3>

                <p>
                  Total Rows:
                  <strong> {rowCount}</strong>
                </p>

                <p>
                  Preview Rows:
                  <strong> {preview.length}</strong>
                </p>

              </div>

            )}

            {/* Preview */}
            {preview.length > 0 && (

              <div className="preview-section">

                <h3>
                  Dataset Preview
                </h3>

                <p>
                  Showing the first {preview.length} rows.
                </p>

                <div className="preview-table">

                  {Object.keys(preview[0]).map(
                    (column) => (
                      <div
                        className="preview-header"
                        key={column}
                      >
                        {column}
                      </div>
                    )
                  )}

                  {preview.map((row, index) => (

                    <div
                      className="preview-row"
                      key={index}
                    >

                      {Object.keys(preview[0]).map(
                        (column) => (

                          <div
                            className="preview-cell"
                            key={column}
                          >
                            {row[column]}
                          </div>

                        )
                      )}

                    </div>

                  ))}

                </div>

              </div>

            )}

          </div>

          {/* Pipeline Workspace */}
          <aside className="pipeline-panel">

            <div className="panel-heading">

              <div>

                <h3>
                  Pipeline Workspace
                </h3>

                <p>
                  Recent pipeline activity
                </p>

              </div>

              <span className="online-dot">
                ●
              </span>

            </div>

            <div className="pipeline-status">

              <div className="pipeline-status-icon">
                ⇄
              </div>

              <div>
                <strong>
                  CSV Processing
                </strong>

                <span>
                  Ready
                </span>
              </div>

              <div className="progress-small">
                <div className="progress-small-fill"></div>
              </div>

            </div>

            <div className="activity-list">

              <h4>
                Recent Activity
              </h4>

              <div className="activity-item">

                <div className="activity-icon success">
                  ✓
                </div>

                <div>

                  <strong>
                    Dataset processed
                  </strong>

                  <span>
                    online_food_delivery.csv
                  </span>

                  <small>
                    10 minutes ago
                  </small>

                </div>

              </div>

              <div className="activity-item">

                <div className="activity-icon upload">
                  ↑
                </div>

                <div>

                  <strong>
                    New dataset uploaded
                  </strong>

                  <span>
                    customer_data.csv
                  </span>

                  <small>
                    32 minutes ago
                  </small>

                </div>

              </div>

              <div className="activity-item">

                <div className="activity-icon process">
                  ⇄
                </div>

                <div>

                  <strong>
                    Pipeline completed
                  </strong>

                  <span>
                    Customer ETL Pipeline
                  </span>

                  <small>
                    1 hour ago
                  </small>

                </div>

              </div>

            </div>

            <button className="view-history-button">
              View Pipeline History →
            </button>

          </aside>

        </section>

      </main>

    </div>
  );
}

export default App;