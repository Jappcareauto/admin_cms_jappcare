
const CloseIcon = (props: { stroke: string }) => {
    return (
        <svg width={14} height={14}  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke={props.stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
        </svg>
    )
}

export default CloseIcon