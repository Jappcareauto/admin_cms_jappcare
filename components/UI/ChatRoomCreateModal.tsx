import { FormEvent, useState } from "react";
import { Button } from "./Button"
import { Input } from "./Input"
import { Select } from "./Select";
// import ExpendIcon from "../Icones/ExpendIcon";
// import TargetIcon from "../Icones/TargetIcon";
import { UserInterface } from "@/interfaces/UserInterface";
import CloseIcon from "../Icones/CloseIcon";

const ChatRoomCreateModal = (props: { onSubmit: (value: { name: string, participant: string[] }) => void, onClose: (value: boolean) => void, users: UserInterface[] }) => {

    const [name, setName] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [participantList, setParticipantList] = useState<string[]>([]);

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (name == "") {
            setMessage("Fields is empty")
        } else {
            props.onSubmit({ name: name, participant: participantList })
        }
    }


    return (
        <div className="fixed top-0 z-50 justify-end right-0 w-full max-w-96 h-full ">
            <form onSubmit={onSubmit} method="post"
                className="relative flex flex-col justify-between h-full px-5 py-6 pt-8 overflow-y-auto bg-white  shadow-xl max-md:py-10 max-md:px-5 modal-content">
                <div>
                    <button onClick={() => props.onClose(false)} type="button" className="text-gray-400 float-end relative bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                        <CloseIcon stroke="#000"></CloseIcon>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <h2 className="font-bold mb-4 mt-8">New Chat room</h2>

                    <p className="text-red-400 my-4"> {message}</p>
                    <div>
                        <div className="my-3">
                            <label htmlFor="chatRoomName" className="text-sm">Chat room Name</label>
                            <Input value={name} onChange={e => { setName(e.target.value) }} type="text" className="mt-2" placeholder="Chat Name" name="chatRoomName" id="chatRoomName" ></Input>
                        </div>
                        <div>
                            <label htmlFor="list" className="text-sm">Add participant</label>
                            {
                                props.users.map((user, index) => (
                                    <div key={index} className="flex my-2 items-center ps-4 border border-gray-200 rounded ">
                                        <input onChange={(e) => {
                                            if (e.target.checked) {
                                                setParticipantList([...participantList, user.id]);
                                            }else{
                                                setParticipantList(
                                                    participantList.filter(a =>
                                                        a !== user.id
                                                    )
                                                );
                                            }
                                        }} id="bordered-checkbox-1" type="checkbox" value="" name="bordered-checkbox" className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500  focus:ring-2 " />
                                        <label htmlFor="bordered-checkbox-1" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{user.name}</label>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <Button typeButton="dark" type="submit" label="Create chat room"></Button>
            </form>
        </div>)
}
export default ChatRoomCreateModal