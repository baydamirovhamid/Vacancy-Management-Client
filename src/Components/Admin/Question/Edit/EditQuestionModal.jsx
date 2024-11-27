import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const EditQuestionModal = ({ editQuestiontId, setWantEdit, selectedQuestion, onSaveEdit, onCancelEdit }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [vacancies, setVacancies] = useState([]);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    id: editQuestiontId,
    description: selectedQuestion.description || "",
    vacancyId: selectedQuestion.vacancyId || "",
  });

  useEffect(() => {
    if (selectedQuestion) {
      setFormData({
        id: editQuestiontId,
        description: selectedQuestion.description || "",
        vacancyId: selectedQuestion.vacancyId || "",
      });
    }
  }, [selectedQuestion, editQuestiontId]);

  const fetchVacancies = async () => {
    try {
      const response = await axios.get("https://localhost:44391/api/Vacancies");
      setVacancies(response.data["getAllVacancies"] || []);
    } catch (err) {
      setError("Failed to load vacancies. Please try again.");
    }
  };

  useEffect(() => {
    fetchVacancies();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.put(
        "https://localhost:44391/api/Question/update-question",
        formData
      );
      toast.success("Question updated successfully!");
      setWantEdit(false);
      onSaveEdit();
    } catch (err) {
      setError("Failed to update the question. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Edit Question</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg flex items-center">
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="vacancyId" className="block text-sm font-medium text-gray-700">
              Vacancy
            </label>
            <select
              id="vacancyId"
              name="vacancyId"
              value={formData.vacancyId}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="" disabled>
                -- Select a Vacancy --
              </option>
              {vacancies.map((vacancy) => (
                <option key={vacancy.id} value={vacancy.id}>
                  {vacancy.title} - {vacancy.location}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onCancelEdit}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`px-4 py-2 rounded-lg text-white ${
                isLoading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditQuestionModal;
