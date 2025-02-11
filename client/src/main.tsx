import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

declare global {
  interface Window {
    $replit?: {
      user?: {
        id: string;
        name: string;
      };
    };
  }
}

createRoot(document.getElementById("root")!).render(<App />);