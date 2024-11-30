import CloseIcon from "../Icones/CloseIcon";
const NotificationModal = (props: { onClose: (value: boolean) => void, }) => {
    return (
        <div className="fixed top-0 z-50 justify-end right-0 w-full max-w-96 h-full  ">
            <div
                className="relative flex flex-col justify-between h-full px-5 py-6 pt-8 overflow-y-auto bg-white  shadow-xl max-md:py-10 max-md:px-5 modal-content">
                <div>
                    <button onClick={() => props.onClose(false)} type="button" className="text-gray-400 float-end relative bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                        <CloseIcon stroke="#000"></CloseIcon>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <h2 className="font-bold">Notifications</h2>
                    <div className="flex flex-col gap-4 mt-4">
                        <div className="p-4 border rounded-xl" >
                            <div className="flex gap-3">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M2.52992 14.394C2.31727 15.7471 3.268 16.6862 4.43205 17.1542C8.89481 18.9486 15.1052 18.9486 19.5679 17.1542C20.732 16.6862 21.6827 15.7471 21.4701 14.394C21.3394 13.5625 20.6932 12.8701 20.2144 12.194C19.5873 11.2975 19.525 10.3197 19.5249 9.27941C19.5249 5.2591 16.1559 2 12 2C7.84413 2 4.47513 5.2591 4.47513 9.27941C4.47503 10.3197 4.41272 11.2975 3.78561 12.194C3.30684 12.8701 2.66061 13.5625 2.52992 14.394Z"
                                        fill="#FB7C37" />
                                    <path d="M9 21C9.79613 21.6219 10.8475 22 12 22C13.1525 22 14.2039 21.6219 15 21"
                                        stroke="#FB7C37" strokeWidth="1.5" strokeLinecap="round"
                                        strokeLinejoin="round" />
                                </svg>
                                <h3 className="font-semibold text-orange-500">Notification</h3>
                            </div>
                            <p className="mt-4 text-sm">
                                New Appoinment scheduled, from James for a body shop repair
                            </p>
                        </div>
                        <div className="p-4 border rounded-xl" >
                            <div className="flex gap-3">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M2.52992 14.394C2.31727 15.7471 3.268 16.6862 4.43205 17.1542C8.89481 18.9486 15.1052 18.9486 19.5679 17.1542C20.732 16.6862 21.6827 15.7471 21.4701 14.394C21.3394 13.5625 20.6932 12.8701 20.2144 12.194C19.5873 11.2975 19.525 10.3197 19.5249 9.27941C19.5249 5.2591 16.1559 2 12 2C7.84413 2 4.47513 5.2591 4.47513 9.27941C4.47503 10.3197 4.41272 11.2975 3.78561 12.194C3.30684 12.8701 2.66061 13.5625 2.52992 14.394Z"
                                        fill="#FB7C37" />
                                    <path d="M9 21C9.79613 21.6219 10.8475 22 12 22C13.1525 22 14.2039 21.6219 15 21"
                                        stroke="#FB7C37" strokeWidth="1.5" strokeLinecap="round"
                                        strokeLinejoin="round" />
                                </svg>
                                <h3 className="font-semibold text-orange-500">Task</h3>
                            </div>
                            <p className="mt-4 text-sm">
                                Complete weekly report and send to team
                            </p>
                        </div>
                        <div className="p-4 border rounded-xl" >
                            <div className="flex gap-3">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M2.52992 14.394C2.31727 15.7471 3.268 16.6862 4.43205 17.1542C8.89481 18.9486 15.1052 18.9486 19.5679 17.1542C20.732 16.6862 21.6827 15.7471 21.4701 14.394C21.3394 13.5625 20.6932 12.8701 20.2144 12.194C19.5873 11.2975 19.525 10.3197 19.5249 9.27941C19.5249 5.2591 16.1559 2 12 2C7.84413 2 4.47513 5.2591 4.47513 9.27941C4.47503 10.3197 4.41272 11.2975 3.78561 12.194C3.30684 12.8701 2.66061 13.5625 2.52992 14.394Z"
                                        fill="#FB7C37" />
                                    <path d="M9 21C9.79613 21.6219 10.8475 22 12 22C13.1525 22 14.2039 21.6219 15 21"
                                        stroke="#FB7C37" strokeWidth="1.5" strokeLinecap="round"
                                        strokeLinejoin="round" />
                                </svg>
                                <h3 className="font-semibold text-orange-500">Meeting</h3>
                            </div>
                            <p className="mt-4 text-sm">
                                Discuss project updates with stakeholders
                            </p>
                        </div>
                        <div className="p-4 border rounded-xl" >
                            <div className="flex gap-3">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M2.52992 14.394C2.31727 15.7471 3.268 16.6862 4.43205 17.1542C8.89481 18.9486 15.1052 18.9486 19.5679 17.1542C20.732 16.6862 21.6827 15.7471 21.4701 14.394C21.3394 13.5625 20.6932 12.8701 20.2144 12.194C19.5873 11.2975 19.525 10.3197 19.5249 9.27941C19.5249 5.2591 16.1559 2 12 2C7.84413 2 4.47513 5.2591 4.47513 9.27941C4.47503 10.3197 4.41272 11.2975 3.78561 12.194C3.30684 12.8701 2.66061 13.5625 2.52992 14.394Z"
                                        fill="#FB7C37" />
                                    <path d="M9 21C9.79613 21.6219 10.8475 22 12 22C13.1525 22 14.2039 21.6219 15 21"
                                        stroke="#FB7C37" strokeWidth="1.5" strokeLinecap="round"
                                        strokeLinejoin="round" />
                                </svg>
                                <h3 className="font-semibold text-orange-500">Deadline</h3>
                            </div>
                            <p className="mt-4 text-sm">
                                Submit final design drafts for review
                            </p>
                        </div>
                        <div className="p-4 border rounded-xl" >
                            <div className="flex gap-3">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M2.52992 14.394C2.31727 15.7471 3.268 16.6862 4.43205 17.1542C8.89481 18.9486 15.1052 18.9486 19.5679 17.1542C20.732 16.6862 21.6827 15.7471 21.4701 14.394C21.3394 13.5625 20.6932 12.8701 20.2144 12.194C19.5873 11.2975 19.525 10.3197 19.5249 9.27941C19.5249 5.2591 16.1559 2 12 2C7.84413 2 4.47513 5.2591 4.47513 9.27941C4.47503 10.3197 4.41272 11.2975 3.78561 12.194C3.30684 12.8701 2.66061 13.5625 2.52992 14.394Z"
                                        fill="#FB7C37" />
                                    <path d="M9 21C9.79613 21.6219 10.8475 22 12 22C13.1525 22 14.2039 21.6219 15 21"
                                        stroke="#FB7C37" strokeWidth="1.5" strokeLinecap="round"
                                        strokeLinejoin="round" />
                                </svg>
                                <h3 className="font-semibold text-orange-500">Reminder</h3>
                            </div>
                            <p className="mt-4 text-sm">
                                Renew annual subscription for design software
                            </p>
                        </div>
                        <div className="p-4 border rounded-xl" >
                            <div className="flex gap-3">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M2.52992 14.394C2.31727 15.7471 3.268 16.6862 4.43205 17.1542C8.89481 18.9486 15.1052 18.9486 19.5679 17.1542C20.732 16.6862 21.6827 15.7471 21.4701 14.394C21.3394 13.5625 20.6932 12.8701 20.2144 12.194C19.5873 11.2975 19.525 10.3197 19.5249 9.27941C19.5249 5.2591 16.1559 2 12 2C7.84413 2 4.47513 5.2591 4.47513 9.27941C4.47503 10.3197 4.41272 11.2975 3.78561 12.194C3.30684 12.8701 2.66061 13.5625 2.52992 14.394Z"
                                        fill="#FB7C37" />
                                    <path d="M9 21C9.79613 21.6219 10.8475 22 12 22C13.1525 22 14.2039 21.6219 15 21"
                                        stroke="#FB7C37" strokeWidth="1.5" strokeLinecap="round"
                                        strokeLinejoin="round" />
                                </svg>
                                <h3 className="font-semibold text-orange-500">Event</h3>
                            </div>
                            <p className="mt-4 text-sm">
                                Attend design conference next month
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotificationModal