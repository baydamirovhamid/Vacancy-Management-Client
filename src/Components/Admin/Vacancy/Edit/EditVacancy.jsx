import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const EditVacancy = ({ editVacancyId, onCancelEdit, onSaveEdit, selectedVacancy }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: selectedVacancy.id,
    title: selectedVacancy.title,
    description: selectedVacancy.description,
    startDate: selectedVacancy.startDate,
    endDate: selectedVacancy.endDate,
    isActive: selectedVacancy.isActive,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedVacancy) {
      setFormData({
        id: selectedVacancy.id,
        title: selectedVacancy.title,
        description: selectedVacancy.description,
        startDate: selectedVacancy.startDate,
        endDate: selectedVacancy.endDate,
        isActive: selectedVacancy.isActive,
      });
    }
  }, [selectedVacancy]);

  const handleInputChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.put(
        `https://localhost:44391/api/Vacancies/update-vacancy`,
        formData
      );
      console.log("Data posted:", response.data);
      toast.success("Vacancy updated successfully!");
      onSaveEdit(); // Inform parent to close modal
    } catch (error) {
      setError(error.message);
      toast.error("Error posting data.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center fixed inset-0 backdrop-blur-xl z-10 items-center bg-[rgba(29,29,29,0.3)]">
      <div className="mx-0 h-fit w-1/3 bg-white rounded-lg p-5">
        <div className="flex flex-col gap-5 items-center">
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
            rows="5"
            required
            style={{ resize: "none" }}
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
            <button type="submit" className="btn btn-success mt-3">
              {isLoading ? "Submitting..." : "Submit"}
            </button>
           
          </form>
          <div className="w-full justify-center flex gap-2 mt-3">
          <button
              onClick={onCancelEdit}
              className="w-auto  px-4 py-2 font-medium rounded-md duration-200
              bg-red-600 hover:bg-neutral-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditVacancy;

// VacancyList Component

