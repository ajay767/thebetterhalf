import React, { useEffect } from "react";
import ProtectedRoute from "./ProtectedRoute";
import { Route, Switch, Redirect } from "react-router-dom";
import routes from "./routes";
import { useAuth } from "@context/authContext";
import { isLoggedIn } from "@constant";

function Router() {
  const user = useAuth();
  useEffect(() => {
    if (isLoggedIn()) {
      user.getUser();
    }
  }, []);
  return (
    <Switch>
      {routes.map((route, index) => {
        if (route.auth) {
          return (
            <ProtectedRoute
              key={index}
              path={route.path}
              component={route.component}
              exact={route.exact}
            />
          );
        } else
          return (
            <Route
              key={index}
              path={route.path}
              component={route.component}
              exact={route.exact}
            />
          );
      })}
      <Redirect from="/" to="/launch" />
    </Switch>
  );
}

export default Router;
