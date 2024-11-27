import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import EditQuestionModal from "./Edit/EditQuestionModal";
import DeleteQuestionModal from "./Delete/DeleteQuestionModal";

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wantEdit, setWantEdit] = useState(false);
  const [editQuestionId, setEditQuestionId] = useState("");
  const [deleteQuestionId, setDeleteQuestionId] = useState("");
  const [wantDelete, setWantDelete] = useState(false);
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
  const DeleteQuestion = (id) => {
    setWantDelete(true);
    setDeleteQuestionId(id);
  };
  const EditQuestion = (id) => {
    setWantEdit(true);
    setEditQuestionId(id);
  };
  useEffect(() => {
    fetchQuestions();
  }, []);
  const navigate = useNavigate();
  const handleAdd = () => {
    navigate("/adminpanel/questions/add");
  };
  
  const handleCancel = () => {
    if(wantEdit){
      setWantEdit(false);
    }
    else if(wantDelete){
      setWantDelete(false);
    }
  };

  const handleSave= () => {
    if(wantEdit){
      setWantEdit(false);
    }
    else if(wantDelete){
      setWantDelete(false);
    }
    fetchQuestions(); 
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
                <th>Description</th>
                <th>Vacancy Id</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((question, index) => (
                <tr key={index}>
                  <td>{question.id}</td>
                  <td>{question.description}</td>
                  <td>{question.vacancyId}</td>
                  <td>
                    <button
                      onClick={() => EditQuestion(question.id)}
                      className="bg-yellow-500 text-white rounded-lg w-full px-3 py-2">
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => DeleteQuestion(question.id)}
                      className="bg-red-500 text-white rounded-lg w-full px-3 py-2">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {wantEdit && (
            <EditQuestionModal
              editQuestiontId={editQuestionId}
              setWantEdit={setWantEdit}
              selectedQuestion={questions.find((p) => p.id === editQuestionId)}
              onSaveEdit={handleSave}
              onCancelEdit={handleCancel}
            />
          )}
          {wantDelete && (
            <DeleteQuestionModal
              deleteQuestionId={deleteQuestionId}
              onCancelEdit={handleCancel}
               onSaveEdit={handleSave}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default QuestionList;
