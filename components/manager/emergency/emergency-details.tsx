import CalendarIcon from "@/components/Icones/calendarIcon"
import CloseIcon from "@/components/Icones/CloseIcon"
import TargetIcon from "@/components/Icones/TargetIcon"
import { Button } from "@/components/UI/Button"
import Image from "next/image"

interface EmergencyDetailsProps {
    name: string,
    type: "Request" | "Accepted" | "Declined" | "In progress",
    vehicle: string,
    cause: string,
    price: string,
    device: string,
    distance: string,
    onClose: (value: boolean) => void
}
const EmergencyDetails = ({ name, type, vehicle, cause, price, device, distance, onClose }: EmergencyDetailsProps) => {
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
        <div className="fixed top-0 z-50 justify-end right-0 w-full max-w-96 h-full ">
            <div
                className="relative flex flex-col justify-between h-full px-5 py-6 pt-8 overflow-y-auto bg-white  shadow-xl max-md:py-10 max-md:px-5 modal-content">
                <div>
                    <button onClick={() => onClose(false)} type="button" className="text-gray-400 float-end relative bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                        <CloseIcon stroke="#000"></CloseIcon>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <h2 className="font-semibold mt-8">Emergency Details</h2>
                    <h1 className="mt-4 text-xl font-bold text-orange-500">{vehicle}</h1>
                    {/* <p>2024, RWD</p> */}


                    <div className=" animate-pulse  my-4 min-h-52  bg-gray-200 h-40 rounded-2xl dark:bg-gray-700 w-full mb-4"></div>
                    <div className="flex items-center justify-between w-full gap-4 rounded-2xl">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 p-1 bg-stone-100 rounded-full">
                                <Image width="48" height="48" className="rounded-full"
                                    src={"/images/default-profil.svg"}
                                    alt="default-profil" />
                            </div>
                            <span>{name}</span>
                        </div>
                        {cardType()}
                    </div>
                    <div className="flex items-end justify-between mt-4">
                        <div>
                            <h3 className="font-semibold text-xl text-orange-500 "> {cause} Emergency</h3>

                            <div className="flex flex-col gap-2 mt-2  text-stone-500">
                                <div className="flex gap-1">
                                    <CalendarIcon fill="none" stroke="#797676" />
                                    <span ></span>
                                </div>
                                <div className="flex gap-1">
                                    <TargetIcon fill="#797676" />
                                    
                                </div>
                            </div>
                        </div>
                        <div>
                            <span className=" text-stone-500">Revenue</span> <br />
                            <span className="font-semibold text-orange-500">{price} {device}</span>
                        </div>
                    </div>
                    <p className="mt-4 text-sm">
                        {/* Hello, Please I have a break failure, the pedal seems very loose. */}
                    </p>
                    {/* <div className="relative flex items-center justify-center w-full h-48 p-4 mt-4 bg-no-repeat bg-cover rounded-xl "
                        style="background-image: url('./../../assets/images/139764a62e0a099235d98f0c79c15525.png');">
                        <div className="absolute flex flex-row justify-end gap-4 top-4 right-4">
                            <button>
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g filter="url(#filter0_b_1181_7480)">
                                        <rect width="32" height="32" rx="16" fill="white" />
                                        <path
                                            d="M16.5 10C16.2239 10 16 10.2239 16 10.5C16 10.7761 16.2239 11 16.5 11H20.2929L11 20.2929V16.5C11 16.2239 10.7761 16 10.5 16C10.2239 16 10 16.2239 10 16.5V21.4C10 21.7314 10.2686 22 10.6 22H15.5C15.7761 22 16 21.7761 16 21.5C16 21.2239 15.7761 21 15.5 21H11.7071L21 11.7071V15.5C21 15.7761 21.2239 16 21.5 16C21.7761 16 22 15.7761 22 15.5V10.6C22 10.2686 21.7314 10 21.4 10H16.5Z"
                                            fill="#121014" />
                                    </g>
                                    <defs>
                                        <filter id="filter0_b_1181_7480" x="-6" y="-6" width="44" height="44"
                                            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                            <feGaussianBlur in="BackgroundImageFix" stdDeviation="3" />
                                            <feComposite in2="SourceAlpha" operator="in"
                                                result="effect1_backgroundBlur_1181_7480" />
                                            <feBlend mode="normal" in="SourceGraphic"
                                                in2="effect1_backgroundBlur_1181_7480" result="shape" />
                                        </filter>
                                    </defs>
                                </svg>
                            </button>
                        </div>
                        <div className="flex items-center justify-center">
                            <img src="./../../assets/images/service-home.svg" alt="" />
                        </div>
                    </div> */}
                </div>
                <div>
                    <Button typeButton="dark" label="Accept"></Button>
                    <Button typeButton="outline" className="mt-4" label="Decline"></Button>
                
                </div>
            </div>
        </div>
    )
}

export default EmergencyDetails