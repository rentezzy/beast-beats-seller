import { useState } from "react";
import Header from "./components/header/Header";
import { useAppInitialize } from "./store/hooks";
import LoadingPage from "./components/loadingPage/LoadingPage";
import { Outlet } from "react-router-dom";

function App() {
  let [isInitialized, setInitialize] = useState(false);
  useAppInitialize().then((data) => setInitialize(true));

  return (
    <div>
      <LoadingPage isInitialized={isInitialized} />
      {isInitialized ? (
        <div>
          <Header />
          <Outlet />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
