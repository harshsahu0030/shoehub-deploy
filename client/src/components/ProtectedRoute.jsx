import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <>
      {loading === false && (
        <Route
          {...rest}
          render={(props) => {
            if (isAuthenticated === false) {
              return <Redirect to="/my-account/dashboard" />;
            }

            return <Component {...props} />;
          }}
        />
      )}
    </>
  );
};
