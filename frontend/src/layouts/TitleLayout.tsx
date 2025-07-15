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
    <div className="h-svh flex flex-col">
      <div className="h-[64px] bg-tertiary flex justify-center items-center text-2xl">
        <Breadcrumb
          projectId={projectId}
          projectTitle={projectTitle}
          sectionId={sectionId}
          sectionTitle={sectionTitle}
        />
      </div>
      <div className="flex-1 overflow-y-auto scroll-hidden">{children}</div>
    </div>
  );
}

export default TitleLayout;
