import { Button } from "@/components/UI/Button"
import Image from "next/image"

interface CardEmergencyProps {
    name: string,
    type: "Request" | "Accepted" | "Declined" | "In progress",
    vehicle: string,
    cause: string,
    price: string,
    device: string,
    distance: string,
    showDetail: (value: {
        name: string,
        type: "Request" | "Accepted" | "Declined" | "In progress",
        vehicle: string,
        cause: string,
        price: string,
        device: string,
        distance: string,
    }) => void
}
const CardEmergency = ({ name, type, vehicle, cause, price, device, distance, showDetail }: CardEmergencyProps) => {
    const cardType = () => {
        switch (type) {
            case "Accepted":
                return (
                    <div className="flex flex-col items-end">
                        <div className="w-fit p-2 text-sm text-green-600 rounded-full px-3 bg-green-200 hover:text-green-700 hover:bg-green-300">
                            Accepted
                        </div>
                    </div>
                )
                break;
            case "Request":
                return (
                    <div className="flex flex-col items-end">
                        <div className="w-fit  p-2 text-sm text-stone-600 rounded-full px-3 bg-stone-200 hover:text-stone-700 hover:bg-stone-300">
                            Request
                        </div>
                        <div className="flex mt-4 gap-4">
                            <Button typeButton="outline" className="rounded-full w-fit px-4" label="Decline"></Button>
                            <Button typeButton="dark" className="rounded-full w-fit px-4" label="Accept"></Button>
                        </div>
                    </div>
                )
                break;
            case "Declined":
                return (
                    <div className="flex flex-col items-end">
                        <div className="w-fit p-2 text-sm text-red-600 rounded-full px-3 bg-red-200 hover:text-red-700 hover:bg-red-300">
                            Declined
                        </div>
                    </div>
                )
                break;

            default:

                return (
                    <div className="flex flex-col items-end">
                        <div className="w-fit p-2 text-sm text-orange-600 rounded-full px-3 bg-orange-200 hover:text-orange-700 hover:bg-orange-300">
                            In Progress
                        </div>
                    </div>
                )
                break;
        }
    }
    return (
        <div className="p-4 border rounded-xl" onClick={() => showDetail({
            name: name,
            distance: distance,
            type: type,
            vehicle: vehicle,
            price: price,
            device: device,
            cause: cause
        })}>
            <div className="flex items-start justify-between w-full gap-4 rounded-2xl">
                <div className="flex justify-between flex-col">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 p-1 bg-stone-200 rounded-full">
                            <Image width="48" height="48" className="rounded-full"
                                src={"/images/default-profil.svg"}
                                alt="default-profil" />
                        </div>
                        <span className="text-stone-700">{name}</span>
                    </div>
                    <div className="flex mt-5 items-center gap-4 text-xs font-semibold lg:text-sm">
                        <span>{vehicle}</span>
                        <span>{cause}</span>
                        <span>{price} {device}</span>
                        <span>{distance} away</span>
                    </div>
                </div>
                {cardType()}

            </div>

        </div>
    )
}

export default CardEmergency