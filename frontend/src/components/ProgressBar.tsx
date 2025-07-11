interface Props {
    value: number
    maxValue: number
}
function ProgressBar({ value, maxValue }: Props) {
    return (<>
        <span>{(value / maxValue * 100).toFixed(1)}%</span>
        <progress value={value / maxValue} color=""/></>);
}

export default ProgressBar;