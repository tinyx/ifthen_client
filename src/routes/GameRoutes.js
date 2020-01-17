import React from "react";
import { Route, Switch } from "react-router-dom";
import GameView from "../views/GameView/GameView";

/**
 * Game related routes
 */
const GameRoutes = () => {
  return (
    <Switch>
      <Route path="/games/live/:gameId" component={GameView} exact />
    </Switch>
  );
};

export default GameRoutes;
