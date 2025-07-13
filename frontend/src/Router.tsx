import { createBrowserRouter } from "react-router-dom";
import ProjectPage from "./pages/ProjectPage";
import HomePage from "./pages/HomePage";
import SectionPage from "./pages/SectionPage";

const router = createBrowserRouter([
  { path: "", element: <HomePage /> },
  { path: "project/:id", element: <ProjectPage /> },
  { path: "project/:idProject/section/:id", element: <SectionPage /> },
]);

export default router;
