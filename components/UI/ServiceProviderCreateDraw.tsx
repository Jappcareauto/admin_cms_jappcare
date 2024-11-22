import { FormEvent, useEffect, useState } from "react";
// import { Button } from "./Button"
import { Input } from "./Input"
import { Select } from "./Select";
// import ExpendIcon from "../Icones/ExpendIcon";
// import defaultImageProfile from "@/public/images/profil7.png"
import CloseIcon from "../Icones/CloseIcon";
// import { dataListCategoryServiceCenterEnum } from "@/enums/dataList";
import { ServiceCenterInterface } from "@/interfaces/ServiceCenterInterface";
import { UserInterface } from "@/interfaces/UserInterface";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { Button } from "./Button";
// import Image from "next/image";
import ListCategoriesService from "./ListCategoriesService";
// import Map
const center = {
    lat: 51.505,
    lng: -0.09,
}
const ServiceProviderCreateDraw = (props: { onSubmit: (value: ServiceCenterInterface, user: UserInterface) => void, onClose: (value: boolean) => void }) => {
    const [code, setCode] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [companyName, setCompanyName] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [latitude, setLatitude] = useState<number>(0);
    const [longitude, setLongitude] = useState<number>(0);
    const [password, setPassword] = useState<string>("");
    // const [location, setLocation] = useState<string>("");

    const Map = useMemo(() => dynamic(
        () => import('@/components/UI/Map'),
        {
            loading: () => <p>A map is loading</p>,
            ssr: false
        }
    ), [])
    const onSubmit = (e: FormEvent) => {
        e.preventDefault()
        props.onSubmit({
            name: companyName,
            ownerId: "",
            location: {
                latitude: latitude,
                longitude: longitude,
                description: address,
                id: "",
                createdBy: "",
                updatedBy: "",
                createdAt: "",
                updatedAt: ""
            },
            category: category,
            createdBy: "",
            id: "",
            updatedBy: "",
            createdAt: "",
            updatedAt: ""
        }, {
            name: name,
            email: email,
            password: "123456789",
            verifie: "",
            passwordExpir: "",
            dateOfBirth: "",
            provider: "",
            phones: "",
            role: "ROLE_SERVICE_MANAGER",
            permissions: "",
            garages: "",
            verificationCodes: "",
            id: "",
            createdA: "",
            verified: true,
            createdAt: "",
            updatedA: "",
            createdB: "",
            updatedBy: "",
            profileImageUrl: "",
            profileImageId: "",
            location: {
                latitude: 0,
                longitude: 0,
                description: "",
                id: "",
                createdBy: "",
                updatedBy: "",
                createdAt: "",
                updatedAt: ""
            }
        })
    }
    useEffect(() => {
        setLatitude(0)
        setLongitude(0)
    })
    return (
        <div className="fixed top-0 z-50 justify-end right-0 w-full max-w-96 h-full ">
            <form onSubmit={onSubmit}
                className="relative flex flex-col justify-between h-full px-5 py-6 pt-8 overflow-y-auto bg-white  shadow-xl max-md:py-10 max-md:px-5 modal-content">
                <div>
                    <button onClick={() => props.onClose(false)} type="button" className="text-gray-400 float-end relative bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                        <CloseIcon stroke="#000"></CloseIcon>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <h2 className="font-bold mb-4">New Service Provider</h2>

                    <div>
                        <div className="my-3">
                            <label htmlFor="company" className="text-sm">Company Name</label>
                            <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Company Name" type="text" name="company" id="company" ></Input>
                        </div>
                        <div className="my-3">
                            <label htmlFor="name" className="text-sm">Name</label>
                            <Input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" name="name" id="name" ></Input>
                        </div>
                        <div className="my-3">
                            <label htmlFor="email" className="text-sm">Email</label>
                            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" name="email" id="email" ></Input>
                        </div>
                        <div className="my-3">
                            <label htmlFor="email" className="text-sm">Password</label>
                            <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" name="password" id="password" ></Input>
                        </div>
                        <div className="my-3">
                            <label htmlFor="address" className="text-sm">Home Address</label>
                            <Input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Home Address" name="address" id="address" ></Input>
                        </div>
                        <div className="my-3" id="phone-to-email">
                            <label htmlFor="phone" className="text-sm">Phone Number</label>
                            <div className="flex gap-2 items-center">
                                <div className="basis-1/4">
                                    <Select value={code} onChange={e => { setCode(e.target.value) }} options={[{ value: "+237", label: "+237" }]}></Select>
                                </div>
                                <div className="w-full basis-3/4">
                                    <Input value={phone} onChange={e => { setPhone(e.target.value) }} placeholder="Phone number" className='mt-1' name="phone" id="phone" type='tel' ></Input>
                                </div>
                            </div>
                        </div>
                        <div className="my-3">
                            <label htmlFor="address" className="text-sm">Category</label>
                            <ListCategoriesService itemActived={setCategory}></ListCategoriesService>
                            {/* <Select value={category} onChange={e => { setCategory(e.target.value) }} options={dataListCategoryServiceCenterEnum}></Select> */}
                        </div>
                     
                        <div className="my-3">
                            <label htmlFor="address" className="text-sm">Home Location</label>
                            <div className="w-full h-52  bg-no-repeat border rounded-xl ">
                                <Map isDraggable={true} latitude={setLatitude} positionInit={center} longitude={setLongitude} posix={[51.505, -0.09]} />
                            </div>
                        </div>
                    </div>
                </div>
                <Button typeButton="dark" type="submit" label="Create Service Provider"></Button>

            </form>
        </div>)
}
export default ServiceProviderCreateDraw