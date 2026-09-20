import { useState } from "react";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState([]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
      setMessage("");
      setPreview([]);
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
    } catch (error) {
      console.error(error);
      setMessage("Upload failed.");
    }
  };

  return (
    <div>
      <h2>Upload Dataset</h2>

      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
      />

      {file && (
        <div>
          <p>File Name: {file.name}</p>

          <p>
            File Size:{" "}
            {(file.size / (1024 * 1024)).toFixed(2)} MB
          </p>

          <button onClick={handleUpload}>
            Upload
          </button>
        </div>
      )}

      {message && <p>{message}</p>}

      {preview.length > 0 && (
        <div>
          <h2>Dataset Preview</h2>

          <p>
            Showing first {preview.length} rows
          </p>

          <table border="1">
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
                  {Object.values(row).map((value, columnIndex) => (
                    <td key={columnIndex}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default FileUpload;