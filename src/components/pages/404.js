import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";

const Page404 = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1 style={{ textAlign: "center", fontWeight: "bold", fontSize: "24px" }}>
        Page not found
      </h1>
      <Link
        style={{
          display: "block",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "24px",
          marginTop: "30px",
          'color': 'blue'
        }}
        to={navigate(-1)}
      >
        Go back
      </Link>
      <ErrorMessage />
    </div>
  );
};

export default Page404;
