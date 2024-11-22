"use client"
import { TITLE_WEBSITE } from "@/app/lib/constantes";
import CalendarIcon from "@/components/Icones/calendarIcon";
import GridIcon from "@/components/Icones/GridIcon";
import ListIcon from "@/components/Icones/ListIcon";
import AppointmentCalendarModal from "@/components/UI/AppointmentCalendarModal";
import AppointmentDetailModal from "@/components/UI/AppointmentDetailModal";
import { Button } from "@/components/UI/Button";
import CardAppointmentAdmin from "@/components/UI/CardAppointmentAdmin";
// import { Button } from "@/components/UI/Button";
// import CardAppointmentAdmin  from "@/components/UI/CardAppointmentAdmin";
import CardBasic from "@/components/UI/CardBasic";
import CardChartBar from "@/components/UI/CardChartBar";
// import CardChartLine from "@/components/UI/CardChartLine";
import CardListItem from "@/components/UI/CardListItem";
import CardStat from "@/components/UI/CardStat";
import FilterBy from "@/components/UI/FilterBy";
import { AppointmentInterface } from "@/interfaces/AppointmentInterface";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

enum StateEnum {
    PENDING = "Pending",
    CONFIRMED = "Confirmed",
    CANCELLED = "Cancelled",
    COMPLETED = "Completed",
    NO_SHOW = "No show",
    COUNT = 4
}
export default function Page() {
    // const [state, setState] = useState<string>("")
    const session = useSession();
    const [isList, setIsList] = useState(false)
    const [noAppointment, setNoAppointment] = useState<boolean>(false)
    const [itemData, setItemData] = useState<AppointmentInterface | undefined>()
    const [appointments, setAppointments] = useState<AppointmentInterface[] | null>(null);
    const [openDetailAppointment, setOpenDetailAppointment] = useState<boolean>(false);
    const [openCalendar, setOpenCalendar] = useState<boolean>(false);
    const [TabStateAppointement, setTabStateAppointment] = useState<{ actived: boolean, label: string }[]>([
        { label: StateEnum.PENDING.toString(), actived: false },
        { label: StateEnum.CONFIRMED.toString(), actived: false },
        { label: StateEnum.CANCELLED.toString(), actived: false },
        { label: StateEnum.COMPLETED.toString(), actived: false },
        { label: StateEnum.NO_SHOW.toString(), actived: false }
    ])
    useEffect(() => {
        const getDataAndStat = async () => {
            try {
                if (session.data) {
                    if (session.data?.user) {
                        const resAppointment = await fetch('/api/appointments/list?token=' + session.data?.user?.accessToken);
                        if (resAppointment.ok) {
                            const data = await resAppointment.json();
                            setAppointments(data.data);
                            setNoAppointment(true)
                        } else {
                            setNoAppointment(false)
                        }
                        if (noAppointment) {
                            console.log(1)
                        }
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
    return (
        <section className="w-full relative container px-4 flex flex-row bg-white">
            {/* <title>{TITLE_WEBSITE} | Appointment</title> */}
            <div className="w-full" >
                {
                    !isList ? (
                        <div className="grid grid-cols-4 gap-4">
                            <CardBasic color={"secondary"} icon={CalendarIcon({ stroke: "orange", fill: "orange" })} subTitle={"In progress"} title={"Appointments"} stat={"0"} pourcentage={0} sup={false} ></CardBasic>
                            <CardChartBar subTitle={"This week"} maxWidth={"max-w-96"} data={[0, 0, 0, 0, 0, 0, 0]} height={""}></CardChartBar>
                        </div>)
                        : null
                }
                <div>
                    <div className="max-w-6xl mt-5 ">
                        <div>
                            <div  className="flex items-center justify-between">
                                <div className="flex items-center gap-4 font-bold">
                                    <CalendarIcon stroke="black" fill="black"></CalendarIcon>
                                    <span>
                                        Appointments
                                        {/* (<a href="appointment-history.html" className="text-orange-500 hover:text-orange-400">History</a>) */}
                                    </span>
                                </div>
                                <Button onClick={() => setOpenCalendar(true)} typeButton="dark" className="w-fit rounded-full px-4" label="Calendar"></Button>
                            </div>
                            <div className="flex mt-4 gap-2 items-center justify-between ">
                                <FilterBy onEvent={(e: number) => onStateChange(e)} filterTab={TabStateAppointement}></FilterBy>
                                <div className="flex gap-2 items-center ">
                                    <button onClick={() => setIsList(false)} className="size-10 p-1 hover:shadow-md rounded-full flex items-center justify-center" style={{ backgroundColor: !isList ? "#FB7C37" : "#f7f7f7" }}><GridIcon fill={!isList ? "#fff" : "#242424"}></GridIcon></button>
                                    <button onClick={() => setIsList(true)} className="size-10 p-1 rounded-full flex items-center hover:shadow-md justify-center" style={{ backgroundColor: isList ? "#FB7C37" : "#f7f7f7" }}><ListIcon fill={isList ? "#fff" : "#242424"}></ListIcon></button></div>
                            </div>
                            {
                                isList ? (<>
                                    <div className="col-span-1 lg:col-span-2 md:col-span-1">
                                        <div className=" gap-4 grid grid-cols-4 mt-8">
                                            <CardStat icon={CalendarIcon({ fill: "#FB7C37", stroke: "#FB7C37" })} stat={appointments?.length ?? 0} color="secondary" title="Current Orders"></CardStat>
                                            <CardStat icon={CalendarIcon({ fill: "#FB7C37", stroke: "#FB7C37" })} stat={appointments?.length ?? 0} color="secondary" title="Total Orders"></CardStat>
                                        </div>
                                        <div className="mt-8 ">
                                            {
                                                appointments ?
                                                    appointments.map((item, index) => (
                                                        <CardListItem key={index}
                                                            item={item} onShow={(e) => { setOpenDetailAppointment(true); setItemData(item) }}></CardListItem>
                                                    )) : (
                                                        <div>
                                                            <div className=" animate-pulse min-h-10  bg-gray-200 h-full rounded-2xl dark:bg-gray-700 w-full mb-4"></div>
                                                            {/* <div className=" animate-pulse  min-h-52  bg-gray-200 h-full rounded-2xl dark:bg-gray-700 w-full mb-4"></div> */}
                                                        </div>
                                                    )
                                            }
                                        </div>
                                    </div>
                                </>) : (
                                    <>
                                        <div>
                                            <h2 className="my-4 text-lg font-bold">Up Next</h2>
                                            <div className="flex flex-col gap-2">
                                                <div className='mt-4'>
                                                    {
                                                        appointments ?
                                                            appointments.map((item, index) => (
                                                                <CardAppointmentAdmin key={index}
                                                                    item={item} onShow={(e) => { setOpenDetailAppointment(e); setItemData(item) }}></CardAppointmentAdmin>
                                                            )) : (
                                                                <div>
                                                                    <div className=" animate-pulse min-h-52  bg-gray-200 h-full rounded-2xl dark:bg-gray-700 w-full mb-4"></div>
                                                                    {/* <div className=" animate-pulse  min-h-52  bg-gray-200 h-full rounded-2xl dark:bg-gray-700 w-full mb-4"></div> */}

                                                                </div>
                                                            )
                                                    }
                                                </div>
                                            </div>
                                            <h2 className="my-4 text-lg font-bold">Later</h2>
                                            <div className="flex flex-col gap-2">
                                                <div className='mt-4'>
                                                    {
                                                        appointments ?
                                                            appointments.map((item, index) => (
                                                                <CardAppointmentAdmin key={index}
                                                                    item={item} onShow={setOpenDetailAppointment}></CardAppointmentAdmin>
                                                            )) : (
                                                                <div>
                                                                    <div className=" animate-pulse min-h-52  bg-gray-200 h-full rounded-2xl dark:bg-gray-700 w-full mb-4"></div>
                                                                    <div className=" animate-pulse  min-h-52  bg-gray-200 h-full rounded-2xl dark:bg-gray-700 w-full mb-4"></div>

                                                                </div>
                                                            )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            }
                        </div>

                    </div>

                </div>
            </div>
            {
                (openDetailAppointment && itemData) ? <AppointmentDetailModal onClose={setOpenDetailAppointment} item={itemData} /> : null
            }
             {
                (openCalendar) ? <AppointmentCalendarModal onClose={setOpenCalendar}  /> : null
            }
        </section>
    )
}