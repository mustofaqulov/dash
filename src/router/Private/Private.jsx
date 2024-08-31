// import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
function PrivateRoute({ children }) {
  const auth = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role");

  if (!auth && role != "admin") {
    // return <Navigate to={"/auth-login"} replace={true} />
  } else if (role == "admin") {
    return children;
  }
}

export default PrivateRoute;

PrivateRoute.propTypes = {
  children: PropTypes.node,
};
