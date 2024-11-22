const CalendarIcon = (props: {stroke: string, fill: string}) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M18 2V4M6 2V4" stroke={props.stroke}  strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round" />
            <path
                d="M12.9917 2.5H11.0083C9.02839 2.49999 7.48726 2.49999 6.28725 2.67441C5.06018 2.85276 4.11749 3.22232 3.38507 4.01412C2.65778 4.80038 2.32291 5.80313 2.16034 7.11036C2.15461 7.15643 2.14908 7.20298 2.14375 7.25H21.8562C21.8509 7.20298 21.8454 7.15643 21.8397 7.11036C21.6771 5.80313 21.3422 4.80038 20.615 4.01412C19.8825 3.22231 18.9398 2.85275 17.7128 2.6744C16.5127 2.49999 14.9716 2.49999 12.9917 2.5Z"
                fill={props.fill}  stroke={props.stroke}  />
            <path fillRule="evenodd" clipRule="evenodd" 
                d="M2 12.2069C2 10.8766 1.99999 9.73365 2.03809 8.75H21.9619C22 9.73365 22 10.8765 22 12.2069V12.7931C22 14.941 22 16.6003 21.8397 17.8897C21.6771 19.1969 21.3422 20.1996 20.615 20.9859C19.8825 21.7777 18.9398 22.1473 17.7128 22.3256C16.5127 22.5 14.9716 22.5 12.9917 22.5H11.0083C9.02837 22.5 7.48726 22.5 6.28725 22.3256C5.06019 22.1473 4.1175 21.7777 3.38508 20.9859C2.65779 20.1996 2.32291 19.1969 2.16034 17.8897C1.99999 16.6003 2 14.941 2 12.7931V12.2069ZM7.2 12C6.53726 12 6 12.5223 6 13.1667C6 13.811 6.53726 14.3333 7.2 14.3333H7.21076C7.87351 14.3333 8.41076 13.811 8.41076 13.1667C8.41076 12.5223 7.87351 12 7.21076 12H7.2ZM11.9946 12C11.3319 12 10.7946 12.5223 10.7946 13.1667C10.7946 13.811 11.3319 14.3333 11.9946 14.3333H12.0054C12.6681 14.3333 13.2054 13.811 13.2054 13.1667C13.2054 12.5223 12.6681 12 12.0054 12H11.9946ZM16.7892 12C16.1265 12 15.5892 12.5223 15.5892 13.1667C15.5892 13.811 16.1265 14.3333 16.7892 14.3333H16.8C17.4627 14.3333 18 13.811 18 13.1667C18 12.5223 17.4627 12 16.8 12H16.7892ZM7.2 16.6667C6.53726 16.6667 6 17.189 6 17.8333C6 18.4777 6.53726 19 7.2 19H7.21076C7.87351 19 8.41076 18.4777 8.41076 17.8333C8.41076 17.189 7.87351 16.6667 7.21076 16.6667H7.2ZM11.9946 16.6667C11.3319 16.6667 10.7946 17.189 10.7946 17.8333C10.7946 18.4777 11.3319 19 11.9946 19H12.0054C12.6681 19 13.2054 18.4777 13.2054 17.8333C13.2054 17.189 12.6681 16.6667 12.0054 16.6667H11.9946Z"
                fill={props.fill}   stroke={props.stroke}/>
        </svg>
    )
}

export default CalendarIcon