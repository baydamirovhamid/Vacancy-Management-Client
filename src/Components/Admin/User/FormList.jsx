import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import ResultModal from "./ResultModal/ResultModal";
import CvModal from "./CvModal/CvModal";

const FormList = () => {
  const [forms, setForms] = useState([]);
  const [wantResult, setWantResult] = useState(false);
  const [wantCvFile, setWantCvFile] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const [formId, setFormId] = useState("");
  const fetchForms = async () => {
    try {
      const response = await axios.get(
        "https://localhost:44391/api/ApplicationForm"
      );
      setForms(response.data["getAllApplicationForm"] || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  const handleResult = (id) => {
    setWantResult(true);
    setFormId(id);
  };
  const handleCvFile = (id) => {
    setWantCvFile(true);
    setFormId(id);
  };
  const handleCancel = () => {
    setWantResult(false);
    setWantCvFile(false);
  };
  return (
    <div className="container-fluid">
      <div className="container">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Email</th>
              <th>Name</th>
              <th>Surname</th>
              <th>Phone</th>
              <th>Results</th>
              <th>CV</th>
            </tr>
          </thead>
          <tbody>
            {forms.map((form) => (
              <tr key={form.id}>
                <td>{form.id}</td>
                <td>{form.email}</td>
                <td>{form.name}</td>
                <td>{form.surname}</td>
                <td>{form.phoneNumber}</td>
                <td className="d-flex justify-center items-center">
                  <button
                    onClick={() => handleResult(form.id)}
                    className="bg-yellow-500 text-white rounded-lg w-full py-2">
                    Results
                  </button>
                </td>
                <td>
                  {" "}
                  <button
                    onClick={() => handleCvFile(form.id)}
                    className="bg-cyan-500 text-white rounded-lg w- px-3 py-2">
                    CV
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {wantResult && <ResultModal formId={formId} onCancel={handleCancel} />}
        {wantCvFile && <CvModal formId={formId} onCancel={handleCancel} />}
      </div>
    </div>
  );
};
export default FormList;
