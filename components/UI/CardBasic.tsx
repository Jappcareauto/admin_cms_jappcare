
const CardBasic = (props: { color: string, icon: JSX.Element | null, subTitle: string, title: string, stat: string, pourcentage: number, sup: boolean }) => {
    const getThemeBackground = (color: string) => {
        let backgroundColor = ""
        switch (color) {
            case "primary":
                backgroundColor = "bg-orange-500"
                break;
            case "secondary":
                backgroundColor = "bg-white"
                break;
            default:
                backgroundColor = "bg-orange-500"
                break;
        }
        return backgroundColor
    }
    const getColorFont = (color: string) => {
        let fontColor = ""
        switch (color) {
            case "primary":
                fontColor = "text-white"
                break;
            case "secondary":
                fontColor = "text-stone-800"
                break;
            default:
                fontColor = "text-white"
                break;
        }
        return fontColor
    }
    return (
        <div
            className={"flex flex-col  min-h-52  w-full justify-between  px-4  border border-stone-200 max-md:pb-4 max-md:min-h-24 rounded-3xl h-full p-4 md:px-8 " + getThemeBackground(props.color)}>
            <div className="flex items-center justify-between">
                {props.icon}
                <span className={"p-2 px-3 text-sm  rounded-full bg-stone-100/10 " + getColorFont(props.color)}>{props.subTitle}
                </span>
            </div>
            <div className="flex items-end justify-between">
                <div className={getColorFont(props.color)}>
                    <h2 className="mb-1 text-3xl font-bold max-md:text-xl ">{props.stat}</h2>
                    <p className="text-sm">{props.title}</p>
                </div>
                <div className={`flex items-center p-1 px-2  ${props.sup ? "text-green-500" : "text-red-500"} bg-stone-100 rounded-full`}>
                    {
                        props.sup ? (
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M11.9999 10C11.9999 10 9.05394 6.00001 7.99988 6C6.94581 5.99999 3.99991 10 3.99991 10"
                                    stroke="green" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        ) : (
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M11.9999 10C11.9999 10 9.05394 6.00001 7.99988 6C6.94581 5.99999 3.99991 10 3.99991 10"
                                    stroke="red" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        )
                    }
                    <span className="text-sm">{props.pourcentage}%</span>
                </div>
            </div>
        </div>
    )
}

export default CardBasic