"use client"

import { TITLE_WEBSITE } from "@/app/lib/constantes"
import OrderIcon from "@/components/Icones/OrderIcon"
import CardStat from "@/components/UI/CardStat"
import FilterBy from "@/components/UI/FilterBy"
import OrderDetailsModal from "@/components/UI/OrderDetailsModal"
import OrderItem from "@/components/UI/OrderItem"
import { OrderInterface } from "@/interfaces/OrderInterface"
import { UserInterface } from "@/interfaces/UserInterface"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"


export default function Page() {
    const [TabStateOrder, setTabStateOrder] = useState<{ actived: boolean, label: string }[]>([
        { label: "Pending", actived: true },
        { label: "In Progress", actived: false },
        { label: "Delivered", actived: false },
    ])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [openOrderDetailsModal, setOpenOrderDetailsModal] = useState<boolean>(false)
    const session = useSession();
    const [dataRequest, setDataRequest] = useState<OrderInterface[] | null>(null);
    const [itemData, setItemData] = useState<OrderInterface | undefined>()
    const onStateChange = (e: number) => {
        setTabStateOrder([]);
        let tab: { actived: boolean, label: string }[] = [];
        TabStateOrder.map((item: { actived: boolean; label: string; }, index: number) => {
            if (e == index) {
                item.actived = true;
            } else {
                item.actived = false;
            }
            tab.push(item)
        })
        setTabStateOrder(tab)
    }
    useEffect(() => {
        const getDataAndStat = async () => {
            try {
                if (session.data) {
                    if (session.data?.user) {
                        const resAppointment = await fetch('/api/orders?token=' + session.data?.user?.accessToken);
                        if (resAppointment.ok) {
                            const data = await resAppointment.json();
                            setDataRequest(data);
                            // setNoAppointment(true)
                        }

                    }
                }
            } catch (err) {
                console.log(err)
            }
        }
        getDataAndStat();
    }, [session])


    return (
        <section className="w-full py-8 relative container px-4  bg-white" >
            <title> {TITLE_WEBSITE} | Order history</title>
            <div className="relative max-w-full">
                <div className="col-span-1 lg:col-span-2 md:col-span-1">
                    <div>
                        <div className="flex justify-between mb-2 items-center ">
                            <div className="flex items-center gap-4 font-bold">
                                <OrderIcon fill="#111111" stroke="#111111"></OrderIcon>
                                <span className="text-lg">Order History </span>
                            </div>
                        </div>
                        <FilterBy onEvent={(e: number) => onStateChange(e)} filterTab={TabStateOrder}></FilterBy>
                        <div className="grid grid-cols-4 gap-4 mt-8">
                            <CardStat color={"secondary"} icon={<OrderIcon fill="#FB7C37" stroke="#FB7C37"></OrderIcon>} title={"Current Orders"} stat={"0"}></CardStat>
                            <CardStat color={"secondary"} icon={<OrderIcon fill="#FB7C37" stroke="#FB7C37"></OrderIcon>} title={"Total Orders"} stat={"0"}></CardStat>
                        </div>
                        <div className="mt-4">
                            {
                                dataRequest ? (
                                    dataRequest.length > 0 ? (
                                        dataRequest.map((item, index) => (
                                            <OrderItem item={item} key={index} onDelete={(e) => { console.log(e) }} onShow={(e) => { setItemData(e) }}></OrderItem>
                                        ))
                                    ) : (
                                        <p>No Order find</p>
                                    )
                                ) : (
                                    <div className=" animate-pulse  bg-gray-200 h-10 dark:bg-gray-700 w-full mb-4"></div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            {
                (openOrderDetailsModal && itemData) ? <OrderDetailsModal item={itemData} onClose={setOpenOrderDetailsModal} /> : null
            }
        </section>
    )
}