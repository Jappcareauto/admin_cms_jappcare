import { changeDateForm } from "@/functions/boostrapFunctions"
import ArrowRight from "../Icones/ArrowRight"
import CalendarIcon from "../Icones/calendarIcon"
import TrashIcon from "../Icones/TrashIcon"
import { OrderInterface } from "@/interfaces/OrderInterface"

const OrderItem = (props: { item: OrderInterface, onDelete: (value: OrderInterface) => void, onShow: (value: OrderInterface) => void, }) => {
    return (
        <div className="grid grid-cols-5 border-b py-2 items-center justify-between">
            <div className="flex items-center w-56 gap-4 rounded-2xl">
                {/* <img width="48" height="48" className="rounded-full"
                        src="../../assets/images/10c6847941b93f45858be7d3ce3ff3ec.png" alt=""
                        srcset=""> */}
                <span className=" text-sm font-semibold">{props.item.user.name}</span>
            </div>
            <div className="font-semibold text-sm ">
                {props.item.items[0].quantity} {props.item.items[0].product.name}
            </div>
            <div>
                <span className="text-orange-500 font-semibold">{props.item.totalPrice.amount} {props.item.totalPrice.currency}</span>
            </div>
            <div className="flex gap-1 items-center">
                <CalendarIcon stroke="#242424" fill="none"></CalendarIcon>
                <span className="text-sm">{changeDateForm(props.item.createdAt)}</span>
            </div>

            <div
                className="p-2 text-xs text-center text-stone-600 hover:bg-stone-300 font-bold rounded-full w-fit px-4 bg-stone-200 ">
                <span>In Progress</span>
            </div>

            <div className="flex justify-end gap-4">
                <button title={"Delete " + props.item.user.name + " user"} onClick={() => props.onDelete(props.item)} type="button" className="rounded-full p-2 hover:bg-red-100">
                    <TrashIcon fill="none" stroke="#242424"></TrashIcon>
                    <span className="hidden">Delete</span>
                </button>
                <button title={"Show  " + props.item.user.name + " details"} onClick={() => props.onShow(props.item)} type="button" className="rounded-full p-2 hover:bg-orange-100">
                    <ArrowRight fill="#FB7C37"></ArrowRight>
                    <span className="hidden">Detail</span>
                </button>
            </div>
        </div >
    )
}

export default OrderItem