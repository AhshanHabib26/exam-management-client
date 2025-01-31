import { RouterProvider } from "react-router-dom";
import { routes } from "./router/routes";
import { Toaster } from "sonner";
import GlobalLoader from "./loader/GlobalLoader";

function App() {
  return (
    <>
      <RouterProvider router={routes} />
      <GlobalLoader />
      <Toaster position="top-right" richColors />
    </>
  );
}

export default App;
