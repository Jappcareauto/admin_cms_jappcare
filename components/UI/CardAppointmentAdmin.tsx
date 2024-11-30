import * as React from "react"

import { Button } from "./Button"
import { StateEnum } from "@/enums/statusEnum"
import { AppointmentInterface } from "@/interfaces/AppointmentInterface"
import Link from "next/link"
import CalendarIcon from "../Icones/calendarIcon"



const CardAppointmentAdmin = (props: { item: AppointmentInterface, onShow: (value: boolean) => void }) => {


    const selectState = (type: string) => {
        let cls = " border-stone-100 bg-stone-50 text-stone-500 border";
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
        <div className="p-4 px-6   border rounded-xl"
        >
            <div className="flex items-center justify-between">
                <div className="flex justify-start gap-2">
                    <div className="flex items-center gap-4 py-3 pr-3 rounded-2xl">
                      
                        <span className="text-xs"></span>
                    </div>
                </div>
                <div className="appointement-statut ">
                    <div
                        className={"p-2  text-xs text-center rounded-full  px-4 " + selectState(props.item.status)}>{props.item.status}</div>
                </div>
            </div>
            <div className="flex items-end justify-between">
                <div className="">
                    <Link href={"/service_center/appointments" + props.item.id}
                        className="text-lg font-medium text-orange-500 hover:text-orange-400 cursor-pointer">
                        {props.item.service?.title} appointement</Link>
                    <h4 className=" font-medium text-sm">{props.item.vehicle?.name}</h4>
                    <div className="flex gap-2 mt-2 items-center lg:gap-6 ">
                        <div className="flex gap-1 items-center showCalendar">
                            <CalendarIcon fill="#797676" stroke="#797676"></CalendarIcon>
                            <span className="text-xs">{props.item.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <svg width="20" className="hidden md:block" height="20"
                                viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12 2.00024C16.8706 2.00024 21 6.03322 21 10.926C21 15.8967 16.8033 19.3849 12.927 21.7569C12.6445 21.9164 12.325 22.0002 12 22.0002C11.675 22.0002 11.3555 21.9164 11.073 21.7569C7.2039 19.3618 3 15.9139 3 10.926C3 6.03322 7.12944 2.00024 12 2.00024Z"
                                    stroke="#797676" strokeWidth="1.5" />
                                <path
                                    d="M15.4999 11C15.4999 12.933 13.9329 14.5 11.9999 14.5C10.0669 14.5 8.49991 12.933 8.49991 11C8.49991 9.067 10.0669 7.5 11.9999 7.5C13.9329 7.5 15.4999 9.067 15.4999 11Z"
                                    stroke="#797676" strokeWidth="1.5" />
                            </svg>
                            <span className="text-xs">{props.item.locationType}</span>
                        </div>
                    </div>
                </div>
                <div>
                    <Button typeButton={"outline"} onClick={() => props.onShow(true)} className="rounded-full px-4" label={"See Details"}></Button>
                </div>
            </div>
        </div>

    )
}


export default CardAppointmentAdmin;
