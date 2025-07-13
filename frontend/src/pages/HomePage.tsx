import TitleLayout from "../layouts/TitleLayout";

import ProjectsList from "../components/projects/ProjectsList";
import AddProjectButton from "../components/projects/AddProjectButton";

function HomePage() {
  return (
    <TitleLayout title="Mis proyectos">
      <div>
        <AddProjectButton />
        <ProjectsList />
      </div>
    </TitleLayout>
  );
}

export default HomePage;
