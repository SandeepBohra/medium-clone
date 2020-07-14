import React from "react";

import { AuthState, AuthContext } from "./contexts/AuthContext";

import Header from "./components/header/Header";
import AppRoutes from "./routes/AppRoutes";

import "./App.css";

function App() {
  return (
    <AuthState>
      <AuthContext.Consumer>
        {context => (
          <div className="App">
            <Header />
            <AppRoutes context={context} />
          </div>
        )}
      </AuthContext.Consumer>
    </AuthState>
  );
}

export default App;
