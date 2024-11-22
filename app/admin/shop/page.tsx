"use client"
import LoadingIcon from "@/components/Icones/LoadingIcon";
import NotificationIcon from "@/components/Icones/NotificationIcon";
import OrderIcon from "@/components/Icones/OrderIcon";
import SearchIcon from "@/components/Icones/SearchIcon";
import StatIcon from "@/components/Icones/StatIcon";
import { Button } from "@/components/UI/Button";
import CardBasic from "@/components/UI/CardBasic";
import CardChartLine from "@/components/UI/CardChartLine";
import CardOrderShop from "@/components/UI/CardOrderShop";
import CardProduct from "@/components/UI/CardProduct";
import EditProductModal from "@/components/UI/EditProductModal";
import FilterBy from "@/components/UI/FilterBy";
import ProductCreateModal from "@/components/UI/ProductCreateModal";
import ProductDetailModal from "@/components/UI/ProductDetailModal";
import { OrderInterface } from "@/interfaces/OrderInterface";
import { ProductInterface } from "@/interfaces/ProductInterface"
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function Page() {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const session = useSession();
    const [dataRequest, setDataRequest] = useState<ProductInterface[] | null>(null);
    const [dataRequestOrder, setDataRequestOrder] = useState<OrderInterface[] | null>(null);
    const [itemData, setItemData] = useState<ProductInterface>({
        name: "",
        description: "",
        price: {
            amount: 0,
            currency: ""
        },
        stockQuantity: 0,
        active: true,
        id: "",
        createdAt: "",
        updatedAt: "",
        createdBy: "",
        updatedBy: ""
    });
    const [openProductCreateModal, setOpenProductCreateModal] = useState<boolean>(false)
    const [openProductDetailModal, setOpenProductDetailModal] = useState<boolean>(false)
    const [openProductEditModal, setOpenProductEditModal] = useState<boolean>(false)
    const [alertDetails, setAlertDetails] = useState<string>('')
    const [alertStatus, setAlertStatus] = useState<string>('')
    const [showAlert, setShowAlert] = useState<boolean>(false)
    const [alertMessage, setAlertMessage] = useState<string>('')

    const getData = async () => {

        try {
            if (session.data) {
                if (session?.data?.user) {
                    const resAppointment = await fetch(`/api/products/active?token=${session?.data?.user.accessToken}`);
                    if (resAppointment.ok) {
                        const data = await resAppointment.json();
                        setDataRequest(data);
                        // setNoAppointment(true)
                    } else {
                        handlerAlert(true, "Warning", "Not data", "yellow")
                    }
                }
            }
            // if (noAppointment) {
            //     console.log(1)
            // }
        } catch (err) {
            console.log(err)
        }
    }
    const postData = async (item: ProductInterface) => {
        setIsLoading(true)
        const data = {
            name: item.name,
            description: item.description,
            stockQuantity: item.stockQuantity,
            amount: item.price.amount,
            active: true
        }
        try {
            if (session.data) {
                if (session?.data?.user) {
                    const res = await fetch(`/api/products?token=${session?.data?.user.accessToken}`, { method: 'POST', body: JSON.stringify(data) });
                    const dataCreate = await res.json()
                    if (res.ok) {
                        getData()
                        setOpenProductCreateModal(false)
                        handlerAlert(true, "User", "User is adding successfully", "green")
                    } else {
                        handlerAlert(true, dataCreate.message, dataCreate.details, "red")
                    }
                }
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
        }, 100000);
    }
    const [TabStateAppointement, setTabStateAppointment] = useState<{ actived: boolean, label: string }[]>([
        { label: "Body Kits", actived: true },
        { label: "Suspension", actived: false },
        { label: "Engines", actived: false },
        { label: "Accessories", actived: false },
        { label: "Interior", actived: false },
        { label: "Tires", actived: false },
    ])



    useEffect(() => {
        const getDataAndStat = async () => {
            try {
                if (session.data) {
                    if (session?.data?.user) {
                        const resAppointment = await fetch(`/api/products/active?token=${session?.data?.user.accessToken}`);
                        if (resAppointment.ok) {
                            const data = await resAppointment.json();
                            setDataRequest(data);
                            // setNoAppointment(true)
                        }
                        const resOrder = await fetch(`/api/orders?token=${session?.data?.user.accessToken}`);
                        if (resOrder.ok) {
                            const dataOrder = await resOrder.json();
                            setDataRequestOrder(dataOrder);
                            // setNoAppointment(true)
                        }
                        // if (noAppointment) {
                        //     console.log(1)
                        // }
                    }
                }
            } catch (err) {
                console.log(err)
            }
        }
        getDataAndStat();
    }, [session])

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
        setTabStateAppointment(tab)
    }

    const showEditModal = () => {

    }
    return (
        <>
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
            <section className="w-full py-8 relative container px-4  bg-white" >
                <div className="relative max-w-full">
                    <Button typeButton="dark" onClick={() => setOpenProductCreateModal(true)} label="Add product" className="w-fit relative rounded-full px-4"></Button>
                    <div className="grid grid-cols-1 gap-5 xl:grid-cols-3 my-2 lg:grid-cols-2 md:grid-cols-2">
                        <CardBasic color={"secondary"} icon={<StatIcon fill="#FB7C37"></StatIcon>} subTitle={"This Week"} title={"Items"} stat={dataRequest ? dataRequest.length.toString() : "0"} pourcentage={0} sup={false}></CardBasic>
                        <CardBasic color={"secondary"} icon={<StatIcon fill="#FB7C37"></StatIcon>} subTitle={"This Week"} title={"Revenue"} stat={"0"} pourcentage={0} sup={false}></CardBasic>
                        <CardChartLine data={[0, 0, 0, 0, 0, 0, 0]} subTitle='6 month period' maxWidth="max-w-full" labels={["Jan", "Fev", "Jan", "Fev", "Jan", "Fev",]} height={0}></CardChartLine>
                    </div>
                    <div className="grid grid-cols-1 gap-5 mt-6 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1">
                        <div className="col-span-1 lg:col-span-2 md:col-span-1">
                            <div className="pt-5 pb-3 px-4 mt-5 bg-rose-50 rounded-xl ">
                                <div>
                                    <div className="flex justify-between gap-2 items-center">
                                        <div className="flex  gap-2 items-start">
                                            <NotificationIcon fill="#111111"></NotificationIcon>
                                            <span className="font-semibold max-md:text-xs">Notification</span>
                                        </div>
                                        <button type="button" className="p-2 bg-orange-400 transition-all rounded-full hover:bg-orange-700/70">
                                            <NotificationIcon fill="white"></NotificationIcon>
                                        </button>
                                    </div>
                                    <div className="p-2">
                                        {
                                            !dataRequestOrder ? (<></>) : dataRequestOrder.length > 0 ?
                                                dataRequestOrder.map((item, index) => (
                                                    (index < 1) ? <div className="text-sm py-2 border-b w-full" key={index}>New Order From <span className="font-medium">{item.user.name}</span></div> : <></>
                                                )) : (<></>)
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5">
                                <div className="flex justify-between items-center ">
                                    <div className="flex items-center gap-2 font-bold">
                                        <OrderIcon fill="#111111" stroke={"#111111"}></OrderIcon>
                                        <span className="text-sm">Shop</span>
                                    </div>
                                    <form className="flex items-center w-fit p-2 pl-5 mt-5 bg-rose-50 rounded-full">
                                        <SearchIcon fill="#C5550E" stroke="none"></SearchIcon>
                                        <input type="search" className="border-none w-full focus-visible:outline-none text-sm p-2 bg-inherit" placeholder="Search" />
                                    </form>
                                </div>
                                <h1 className="font-semibold my-4">Category</h1>
                                <FilterBy onEvent={(e: number) => onStateChange(e)} filterTab={TabStateAppointement}></FilterBy>
                            </div>

                            <div className="grid grid-cols-4 mt-8 gap-8">
                                {!dataRequest ? (<></>) : dataRequest.length > 0 ?
                                    dataRequest.map((item, index) => (
                                        (index < 6) ?
                                            <CardProduct key={index} item={item} onSubmit={(e) => { setOpenProductDetailModal(true); setItemData(e) }}></CardProduct>
                                            : <></>
                                    )) : (<></>)
                                }
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="mt-4">
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-2">
                                        <OrderIcon fill="#111111" stroke={"#111111"}></OrderIcon>
                                        <span className="font-bold">Orders</span>
                                    </div>
                                    <Link href={"/admin/order-history"}>
                                        <Button className="w-fit rounded-full px-4" label="Order History" typeButton="outline"></Button>
                                    </Link>
                                </div>
                                <div className="flex flex-col gap-2">
                                    {!dataRequestOrder ? (<></>) : dataRequestOrder.length > 0 ?
                                        dataRequestOrder.map((item, index) => (
                                            (index < 5) ? <CardOrderShop key={index} id={item.id} image={""} userName={""} productName={item.user.name}></CardOrderShop> : <></>
                                        )) : (<></>)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    openProductDetailModal ? (<ProductDetailModal item={itemData} onClose={setOpenProductDetailModal} onSubmit={(e) => { setOpenProductEditModal(e); setOpenProductDetailModal(false) }}></ProductDetailModal>) : null
                }
                {
                    openProductEditModal ? (<EditProductModal item={itemData} onClose={setOpenProductEditModal} onSubmit={showEditModal} file={function (value: File | null): void {
                        console.log(value)
                    }} fileFeatured={function (value: File | null): void {
                        console.log(value)
                    }} categories={[]}></EditProductModal>) : null
                }
                {
                    openProductCreateModal ? (<ProductCreateModal onClose={setOpenProductCreateModal} onSubmit={postData} categories={[
                        { label: " ", value: "" },
                        { label: "Body Kits", value: "Body Kits" },
                        { label: "Suspension", value: "Suspension" },
                        { label: "Engines", value: "Engines" },
                        { label: "Accessories", value: "Accessories" },
                        { label: "Interior", value: "Interior" },
                        { label: "Tires", value: "Tires" },
                    ]} file={function (value: File | null): void {
                        console.log(value)
                    }} fileFeatured={function (value: File | null): void {
                        console.log(value)
                    }} ></ProductCreateModal>) : (<></>)
                }
            </section>
        </>
    )
}