import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Project } from "../types/Project";
import ProjectService from "../services/ProjectService";
import TitleLayout from "../layouts/TitleLayout";
import AddSectionButton from "../components/sections/AddSectionButton";
import SectionsList from "../components/sections/SectionsList";

function ProjectPage() {
  const { id } = useParams();

  const [project, setProject] = useState<Project>();
  const fetchProject = async () => {
    if (id) {
      const { data } = await ProjectService.findOne(id);
      setProject(data);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  if (project && project._id != undefined) {
    return (
      <TitleLayout projectId={id} projectTitle={project.title}>
        <div>
          <AddSectionButton projectId={project._id} />
          <SectionsList projectId={project._id} />
        </div>
      </TitleLayout>
    );
  }
}

export default ProjectPage;
