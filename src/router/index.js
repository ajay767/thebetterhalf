import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import routes from "./routes";

function Router() {
  return (
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          component={route.component}
          exact={route.exact}
        />
      ))}
      <Redirect from="/" to="/launch" />
    </Switch>
  );
}

export default Router;
