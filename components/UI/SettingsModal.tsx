import CloseIcon from "../Icones/CloseIcon";
const SettingsModal = (props: { onClose: (value: boolean) => void, }) => {
    return (
        <div className="fixed top-0 z-50 justify-end right-0 w-full max-w-96 h-full  ">
            <div
                className="relative flex flex-col justify-between h-full px-5 py-6 pt-8 overflow-y-auto bg-white  shadow-xl max-md:py-10 max-md:px-5 modal-content">
                <div>
                    <button onClick={() => props.onClose(false)} type="button" className="text-gray-400 float-end relative bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center ">
                        <CloseIcon stroke="#000"></CloseIcon>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <h2 className="font-medium">Settings</h2>
                    
                    <div className="mt-8">
                        <div className="flex gap-2">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M15 15C15 15.8284 15.6716 16.5 16.5 16.5C17.3284 16.5 18 15.8284 18 15C18 14.1716 17.3284 13.5 16.5 13.5C15.6716 13.5 15 14.1716 15 15Z"
                                    stroke="black" strokeWidth="1.5" />
                                <path
                                    d="M15.0038 7.80257C9.57619 7.42647 5.1047 6.62109 3 5.99976V15.0612C3 17.0556 3 18.0528 3.61958 18.8661C4.23916 19.6794 5.08923 19.9091 6.78937 20.3685C9.53623 21.1107 12.4235 21.5527 15.0106 21.8055C17.6919 22.0675 19.0325 22.1985 20.0163 21.2995C21 20.4005 21 18.9564 21 16.068V14.0544C21 11.2495 21 9.84706 20.1929 8.97664C19.3859 8.10622 17.9252 8.005 15.0038 7.80257Z"
                                    stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path
                                    d="M17.6258 8C18.0035 6.57673 18.3453 3.98822 17.327 2.70292C16.6816 1.88827 15.7223 1.96654 14.7818 2.04926C9.83791 2.48406 6.34544 3.36731 4.39301 3.96737C3.55348 4.2254 3 5.04522 3 5.96044"
                                    stroke="black" strokeWidth="1.5" strokeLinejoin="round" />
                            </svg>

                            <h2 className="font-medium">Manage Payment Methods</h2>
                        </div>
                        <div className="pl-5">
                            <div className="flex items-center justify-between mt-4">
                                <label htmlFor="">Card</label>
                                <label className="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer" />
                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-600"></div>
                                </label>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <label htmlFor="">MTN MoMo</label>
                                <label className="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer" />
                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-600"></div>
                                </label>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <label htmlFor="">Orange Money</label>
                                <label className="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer" />
                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-600"></div>
                                </label>
                            </div>  
                        </div>
                        <hr className="items-center mt-4 border" />
                        <div className="flex items-center h-16 gap-2">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M14.9805 7.01562C14.9805 7.01562 15.4805 7.51562 15.9805 8.51562C15.9805 8.51562 17.5687 6.01562 18.9805 5.51562"
                                    stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path
                                    d="M9.99485 2.0214C7.49638 1.91562 5.56612 2.20344 5.56612 2.20344C4.34727 2.29059 2.01146 2.97391 2.01148 6.9646C2.0115 10.9214 1.98564 15.7994 2.01148 17.744C2.01148 18.9321 2.7471 21.7034 5.29326 21.8519C8.3881 22.0325 13.9627 22.0709 16.5204 21.8519C17.2051 21.8133 19.4846 21.2758 19.7731 18.7957C20.072 16.2264 20.0125 14.4408 20.0125 14.0158"
                                    stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path
                                    d="M21.9998 7.01562C21.9998 9.77705 19.7591 12.0157 16.995 12.0157C14.2309 12.0157 11.9902 9.77705 11.9902 7.01562C11.9902 4.2542 14.2309 2.01562 16.995 2.01562C19.7591 2.01562 21.9998 4.2542 21.9998 7.01562Z"
                                    stroke="black" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M6.98047 13.0156H10.9804" stroke="black" strokeWidth="1.5"
                                    strokeLinecap="round" />
                                <path d="M6.98047 17.0156H14.9804" stroke="black" strokeWidth="1.5"
                                    strokeLinecap="round" />
                            </svg>
                            <span>Privacy Policy</span>
                        </div>
                        <hr className="items-center mt-4 border" />
                        <div className="flex items-center h-16 gap-2">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M14.9805 7.01562C14.9805 7.01562 15.4805 7.51562 15.9805 8.51562C15.9805 8.51562 17.5687 6.01562 18.9805 5.51562"
                                    stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path
                                    d="M9.99485 2.0214C7.49638 1.91562 5.56612 2.20344 5.56612 2.20344C4.34727 2.29059 2.01146 2.97391 2.01148 6.9646C2.0115 10.9214 1.98564 15.7994 2.01148 17.744C2.01148 18.9321 2.7471 21.7034 5.29326 21.8519C8.3881 22.0325 13.9627 22.0709 16.5204 21.8519C17.2051 21.8133 19.4846 21.2758 19.7731 18.7957C20.072 16.2264 20.0125 14.4408 20.0125 14.0158"
                                    stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path
                                    d="M21.9998 7.01562C21.9998 9.77705 19.7591 12.0157 16.995 12.0157C14.2309 12.0157 11.9902 9.77705 11.9902 7.01562C11.9902 4.2542 14.2309 2.01562 16.995 2.01562C19.7591 2.01562 21.9998 4.2542 21.9998 7.01562Z"
                                    stroke="black" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M6.98047 13.0156H10.9804" stroke="black" strokeWidth="1.5"
                                    strokeLinecap="round" />
                                <path d="M6.98047 17.0156H14.9804" stroke="black" strokeWidth="1.5"
                                    strokeLinecap="round" />
                            </svg>
                            <span>Terms & Conditions</span>
                        </div>
                    </div>
                </div>
                <button type="button"
                    className="w-full p-3 my-2 text-sm text-white rounded-md bg-stone-950 hover:bg-stone-900">Save</button>
            </div>
        </div>

    )
}

export default SettingsModal