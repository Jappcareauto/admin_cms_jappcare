// import { useState } from "react";
// import { Button } from "./Button"
// import { Input } from "./Input"
// import { Select } from "./Select";
// import ExpendIcon from "../Icones/ExpendIcon";
// import defaultImageProfile from "@/public/images/profil7.png"

import CloseIcon from "../Icones/CloseIcon";
// import { ProductInterface } from "@/interfaces/ProductInterface";
import { Button } from "./Button";

const TipsDetailModal = (props: { item: { label: string, description: string }, onSubmit: (value: { label: string, description: string }) => void, onClose: (value: boolean) => void }) => {

    return (
        <div className="fixed top-0 z-50 justify-end right-0 w-full max-w-96 h-full ">
            <div
                className="relative flex flex-col justify-between h-full px-5 py-6 pt-8 overflow-y-auto bg-white  shadow-xl max-md:py-10 max-md:px-5 modal-content">
                <div>
                    <button onClick={() => props.onClose(false)} type="button" className="text-gray-400 float-end relative bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                        <CloseIcon stroke="#000"></CloseIcon>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <h2 className="font-bold mb-4">Tips detail</h2>
                    <div>
                        <div>
                            <h3 className="text-xl font-semibold text-orange-500" >Label</h3>
                            <span className="text-sm text-gray-700">{props.item.label}</span>
                        </div>
                        <div className="mt-2">
                            <h3 className="text-xl font-semibold text-orange-500" >Description</h3>
                            <p className="text-sm text-gray-700">{props.item.description}</p>
                        </div>
                    </div>
                </div>
                <Button typeButton="dark" label="Edit Tip" onClick={() => props.onSubmit({ label: props.item.label, description: props.item.description })}></Button>
            </div>
        </div>
    )
}
export default TipsDetailModal