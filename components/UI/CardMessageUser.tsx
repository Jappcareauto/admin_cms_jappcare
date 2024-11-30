import Image from "next/image"
import Link from "next/link"

const CardMessageUser = (props: { chatRoomId: string, image: string, userName: string, lastMessage: string, time: string, countNewMessage: string }) => {
    return (
        <Link href={"/service_center/chat/" + props.chatRoomId}>
            <div
                className="flex max-w-96 h-16 p-2 pr-4 justify-between shadow-md border border-stone-100 items-start my-4 w-full gap-4 rounded-full card-profile cursor-pointer hover:bg-stone-50 transition-all">
                <div className="flex gap-2 items-center">
                    <Image width={48} height={48} className="rounded-full" src={props.image} alt={""}  ></Image>
                    <div>
                        <h1 className="text-sm font-bold">{props.userName}</h1>
                        <span className="text-sm max-md:text-xs text-gray-400">{props.lastMessage}</span>
                    </div>
                </div>
                <div className="flex gap-2 items-center">
                    {
                        props.countNewMessage == "0" ? "" : (<div className="w-5 h-5 flex p-2 text-xs text-white items-center justify-center rounded-full bg-orange-500">{props.countNewMessage}</div>)
                    }
                    <span className="text-gray-500 text-xs">{props.time}</span>
                </div>
            </div>
        </Link>
    )
}

export default CardMessageUser