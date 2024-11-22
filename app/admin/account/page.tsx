"use client"
import LoadingIcon from "@/components/Icones/LoadingIcon";
// import ArrowRight from "@/components/Icones/ArrowRight";
// import CalendarIcon from "@/components/Icones/calendarIcon";
// import GridIcon from "@/components/Icones/GridIcon";
// import ListIcon from "@/components/Icones/ListIcon";
// import TrashIcon from "@/components/Icones/TrashIcon";
import UserIcon from "@/components/Icones/UserIcon";
import UsersIcon from "@/components/Icones/UsersIcon";
import AccountItem from "@/components/UI/AccountItem";
import { Button } from "@/components/UI/Button";
// import CardAppointmentAdmin from "@/components/UI/CardAppointmentAdmin";
// // import { Button } from "@/components/UI/Button";
// // import CardAppointmentAdmin  from "@/components/UI/CardAppointmentAdmin";
// import CardBasic from "@/components/UI/CardBasic";
// import CardChartBar from "@/components/UI/CardChartBar";
// // import CardChartLine from "@/components/UI/CardChartLine";
// import CardListItem from "@/components/UI/CardListItem";
import CardStat from "@/components/UI/CardStat";
import FilterBy from "@/components/UI/FilterBy";
import ModalDelete from "@/components/UI/ModalDelete";
import ServiceProviderCreateDraw from "@/components/UI/ServiceProviderCreateDraw";
import UserCreateModal from "@/components/UI/UserCreateModal";
import UserDetailModal from "@/components/UI/UserDetailModal";
import { AuthoritieInterface } from "@/interfaces/AuthoritieInterface";
import { ServiceCenterInterface } from "@/interfaces/ServiceCenterInterface";
import { UserInterface } from "@/interfaces/UserInterface";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";



