import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UploadCvModal = ({ onCancelUpload, onSaveUpload, formId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Store the selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }

    try {
      setIsLoading(true);

      // Prepare FormData to send
      const formDataToSend = new FormData();
      console.log(formId);
      
      formDataToSend.append("applicationFormId", formId);
      formDataToSend.append("file", file);

      // Debugging: Check the FormData contents

      // Send the data via axios POST request
      const response = await axios.post(
        "https://localhost:44391/api/FileUpload/upload",
        formDataToSend
      );

      console.log("Data posted:", response.data);
      toast.success("File uploaded successfully!");
        navigate("/home");
    } catch (error) {
      console.error('Upload Error:', error.response?.data?.message || error.message);
      toast.error(`Error uploading the file:${error.response?.data?.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center fixed inset-0 backdrop-blur-xl z-10 items-center bg-[rgba(29,29,29,0.3)]">
      <div className="mx-0 h-fit w-1/3 bg-white rounded-lg p-5">
        <div className="flex flex-col gap-5 items-center">
          <div className="flex flex-col gap-1">
            <form onSubmit={handleSubmit}>
              <div className="form-group mt-3">
                <label htmlFor="file">Upload CV</label>
                <input
                  type="file"
                  name="file"
                  id="file"
                  onChange={handleFileChange}
                  className="form-control"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary mt-3">
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadCvModal;
