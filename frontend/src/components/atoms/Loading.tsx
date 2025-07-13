import { LoadingIcon } from "../icons/LoadingIcon";

function Loading() {
  return (
    <div className="w-full h-full flex justify-center items-center flex-col">
      <LoadingIcon className="w-full h-1/4 text-primary" />
      <span className="text-primary text-xl">
        Cargando información, por favor espere...
      </span>
    </div>
  );
}

export default Loading;
