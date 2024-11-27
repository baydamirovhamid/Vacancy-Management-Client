import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import getUsernameFromToken from "../../Utils/GetUsername";

const ApplyModal = ({ vacancyId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
    vacancyId: vacancyId,
    appUserId: null,
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Fetch username from token
  useEffect(() => {
    const fetchedUserName = getUsernameFromToken();
    setUserName(fetchedUserName);
  }, []);

  // Fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("https://localhost:44391/api/Users");
        const users = response.data.getAllUsers || [];
        const foundUser = users.find((x) => x.userName === userName);
        setUser(foundUser);
      } catch (err) {
        toast.error("Error fetching user details.");
      }
    };
    fetchUser();
  }, [userName]);

  // Update formData with user details
  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        appUserId: user.id,
      }));
    }
  }, [user]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear field-specific error when input changes
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: null,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors
    setIsLoading(true);

    try {
      const response = await axios.post(
        `https://localhost:44391/api/ApplicationForm`,
        formData
      );
      toast.success("Form submitted successfully!");
      localStorage.setItem("formId", response.data.id);
      if (!response.data.success) {
        // Convert backend validation errors to field-specific messages
        const errorMap = response.data.errors.reduce((acc, curr) => {
          acc[curr.propertyName] = curr.errorMessage;
          return acc;
        }, {});
        setErrors(errorMap);
        console.log(errors);
      } else {
        navigate(`/interview/${vacancyId}`);
      }
    } catch (error) {
      if (error.response && error.response.data.errors) {
        // Convert backend validation errors to field-specific messages
        const errorMap = error.response.data.errors.reduce((acc, curr) => {
          acc[curr.propertyName] = curr.errorMessage;
          return acc;
        }, {});
        setErrors(errorMap);
        toast.error("Please correct the highlighted errors.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center fixed inset-0 backdrop-blur-xl z-10 items-center bg-[rgba(29,29,29,0.3)]">
      <div className="mx-0 h-fit w-1/3 bg-white rounded-lg p-5">
        <div className="flex flex-col gap-5 items-center">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`form-control ${
                  errors.name ? "border-red-500" : ""
                }`}
              />
              {errors.Name && <p className="text-red-500">{errors.Name}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="surname">Surname</label>
              <input
                type="text"
                name="surname"
                id="surname"
                value={formData.surname}
                onChange={handleInputChange}
                className={`form-control ${
                  errors.surname ? "border-red-500" : ""
                }`}
              />
              {errors.Surname && (
                <p className="text-red-500">{errors.Surname}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`form-control ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.Email && <p className="text-red-500">{errors.Email}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className={`form-control ${
                  errors.phoneNumber ? "border-red-500" : ""
                }`}
              />
              {errors.PhoneNumber && (
                <p className="text-red-500">{errors.PhoneNumber}</p>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary mt-3"
              disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyModal;
