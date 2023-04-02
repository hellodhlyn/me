import React from "react";
import { Routes, Route } from "react-router-dom";
import { Provider } from "urql";
import { Home } from "./pages/Home";
import { client } from "./server/client";

function App() {
  return (
    <Provider value={client}>
      <div className="App leading-relaxed md:leading-loose">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
