import { FormEvent, useState } from "react";
import { Button } from "./Button"
import { Input } from "./Input"
import { Select } from "./Select";
// import ExpendIcon from "../Icones/ExpendIcon";
// import TargetIcon from "../Icones/TargetIcon";
import { UserInterface } from "@/interfaces/UserInterface";
import CloseIcon from "../Icones/CloseIcon";

const UserCreateModal = (props: { onSubmit: (value: UserInterface) => void, onClose: (value: boolean) => void, roles: { value: string, label: string }[] }) => {
    const [isVerified, setIsVerified] = useState<string>("false");
    const [nameUser, setNameUser] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [role, setRole] = useState<string>("");
    const [message, setMessage] = useState<string>("");
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
        if (nameUser == "" || email == "" || password == "" || role == "") {
            setMessage("Fields is empty")
        } else {
            let verified = false;
            if (isVerified == "true") {
                verified = true
            }
            const data: UserInterface = {
                name: nameUser,
                email: email,
                password: password,
                verifie: "",
                passwordExpir: "",
                dateOfBirth: "",
                provider: "",
                phones: "",
                role: role,
                permissions: "",
                garages: "",
                verificationCodes: "",
                id: "",
                createdA: "",
                verified: verified,
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
                    <h2 className="font-bold mb-4 mt-8">New User</h2>
                    <div className="relative flex items-start justify-center w-full gap-4 rounded-2xl">
                        <div style={{ width: 128, height: 128, }} className="relative border rounded-full border-stone-100 shadow">
                            {/* <img width="128" height="128" className="rounded-full"
                    src="../../assets/images/10c6847941b93f45858be7d3ce3ff3ec.png" alt="" srcset=""> */}
                            <button type="button"
                                className="absolute flex items-center justify-center bg-orange-500 rounded-full size-8 -bottom-0 -right-0">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M15.1813 0.926893C14.0291 -0.284951 12.1047 -0.309226 10.9222 0.873168L1.54741 10.2475C1.21958 10.5754 0.992038 10.9899 0.891482 11.4424L0.0138652 15.3923C-0.0232157 15.5592 0.0275431 15.7335 0.148442 15.8544C0.26934 15.9753 0.443618 16.026 0.610502 15.9889L4.53689 15.1157C5.00432 15.0118 5.43243 14.7767 5.77103 14.4381L15.129 5.08003C16.27 3.939 16.2933 2.09631 15.1813 0.926893ZM11.6293 1.58029C12.4143 0.795384 13.6917 0.811498 14.4566 1.61596C15.1948 2.39225 15.1793 3.61548 14.4219 4.37293L13.7507 5.04418L10.958 2.25155L11.6293 1.58029ZM10.2509 2.95864L13.0436 5.7513L5.06391 13.731C4.85976 13.9352 4.60164 14.0769 4.31982 14.1396L1.1605 14.8421L1.86768 11.6593C1.92698 11.3924 2.06117 11.148 2.2545 10.9547L10.2509 2.95864Z"
                                        fill="white" />
                                </svg>
                                <span className="hidden">H</span>
                            </button>
                        </div>

                    </div>
                    <p className="text-red-400 my-4"> {message}</p>
                    <div>
                        <div className="my-3">
                            <label htmlFor="name" className="text-sm">Name</label>
                            <Input value={nameUser} onChange={e => { setNameUser(e.target.value) }} type="text" placeholder="Name" name="name" id="name" ></Input>
                        </div>
                        <div className="my-3">
                            <label htmlFor="email" className="text-sm">Email</label>
                            <Input value={email} onChange={e => { setEmail(e.target.value) }} type="email" placeholder="Email" name="email" id="email" ></Input>
                        </div>
                        <div className="my-3">
                            <label htmlFor="password" className="text-sm">Password</label>
                            <Input value={password} onChange={e => { setPassword(e.target.value) }} type="password" placeholder="Password" name="password" id="password" ></Input>
                        </div>
                        <div className="my-3">
                            <label htmlFor="isVerified" className="text-sm">Email Verified</label>
                            <Select value={isVerified} name="isVerified" id="isVerified" onChange={e => { setIsVerified(e.target.value) }} options={[{ value: "true", label: "True" }, { value: "false", label: "False" }]}></Select>
                        </div>
                        <div className="my-3">
                            <label htmlFor="role" className="text-sm">Role</label>
                            <Select value={role} name="role" id="role" onChange={e => { setRole(e.target.value) }} options={props.roles}></Select>
                        </div>
                    </div>
                </div>
                <Button typeButton="dark" type="submit" label="Create Service Provider"></Button>
            </form>
        </div>)
}
export default UserCreateModal