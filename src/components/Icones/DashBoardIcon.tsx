import React from 'react'

const DashBoardIcon = (props: { stroke: string, fill: string }) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd"
                d="M2.35137 13.2134L2.35139 13.2135L2.65243 15.1724L2.65244 15.1725C3.15287 18.4289 3.4031 20.0572 4.571 21.0286C5.39295 21.7123 6.48213 21.9148 8.24564 21.9748L8.00063 18.5445C7.83487 16.2239 9.67286 14.25 11.9993 14.25C14.3259 14.25 16.1638 16.2239 15.9981 18.5445L15.753 21.9748C17.5173 21.9149 18.6068 21.7124 19.429 21.0286C20.5969 20.0572 20.8472 18.4289 21.3476 15.1724L21.6486 13.2135C22.0017 10.9162 22.1782 9.76763 21.7439 8.74938C21.3096 7.73117 20.3461 7.03449 18.4191 5.64125L18.4189 5.64106L16.979 4.6L16.9787 4.59979C14.5816 2.8666 13.383 2 12 2C10.617 2 9.41829 2.86667 7.02099 4.6L5.58114 5.64106C3.65403 7.03443 2.69047 7.73112 2.25617 8.74938C1.82187 9.76761 1.99836 10.9162 2.35137 13.2134ZM14.2493 21.9985C14.2493 21.9813 14.25 21.964 14.2512 21.9466L14.5019 18.4377C14.6056 16.9853 13.4553 15.75 11.9993 15.75C10.5434 15.75 9.39308 16.9853 9.49682 18.4377L9.74745 21.9466C9.74869 21.964 9.74933 21.9813 9.74938 21.9985C10.0986 22 10.4686 22 10.8612 22H13.1388C13.5309 22 13.9004 22 14.2493 21.9985Z"
                fill={props.fill} stroke={props.stroke} />
        </svg>
    )
}

export default DashBoardIcon
