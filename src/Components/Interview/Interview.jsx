import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast"; // Import toast functions
import styles from "./Interview.module.css"; // Assuming the CSS path is correct
import UploadCvModal from "../UploadCvModal/UploadCvModal";

export default function QuizQuestion() {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds timer
  const { questionId } = useParams(); // Extract questionId from the route
  const navigate = useNavigate(); // For navigation between questions
  const { vacancyId } = useParams();
  const [page, setPage] = useState(1);

  // Track the number of correct and incorrect answers
  const [trueCount, setTrueCount] = useState(0);
  const [falseCount, setFalseCount] = useState(0);
  const [points, setPoints] = useState(0);

  // Fetch the question from the API
  useEffect(() => {
    // Reset the timer when a new question is loaded
    setTimeLeft(60);
    setIsAnswered(false); // Reset answered state for each new question
    setSelectedAnswer("");

    const fetchQuestion = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://localhost:44391/api/Question?vacancyId=${vacancyId}&page=${page}`
        );
        setQuestion(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestion();
  }, [questionId, page]);

  // Timer countdown logic
  useEffect(() => {
    if (timeLeft === 0 || isAnswered) return; // Stop the timer if time is up or answer is submitted

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 1) {
          clearInterval(timer); // Clear the timer when it reaches 0
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer on component unmount or when effect re-runs
  }, [timeLeft, isAnswered]);

  // Handle radio button answer selection
  const handleAnswerChange = (event) => {
    setSelectedAnswer(event.target.value); // Set selected answer to answerText
  };

  // Handle answer submission
  const handleSubmit = () => {
    if (selectedAnswer) {
      setIsAnswered(true); // Mark question as answered

      // Check if the selected answer is correct
      const isCorrect = question.answers.some(
        (answer) => answer.answerText === selectedAnswer && answer.isCorrect
      );

      if (isCorrect) {
        setTrueCount(trueCount + 1);
        setPoints(points + 1); // Increase points for correct answer
        toast.success("Correct!"); // Display success toast for correct answer
      } else {
        setFalseCount(falseCount + 1);
        toast.error("Incorrect!"); // Display error toast for incorrect answer
      }
    } else {
      toast.warning("Please select an answer before submitting."); // Show warning if no answer is selected
    }
  };

  // Handle the next button to move to the next question or results page
  const [wantUploadCv,setWantUploadCv]=useState(false);
  const handleNext = () => {
    if (page < 3) {
      setPage(page + 1); // Proceed to the next question
      console.log(page);
      
    } else {
      // Submit the final results once all questions are answered
      submitResults();
      setWantUploadCv(true);
      // navigate(`/interview/result/${vacancyId}`); // Navigate to the results page after 15th question
    }
  };
  const handleCancel = () => {
      setWantUploadCv(false);
  };

  const handleSave= () => {
      setWantUploadCv(false);
  };
  // Submit results to the server
  var formId=localStorage.getItem("formId")
  const submitResults = async () => {
      try {
        const resultData = {
          vacancyId: vacancyId,
          trueQuestionCount: trueCount,
          falseAnswerCount: falseCount,
          point: points,
          applicationFormId: formId,
        };
console.log(resultData);

        const response = await axios.post(
          "https://localhost:44391/api/Results",
          resultData
        );
        console.log("Results submitted:", response.data);
        toast.success("Results submitted successfully!");
      } catch (error) {
        setError(error.message);
        toast.error("Error submitting results.");
      }
    
  };

  // Render loading or error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!question) return <p>No question found.</p>;

  return (
<>
<div className={styles.quizContainer}>
      <h2 className={styles.question}>{question.description}</h2>
      <p className={styles.timer}>Time Left: {timeLeft} seconds</p>

      <div className={styles.answerGroup}>
        {question.answers.map((answer, i) => (
          <label className={styles.answer} key={i}>
            <input
              type="radio"
              name="answer"
              value={answer.answerText}
              checked={selectedAnswer === answer.answerText}
              onChange={handleAnswerChange}
              disabled={isAnswered || timeLeft === 0} // Disable input after answering or when time is up
            />
            {answer.answerText}
          </label>
        ))}
      </div>

      {!isAnswered && (
        <button
          className={styles.submitButton}
          onClick={handleSubmit}
          disabled={isAnswered || !selectedAnswer || timeLeft === 0} // Disable submit when already answered or no answer selected
        >
          {isAnswered ? "Answered" : "Submit Answer"}
        </button>
      )}

      {isAnswered && (
        <div className={styles.result}>
          <button className={styles.nextButton} onClick={handleNext}>
            {page < 15 ? "Next" : "Go to Results"}
          </button>
        </div>
      )}
    </div>
    {wantUploadCv&&(
      
      <UploadCvModal
      onCancelUpload={handleCancel}
      onSaveUpload={handleSave}
      formId={formId}
      />
    )}
</>
  );
}
