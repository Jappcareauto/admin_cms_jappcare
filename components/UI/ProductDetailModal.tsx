import CloseIcon from "../Icones/CloseIcon";
import { ProductInterface } from "@/interfaces/ProductInterface";
import { Button } from "./Button";
const ProductDetailModal = (props: { item: ProductInterface, onSubmit: (value: boolean) => void, onClose: (value: boolean) => void }) => {

    return (
        <div className="fixed top-0 z-50 justify-end right-0 w-full max-w-96 h-full ">
            <div
                className="relative flex flex-col justify-between h-full px-5 py-6 pt-8 overflow-y-auto bg-white  shadow-xl max-md:py-10 max-md:px-5 modal-content">
                <div>
                    <button onClick={() => props.onClose(false)} type="button" className="text-gray-400 float-end relative bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                        <CloseIcon stroke="#000"></CloseIcon>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <h2 className="font-bold mb-4">Product Details</h2>
                   

                    <div className="bg-stone-100 animate-pulse rounded-xl w-full h-64">

                    </div>
                    <div>
                        <h2 className="text-2xl font-bold my-2">{props.item.name}</h2>
                        <div className="flex gap-4 mb-4 items-end">
                            <h3 className="text-xl text-orange-500 font-bold">{props.item.price.amount} {props.item.price.currency}</h3>
                            <div className="flex">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M11.439 2.87047L12.9055 5.82772C13.1055 6.23938 13.6388 6.63424 14.0888 6.70985L16.7468 7.15511C18.4466 7.44076 18.8466 8.68416 17.6217 9.91074L15.5553 11.9942C15.2053 12.3471 15.0137 13.0276 15.1219 13.5149L15.7136 16.0941C16.1802 18.1356 15.1053 18.9253 13.3138 17.8583L10.8224 16.3713C10.3725 16.1025 9.63093 16.1025 9.1726 16.3713L6.68124 17.8583C4.8981 18.9253 3.81489 18.1272 4.28151 16.0941L4.87311 13.5149C4.98142 13.0276 4.78978 12.3471 4.43981 11.9942L2.37338 9.91074C1.15685 8.68416 1.54847 7.44076 3.24828 7.15511L5.90632 6.70985C6.34794 6.63424 6.88122 6.23938 7.08119 5.82772L8.54768 2.87047C9.3476 1.26583 10.6474 1.26583 11.439 2.87047Z"
                                        fill="#FB7C37" />
                                </svg>
                                <span className="text-orange-400">0</span>
                            </div>
                        </div>
                        <p className="my-4">
                        {props.item.description}
                        </p>
                        <h3 className="font-semibold mt-4 mb-2">Images</h3>
                        <div className="flex w-full gap-2 overflow-hidden">
                          
                                No Images
                        </div>
                       
                    </div>
                </div>
                <Button typeButton="dark" label="Edit Product" onClick={() => props.onSubmit(true)}></Button>
            </div>
        </div>
    )
}
export default ProductDetailModal