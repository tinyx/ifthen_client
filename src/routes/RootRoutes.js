import React from "react";
import { Route, Switch } from "react-router-dom";
import HomeView from "../views/HomeView";
import GameRoutes from "./GameRoutes";

/**
 * Top-level routes.
 */
const RootRoutes = () => {
  return (
    <Switch>
      <Route path="/" component={HomeView} exact />
      <Route path="/games" component={GameRoutes} />
    </Switch>
  );
};

export default RootRoutes;
