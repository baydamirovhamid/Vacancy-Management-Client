import React, { useState, useEffect } from "react";
import axios from "axios";

const ResultModal = ({
  onCancel,
  formId
}) => {
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchResults = async () => {
    try {
      const response = await axios.get("https://localhost:44391/api/Results");
      setResults(response.data["getAllResultDtos"] || []);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchVacancies = async () => {
    try {
      const response = await axios.get("https://localhost:44391/api/Vacancies");
      setVacancies(response.data["getAllVacancies"] || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVacancies();
  }, []);
  
  console.log(formId);

  const filteredResults = results.filter((x) => x.applicationFormId === formId);
  console.log(filteredResults);

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">Results</h2>

        {filteredResults.length > 0 ? (
          // Scrollable container for results
          <div className="max-h-96 overflow-y-auto space-y-4">
            {filteredResults.map((result) => {
              const vacancyTitle =
                vacancies.find(
                  (vacancy) => vacancy.id === result.vacancyId
                )?.title || "Unknown";

              // Calculate percentage
              const totalQuestions =
                result.trueQuestionCount + result.falseAnswerCount;
              const percentage = totalQuestions
                ? (result.trueQuestionCount / totalQuestions) * 100
                : 0;

              // Determine color based on percentage
              const getColor = () => {
                if (percentage >= 75) return "bg-green-100 text-green-800";
                if (percentage >= 50) return "bg-yellow-100 text-yellow-800";
                return "bg-red-100 text-red-800";
              };

              return (
                <div
                  key={result.id}
                  className={`p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 ${getColor()}`}
                >
                  <p className="text-sm text-gray-600">
                    <span className="font-bold text-gray-800">Vacancy:</span>{" "}
                    {vacancyTitle}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-bold text-gray-800">
                      True Questions:
                    </span>{" "}
                    {result.trueQuestionCount}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-bold text-gray-800">
                      False Answers:
                    </span>{" "}
                    {result.falseAnswerCount}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-bold text-gray-800">Points:</span>{" "}
                    {result.point}
                  </p>
                  <p className="text-sm font-semibold">
                    <span className="font-bold text-gray-800">Percentage:</span>{" "}
                    {percentage.toFixed(2)}%
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-600">No results found.</p>
        )}

        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;
