import { Outlet } from "react-router-dom";

import { useState } from "react";
import { useAppInitialize } from "./store/hooks";

import Header from "./components/header/Header";
import LoadingPage from "./components/ui/LoadingPage";

function App() {
  let [isInitialized, setInitialize] = useState(false);
  useAppInitialize().then((data) => setInitialize(true));

  return (
    <div>
      <LoadingPage isInitialized={isInitialized} />
      {isInitialized && (
        <div className="main">
          <Header />
          <Outlet />
        </div>
      )}
    </div>
  );
}

export default App;
