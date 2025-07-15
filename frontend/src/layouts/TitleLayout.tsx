import Breadcrumb from "../components/atoms/Breadcrumb";

interface Props {
  projectId?: string;
  projectTitle?: string;
  sectionId?: string;
  sectionTitle?: string;
  children: React.ReactNode;
}
function TitleLayout({
  projectId,
  projectTitle,
  sectionId,
  sectionTitle,
  children,
}: Props) {
  return (
    <div className="h-svh">
      <div className="h-[64px] bg-tertiary flex justify-center items-center text-2xl">
        <Breadcrumb
          projectId={projectId}
          projectTitle={projectTitle}
          sectionId={sectionId}
          sectionTitle={sectionTitle}
        />
      </div>
      <div className="h-full">{children}</div>
    </div>
  );
}

export default TitleLayout;
