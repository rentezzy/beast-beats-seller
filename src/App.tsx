import { useState } from "react";
import Router from "./Router";
import Header from "./components/header/Header";
import { useAppInitialize } from "./store/hooks";

function App() {
  let [isInitialized, setInitialize] = useState(false);
  useAppInitialize().then((data) => setInitialize(true));
  return !isInitialized ? (
    <div>LOADER</div>
  ) : (
    <div>
      <Header />
      <Router />
    </div>
  );
}

export default App;
