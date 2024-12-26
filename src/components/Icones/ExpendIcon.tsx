
const ExpendIcon = (props: { fill: string }) => {
    return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_b_1181_7480)">
                <rect width="32" height="32" rx="16" fill="white" />
                <path
                    d="M16.5 10C16.2239 10 16 10.2239 16 10.5C16 10.7761 16.2239 11 16.5 11H20.2929L11 20.2929V16.5C11 16.2239 10.7761 16 10.5 16C10.2239 16 10 16.2239 10 16.5V21.4C10 21.7314 10.2686 22 10.6 22H15.5C15.7761 22 16 21.7761 16 21.5C16 21.2239 15.7761 21 15.5 21H11.7071L21 11.7071V15.5C21 15.7761 21.2239 16 21.5 16C21.7761 16 22 15.7761 22 15.5V10.6C22 10.2686 21.7314 10 21.4 10H16.5Z"
                    fill={props.fill} />
            </g>
            <defs>
                <filter id="filter0_b_1181_7480" x="-6" y="-6" width="44"
                    height="44" filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feGaussianBlur in="BackgroundImageFix" stdDeviation="3" />
                    <feComposite in2="SourceAlpha" operator="in"
                        result="effect1_backgroundBlur_1181_7480" />
                    <feBlend mode="normal" in="SourceGraphic"
                        in2="effect1_backgroundBlur_1181_7480" result="shape" />
                </filter>
            </defs>
        </svg>
    )
}

export default ExpendIcon