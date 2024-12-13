import { useEffect, useState } from "react";
import axios from "axios";

const CsrfTokenForm = () => {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);

  useEffect(() => {
    // Obtenez le token CSRF depuis le backend
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.post("http://localhost:3001/auth/csrf-token");
        setCsrfToken(response.data.csrfToken);
      } catch (error) {
        console.error("Error fetching CSRF token", error);
      }
    };
    fetchCsrfToken();
  }, []);

  return (
    <div>
      <h3>CSRF Token</h3>
      {csrfToken ? (
        <div>
          <p>CSRF Token: {csrfToken}</p>
        </div>
      ) : (
        <p>Loading CSRF token...</p>
      )}
    </div>
  );
};

export default CsrfTokenForm;
