import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
export const AddQuestion = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    description: "",
    vacancyId: "",
  });
  const handleInputChange = (e) => {
    const { name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:44391/api/Question",
        formData
      );
      console.log("Data posted:", response.data);
      navigate("/adminpanel/questions");
    } catch (error) {
      console.error("Error posting data:", error);
      setError(error.message);
    }
  };
  const [vacancies, setQuestions] = useState([]);
  const fetchVacancies = async () => {
    try {
      const response = await axios.get(
        "https://localhost:44391/api/Vacancies"
      );
      console.log(response);
      console.log(response.data["getAllVacancies"]);
      setQuestions(response.data["getAllVacancies"] || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVacancies();
  }, []);
  return (
    <>
      <div class="container mt-5">
        <h2 class="text-center">Add New Question</h2>
        <form onSubmit={handleSubmit}>
          <div class="form-group">
            <label htmlFor="productDescription">Description</label>
            <textarea
              class="form-control"
              id="productDescription"
              name="description"
              onChange={handleInputChange}
              rows="4"
              required></textarea>
          </div>
          <div class="form-group">
            <label htmlFor="vacancySelect">Vacancies</label>
            <select
              onChange={handleInputChange}
              id="vacancySelect"
              className="form-control"
              name="vacancyId"
              value={formData.vacancyId}
              required>
                <option value="">Select a Vacancy</option>
              {vacancies.map((vacancy, index) => (
                <option key={index} value={vacancy.id}>
                  {vacancy.title}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
          Add Question
          </button>
        </form>
      </div>
    </>
  );
};
export default AddQuestion;
