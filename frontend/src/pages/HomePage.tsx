import TitleLayout from "../layouts/TitleLayout";
import ProjectsList from "../components/projects/ProjectsList";
import AddProjectButton from "../components/projects/AddProjectButton";

function HomePage() {
  return (
    <TitleLayout>
      <div>
        <AddProjectButton />
        <ProjectsList />
      </div>
    </TitleLayout>
  );
}

export default HomePage;
