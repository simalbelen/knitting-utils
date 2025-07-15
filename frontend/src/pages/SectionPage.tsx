import { useParams } from "react-router-dom";
import SectionContent from "../components/sections/SectionContent";
import { useEffect, useState } from "react";
import SectionService from "../services/SectionService";
import type { Section } from "../types/Section";
import TitleLayout from "../layouts/TitleLayout";

function SectionPage() {
  const { id } = useParams();
  const [section, setSection] = useState<Section>();
  const fetchSection = async () => {
    if (id) {
      const { data } = await SectionService.findOne(id);
      setSection(data);
    }
  };

  useEffect(() => {
    fetchSection();
  }, [id]);

  return (
    section && (
      <TitleLayout
        projectId={section.project}
        projectTitle={section.project_title}
        sectionId={id}
        sectionTitle={section.title}
      >
        <div className="flex flex-col h-full bg-secondary">
          <SectionContent section={section} />
        </div>
      </TitleLayout>
    )
  );
}

export default SectionPage;
