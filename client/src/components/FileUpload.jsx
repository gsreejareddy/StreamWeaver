import { useState } from "react";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
      setMessage("");
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
      const response = await fetch(
        "http://localhost:5000/api/upload",
        {
          method: "POST",
          body: formData
        }
      );

      const data = await response.json();

      setMessage(data.message);
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
    </div>
  );
}

export default FileUpload;