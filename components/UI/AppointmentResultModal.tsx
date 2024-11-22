import { AppointmentInterface } from "@/interfaces/AppointmentInterface"
import { Button } from "./Button"

const AppointmentResultModal = () => {
    return (
        <div className="fixed top-0 z-30 justify-end right-0 w-full max-w-96 h-full ">
            <div
                className="relative flex flex-col justify-between h-full px-5 py-6 pt-8 overflow-y-auto bg-white  shadow-xl max-md:py-10 max-md:px-5 modal-content">
                <div>
                    <h2 className="font-bold">Appointment Results</h2>
                    <div className="flex flex-col justify-between h-full gap-4 mt-4">
                        <div>
                            <div>
                                <label htmlFor="diagnosis" className="mb-1 text-sm">Diagnosis & Repairs to be made</label>
                                <textarea
                                    className="w-full h-32 p-3 text-sm border-none focus-visible:bg-stone-50 focus-visible:outline-orange-500 focus-visible:outline-1 focus-visible:placeholder:text-stone-500 rounded-xl bg-stone-100"
                                    name="diagnosis" id="diagnosis"
                                    placeholder="Summarize what was the issue on the vehicle and the repair to be made"></textarea>
                            </div>
                            <div className="mt-4">
                                <label htmlFor="repairs" className="mb-1 text-sm">Repairs made</label>
                                <textarea
                                    className="w-full h-32 p-3 text-sm border-none focus-visible:bg-stone-50 focus-visible:outline-orange-500 focus-visible:outline-1 focus-visible:placeholder:text-stone-500 rounded-xl bg-stone-100"
                                    name="repairs" id="repairs"
                                    placeholder="Summarize what was done on the vehicle"></textarea>
                            </div>
                            <h3 className="my-2 text-sm">
                                Invoice
                            </h3>

                            <div className="p-3 rounded-xl border shadow">
                                <div className="flex items-center justify-between">
                                    <h4 className=" text-stone-400">Billed to</h4>
                                    <div className="p-2 px-3 rounded-full text-sm text-red-600 font-medium bg-red-100">Pending</div>
                                </div>
                                <div className="flex gap-3 items-start">
                                    <div className="size-10 border rounded-full ">

                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Sara May</h4>
                                        <h5 className="text-xs">James</h5>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <ul className="mb-2">
                                        <li className="flex mb-2 items-center justify-between"><span className="text-stone-400">Service</span> <span>Inspection Fee</span></li>
                                        <li className="flex mb-2 items-center justify-between"><span className="text-stone-400">Invoice Number</span> <span>JC56</span></li>
                                        <li className="flex mb-2 items-center justify-between"><span className="text-stone-400">Date Issued</span> <span>Oct</span></li>
                                        <li className="flex mb-2 items-center justify-between"><span className="text-stone-400">Amount</span> <span>7</span></li>
                                    </ul>
                                    <div className="flex justify-end">
                                        <Button label="View Invoice" typeButton="outline" className="w-fit px-4 rounded-full"></Button>
                                    </div>
                                </div>

                            </div>
                            <div className="flex my-4 items-center justify-between">
                                <span>Invoice</span>
                                <Button label="Create Invoice" typeButton="outline" className="w-fit px-4 rounded-full"></Button>
                            </div>

                        </div>
                        <Button typeButton="dark" label="Mark as completed"></Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AppointmentResultModal