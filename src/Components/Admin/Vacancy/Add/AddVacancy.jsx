import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const AddVacancy = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    isActive: true
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value, // Sets isActive as boolean
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:44391/api/Vacancies/create-vacancy",
        formData
      );
      console.log("Data posted:", response.data);
      navigate("/adminpanel/vacancies");
    } catch (error) {
      console.error("Error posting data:", error);
      setError(error.message);
    }
  };

  return (
    <div className="container-fluid">
     <div className="container min-h-screen mt-5">
     <h2 className="text-center">Add New Vacancy</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            onChange={handleInputChange}
            rows="4"
            style={{ resize: "none" }}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            className="form-control"
            id="startDate"
            name="startDate"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            className="form-control"
            id="endDate"
            name="endDate"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="isActive"
            name="isActive"
            checked={formData.isActive}
            onChange={handleInputChange}
          />
          <label className="form-check-label" htmlFor="isActive">
            Active
          </label>
        </div>
        <button type="submit" className="btn btn-success">
          Add Vacancy
        </button>
      </form>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
     </div>
    </div>
  );
};
