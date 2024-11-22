import CloseIcon from "../Icones/CloseIcon"
import { Button } from "./Button"

const ModalDelete = (props: { title: string, message: string, onClose: (value: boolean) => void, onSubmit: (value: boolean) => void }) => {
    return (
        <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {props.title}
                    </h3>
                    <button onClick={() => props.onClose(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                        <CloseIcon stroke="#000"></CloseIcon>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <div className="p-4 md:p-5 space-y-4">
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        {props.message}
                    </p>
                </div>
                <div className="flex items-center p-4 gap-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <Button onClick={() => props.onSubmit(true)} label="Accept" typeButton="primary" className="w-fit px-4"></Button>
                    <Button onClick={() => props.onClose(false)} label="Decline" typeButton="gray" className="w-fit px-4"></Button>
                </div>
            </div>
        </div>

    )
}
export default ModalDelete