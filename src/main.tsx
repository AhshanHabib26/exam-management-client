import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { MathJaxContext } from "better-react-mathjax"; 

// Configure MathJax
const mathJaxConfig = {
  loader: { load: ["input/tex", "output/chtml"] },
  tex: { inlineMath: [["\\(", "\\)"]], displayMath: [["\\[", "\\]"]] },
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <MathJaxContext config={mathJaxConfig}>
        <App />
      </MathJaxContext>
    </Provider>
  </StrictMode>
);
