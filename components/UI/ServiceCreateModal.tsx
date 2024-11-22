import { ServiceInterface } from "@/interfaces/ServiceInterface";
import CloseIcon from "../Icones/CloseIcon";
import { Input } from "./Input";
import { Select } from "./Select";
import { useState } from "react";
import { Textarea } from "./Textarea";
import { dataListDefinitionEnum } from "@/enums/dataList";
import { Button } from "./Button";

const ServiceCreateModal = (props: { onSubmit: (value: ServiceInterface) => void, onClose: (value: boolean) => void }) => {
    const [service, setService] = useState<ServiceInterface>(
        {
            title: "",
            description: "",
            definition: "",
            serviceCenter: "",
            serviceCenterId: "",
            id: "",
            createdAt: "",
            updatedAt: "",
            createdBy: "",
            updatedBy: "",
        }
    )
    return (
        <div className="fixed top-0 z-50 justify-end right-0 w-full max-w-96 h-full ">
            <div
                className="relative flex flex-col justify-between h-full px-5 py-6 pt-8 overflow-y-auto bg-white  shadow-xl max-md:py-10 max-md:px-5 modal-content">
                <div>
                    <button onClick={() => props.onClose(false)} type="button" className="text-gray-400 float-end relative bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                        <CloseIcon stroke="#000"></CloseIcon>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <h2 className="font-bold mb-4">Create service</h2>

                    <div>
                        <div className="my-3">
                            <label htmlFor="title" className="text-sm">Title</label>
                            <Input value={service.title} onChange={(e) => setService({ ...service, title: e.target.value })} placeholder="Title" type="text" name="title" id="title" ></Input>
                        </div>
                        <div className="my-3">
                            <label htmlFor="description" className="text-sm">Description</label>
                            <Textarea value={service.description} onChange={(e) => setService({ ...service, description: e.target.value })} placeholder="Description" name="description" id="description" ></Textarea>
                        </div>
                        <div className="my-3">
                            <label htmlFor="email" className="text-sm">Definition</label>
                            <Select value={service.definition} onChange={e => { setService({ ...service, definition: e.target.value }) }} options={dataListDefinitionEnum}></Select>
                        </div>
                        <div className="my-3">
                            <label htmlFor="email" className="text-sm">Service center</label>
                            {/* <Select value={service.serviceCenterId} onChange={e => { setService({ ...service, serviceCenterId: e.target.value }) }} options={[]}></Select> */}
                        </div>

                    </div>
                </div>
                <Button typeButton="dark" type="submit" label="Create service"></Button>
               
            </div>
        </div>)
}

export default ServiceCreateModal