import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
function PrivateRouteKadr({ children }) {
  const auth = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role");

  if (!auth && role != "kadr") {
    return <Navigate to={"/auth-login"} replace={true} />;
  } else if (role == "kadr") {
    return children;
  }
}

export default PrivateRouteKadr;

PrivateRouteKadr.propTypes = {
  children: PropTypes.node,
};
