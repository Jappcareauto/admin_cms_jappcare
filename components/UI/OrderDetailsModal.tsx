"use client"
import { OrderInterface } from "@/interfaces/OrderInterface"
import CloseIcon from "../Icones/CloseIcon"
import CalendarIcon from "../Icones/calendarIcon"
import { changeDateForm } from "@/functions/boostrapFunctions"

const OrderDetailsModal = (props: { item: OrderInterface, onClose: (value: boolean) => void, }) => {

    return (
        <div className="fixed top-0 z-50 justify-end right-0 w-full max-w-96 h-full  ">
            <div
                className="relative flex flex-col justify-between h-full px-5 py-6 pt-8 overflow-y-auto bg-white  shadow-xl max-md:py-10 max-md:px-5 modal-content">
                <div>
                    <button onClick={() => props.onClose(false)} type="button" className="text-gray-400 float-end relative bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center ">
                        <CloseIcon stroke="#000"></CloseIcon>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <h2 className="font-bold mb-4">Order Details</h2>
                    <div className="flex py-2 items-center justify-between">
                        <div className="flex items-center w-56 gap-4 rounded-2xl">
                            <img width="64" height="64" className="rounded-full"
                                src={props.item.user.profileImage.container} alt="" />
                            <span className="max-md:text-xs font-semibold">{props.item.user.name}</span>
                        </div>
                        <div className="p-2 text-xs text-center text-green-500 rounded-full p w-28 bg-green-100 lg:text-sm">
                            <span>Completed</span>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-sm text-stone-500">Ordered</h4>
                        <div className="flex gap-1 mt-2 items-center">
                            <CalendarIcon fill="#242424" stroke="#242424"></CalendarIcon>
                            <span>{changeDateForm(props.item.createdAt)}</span>
                        </div>
                        <h4 className="text-sm mt-1 text-stone-500">Delivered</h4>
                        <div className="flex gap-1 mt-2 items-center">
                            <CalendarIcon fill="#242424" stroke="#242424"></CalendarIcon>
                            <span>Oct, 22, 2024</span>
                        </div>
                        <h4 className="text-sm mt-3 text-stone-500">Items</h4>
                        <div className="text-sm">
                            {props.item.items.map((item, key) => (
                                <div key={key} className="flex justify-between border-b py-4 border-stone-50">
                                    <span>{item.quantity}x {item.product.name}</span>
                                    <span className="font-bold">{item.product.price.amount} <span>{item.product.price.currency}</span></span>
                                </div>
                            )
                            )}
                            <div className="flex justify-between border-b py-4 border-stone-50">
                                <span>Total</span>
                                <span className="font-bold text-orange-500">{props.item.totalPrice.amount} {props.item.totalPrice.currency}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default OrderDetailsModal