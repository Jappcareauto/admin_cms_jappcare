// import Image from "next/image";
const CardStat = (props: { color: string, icon: JSX.Element | null, title: string, stat: string | number }) => {
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
            className={"flex flex-col min-h-24  w-full justify-between  px-2  border border-stone-200 max-md:pb-4 max-md:min-h-24 rounded-3xl h-full p-4 md:px-4 " + getThemeBackground(props.color)}>
            <div className="flex items-center justify-between">
                {props.icon}
            </div>
            <div className="flex mt-4 items-end justify-between">
                <div className={getColorFont(props.color)}>
                    <h2 className="mb-1 text-2xl font-bold max-md:text-xl ">{props.stat}</h2>
                    <p className="text-sm text-stone-500">{props.title}</p>
                </div>
            </div>
        </div>
    )
}

export default CardStat