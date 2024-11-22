"use client"
import { AppointmentInterface } from "@/interfaces/AppointmentInterface"
import Calendar from "./Calendar"
import ScheduleItem from "./ScheduleItem"
import CloseIcon from "../Icones/CloseIcon"
import Link from "next/link"
import Planning from "./planning"
import { useState } from "react"
import { Button } from "./Button"
interface AppointmentCalendarModalProps {
    onClose: (value: boolean) => void,
    appointmentList: AppointmentInterface[]
}


const AppointmentCalendarModal = ({ appointmentList, onClose }: AppointmentCalendarModalProps) => {
    const [showCalendar, setShowCalendar] = useState<boolean>(true)
    return (
        <div className="fixed top-0 z-50 justify-end right-0 w-full max-w-96 h-full ">
            <div
                className="relative flex flex-col justify-between h-full px-5 py-6 pt-8 overflow-y-auto bg-white  shadow-xl max-md:py-10 max-md:px-5 modal-content">
                <div>
                    <button onClick={() => onClose(false)} type="button" className="text-gray-400 float-end relative bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                        <CloseIcon stroke="#000"></CloseIcon>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="flex mt-10 px-2  justify-between">
                        <h2 className="font-semibold">Today&apos;s Calendar</h2>
                        <Link href={"/manager/appointments/calendar"} className="text-gray-400 float-end relative bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M9.74805 0.0012207L17.3018 0.00173378L17.402 0.0156517L17.5009 0.0432487L17.562 0.069181C17.641 0.104072 17.7149 0.154603 17.7798 0.219532L17.8206 0.263573L17.8811 0.345052L17.9183 0.410075L17.957 0.500391L17.9761 0.564518L17.9897 0.628459L17.999 0.721655L17.9996 8.25511C17.9996 8.66932 17.6638 9.00511 17.2496 9.00511C16.8699 9.00511 16.5561 8.72296 16.5064 8.35688L16.4996 8.25511L16.499 2.55922L2.55905 16.5042L8.24957 16.5051C8.62927 16.5051 8.94306 16.7873 8.99273 17.1533L8.99957 17.2551C8.99957 17.6348 8.71742 17.9486 8.35134 17.9983L8.24957 18.0051L0.713716 18.0043L0.684732 18.0015C0.61867 17.9969 0.555957 17.983 0.496678 17.9619L0.406546 17.923L0.389358 17.9125C0.185157 17.8021 0.0387101 17.5991 0.00528908 17.3597L-0.00195312 17.2551V9.75122C-0.00195312 9.33701 0.333833 9.00122 0.748047 9.00122C1.12774 9.00122 1.44154 9.28337 1.4912 9.64945L1.49805 9.75122V15.4432L15.438 1.50022L9.74805 1.50122C9.36835 1.50122 9.05456 1.21907 9.00489 0.852991L8.99805 0.751221C8.99805 0.371525 9.2802 0.0577298 9.64628 0.00806737L9.74805 0.0012207Z"
                                    fill="#242424" />
                            </svg>
                        </Link>
                    </div>
                   
                    <Calendar isWeekView={true}></Calendar>
                    <Button label="Show schedule" className="w-fit px-4" typeButton="outline" onClick={() => setShowCalendar(!showCalendar)} type="button"></Button>
                    {/* <button id="buttonScheduleAndCalendar"
                        className="p-2 px-4 mt-4 text-xs transition-colors border rounded-full border-stone-900 lg:text-sm hover:bg-stone-900 hover:text-white">Show
                        Schedule</button> */}
                    {/* <div className="hidden mt-6" id="scheduleToCalendar">
                        <img src="./../../assets/images/small-schedule.svg" alt="" />
                    </div> */}
                    {
                        showCalendar ? (
                            <div className="flex flex-col gap-4 mt-8" id="calendarToSchedule">
                            {
                                appointmentList ?
                                    appointmentList.map((item, index) => (
                                        <ScheduleItem key={index} name={""} serviceName={item.service.title} vehicleName={item.vehicle.name} date={item.date} dateEnd={item.date} />
                                    )) : (
                                        <div>
                                            <div className=" animate-pulse min-h-20  bg-gray-200 h-full rounded-2xl dark:bg-gray-700 w-full mb-4"></div>
                                            <div className=" animate-pulse  min-h-20  bg-gray-200 h-full rounded-2xl dark:bg-gray-700 w-full mb-4"></div>
                                        </div>
                                    )
                            }
                        
                        </div>
                        ) :  <Planning isMobile={true} />
                    }
                  
                </div>
            </div>
        </div>
    )
}
export default AppointmentCalendarModal