"use client"
import InvoiceIcon from "@/components/Icones/InvoiceIcon"
import { Input } from "@/components/UI/Input"
import Image from "next/image"
import InvoiceListItem from "./invoice-list-item"
import { useEffect, useState } from "react"
import { Button } from "@/components/UI/Button"
import { useSession } from "next-auth/react"
import { InvoiceInterface } from "@/interfaces/InvoiceInterface"
import { VehicleInterface } from "@/interfaces/VehicleInterface"
import { UserInterface } from "@/interfaces/UserInterface"
import UserList from "./user-list"
import { AppointmentInterface } from "@/interfaces/AppointmentInterface"

interface InvoiceListItemInterface {
    name: string,
    qte: number,
    price: number,
}

const InvoiceForm = () => {
    const [invoiceList, setInvoiceList] = useState<InvoiceListItemInterface[]>([])

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)
    const [itemList, setItemList] = useState<{
        name: string,
        price: number,
        quantity: number
    }[]>([])
    const session = useSession();
    const [dataRequest, setDataRequest] = useState<InvoiceInterface[] | null>(null);
    const [dateVehicle, setDataVehicle] = useState<VehicleInterface[] | null>([]);
    const [invoiceNumber, setInvoiceNumber] = useState<string>(Date.now().toString())
    const [issueDate, setissueDate] = useState<string>("")
    const [dueDate, setdueDate] = useState<string>("")
    const [lab, setLab] = useState<string>("")
    const [qte, setQte] = useState<number>(0)
    const [taxForm, setTaxForm] = useState<boolean>(false)
    const [unite, setUnite] = useState<number>(0)
    const [total, setTotal] = useState<number>(0)
    const [tax, setTax] = useState<number>(0)
    const [appointments, setAppointments] = useState<AppointmentInterface[]>([])
    const [toUser, setToUser] = useState<UserInterface>({
        name: "",
        email: "",
        password: "",
        verifie: "",
        passwordExpir: "",
        dateOfBirth: "",
        profileImageUrl: "",
        profileImageId: "",
        provider: "",
        phones: "",
        role: "",
        permissions: "",
        garages: "",
        verificationCodes: "",
        id: "",
        createdA: "",
        verified: false,
        createdAt: "",
        updatedA: "",
        createdB: "",
        updatedBy: "",
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
    const [amount, setamount] = useState<number>(0)
    const [userList, setUserList] = useState<UserInterface[]>([])
    const [user, setUser] = useState<UserInterface>(
        {
            name: "",
            email: "",
            password: "",
            verifie: "",
            passwordExpir: "",
            dateOfBirth: "",
            profileImageUrl: "",
            profileImageId: "",
            provider: "",
            phones: "",
            role: "",
            permissions: "",
            garages: "",
            verificationCodes: "",
            id: "",
            createdA: "",
            verified: false,
            createdAt: "",
            updatedA: "",
            createdB: "",
            updatedBy: "",
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
    )
    useEffect(() => {
        const getDataAndStat = async () => {
            try {
                if (session.data) {
                    if (session.data?.user) {
                        const resAppointment = await fetch('/api/vehicles?token=' + session.data?.user?.accessToken);
                        if (resAppointment.ok) {
                            const data = await resAppointment.json();
                            setDataVehicle(data.data);
                            // setNoAppointment(true)
                        }

                        const res = await fetch('/api/users/list?token=' + session.data?.user?.accessToken);
                        if (res.ok) {
                            const data = await res.json();
                            setUserList(data.data);
                        }

                        const resV = await fetch('/api/vehicles?token=' + session.data?.user?.accessToken);
                        if (resV.ok) {
                            const data = await resV.json();
                            setDataVehicle(data.data);
                        }

                        const resA = await fetch('/api/appointments/list?token=' + session.data?.user?.accessToken);
                        if (resA.ok) {
                            const data = await resA.json();
                            setAppointments(data.data);
                        }

                    }
                }
            } catch (err) {
                console.log(err)
            }
        }
        getDataAndStat();
    }, [session])
    const addInvoiceItem = () => {

        setItemList([...itemList, { name: lab, price: unite, quantity: qte }])
        setTotal(total + (unite * qte))
    }
    return (
        <section className="w-full px-4 xl:px-20 ">
            <div>
                <div className="font-semibold flex items-center gap-2">
                    <InvoiceIcon fill="#141B34" />
                    Create Invoice
                </div>
                <div className="flex max-w-3xl  justify-end text-red-500 font-semibold">
                    <div className="bg-red-50 p-2 rounded-full px-4">
                        Unpaid
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4" style={{ width: 744 }}>
                <div className="block">
                    <label htmlFor="InvoiceNumber" className="text-sm font-semibold">Invoice Number</label>
                    <Input value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} placeholder="Invoice Number" name="InvoiceNumber" id="InvoiceNumber" type="text" />
                </div>
                <div id="phone-to-email">
                    <label htmlFor="Vehicle" className="text-sm font-semibold">Vehicle</label>
                    {dateVehicle ?
                        dateVehicle.length > 0 ? (
                            <select
                                className={"w-full p-3 text-sm focus-visible:bg-stone-100 focus-visible:outline-orange-500 focus-visible:outline-1 focus-visible:placeholder:text-orange-500 rounded-xl bg-stone-100"}>
                                {dateVehicle.map((element, i: number) => (
                                    <option key={i} value={element.id}>{element.name}</option>
                                ))}
                            </select>
                        ) : null : null
                    }
                </div>
                <div className="block">
                    <label htmlFor="IssueDate" className="text-sm font-semibold">Issue Date</label>
                    <Input placeholder="Invoice Number" name="InvoiceNumber" id="InvoiceNumber" type="date" />
                </div>
                <div className="block">
                    <label htmlFor="DueDate" className="text-sm font-semibold">Due Date</label>
                    <Input placeholder="Invoice Number" value={dueDate} onChange={(e) => setdueDate(e.target.value)} name="InvoiceNumber" id="InvoiceNumber" type="date" />
                </div>
                <div>
                    <h6 className="font-semibold mb-2">Billed From</h6>
                    <div className="block border p-4 rounded-2xl">
                        <div className="flex mb-2 items-center font-bold gap-4">
                            <div className="w-12 h-12 p-1 bg-stone-200 rounded-full">
                                <Image width="48" height="48" className="rounded-full"
                                    src={"/images/default-profil.svg"}
                                    alt="default-profil" />
                            </div>
                            {user.name}
                        </div>
                        <div className="font-semibold">
                            <p> {user.location.description}</p>
                            <p> {user.phones}</p>
                            <p> {user.email}</p>
                        </div>
                    </div>
                </div>

                <div>
                    <h6 className="font-semibold mb-2"> Billed To</h6>
                    <div className="block border p-4 rounded-2xl">
                        <div className="flex items-center justify-between">
                            <div className="flex mb-2  items-center font-bold gap-4">
                                <div className="w-12 h-12 p-1 bg-stone-200 rounded-full">
                                    <Image width="48" height="48" className="rounded-full"
                                        src={"/images/default-profil.svg"}
                                        alt="default-profil" />
                                </div>
                                {toUser?.name}
                            </div>

                            <button onClick={() => setOpen(true)}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z"
                                        fill="#111111" />
                                </svg>
                            </button>
                        </div>
                        <div className=" font-semibold">
                            <p>{toUser?.location?.description}</p>
                            <p>{toUser?.phones}</p>
                            <p>{toUser?.email}</p>
                        </div>
                    </div>
                </div>

                <div className="block border col-span-2 p-4 rounded-2xl">
                    <div className="border-b pb-2 text-sm font-semibold flex justify-between">
                        <div>
                            <span className="text-orange-500">Item</span>
                        </div>
                        <div className="gap-6 grid grid-cols-3">
                            <span className="text-orange-500">Qnty</span>
                            <span className="text-orange-500">Unit price</span>
                            <span className="text-orange-500">Total Price</span>
                        </div>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                        {itemList.map((item, index) => <InvoiceListItem key={index} name={item.name} qte={item.quantity} price={item.price} device={"XAF"} />)}
                    </div>
                    <div className="text-sm flex gap-2 justify-between py-4">
                        <div className="w-full">
                            <Input type="text" onChange={(e) => setLab(e.target.value)} value={lab} className="w-full" placeholder="Item Name" name="ItemName" id="ItemName" />
                        </div>
                        <div className="gap-1 grid grid-cols-3">
                            <Input type="number" onChange={(e) => setQte(parseInt(e.target.value))} value={qte} className="w-full" placeholder="Qnty" name="qte" id="qte" />
                            <Input type="number" onChange={(e) => setUnite(parseInt(e.target.value))} value={unite} className="w-full" placeholder="Unit price" name="price" id="price" />
                            <Input type="number" disabled className="w-full" placeholder="Total price" name="priceT" id="priceT" />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button onClick={() => addInvoiceItem()} label="Add Item" typeButton="outline" className="w-fit" />

                    </div>
                </div>

                <div className="block border col-span-2 text-sm p-4 rounded-2xl">
                    <div className="border-b pb-2">
                        <span className="text-orange-500">Total</span>
                    </div>
                    <div className="flex font-semibold  mt-4 gap-5 flex-col">
                        <div className="flex justify-between ">
                            <span>Include Tax</span>
                            <label className="inline-flex items-center cursor-pointer">
                                <input onChange={(e) => setTaxForm(e.target.checked)} type="checkbox" value="" className="sr-only peer" />
                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-600"></div>
                            </label>
                        </div>
                        {
                            taxForm ? (
                                <>
                                    <div className="flex items-center justify-between">
                                        <span>Subtotal</span>
                                        <span className="font-bold">{total} Frs</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <span>Tax</span>
                                            {/* <input type="number"
                                    className="w-20 border-none p-3 text-sm   focus-visible:bg-orange-100/40 focus-visible:outline-orange-500 focus-visible:outline-1 focus-visible:placeholder:text-orange-500 rounded-xl bg-stone-100"
                                    placeholder="10%" name="InvoiceNumber" id="Tax" /> */}
                                            <Input onChange={(e) => { setTax(parseInt(e.target.value)); }} placeholder="10%" name="InvoiceNumber" id="Tax" type="number" />
                                        </div>
                                        <span className="font-bold">{`${((tax * total) / 100)}` == 'NaN' ? 0 : parseFloat(`${((tax * total) / 100)}`)} Frs</span>
                                    </div></>
                            ) : null
                        }
                        <div className="flex items-center justify-between">
                            <div>Payment Method</div>
                            <select id="methodePaiment"
                                className="w-72 p-3  text-sm border-none focus-visible:bg-orange-100/40 focus-visible:outline-orange-500 focus-visible:outline-1 focus-visible:placeholder:text-orange-500 rounded-xl bg-stone-100">
                                <option value={"CREDIT_CARD"}>Credit card</option>
                                <option value={"BANK_TRANSFER"}>Bank transfer</option>
                                <option value={"MOBILE_MONEY_TRANZAK"}>Mobile money tranzak</option>
                                <option value={"CASH"}>Cash</option>
                            </select>
                        </div>
                        <div className="flex text-orange-500 bg-orange-50 rounded-xl p-3 justify-between">
                            <span>Total</span>
                            <span className="font-bold">{total - ((tax * total) / 100)} Frs</span>

                        </div>
                    </div>
                </div>
                <div className="mt-3 w-full col-span-2  flex justify-end gap-4">
                    <button className="px-4 p-3 border text-sm border-black text-black rounded-xl">Save Draft</button>
                    <button className="px-4 p-3 border text-sm bg-black text-white rounded-xl">Send to client</button>
                </div>
            </div>
            {
                open ? <UserList onClose={setOpen} item={undefined} onSelect={(e) => setToUser(e)} users={userList} /> : null
            }
        </section>
    )
}

export default InvoiceForm