import React, { useState, useEffect } from "react";
import axios from "axios";

const CvModal = ({ onCancel, formId }) => {
  const [error, setError] = useState(null);
  const [cvFile, setcvFile] = useState([]);

  const fetchCvFile = async () => {
    try {
      const response = await axios.get(`https://localhost:44391/api/FileUpload/${formId}`);
      setcvFile(response.data || []);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchCvFile();
  }, []);

  const cvUrl = `https://localhost:44391/uploads/${cvFile.fileName}`;
  
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div
        className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg"
        style={{ width: "90%", maxWidth: "1200px" }}
      >
        <h2 className="mb-4 text-xl font-semibold text-gray-800">CV</h2>
        {cvFile.fileName ? (
          <iframe
            src={cvUrl}
            style={{ width: "100%", height: "80vh", border: "none" }}
          ></iframe>
        ) : (
          <p className="text-gray-500">CV Not Found</p>
        )}
        <div className="flex justify-end mt-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CvModal;
