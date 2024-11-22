import Image from "next/image"
// import Link from "next/link"

const CardOrderShop = (props: { id: string, image: string, userName: string, productName: string}) => {
    return (
        // <Link href={"/admin/chat/" + props.id}>
            <div className="p-3 border rounded-xl flex items-end justify-between gap-2">
                <div>
                    <div className="flex justify-start gap-2">
                        <div className="flex items-center gap-4 pr-3 rounded-2xl">
                            {props.image == "" ? null : (
                                <Image width="48" height="48" className="rounded-full"
                                    src={props.image}
                                    alt="" />
                            )}
                            <span className="text-sm">{props.userName}</span>
                        </div>
                    </div>
                    <div className=" mt-1">
                        <div>
                            <span className=" font-bold">{props.productName}</span>
                        </div>
                        <span className="font-semibold text-orange-500">{props.productName} Frs</span> &nbsp;
                        <span className=" text-stone-400">Qnty:</span> <span>{props.productName}</span>
                    </div>
                </div>
            </div>
        // </Link>
    )
}

export default CardOrderShop