
const LocationIcon = (props: { stroke: string, fill: string }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2.00024C16.8706 2.00024 21 6.03322 21 10.926C21 15.8967 16.8033 19.3849 12.927 21.7569C12.6445 21.9164 12.325 22.0002 12 22.0002C11.675 22.0002 11.3555 21.9164 11.073 21.7569C7.2039 19.3618 3 15.9139 3 10.926C3 6.03322 7.12944 2.00024 12 2.00024Z" stroke="#797676" stroke-width="1.5" />
            <path d="M15.5 11C15.5 12.933 13.933 14.5 12 14.5C10.067 14.5 8.5 12.933 8.5 11C8.5 9.067 10.067 7.5 12 7.5C13.933 7.5 15.5 9.067 15.5 11Z" fill={props.fill} stroke={props.stroke} stroke-width="1.5" />
        </svg>
    )
}

export default LocationIcon
