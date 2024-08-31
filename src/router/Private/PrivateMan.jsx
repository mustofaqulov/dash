import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
function PrivateRouteMan({ children }) {
  const auth = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role");

  if (!auth && role != "modirator") {
    return <Navigate to={"/auth-login"} replace={true} />;
  } else if (role == "modirator") {
    return children;
  }
}

export default PrivateRouteMan;

PrivateRouteMan.propTypes = {
  children: PropTypes.node,
};
