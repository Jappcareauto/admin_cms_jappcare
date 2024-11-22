import { FormEvent, useState } from "react";
import { Button } from "./Button"
import { Input } from "./Input"
import { Select } from "./Select";
import { ProductInterface } from "@/interfaces/ProductInterface";
import CloseIcon from "../Icones/CloseIcon";
import { Textarea } from "./Textarea";
import AddIcon from "../Icones/AddIcon";

const EditProductModal = (props: {file: (value: File | null) => void, fileFeatured: (value: File | null) => void,  onSubmit: (value: ProductInterface) => void, onClose: (value: boolean) => void, categories: { value: string, label: string }[], item: ProductInterface }) => {
    const [name, setName] = useState<string>(props.item.name);
    const [description, setDescription] = useState<string>(props.item.description);
    const [category, setCategory] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [price, setPrice] = useState<number>(props.item.price.amount);
    const [stockQuantity, setStockQuantity] = useState<number>(props.item.stockQuantity);
    const [discountPrice, setDiscountPrice] = useState<number>(0);
    const [file, setFile] = useState<File | null>(null);
    const [fileFeatured, setFileFeatured] = useState<File | null>(null);
    // const TabRoleUser: { value: string, label: string }[] = [
    //     { label: "ADMIN", value: "ROLE_ADMIN" },
    //     { label: "GARAGE MANAGER", value: "ROLE_GARAGE_MANAGER" },
    //     { label: "SERVICE MANAGER", value: "ROLE_SERVICE_MANAGER" },
    //     { label: "TECHNICIAN", value: "ROLE_TECHNICIAN" },
    //     { label: "CUSTOMER", value: "ROLE_CUSTOMER" },
    //     { label: "RECEPTIONIST", value: "ROLE_RECEPTIONIST" },
    // ]
    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (name == "" || description == "" || category == "" || price <= 0) {
            setMessage("Fields is empty")
        } else {
            
            if (file) {
                props.file(file);
            }
            if (fileFeatured) {
                props.file(fileFeatured);
            }
            const data: ProductInterface = {
                name: name,
                description: description,
                price: {
                    amount: price,
                    currency: "XAF"
                },
                stockQuantity: discountPrice,
                active: true,
                id: "",
                createdAt: "",
                updatedAt: "",
                createdBy: "",
                updatedBy: ""
            }
            props.onSubmit(data)
        }
    }
    return (
        <div className="fixed top-0 z-50 justify-end right-0 w-full max-w-96 h-full ">
            <form onSubmit={onSubmit} method="post"
                className="relative flex flex-col justify-between h-full px-5 py-6 pt-8 overflow-y-auto bg-white  shadow-xl max-md:py-10 max-md:px-5 modal-content">
                <div>
                    <button onClick={() => props.onClose(false)} type="button" className="text-gray-400 float-end relative bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                        <CloseIcon stroke="#000"></CloseIcon>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <p className="text-red-400 my-4"> {message}</p>
                    <h2 className="font-bold mb-4">New Product</h2>
                    <div className="rounded-xl bg-orange-50 w-full flex justify-center h-32 items-center ">
                        <div className="text-center">
                            <AddIcon fill="#FB7C37"></AddIcon>
                            <span className="text-orange-400 text-sm">Add Featured Image</span>
                        </div>
                    </div>
                    <Input hidden id="fileFeatured" type="file" onChange={e => { if(e.target.files && e.target.files[0]) setFileFeatured(e.target.files[0]) }} name="fileFeatured" ></Input>
                    <div>
                        <div className="my-4">
                            <label htmlFor="nameProduct" className="text-sm">Product Name</label>
                            <Input type="text" value={name} onChange={e => { setName(e.target.value) }} name="nameProduct" id="nameProduct" placeholder="Name"></Input>
                        </div>
                        <div className="my-4">
                            <label htmlFor="descriptionProduct" className="text-sm">Description</label>
                            <Textarea id="descriptionProduct" value={description} onChange={e => { setDescription(e.target.value) }} name="descriptionProduct" placeholder="Description"></Textarea>
                        </div>
                        <div className="my-4">
                            <label htmlFor="categoryProduct" className="text-sm">Category</label>
                            <Select name="categoryProduct" value={category} onChange={e => { setCategory(e.target.value) }} id="categoryProduct" options={props.categories}></Select>
                        </div>
                        <div className="my-4">
                            <label htmlFor="priceProduct" className="text-sm">Price</label>
                            <Input name="priceProduct" min={0} type="number" value={price} onChange={e => { setPrice(parseInt(e.target.value)) }} id="priceProduct" placeholder="Price"></Input>
                        </div>
                        <div className="my-4">
                            <label htmlFor="quantityProduct" className="text-sm">Quantity</label>
                            <Input id="quantityProduct" min={0} type="number" value={stockQuantity} onChange={e => { setStockQuantity(parseInt(e.target.value)) }} name="quantityProduct" placeholder="Quantity"></Input>
                        </div>
                        <div className="my-4">
                            <label htmlFor="discountPriceProduct" className="text-sm">Discount Price</label>
                            <Input name="discountPriceProduct" value={discountPrice} onChange={e => { setDiscountPrice(parseInt(e.target.value)) }} id="discountPriceProduct" placeholder="Discount Price"></Input>
                        </div>
                        <div className="mt-4">
                            <h3 className="font-semibold mb-2">Images</h3>
                            <div className="inline-block w-full gap-2 overflow-hidden">
                                <button className="rounded-xl size-24 bg-orange-100 flex justify-center items-center ">
                                    <AddIcon fill="#FB7C37"></AddIcon>
                                </button>
                                <Input hidden id="file" type="file" onChange={e => { if(e.target.files && e.target.files[0]) setFile(e.target.files[0]) }} name="file" ></Input>
                            </div>
                        </div>
                    </div>
                </div>
                <Button typeButton="dark" type="submit" label="Add product"></Button>
            </form>
        </div>)
}
export default EditProductModal