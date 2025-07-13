interface Props {
  title: string;
}
function PageTitle({ title }: Props) {
  return (
    <div className="w-full flex-1 flex justify-center items-center bg-tertiary">
      <h1 className="text-4xl p-4 flex justify-center items-center text-accent">
        {title}
      </h1>
    </div>
  );
}

export default PageTitle;
