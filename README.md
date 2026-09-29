# StreamWeaver

## High-Throughput No-Code ETL Pipeline

StreamWeaver is a web-based no-code ETL (Extract, Transform, Load) platform designed to help users upload, preview, transform, and process large datasets through a simple visual interface.

The project focuses on handling large CSV datasets efficiently without relying on traditional browser-based processing.

---

## 🚀 Project Goals

StreamWeaver aims to provide:

- Large CSV dataset upload
- Dataset preview
- Efficient CSV processing
- Stream-based data transformation
- Visual column mapping
- No-code data transformations
- Data validation
- Processing progress tracking
- Pipeline management
- Dataset history and analytics

---

## 🛠️ Technologies

### Frontend
- React
- Vite
- JavaScript
- CSS

### Backend
- Node.js
- Express.js
- Busboy
- csv-parser
- Node.js Streams

### Planned Technologies
- MongoDB
- WebSockets
- isolated-vm

---

## 📂 Project Structure

```text
StreamWeaver/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx
│   │   │   └── FileUpload.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── App.css
│   │
│   └── package.json
│
├── server/
│   ├── routes/
│   │   └── uploadRoutes.js
│   │
│   ├── server.js
│   └── package.json
│
└── README.md
