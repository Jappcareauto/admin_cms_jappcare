import { useState } from "react";
import CloseIcon from "../Icones/CloseIcon"
import FilterBy from "./FilterBy"
import { Input } from "./Input";
import { Button } from "./Button";

const ExportDataDraw = (props: { onSubmit: (value: boolean) => void, onClose: (value: boolean) => void, }) => {
    const [TabStateAppointement, setTabStateAppointment] = useState<{ actived: boolean, label: string }[]>([
        { label: "This Week", actived: false },
        { label: "This Month", actived: false },
        { label: "YTD", actived: false },
        { label: "Custom", actived: false },
    ])
    const onStateChange = (e: number) => {
        setTabStateAppointment([]);
        const tab: { actived: boolean, label: string }[] = [];
        TabStateAppointement.map((item: { actived: boolean; label: string; }, index: number) => {
            if (e == index) {
                item.actived = true;
            } else {
                item.actived = false;
            }
            tab.push(item)
        })
        setTabStateAppointment(tab)
    }
    return (
        <div className="fixed top-0 z-40 justify-end right-0 w-full max-w-96 h-full ">
            <form onSubmit={() => props.onSubmit(true)} method="post"
                className="relative flex flex-col justify-between h-full px-5 py-6 pt-8 overflow-y-auto bg-white  shadow-xl max-md:py-10 max-md:px-5 modal-content">
                <div className="mt-8">
                    <button onClick={() => props.onClose(false)} type="button" className="text-gray-400 top float-end relative bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                        <CloseIcon stroke="#000"></CloseIcon>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <h2 className="font-bold">Exports Data</h2>
                    <div className="mt-8">
                        <h2 className="font-semibold">Select Data to Export</h2>
                        <div>
                            <div className="flex mt-4 justify-between items-center">
                                <label htmlFor="">Revenue</label>
                                <label className="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer" />
                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-600"></div>
                                </label>
                            </div>
                            <div className="flex mt-4 justify-between items-center">
                                <label htmlFor="" >Emergency Requests</label>
                                <label className="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer" />
                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-600"></div>
                                </label>
                            </div>
                            <div className="flex mt-4 justify-between items-center">
                                <label htmlFor="">Vin Reports</label>
                                <label className="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer" />
                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-600"></div>
                                </label>
                            </div>
                            <div className="flex mt-4 justify-between items-center">
                                <label htmlFor="">Appointments</label>
                                <label className="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer" />
                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-600"></div>
                                </label>
                            </div>
                            <div className="flex mt-4 justify-between items-center">
                                <label htmlFor="">User</label>
                                <label className="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer" />
                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-600"></div>
                                </label>

                            </div>
                            <div className="flex mt-4 justify-between items-center">
                                <label htmlFor="">Orders</label>
                                <label className="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer" />
                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-600"></div>
                                </label>
                            </div>
                        </div>
                        <h2 className="font-semibold my-4">Select Data to Export</h2>
                      
                        <FilterBy onEvent={(e: number) => onStateChange(e)} filterTab={TabStateAppointement}></FilterBy>
                        <div className="grid mt-4 text-sm grid-cols-2 gap-4 justify-between">
                            <div>
                                <label htmlFor="">From</label>
                                <Input type="date"></Input>
                            </div>
                            <div>
                                <label htmlFor="">To</label>
                                <Input type="date"></Input>
                            </div>
                        </div>
                    </div>
                </div>
                <Button typeButton="dark" label="Download Report"></Button>
            </form>
        </div>)
}

export default ExportDataDraw