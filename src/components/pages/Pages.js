import React from "react";
import Login from "./auth/Login";
import Home from "./homePage/Home";

import { Switch, Route } from "react-router-dom";

function Pages() {
  // const { isLogged } = useContext(GlobalState);

  return (
    <Switch>
      <Route
        path="/"
        exact
        // component={Home}
        component={Home}
      />
      <Route path="/auth/login" exact component={Login} />
    </Switch>
  );
}

export default Pages;
