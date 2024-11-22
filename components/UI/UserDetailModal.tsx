

import { useState } from "react";
import { Button } from "./Button"
import { Input } from "./Input"
import { Select } from "./Select";
import ExpendIcon from "../Icones/ExpendIcon";
import TargetIcon from "../Icones/TargetIcon";
import { UserInterface } from "@/interfaces/UserInterface";
import CloseIcon from "../Icones/CloseIcon";

const UserDetailModal = (props: { user: UserInterface, onSubmit: Function, onClose: Function }) => {
    const [code, setCode] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    return (
        <div className="fixed top-0 z-50 justify-end right-0 w-full max-w-96 h-full ">
            <div
                className="relative flex flex-col justify-between h-full px-5 py-6 pt-8 overflow-y-auto bg-white  shadow-xl max-md:py-10 max-md:px-5 modal-content">
                <div>
                    <button onClick={() => props.onClose(false)} type="button" className="text-gray-400 float-end relative bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                        <CloseIcon stroke="#000"></CloseIcon>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <h2 className="font-bold mb-4 mt-8">Users Details</h2>
                    <div className="relative flex items-start justify-start w-full gap-4 rounded-2xl">
                        <div style={{ width: 128, height: 128, }} className="relative border rounded-full border-stone-100 shadow">
                            {/* <img width="128" height="128" className="rounded-full"
                    src="../../assets/images/10c6847941b93f45858be7d3ce3ff3ec.png" alt="" srcset=""> */}
                            {
                                props.user.verified ? (
                                    <button title="Account verified"
                                        className="absolute flex items-center justify-center bg-green-500 rounded-full size-8 -bottom-0 -right-0">
                                        <svg fill="#ffffff" width="20" height="20" viewBox="-3.5 0 19 19" xmlns="http://www.w3.org/2000/svg" className="cf-icon-svg" stroke="#ffffff">
                                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round">
                                            </g>
                                            <g id="SVGRepo_iconCarrier">
                                                <path d="M4.63 15.638a1.028 1.028 0 0 1-.79-.37L.36 11.09a1.03 1.03 0 1 1 1.58-1.316l2.535 3.043L9.958 3.32a1.029 1.029 0 0 1 1.783 1.03L5.52 15.122a1.03 1.03 0 0 1-.803.511.89.89 0 0 1-.088.004z"></path>
                                            </g>
                                        </svg>
                                    </button>
                                ) : null
                            }

                        </div>

                    </div>
                    <h3 className="font-bold text-xl">{props.user.name}</h3>
                    <h3 className="font-thin my-2 text-orange-500">{props.user.email}</h3>
                   
                </div>
              
            </div>
        </div>)
}
export default UserDetailModal