import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HOME } from "./Routes/Routes";
import UserInputChip from "./components/UserInputChip";
const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL || "/"}>
      <div>
        <Routes>
          <Route path={HOME} element={<UserInputChip />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
