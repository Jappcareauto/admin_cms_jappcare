const InvoiceItem = () => {
    return (
        <div className="flex items-center justify-between py-2 border-b">
            <div className="flex items-center w-56 gap-4 rounded-2xl">
                <img width="48" height="48" className="rounded-full"
                    src="../../assets/images/10c6847941b93f45858be7d3ce3ff3ec.png" alt="" />
                    <span className="font-bold max-md:text-xs">Sarah Thompson</span>
            </div>
            <div className="font-semibold">
                28,000 Frs
            </div>
            <div className="flex items-center gap-1 text-sm">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 2V4M6 2V4" stroke="#111111" stroke-width="1.5"
                        stroke-linecap="round" stroke-linejoin="round" />
                    <path
                        d="M11.9955 13H12.0045M11.9955 17H12.0045M15.991 13H16M8 13H8.00897M8 17H8.00897"
                        stroke="#111111" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" />
                    <path d="M3.5 8H20.5" stroke="#111111" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                    <path
                        d="M2.5 12.2432C2.5 7.88594 2.5 5.70728 3.75212 4.35364C5.00424 3 7.01949 3 11.05 3H12.95C16.9805 3 18.9958 3 20.2479 4.35364C21.5 5.70728 21.5 7.88594 21.5 12.2432V12.7568C21.5 17.1141 21.5 19.2927 20.2479 20.6464C18.9958 22 16.9805 22 12.95 22H11.05C7.01949 22 5.00424 22 3.75212 20.6464C2.5 19.2927 2.5 17.1141 2.5 12.7568V12.2432Z"
                        stroke="#111111" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                    <path d="M3 8H21" stroke="#111111" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
                <span>Oct, 20, 2024</span>
            </div>
            <div className="flex items-center gap-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 2V4M6 2V4" stroke="#111111" stroke-width="1.5"
                        stroke-linecap="round" stroke-linejoin="round" />
                    <path
                        d="M11.9955 13H12.0045M11.9955 17H12.0045M15.991 13H16M8 13H8.00897M8 17H8.00897"
                        stroke="#111111" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" />
                    <path d="M3.5 8H20.5" stroke="#111111" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                    <path
                        d="M2.5 12.2432C2.5 7.88594 2.5 5.70728 3.75212 4.35364C5.00424 3 7.01949 3 11.05 3H12.95C16.9805 3 18.9958 3 20.2479 4.35364C21.5 5.70728 21.5 7.88594 21.5 12.2432V12.7568C21.5 17.1141 21.5 19.2927 20.2479 20.6464C18.9958 22 16.9805 22 12.95 22H11.05C7.01949 22 5.00424 22 3.75212 20.6464C2.5 19.2927 2.5 17.1141 2.5 12.7568V12.2432Z"
                        stroke="#111111" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                    <path d="M3 8H21" stroke="#111111" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
                <span className="text-sm">Oct, 20, 2024</span>
            </div>

            <div
                className="p-2 text-xs text-center rounded-full text-red-500 p w-28 bg-red-100 lg:text-sm">
                <span>Unpaid</span>
            </div>
            <div className="flex gap-4">
                <button type="button" className="card-product rotate-90">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M13.2673 4.20938C12.9674 3.92369 12.4926 3.93523 12.2069 4.23516C11.9213 4.53509 11.9328 5.00982 12.2327 5.29551L18.4841 11.2501H3.75C3.33579 11.2501 3 11.5859 3 12.0001C3 12.4143 3.33579 12.7501 3.75 12.7501H18.4842L12.2327 18.7048C11.9328 18.9905 11.9213 19.4652 12.2069 19.7652C12.4926 20.0651 12.9674 20.0766 13.2673 19.791L20.6862 12.7243C20.8551 12.5634 20.9551 12.3581 20.9861 12.1448C20.9952 12.098 21 12.0496 21 12.0001C21 11.9506 20.9952 11.9021 20.986 11.8552C20.955 11.642 20.855 11.4369 20.6862 11.2761L13.2673 4.20938Z"
                            fill="#000000" />
                    </svg>
                    <span className="hidden">Detail</span>
                </button>
                <button type="button">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5"
                            stroke="#141B34" stroke-width="1.5" stroke-linecap="round" />
                        <path
                            d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5"
                            stroke="#141B34" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M9.5 16.5V10.5" stroke="#141B34" stroke-width="1.5"
                            stroke-linecap="round" />
                        <path d="M14.5 16.5V10.5" stroke="#141B34" stroke-width="1.5"
                            stroke-linecap="round" />
                    </svg>
                    <span className="hidden">Delete</span>
                </button>
                <button type="button" className="card-product">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M13.2673 4.20938C12.9674 3.92369 12.4926 3.93523 12.2069 4.23516C11.9213 4.53509 11.9328 5.00982 12.2327 5.29551L18.4841 11.2501H3.75C3.33579 11.2501 3 11.5859 3 12.0001C3 12.4143 3.33579 12.7501 3.75 12.7501H18.4842L12.2327 18.7048C11.9328 18.9905 11.9213 19.4652 12.2069 19.7652C12.4926 20.0651 12.9674 20.0766 13.2673 19.791L20.6862 12.7243C20.8551 12.5634 20.9551 12.3581 20.9861 12.1448C20.9952 12.098 21 12.0496 21 12.0001C21 11.9506 20.9952 11.9021 20.986 11.8552C20.955 11.642 20.855 11.4369 20.6862 11.2761L13.2673 4.20938Z"
                            fill="#FB7C37" />
                    </svg>
                    <span className="hidden">Detail</span>
                </button>

            </div>
        </div>
    )
}

export default InvoiceItem