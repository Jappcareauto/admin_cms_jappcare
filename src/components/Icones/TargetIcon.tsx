

const TargetIcon = (props: {  fill: string }) => {
    return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_b_1181_7483)">
                <rect width="32" height="32" rx="16" fill="white" />
                <path
                    d="M21.9298 11.3614C22.2409 10.5526 21.4462 9.75798 20.6375 10.069L10.6391 13.9146C9.73317 14.263 9.80491 15.568 10.7436 15.815L14.7684 16.8741C14.9427 16.92 15.0789 17.0561 15.1247 17.2304L16.1839 21.2552C16.4309 22.194 17.7359 22.2657 18.0843 21.3597L21.9298 11.3614ZM20.9965 11.0024L17.151 21.0008L16.0918 16.9759C15.9542 16.453 15.5458 16.0447 15.0229 15.9071L10.9981 14.8479L20.9965 11.0024Z"
                    fill={props.fill} />
            </g>
            <defs>
                <filter id="filter0_b_1181_7483" x="-6" y="-6" width="44"
                    height="44" filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feGaussianBlur in="BackgroundImageFix" stdDeviation="3" />
                    <feComposite in2="SourceAlpha" operator="in"
                        result="effect1_backgroundBlur_1181_7483" />
                    <feBlend mode="normal" in="SourceGraphic"
                        in2="effect1_backgroundBlur_1181_7483" result="shape" />
                </filter>
            </defs>
        </svg>)
}

export default TargetIcon