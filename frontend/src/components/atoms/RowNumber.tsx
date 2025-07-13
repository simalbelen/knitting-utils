import clsx from "clsx";

interface Props {
  value: number;
  maxValue: number;
  setMaxValue: (arg0: number) => void;
}

function RowNumber({ value, maxValue, setMaxValue }: Props) {
  const handleOnClick = () => {
    setMaxValue(value);
  };
  return (
    <div
      onClick={handleOnClick}
      className={clsx(
        "w-16 h-16 aspect-square rounded-full flex justify-center items-center font-bold",
        {
          "bg-tertiary text-accent": value <= maxValue,
          "border-secondary border-4": value === maxValue + 1,
          "text-tertiary": value > maxValue,
        }
      )}
    >
      <span className="text-2xl">{value}</span>
    </div>
  );
}

export default RowNumber;
