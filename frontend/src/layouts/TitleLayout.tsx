import PageTitle from "../components/PageTitle";

interface Props {
  title: string;
  children: React.ReactNode;
}
function TitleLayout({ title, children }: Props) {
  return (
    <div className="h-svh">
      <PageTitle title={title} />
      {children}
    </div>
  );
}

export default TitleLayout;
