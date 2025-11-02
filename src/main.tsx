import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Load theme from localStorage on app start
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  document.documentElement.classList.add("light");
} else {
  document.documentElement.classList.remove("light");
}

createRoot(document.getElementById("root")!).render(<App />);
