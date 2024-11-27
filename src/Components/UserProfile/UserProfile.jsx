import React, { useState, useEffect } from "react";
import getUsernameFromToken from "../../Utils/GetUsername";
import axios from "axios";

const UserProfile = () => {
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null); // State to store the specific user
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchedUserName = getUsernameFromToken();
    setUserName(fetchedUserName);
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://localhost:44391/api/Users");
        const users = response.data.getAllUsers || [];
        const foundUser = users.find((x) => x.userName === userName); // Find user by ID
        setUser(foundUser); // Set the specific user
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [userName]); // Dependency ensures the function runs when userId changes

  const handleOpenModal = (file) => {
    if (!file) {
      setModalContent(<p className="text-danger">No document available.</p>);
    } else if (file.type.startsWith("image/")) {
      setModalContent(
        <img
          src={file.url}
          alt={file.name}
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
      );
    } else if (file.type === "application/pdf") {
      setModalContent(
        <iframe
          src={file.url}
          title={file.name}
          style={{ width: "100%", height: "80vh", border: "none" }}
        ></iframe>
      );
    } else {
      setModalContent(<p className="text-danger">Unsupported file type.</p>);
    }

    setModalTitle(file?.name || "Document");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalContent(null);
    setModalTitle("");
  };

  if (loading) {
    return <p>Loading user profile...</p>;
  }

  if (error) {
    return <p className="text-danger">Error: {error}</p>;
  }

  if (!user) {
    return <p className="text-muted">User not found.</p>;
  }

  return (
    <div className="container-fluid bg-light py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                {/* Header Section */}
                <div className="d-flex align-items-center">
                  <img
                    src="https://t4.ftcdn.net/jpg/05/89/93/27/360_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.webp"
                    alt="User Avatar"
                    className="rounded-circle me-3"
                    style={{ width: "100px", height: "100px" }}
                  />
                  <div>
                    <h4 className="card-title mb-0">{userName}</h4>
                    <p className="text-muted">{user.nameSurname}</p>
                    <p className="text-muted">{user.email}</p>
                  </div>
                </div>

                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
