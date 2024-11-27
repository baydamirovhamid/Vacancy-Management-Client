import "../LogIn/LogIn.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const LogIn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);  // Handle loading state
  const [error, setError] = useState(null);  // Handle errors
  const [formData, setFormData] = useState({
    userNameOrEmail: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLoginClick = async (e) => {
    e.preventDefault();
    setLoading(true);  // Set loading to true when making the request
    try {
      const response = await axios.post(
        "https://localhost:44391/api/Auth/Login",
        formData
      );

      // Check if the response contains the token
      if (response.data.token) {
        // Store the token as a string in localStorage
        localStorage.setItem("jwtToken", JSON.stringify(response.data.token));  // Stringify the token

        // Redirect to a different page (e.g., dashboard)
        navigate("/home");

        toast.success("Login successful");
      } else {
        // If no token is returned, show an error message
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error posting data:", error);
      setError(error.message);  // Handle the error message
      toast.error("An error occurred during login");
    } finally {
      setLoading(false);  // Reset loading state after the request
    }
  };

  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Sample image"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form>
              <div className="form-outline mb-4">
                <input
                  type="email"
                  id="form3Example3"
                  className="form-control form-control-lg"
                  name="userNameOrEmail"
                  value={formData.userNameOrEmail}
                  onChange={handleInputChange}
                  placeholder="Enter a valid email address"
                />
                <label className="form-label" htmlFor="form3Example3">
                  Email address
                </label>
              </div>

              <div className="form-outline mb-3">
                <input
                  type="password"
                  name="password"
                  id="form3Example4"
                  className="form-control form-control-lg"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter password"
                />
                <label className="form-label" htmlFor="form3Example4">
                  Password
                </label>
              </div>
              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  onClick={handleLoginClick}
                  type="button"
                  data-mdb-button-init
                  data-mdb-ripple-init
                  className="btn btn-primary btn-lg"
                  style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  disabled={loading}  // Disable button when loading
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogIn;
