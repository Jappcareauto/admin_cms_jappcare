import { AppointmentInterface } from "@/interfaces/AppointmentInterface"
import CloseIcon from "../Icones/CloseIcon"
import { StateEnum } from "@/enums/statusEnum"
import CalendarIcon from "../Icones/calendarIcon"
import { changeDateForm } from "@/functions/boostrapFunctions"
import { Button } from "./Button"
import ImagesView from "./ImageView"

interface AppointmentDetailModalProps {
    onClose: (value: boolean) => void,
    item: AppointmentInterface,
}
const AppointmentDetailModal = (props: AppointmentDetailModalProps) => {
  
    return (
        <div className="fixed top-0 z-50 justify-end right-0 w-full max-w-96 h-full ">
            <div
                className="relative flex flex-col justify-between h-full px-5 py-6 pt-8 overflow-y-auto bg-white  shadow-xl max-md:py-10 max-md:px-5 modal-content">
                <div>
                    <button onClick={() => props.onClose(false)} type="button" className="text-gray-400 float-end relative bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                        <CloseIcon stroke="#000"></CloseIcon>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <h2 className="font-bold">Appointment Details</h2>
                    {/* <button className="absolute text-sm right-5 top-5" id="closeButtonAppointementDetailModal">Close</button> */}
                    <div className="flex flex-col gap-4 mt-4">
                        <div>
                            <h3 className="text-2xl font-semibold text-orange-500">
                                {/* Porsche Taycan Turbo S */}
                            </h3>
                            <h4>2024, RWD</h4>
                            {/* <img className="w-full" src="./../../assets/images/5e8173900d54188840dcc505afaab0b3.png" alt=""
                    srcset=""> */}
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center w-full gap-2 rounded-2xl">
                                {/* <img width="48" height="48" className="rounded-full"
                        src="../../assets/images/10c6847941b93f45858be7d3ce3ff3ec.png" alt="" srcset=""> */}
                                <span className="text-sm">
                                    {/* James Mann */}
                                </span>
                            </div>
                            <div className="p-2 text-xs text-center text-orange-500 rounded-full p w-28 bg-rose-50 lg:text-sm" >
                                <span>
                                    {props.item.status}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-end justify-between mt-4">
                            <div>
                                <h3 className="text-xl font-bold text-orange-500 max-md:text-sm">
                                    {/* {props.item.serviceId} */}
                                    appointment
                                </h3>
                                <h4 className="mt-2 font-bold">
                                    {/* Porsche Taycan Turbo S */}
                                </h4>
                                <div className="flex flex-col gap-2 mt-2 text-stone-500">
                                    <div className="flex gap-1">
                                        <CalendarIcon fill="#797676" stroke="#797676" />
                                        <span className="text-sm">{changeDateForm(props.item.date)}</span>
                                    </div>
                                    <div className="flex gap-1 text-sm">
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
                                        {props.item.locationType}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-sm text-stone-500">Revenue</span>
                                <span className="text-lg font-semibold text-orange-500 ">
                                    {/* Frs */}
                                </span>
                            </div>
                        </div>
                        <p className="text-sm">
                            {/* There is a noticeable dent on the rear bumper of my Porsche Taycan, specifically located between
                            the lower edge of the rear headlight and the rear wheel arch. It is closer to the wheel arch,
                            situated near the car&apos;s side profile. The dent is below the horizontal line of the rear
                            headlight and sits closer to the lower third of the rear bumper. */}
                        </p>
                        <h3 className="font-semibold">Images</h3>
                        <div className="flex w-full gap-2 overflow-hidden">
                            {
                                props.item.vehicle?.media.map((item, index) => (
                                    <ImagesView item={item.items} key={index}></ImagesView>
                                ))
                            }
                        </div>
                        <Button typeButton="dark" label="Mark as completed"></Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppointmentDetailModal