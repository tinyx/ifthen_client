import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RootRoutes from "./routes/RootRoutes";

const App = () => {
  return (
    <Router>
      <RootRoutes />
    </Router>
  );
};

export default App;
