import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RootRoutes from "./routes/RootRoutes";
import AuthContainer from "./components/AuthContainer";

const App = () => {
  return (
    <Router>
      <AuthContainer>
        <RootRoutes />
      </AuthContainer>
    </Router>
  );
};

export default App;
