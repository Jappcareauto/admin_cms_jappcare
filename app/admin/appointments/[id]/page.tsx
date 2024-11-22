"use client"
import { TITLE_WEBSITE } from "@/app/lib/constantes";
import CalendarIcon from "@/components/Icones/calendarIcon";
import LoadingIcon from "@/components/Icones/LoadingIcon";
import AppointmentResultModal from "@/components/UI/AppointmentResultModal";
import { Button } from "@/components/UI/Button";
import ImagesView from "@/components/UI/ImageView";
import { changeDateForm } from "@/functions/boostrapFunctions";
import { AppointmentInterface } from "@/interfaces/AppointmentInterface";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";


interface IPrams {
    id?: string
}
export default function Page({ params }: { params: IPrams }) {
    // const [state, setState] = useState<string>("")
    const [dataItem, setDataItem] = useState<AppointmentInterface | undefined>();
    const session = useSession();
    useEffect(() => {
        const getDataAndStat = async () => {
            if (session.status == "authenticated") {
                try {
                    const res = await fetch('/api/appointments/' + params.id + '?token=' + session.data?.user?.accessToken);
                    if (res.ok) {
                        const data = await res.json();
                        setDataItem(data.data);
                    }
                    // const resChatRoom = await fetch('/api/chat?token=' + session?.data?.user?.accessToken);
                    // if (resChatRoom.ok) {
                    //     const dataChat = await resChatRoom.json();
                    //     setMessages(dataChat.data);
                    // }
                } catch (err) {
                    console.log(err)
                }
            }
        }
        getDataAndStat()
    }, [session])
    return (
        <section className="w-full relative container px-4 flex flex-row bg-white">
            {/* <title>{TITLE_WEBSITE} | Appointment Details</title> */}
            <div className="w-full" >
                {
                    dataItem ? (
                        <div className="relative max-w-full py-4 xl:max-w-7xl">
                            <div className="flex justify-between">
                                <h2 className="font-bold">
                                    Appointment Details
                                </h2>
                                <Button typeButton="dark" className="w-fit" label="Result"></Button>
                            </div>
                            <div className="flex items-center justify-between mt-1">
                                <div className="flex items-center w-full gap-4 rounded-2xl">
                                    <img width="48" height="48" className="rounded-full"
                                        src="../../assets/images/10c6847941b93f45858be7d3ce3ff3ec.png" alt="" />
                                    <span className="text-sm">
                                        {/* James Mann */}
                                    </span>
                                </div>
                                <div className="appointement-statut ">
                                    <div
                                        className="p-2 px-3 text-xs text-center text-orange-500 rounded-full w-28 bg-rose-50 lg:text-sm">{dataItem.status}</div>
                                </div>
                            </div>
                            <img className="w-1/2" src="./../../assets/images/5e8173900d54188840dcc505afaab0b3.png" alt=""
                            />
                            <h3 className="text-2xl font-semibold ">
                                {dataItem.vehicle?.name}
                            </h3>
                            <h4 className="text-sm">{dataItem.vehicle?.detail.year}, {dataItem.vehicle?.detail.model}</h4>
                            <div className="flex items-end justify-between mt-4">
                                <div>
                                    <h3 className="text-xl font-bold text-orange-500 max-md:text-sm">{dataItem.service?.title} appointment</h3>
                                    {/* <!-- <h4 className="mt-2 font-bold">Porsche Taycan Turbo S</h4> --> */}
                                    <div className="flex flex-col gap-2 mt-2 text-stone-500">
                                        <div className="flex gap-1">
                                            <CalendarIcon fill="#797676" stroke="#797676" />
                                            <span className="text-sm">{changeDateForm(dataItem.date)}</span>
                                        </div>
                                        <div className="flex gap-1 ">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M12 2.00024C16.8706 2.00024 21 6.03322 21 10.926C21 15.8967 16.8033 19.3849 12.927 21.7569C12.6445 21.9164 12.325 22.0002 12 22.0002C11.675 22.0002 11.3555 21.9164 11.073 21.7569C7.2039 19.3618 3 15.9139 3 10.926C3 6.03322 7.12944 2.00024 12 2.00024Z"
                                                    stroke="#797676" stroke-width="1.5" />
                                                <path
                                                    d="M15.4999 11C15.4999 12.933 13.9329 14.5 11.9999 14.5C10.0669 14.5 8.49991 12.933 8.49991 11C8.49991 9.067 10.0669 7.5 11.9999 7.5C13.9329 7.5 15.4999 9.067 15.4999 11Z"
                                                    stroke="#797676" stroke-width="1.5" />
                                            </svg>
                                            <span className="text-sm ">{dataItem.locationType}</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <p className="w-full mt-4 text-sm lg:w-1/2">
                                {dataItem.vehicle?.description}
                            </p>
                            <h3 className="my-4 font-semibold">Images</h3>
                            {
                                dataItem.vehicle?.media.map((item, index) => (
                                    <ImagesView item={item.items} key={index}></ImagesView>
                                ))
                            }
                            <AppointmentResultModal />
                        </div>
                    ) : (
                        <div className="flex w-full h-full justify-center items-center z-40 top-0 left-0 absolute min-h-screen">
                            <LoadingIcon fill="#FB7C37"></LoadingIcon>
                        </div>
                    )
                }
            </div>

        </section>
    )
}