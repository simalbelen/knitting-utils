import clsx from 'clsx';

interface Props {
    value: number
    maxValue: number
    setMaxValue: React.Dispatch<React.SetStateAction<number>>
}

function RowNumber({ value, maxValue, setMaxValue }: Props) {
    const handleOnClick = () => {
        setMaxValue(value)
    }
    return (<div onClick={handleOnClick} className={clsx("w-16 h-16 aspect-square rounded-full flex justify-center items-center", {
                                            "bg-purple-500 text-black" : value <= maxValue,
                                            "border-purple-500 border-3" : value === maxValue + 1
                                        })}>
        <span className="text-2xl">{value}</span></div>);
}

export default RowNumber;