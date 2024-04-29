import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="error_page_container">
      <h1>404 ( Page Not Found )</h1>
      <hr />
      <Link to="/">Back To Home Page</Link>
    </div>
  );
};

export default ErrorPage;
