import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Landing from "@pages/landing";
import Login from "@pages/auth/Login";
import Signup from "@pages/auth/Signup";
import ForgetPassword from "@pages/auth/ForgetPassword";
function Router() {
  return (
    <Switch>
      <Route exact path="/launch" component={Landing} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/forget-password" component={ForgetPassword} />
      <Redirect from="/" to="/launch" />
    </Switch>
  );
}

export default Router;