export default function Page() {
    // const [state, setState] = useState<string>("")
    const session = useSession();
    // const [isList, setIsList] = useState(false)
    const [openModalUserDetail, setOpenModalUserDetail] = useState<boolean>(false)
    const [openModalUserCreate, setOpenModalUserCreate] = useState<boolean>(false)
    const [openDrawServiceProvider, setOpenDrawServiceProvider] = useState<boolean>(false)
    const [alertMessage, setAlertMessage] = useState<string>('')
    const [alertDetails, setAlertDetails] = useState<string>('')
    const [alertStatus, setAlertStatus] = useState<string>('')
    const [showAlert, setShowAlert] = useState<boolean>(false)
    // const [token, setToken] = useState<string>('')
    const [isInit, setIsInit] = useState<boolean>(false)
    const [item, setItem] = useState<UserInterface>({
        name: "",
        email: "",
        password: "",
        verifie: "",
        passwordExpir: "",
        dateOfBirth: "",
        provider: "",
        phones: "",
        profileImageUrl: "",
        profileImageId: "",
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

    const [showModalDelete, setShowModalDelete] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [users, setUsers] = useState<UserInterface[] | null>(null);
    const [roles, setRoles] = useState<{ value: string, label: string }[]>([]);
    const [serviceProvider, setServiceProvider] = useState<UserInterface[] | null>(null);
    const [showServiceProvider, setShowServiceProvider] = useState<boolean>(false)
    const [showUser, setShowUser] = useState<boolean>(true);
    const getUsers = async () => {
        try {
            if (session.data) {
                if (session.data?.user) {
                    const res = await fetch('/api/users/list?token=' + session.data?.user?.accessToken);
                    if (res.ok) {
                        const data = await res.json();
                        setUsers(data.data);
                    }
                }
            }

        } catch (err) {
            console.log(err)
        }
    }
    const getServiceProvider = async () => {
        try {
            if (session.data) {
                if (session.data?.user) {
                    const res = await fetch('/api/services-center?token=' + session.data?.user?.accessToken);
                    if (res.ok) {
                        const data = await res.json();
                        setServiceProvider(data.data);
                    }
                }
            }

        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        const getDataAndStat = async () => {
            try {
                if (session.data) {
                    if (session.data?.user) {
                        const res = await fetch('/api/users/list?token=' + session.data?.user?.accessToken);
                        // setToken(session.data?.user?.accessToken)
                        if (res.ok) {
                            setIsInit(true)
                            const data = await res.json();
                            setUsers(data.data);
                        }
                        const resAuthorities = await fetch('/api/authorities/roles?token=' + session.data?.user?.accessToken);
                        if (resAuthorities.ok) {
                            const dataAuthorities: AuthoritieInterface[] = await resAuthorities.json();
                            const tab: { value: string, label: string }[] = []
                            dataAuthorities.map((item) => {
                                tab.push({ value: item.definition, label: item.definition })
                            })
                            setRoles(tab)
                        }
                    }
                }
            } catch (err) {
                console.log(err)
            }
        }
        if (!isInit) {
            getDataAndStat();
        }
    }, [session])

    const [TabStateAppointement, setTabStateAppointment] = useState<{ actived: boolean, label: string }[]>([
        { label: "User", actived: true },
        { label: "Service Providers", actived: false },
    ])
    const onStateChange = (e: number) => {
        setTabStateAppointment([]);
        let tab: { actived: boolean, label: string }[] = [];
        TabStateAppointement.map((item: { actived: boolean; label: string; }, index: number) => {
            if (e == index) {
                item.actived = true;
            } else {
                item.actived = false;
            }
            tab.push(item)
        })
        switch (e) {
            case 1:
                setShowUser(false);
                setShowServiceProvider(true);
                break;
            default:
                getUsers()
                setShowServiceProvider(false);
                setShowUser(true);
                break;
        }
        setTabStateAppointment(tab)
    }
    const createUser = async (item: UserInterface) => {
        setIsLoading(true)
        const data = {
            name: item.name,
            email: item.email,
            password: item.password,
            role: item.role,
            verified: item.verified
        }
        try {
            const res = await fetch('/api/users/create?token=' + session.data?.user?.accessToken, { method: 'POST', body: JSON.stringify(data) });
            const dataCreate = await res.json()

            if (res.ok) {
                getUsers()
                setOpenModalUserCreate(false)
                handlerAlert(true, "User", "User is adding successfully", "green")
            } else {
                handlerAlert(true, dataCreate.message, dataCreate.details, "red")
            }
        } catch (err) {
            console.log(err)
            handlerAlert(true, "err.message", "err.details", "red")
        }

    }
    const createServiceProvider = async (item: ServiceCenterInterface, user: UserInterface) => {
        setIsLoading(true)
        const dataUser = {
            name: user.name,
            email: user.email,
            password: user.password,
            role: user.role,
            verified: user.verified
        }
        try {
            const resUser = await fetch('/api/users/create?token=' + session.data?.user?.accessToken, { method: 'POST', body: JSON.stringify(dataUser) });
            if (resUser.ok) {
                const dataCreateUser = await resUser.json()
                const data = {
                    name: item.name,
                    ownerId: dataCreateUser.id,
                    location: item.location,
                    category: item.category,
                    createdBy: session.data?.user?.id
                }
                const res = await fetch('/api/services-center?token=' + session.data?.user?.accessToken, { method: 'POST', body: JSON.stringify(data) });
                const dataCreate = await res.json()
                if (res.ok) {
                    getServiceProvider()
                    setOpenModalUserCreate(false)
                    handlerAlert(true, "Service provider", "Service provider is adding successfully", "green")
                } else {
                    handlerAlert(true, dataCreate.message, dataCreate.details, "red")
                }
            } else {
                handlerAlert(true, "Access error", "Access Denied", "red")
            }
        } catch (err) {
            console.log(err)
            handlerAlert(true, "err.message", "err.details", "red")
        }
    }
    const handlerAlert = (show: boolean, message: string, details: string, status: string) => {
        setAlertDetails(details)
        setAlertMessage(message)
        setAlertStatus(status)
        setShowAlert(show);
        setIsLoading(false)
        setTimeout(() => {
            setShowAlert(false);
        }, 10000);
    }
    return (
        <>
            <title>Admin | Accounts </title>
            <section className="w-full relative container px-4  bg-white" >
                {
                    showAlert ? (
                        <div className={`p-4 w-fit min-w-96 mb-4 text-sm text-${alertStatus}-800 border-l-8 border-${alertStatus}-500 rounded-lg bg-${alertStatus}-50`} role="alert">
                            <span className="font-medium">{alertMessage}:</span> {alertDetails}.
                        </div>
                    ) : null
                }
                {
                    isLoading ? (
                        <div className="flex w-full h-full justify-center items-center bg-black/10 z-40 top-0 left-0 fixed">
                            <LoadingIcon fill="#FB7C37"></LoadingIcon>
                        </div>
                    ) : null
                }
                {
                    showModalDelete ? (
                        <div className="flex w-full h-full justify-center items-center bg-black/10 z-30 top-0 left-0 fixed">
                            <ModalDelete onSubmit={(e) => {
                                if (e) {
                                    if (users) {
                                        setShowModalDelete(false)
                                        setIsLoading(true)
                                        setTimeout(() => {
                                            setUsers(users.filter((r) => {
                                                if (item) { r.id != item.id } {

                                                }
                                            }))
                                            handlerAlert(true, "User", "User is deleted successfully", "green")
                                        }, 2000);
                                    }
                                }
                            }} onClose={setShowModalDelete} title={"Delete " + item?.name} message="Do you want to delete this user?"></ModalDelete>
                        </div>
                    ) : null
                }
                <div className="flex items-center gap-4 font-bold">
                    <UsersIcon fill="#111111"></UsersIcon>
                    <span className="text-lg">Users </span>
                </div>
                <div className="flex mt-4 items-center justify-between">
                    <FilterBy filterTab={TabStateAppointement} onEvent={onStateChange} ></FilterBy>
                    {
                        showServiceProvider ? (<Button onClick={() => setOpenDrawServiceProvider(true)} className="w-fit rounded-3xl px-4" typeButton={"outline"} label={"Add Service Provider"}></Button>) : (<Button onClick={() => setOpenModalUserCreate(true)} className="w-fit rounded-3xl px-4" typeButton={"outline"} label={"Add User"}></Button>)
                    }

                </div>
                <div className="grid grid-cols-4 gap-5 mt-4">
                    {
                        users ? (<CardStat color={"secondary"} icon={UserIcon({ fill: "#FB7C37" })} title={"Users"} stat={users.length.toString()} ></CardStat>)
                            : (<div className=" animate-pulse  bg-gray-200 h-full min-h-28 rounded-2xl dark:bg-gray-700 w-full mb-4"></div>)
                    }

                    <CardStat color={"secondary"} icon={UserIcon({ fill: "#FB7C37" })} title={"Service Providers"} stat={"0"} ></CardStat>

                </div>
                {
                    showUser ? (
                        <div className="mt-4 border-t ">
                            {
                                users ? (
                                    users.length > 0 ? (
                                        users.map((item, index) => (
                                            <AccountItem key={index} item={item} onDelete={(e) => { { setShowModalDelete(true); setItem(e) } }} onShow={(e) => { setOpenModalUserDetail(true); setItem(e) }}></AccountItem>
                                        ))
                                    ) : (
                                        <p>No user find</p>
                                    )
                                ) : (
                                    <div className=" animate-pulse  bg-gray-200 h-10 dark:bg-gray-700 w-full mb-4"></div>
                                )
                            }
                        </div>
                    ) : null
                }
                {
                    showServiceProvider ? (
                        <div className="mt-4 border-t ">
                            {
                                serviceProvider ? (
                                    serviceProvider.length > 0 ? (
                                        serviceProvider.map((item, index) => (
                                            <AccountItem key={index} item={item} onDelete={(e) => { { setShowModalDelete(true); setItem(e) } }} onShow={(e) => { setOpenModalUserDetail(true); setItem(e) }}></AccountItem>
                                        ))
                                    ) : (
                                        <p>No user find</p>
                                    )
                                ) : (
                                    <div className=" animate-pulse  bg-gray-200 h-10 dark:bg-gray-700 w-full mb-4"></div>
                                )
                            }
                        </div>
                    ) : null
                }
                {
                    openModalUserDetail ? (<UserDetailModal onClose={setOpenModalUserDetail} onSubmit={() => { }} user={item}></UserDetailModal>) : (<></>)
                }
                {
                    openModalUserCreate ? (<UserCreateModal roles={roles} onClose={() => setOpenModalUserCreate(false)} onSubmit={createUser}></UserCreateModal>) : (<></>)
                }
                {
                    openDrawServiceProvider ? (<ServiceProviderCreateDraw onClose={() => setOpenDrawServiceProvider(false)} onSubmit={(e, user) => { createServiceProvider(e, user) }}></ServiceProviderCreateDraw>) : (<></>)
                }
            </section >
        </>
    )
}