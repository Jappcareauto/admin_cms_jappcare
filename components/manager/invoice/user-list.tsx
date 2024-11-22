import CloseIcon from "@/components/Icones/CloseIcon"
import { AppointmentInterface } from "@/interfaces/AppointmentInterface"
import { UserInterface } from "@/interfaces/UserInterface"

interface UserListProps {
    onClose: (value: boolean) => void,
    item: AppointmentInterface,
    onSelect: (value: UserInterface) => void,
    users: UserInterface[]
}
const UserList = (props: UserListProps) => {

    return (
        <div className="fixed top-0 z-50 justify-end right-0 w-full max-w-96 h-full ">
            <div
                className="relative flex flex-col justify-between h-full px-5 py-6 pt-8 overflow-y-auto bg-white  shadow-xl max-md:py-10 max-md:px-5 modal-content">
                <div>
                    <button onClick={() => props.onClose(false)} type="button" className="text-gray-400 float-end relative bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                        <CloseIcon stroke="#000"></CloseIcon>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <h2 className="font-bold">User List</h2>
                    {/* <button className="absolute text-sm right-5 top-5" id="closeButtonAppointementDetailModal">Close</button> */}
                    <div className="flex gap-4 flex-col">
                        {props.users.map((item, index) => (
                            <div key={index}  onClick={() => { props.onSelect(item); props.onClose(false) }} className="border cursor-pointer shadow p-2 rounded-md ">
                                {item.name}
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserList