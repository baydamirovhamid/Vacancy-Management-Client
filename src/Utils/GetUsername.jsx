import {jwtDecode} from "jwt-decode";

const getUsernameFromToken = () => {
  // Retrieve the token from localStorage
  const token = JSON.parse(localStorage.getItem("jwtToken"))?.accessToken;

  if (token) {
    try {
      // Decode the token
      const decodedToken = jwtDecode(token);

      // Access the username from the claims
      const username = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
      console.log(username);
      
      return username;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }
  return null;
};

export default getUsernameFromToken;
