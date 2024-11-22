import { AppointmentInterface } from "@/interfaces/AppointmentInterface"
import * as React from "react"
import TrashIcon from "../Icones/TrashIcon"
import CalendarIcon from "../Icones/calendarIcon"
import TargetIcon from "../Icones/TargetIcon"

// import { cn } from "@/app/lib/utils"
// import { StateEnum } from "@/app/admin/appointments/page"
// import { Button } from "./Button"
// import ImageProfile from "@/public/images/profil7.png"
// import Image from 'next/image'
enum StateEnum {
    PENDING = "Pending",
    CONFIRMED = "Confirmed",
    CANCELLED = "Cancelled",
    COMPLETED = "Completed",
    NO_SHOW = "No show",
    COUNT = 4
}

interface CardAppointmentProps {
    item: AppointmentInterface,
    onShow: (value: true) => void
}
const CardAppointment = (props: CardAppointmentProps) => {
    const selectState = (type: string) => {
        let cls
        switch (type) {
            case StateEnum.CANCELLED:
                cls = " border-red-100 bg-red-50 text-red-500 border";
                break;
            case StateEnum.CONFIRMED:
                cls = " border-blue-100 bg-blue-50 text-blue-500 border";
                break;
            case StateEnum.COMPLETED:
                cls = " border-green-100 bg-green-50 text-green-500 border";
                break;
            case StateEnum.NO_SHOW:
                cls = " border-stone-100 bg-stone-50 text-stone-500 border";
                break;
            case StateEnum.PENDING:
                cls = " border-yellow-100 bg-yellow-50 text-yellow-500 border";
                break;
            default:
                cls = " border-stone-100 bg-stone-50 text-stone-500 border";
                break;
        }
        return cls;
    }

    return (
        <div className="flex items-center justify-between py-2 border-b">
            <div className="flex items-center w-56 gap-4 rounded-2xl">
                {/* <img width="48" height="48" className="rounded-full"
        src="../../assets/images/10c6847941b93f45858be7d3ce3ff3ec.png" alt=""
        srcset=""> */}
                <span className="font-bold max-md:text-xs">
                    {/* {props.nameClient} */}
                </span>
            </div>
            <div className="font-semibold">
                {/* {props.item.nameManager} */}
            </div>
            <div className="font-semibold">
                {props.item.vehicle.name}
            </div>

            <div className="flex items-center gap-1">
                <CalendarIcon fill="#111111" stroke="#111111"></CalendarIcon>
                <span className="text-sm">{props.item.date}</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
                <TargetIcon fill="#111111"></TargetIcon>
                <span>{props.item.locationType}</span>
            </div>
            <div
                className={"p-2 text-xs text-center rounded-full w-28 lg:text-sm " + selectState(props.item.status)}>
                <span>{props.item.status}</span>
            </div>
            <div className="flex gap-4">
                <button type="button">

                    <TrashIcon fill="#141B34" stroke="#141B34"></TrashIcon>
                    <span className="hidden">Delete</span>
                </button>
                <button onClick={() => props.onShow(true)} type="button" className="card-product">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M13.2673 4.20938C12.9674 3.92369 12.4926 3.93523 12.2069 4.23516C11.9213 4.53509 11.9328 5.00982 12.2327 5.29551L18.4841 11.2501H3.75C3.33579 11.2501 3 11.5859 3 12.0001C3 12.4143 3.33579 12.7501 3.75 12.7501H18.4842L12.2327 18.7048C11.9328 18.9905 11.9213 19.4652 12.2069 19.7652C12.4926 20.0651 12.9674 20.0766 13.2673 19.791L20.6862 12.7243C20.8551 12.5634 20.9551 12.3581 20.9861 12.1448C20.9952 12.098 21 12.0496 21 12.0001C21 11.9506 20.9952 11.9021 20.986 11.8552C20.955 11.642 20.855 11.4369 20.6862 11.2761L13.2673 4.20938Z"
                            fill="#FB7C37" />
                    </svg>
                    <span className="hidden">Detail</span>
                </button>

            </div>
        </div>

    )
}


export default CardAppointment
