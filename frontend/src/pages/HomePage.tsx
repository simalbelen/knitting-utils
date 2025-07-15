import TitleLayout from "../layouts/TitleLayout";
import ProjectsList from "../components/projects/ProjectsList";
import AddProjectButton from "../components/projects/AddProjectButton";

function HomePage() {
  return (
    <TitleLayout>
      <div className="h-full">
        <AddProjectButton />
        <ProjectsList />
      </div>
    </TitleLayout>
  );
}

export default HomePage;
