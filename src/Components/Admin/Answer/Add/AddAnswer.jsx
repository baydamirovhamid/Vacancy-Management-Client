import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
export const AddAnswer = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    questionId: "",
    isCorrect: false,
  });
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:44391/api/Answers/create-answer",
        formData
      );
      console.log("Data posted:", response.data);
      navigate("/adminpanel/answers");
    } catch (error) {
      console.error("Error posting data:", error);
      setError(error.message);
    }
  };
  const [questions, setQuestions] = useState([]);
  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        "https://localhost:44391/api/Question/get-all-questions"
      );
      console.log(response);
      console.log(response.data["getAllQuestionDtos"]);
      setQuestions(response.data["getAllQuestionDtos"] || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);
  return (
    <>
      <div class="container mt-5">
        <h2 class="text-center">Add New Answer</h2>
        <form onSubmit={handleSubmit}>
          <div class="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              class="form-control"
              id="name"
              name="name"
              onChange={handleInputChange}
              required
            />
          </div>
          <div class="form-group">
            <label htmlFor="questionSelect">Questions</label>
            <select
              onChange={handleInputChange}
              id="questionSelect"
              className="form-control"
              name="questionId"
              value={formData.questionId}
              required>
                <option value=''>Select a Question</option>
              {questions.map((question, index) => (
                <option key={index} value={question.id}>
                  {question.description}
                </option>
                
              ))
              }
            </select>
          </div>
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="isCorrect"
              name="isCorrect"
              checked={formData.isCorrect}
              onChange={handleInputChange}
            />
            <label className="form-check-label" htmlFor="isCorrect">
              Correct
            </label>
          </div>
          <button type="submit" class="btn btn-primary">
            Add Answer
          </button>
        </form>
      </div>
    </>
  );
};
export default AddAnswer;
