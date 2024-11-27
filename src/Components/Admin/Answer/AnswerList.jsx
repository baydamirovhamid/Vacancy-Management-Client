import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import EditAnswerModal from "./Edit/EditAnswerModal";
const AnswerList = () => {
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wantEdit, setWantEdit] = useState(false);
  const [wantDelete, setWantDelete] = useState(false);
  const [editAnswerId, setEditAnswerId] = useState("");
  const fetchAnswers = async () => {
    try {
      const response = await axios.get("https://localhost:44391/api/Answers");
      console.log(response);
      console.log(response.data["getAllAnswer"]);
      setAnswers(response.data["getAllAnswer"] || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnswers();
  }, []);
  const navigate = useNavigate();
  const handleAdd = () => {
    navigate("/adminpanel/answers/add");
  };
  const handleEdit = (id) => {
    setWantEdit(true);
    setEditAnswerId(id);
  };
  const handleCancel = () => {
    if (wantEdit) {
      setWantEdit(false);
    } else if (wantDelete) {
      setWantDelete(false);
    }
  };

  const handleSave = () => {
    if (wantEdit) {
      setWantEdit(false);
    } else if (wantDelete) {
      setWantDelete(false);
    }
    fetchAnswers();
  };
  return (
    <>
      <div className="container-fluid">
        <div className="container">
          <button
            className="d-flex justify-content-end mb-3 px-5 w-2 bg-cyan-300"
            onClick={handleAdd}>
            Add
          </button>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Correct</th>
                <th>Question Id</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {answers.map((answer) => (
                <tr key={answer.id}>
                  <td>{answer.id}</td>
                  <td>{answer.name}</td>
                  <td>{answer.isCorrect ? "Yes" : "No"}</td>
                  <td>{answer.questionId}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(answer.id)}
                      className="bg-yellow-500 text-white rounded-lg w-full px-3 py-2">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {wantEdit && (
            <EditAnswerModal
              editAnswerId={editAnswerId}
              onCancelEdit={handleCancel}
              onSaveEdit={handleSave}
              selectedAnswer={answers.find((p) => p.id === editAnswerId)}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default AnswerList;
