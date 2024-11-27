import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const EditAnswerModal = ({
  editAnswerId,
  selectedAnswer,
  onSaveEdit,
  onCancelEdit,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    id: editAnswerId,
    name: selectedAnswer.name || "",
    questionId: selectedAnswer.questionId || "",
  });

  useEffect(() => {
    if (selectedAnswer) {
      setFormData({
        id: editAnswerId,
        name: selectedAnswer.name || "",
        questionId: selectedAnswer.questionId || "",
      });
    }
  }, [selectedAnswer, editAnswerId]);
  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        "https://localhost:44391/api/Question/get-all-questions"
      );
      setQuestions(response.data["getAllQuestionDtos"] || []);
    } catch (err) {
      setError("Failed to load vacancies. Please try again.");
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);
  console.log(questions);

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
        "https://localhost:44391/api/Answers/update-answer",
        formData
      );
      toast.success(response.data.message);
      onSaveEdit();
    } catch (err) {
      setError(err.message);
      toast.error(error);
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
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <textarea
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="questionId"
              className="block text-sm font-medium text-gray-700">
              Question
            </label>
            <select
              id="questionId"
              name="questionId"
              value={formData.vacancyId}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required>
              <option value="" disabled>
                -- Select a Question --
              </option>
              {questions.map((question) => (
                <option key={question.id} value={question.id}>
                  {question.description}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onCancelEdit}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`px-4 py-2 rounded-lg text-white ${
                isLoading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}>
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAnswerModal;
