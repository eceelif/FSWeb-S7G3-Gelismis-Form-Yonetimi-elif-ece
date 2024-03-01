import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ValidationForm from "./components/ValidationForm";
import FormList from "./components/FormList";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <FormList />
    </>
  );
}

export default App;
