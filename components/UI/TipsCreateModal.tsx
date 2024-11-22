// import { useState } from "react";
// import { Button } from "./Button"
// import { Input } from "./Input"
// import { Select } from "./Select";
// import ExpendIcon from "../Icones/ExpendIcon";
// import defaultImageProfile from "@/public/images/profil7.png"
import { useState } from "react";
import CloseIcon from "../Icones/CloseIcon";
// import { ProductInterface } from "@/interfaces/ProductInterface";
import { Button } from "./Button";
import { Input } from "./Input";
import { Textarea } from "./Textarea";
const TipsCreateModal = (props: { item: { label: string, description: string }, onSubmit: (value: { label: string, description: string }) => void, onClose: (value: boolean) => void }) => {
    const [label, setLabel] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    return (
        <div className="fixed top-0 z-50 justify-end right-0 w-full max-w-96 h-full ">
            <div
                className="relative flex flex-col justify-between h-full px-5 py-6 pt-8 overflow-y-auto bg-white  shadow-xl max-md:py-10 max-md:px-5 modal-content">
                <div>
                    <button onClick={() => props.onClose(false)} type="button" className="text-gray-400 float-end relative bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                        <CloseIcon stroke="#000"></CloseIcon>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <h2 className="font-bold mb-4">New tips</h2>
                    <div>
                        <div>
                            <label htmlFor="label">Label</label>
                            <Input type="text" value={label} onChange={(e) => setLabel(e.target.value)}></Input>
                        </div>
                        <div className="mt-2">
                            <label htmlFor="description">Description</label>
                            <Textarea type="text" value={description} onChange={(e) => setDescription(e.target.value)}></Textarea>
                        </div>
                    </div>
                </div>
                <Button typeButton="dark" label="Create Tip" onClick={() => props.onSubmit({ label: label, description: description })}></Button>
            </div>
        </div>
    )
}
export default TipsCreateModal