import { useParams } from "react-router-dom";
import PageTitle from "../components/atoms/PageTitle";
import SectionContent from "../components/sections/SectionContent";
import { useEffect, useState } from "react";
import SectionService from "../services/SectionService";
import type { Section } from "../types/Section";

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
      <div className="flex flex-col h-svh bg-secondary">
        <PageTitle title={section.title} />
        <SectionContent section={section} />
      </div>
    )
  );
}

export default SectionPage;
