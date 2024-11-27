import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const DeleteVacancy = ({ deleteVacancyId, onCancelEdit, onSaveEdit }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const handleSubmit = async (id) => {
    setIsLoading(true);
    console.log(id);

    try {
      const response = await axios.delete(
        `https://localhost:44391/api/Vacancies/${id}`
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
          <form onSubmit={() => handleSubmit(deleteVacancyId)}>
            <div>Are you sure to delete?</div>
            <div className="w-full justify-center flex gap-2 mt-3">
          <button type="submit" className="btn btn-success">
              {isLoading ? "Submitting..." : "Submit"}
            </button>
            <button
              onClick={onCancelEdit}
              className="w-auto px-4 bg-red-500 py-2 font-medium rounded-md duration-200 hover:bg-neutral-200">
              Cancel
            </button>
          </div>
          </form>
         
        </div>
      </div>
    </div>
  );
};

export default DeleteVacancy;

