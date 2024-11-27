import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import EditVacancy from "./Edit/EditVacancy";
import DeleteVacancy from "./Delete/DeleteVacancy";
import { useNavigate } from "react-router-dom";

export const VacancyList = () => {
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wantEdit, setWantEdit] = useState(false);
  const [wantDelete, setWantDelete] = useState(false);
  const [editVacancyId, setEditVacancyId] = useState("");
  const [deleteVacancyId, setDeleteVacancyId] = useState("");

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

  const handleEditVacancy = (id) => {
    setWantEdit(true);
    setEditVacancyId(id);
  };
    const handleDeleteVacancy = (id) => {
    setWantDelete(true);
    setDeleteVacancyId(id);
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
    fetchVacancies(); // Refetch vacancies after edit
  };
  const navigate=useNavigate();
const  handleAdd=()=>{
navigate('/adminpanel/vacancies/add')
}
  return (
    <div className="container-fluid">
      <div className="container">
        <button className="d-flex justify-content-end mb-3 px-5 w-2 bg-cyan-300"
        onClick={handleAdd}>Add</button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Description</th>
              <th>Start date</th>
              <th>End Date</th>
              <th>Active</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {vacancies.map((vacancy) => (
              <tr key={vacancy.id}>
                <td>{vacancy.id}</td>
                <td>{vacancy.title}</td>
                <td>{vacancy.description}</td>
                <td>{vacancy.startDate}</td>
                <td>{vacancy.endDate}</td>
                <td>{vacancy.isActive ? "Yes" : "No"}</td>
                <td className="d-flex justify-center items-center">
                  <button
                    onClick={() => handleEditVacancy(vacancy.id)}
                    className="bg-yellow-500 text-white rounded-lg w-full py-2"
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteVacancy(vacancy.id)}
                    className="bg-red-500 text-white rounded-lg w-full py-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {wantEdit && (
          <EditVacancy
            editVacancyId={editVacancyId}
            onCancelEdit={handleCancel}
            onSaveEdit={handleSave}
            selectedVacancy={vacancies.find((p) => p.id === editVacancyId)}
          />
        )}
        {wantDelete && (
          <DeleteVacancy
            deleteVacancyId={deleteVacancyId}
            onCancelEdit={handleCancel}
            onSaveEdit={handleSave}
          />
        )}
      </div>
    </div>
  );
};

export default VacancyList;