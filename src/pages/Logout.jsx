import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Delete token from local storage
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
    }

    // Navigate to "/"
    navigate("/");
  }, []);

  return null;
};

export default Logout;
