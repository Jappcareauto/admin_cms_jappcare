import { changeDateForm } from "@/functions/boostrapFunctions"
import ArrowRight from "../Icones/ArrowRight"
import CalendarIcon from "../Icones/calendarIcon"
import TrashIcon from "../Icones/TrashIcon"
import { UserInterface } from "@/interfaces/UserInterface"

const AccountItem = (props: { item: UserInterface, onDelete: (value: UserInterface) => void, onShow: (value: UserInterface) => void, }) => {
    return (
        <div className="grid grid-cols-5 border-b py-2 items-center justify-between">
            <div className="flex items-center w-56 gap-4 rounded-2xl">
                <img width="48" height="48" className="rounded-full"
                        src={props.item.profileImageUrl} alt=""
                        />
                <span className=" text-sm font-semibold">{props.item.name}</span>
            </div>
            <div className="font-semibold text-sm ">
                {props.item.email}
               
            </div>

            <div className="flex gap-1 items-center">
                <CalendarIcon stroke="#242424" fill="none"></CalendarIcon>
                <span className="text-sm">{changeDateForm(props.item.createdAt)}</span>
            </div>
            {
                props.item.verified ? (
                    <div
                        className="p-2 text-xs text-center text-green-600 hover:bg-green-300 font-bold rounded-full w-fit px-4 bg-green-200 ">
                        <span>Verified</span>
                    </div>
                ) : (
                    <div
                        className="p-2 text-xs text-center text-stone-600 hover:bg-stone-300 font-bold rounded-full w-fit px-4 bg-stone-200 ">
                        <span>Not Verified</span>
                    </div>
                )
            }
            <div className="flex justify-end gap-4">
                <button title={"Delete " + props.item.name + " user"} onClick={() => props.onDelete(props.item)} type="button" className="rounded-full p-2 hover:bg-red-100">
                    <TrashIcon fill="none" stroke="#242424"></TrashIcon>
                    <span className="hidden">Delete</span>
                </button>
                <button title={"Show  " + props.item.name + " details"} onClick={() => props.onShow(props.item)} type="button" className="rounded-full p-2 hover:bg-orange-100">
                    <ArrowRight fill="#FB7C37"></ArrowRight>
                    <span className="hidden">Detail</span>
                </button>
            </div>
        </div>
    )
}

export default AccountItem