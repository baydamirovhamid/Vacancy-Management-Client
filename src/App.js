import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Components/Home/Home";
import { useState, useEffect } from "react";
import LogIn from "./Components/LogIn/LogIn";
import { Route, Routes, useNavigate, useLocation, Navigate } from "react-router-dom";
import { AddVacancy } from "./Components/Admin/Vacancy/Add/AddVacancy";
import { AddAnswer } from "./Components/Admin/Answer/Add/AddAnswer";
import Header from "./Components/Header/Header";
import AdminLogIn from "./Components/Admin/LogIn/AdminLogIn";
import { VacancyList } from "./Components/Admin/Vacancy/VacancyList";
import Interview from "./Components/Interview/Interview";
import AnswerList from "./Components/Admin/Answer/AnswerList";
import QuestionList from "./Components/Admin/Question/QuestionList";
import AddQuestion from "./Components/Admin/Question/Add/AddQuestion";
import Footer from "./Components/Footer/Footer";
import UserProfile from "./Components/UserProfile/UserProfile";
import ResultList from "./Components/Admin/Result/ResultList";
import getUsernameFromToken from "./Utils/GetUsername";
import FormList from "./Components/Admin/User/FormList";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Check for token in localStorage
  const isAuthenticated = Boolean(getUsernameFromToken())
console.log(isAuthenticated);

  return (
    <>
      {(location.pathname !== "/login" && location.pathname !== "/admin") && <Header />}
      <div className="container-fluid">
        <div className="container min-h-[480px]">
          <Routes>
            <Route
              path="/home"
              element={
                isAuthenticated ? <Home vacancies={vacancies} /> : <Navigate to="/login" />
              }
            />
            <Route path="/login" element={<LogIn />} />
            <Route path="/admin" element={<AdminLogIn />} />
            <Route
              path="/interview/:vacancyId"
              element={
                isAuthenticated ? <Interview /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/adminpanel/answers/add"
              element={
                isAuthenticated ? <AddAnswer /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/adminpanel/questions/add"
              element={
                isAuthenticated ? <AddQuestion /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/adminpanel/vacancies/add"
              element={
                isAuthenticated ? <AddVacancy /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/adminpanel/vacancies"
              element={
                isAuthenticated ? <VacancyList /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/adminpanel/answers"
              element={
                isAuthenticated ? <AnswerList /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/adminpanel/questions"
              element={
                isAuthenticated ? <QuestionList /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/adminpanel/results"
              element={
                isAuthenticated ? <ResultList /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/adminpanel/forms"
              element={
                isAuthenticated ? <FormList /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/userprofile"
              element={
                isAuthenticated ? <UserProfile /> : <Navigate to="/login" />
              }
            />
            {/* Redirect the root path to login */}
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
      {(location.pathname !== "/login" && location.pathname !== "/admin") && <Footer />}
    </>
  );
}

export default App;
