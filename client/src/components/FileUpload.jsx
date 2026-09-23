import { useState } from "react";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
      setMessage("");
      setPreview([]);
      setRowCount(0);
    }
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

  return (
    <div className="upload-section">
      <h2>Upload Dataset</h2>

      <p>Select a CSV file to process and preview.</p>

      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
      />

      {file && (
        <div className="file-info">
          <p>
            <strong>File Name:</strong> {file.name}
          </p>

          <p>
            <strong>File Size:</strong>{" "}
            {(file.size / (1024 * 1024)).toFixed(2)} MB
          </p>

          <button
            onClick={handleUpload}
            disabled={loading}
          >
            {loading ? "Processing..." : "Upload Dataset"}
          </button>
        </div>
      )}

      {message && (
        <p className="upload-message">
          {message}
        </p>
      )}

      {rowCount > 0 && (
        <div className="dataset-info">
          <h3>Dataset Information</h3>

          <p>
            Total Rows: <strong>{rowCount}</strong>
          </p>

          <p>
            Preview Rows:{" "}
            <strong>{preview.length}</strong>
          </p>
        </div>
      )}

      {preview.length > 0 && (
        <div className="preview-section">
          <h2>Dataset Preview</h2>

          <p>
            Showing the first {preview.length} rows.
          </p>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  {Object.keys(preview[0]).map((column) => (
                    <th key={column}>{column}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {preview.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map(
                      (value, columnIndex) => (
                        <td key={columnIndex}>
                          {value}
                        </td>
                      )
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default FileUpload;