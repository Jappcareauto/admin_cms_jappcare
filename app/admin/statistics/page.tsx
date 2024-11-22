"use client"
import CalendarIcon from "@/components/Icones/calendarIcon";
import OrderIcon from "@/components/Icones/OrderIcon";
import StatIcon from "@/components/Icones/StatIcon";
import { Button } from "@/components/UI/Button"
import CardBasic from "@/components/UI/CardBasic";
import CardChartLine from "@/components/UI/CardChartLine";
import CardStat from "@/components/UI/CardStat";
import ExportDataDraw from "@/components/UI/ExportDataDraw";
import { useState } from "react";

// import { UserInterface } from "@/interfaces/UserInterface";
// import { useSession } from "next-auth/react";
// import { useEffect, useState } from "react";

export default function Page() {

    // const session = useSession();
    // const [token, setToken] = useState<string>('')
    // const [users, setUsers] = useState<UserInterface[] | null>([]);
    // const [isInit, setIsInit] = useState<boolean>(false)
    const [openExportDataDraw, setOpenExportDataDraw] = useState<boolean>(false);
    // useEffect(() => {
    //     const getDataAndStat = async () => {
    //         try {
    //             if (session.data) {
    //                 if (session.data?.user) {
    //                     const res = await fetch('/api/users/list?token=' + session.data?.user?.accessToken);
    //                     // setToken(session.data?.user?.accessToken)
    //                     if (res.ok) {
    //                         setIsInit(true)
    //                         const data = await res.json();
    //                         setUsers(data.data);
    //                     }
    //                 }
    //             }
    //         } catch (err) {
    //             console.log(err)
    //         }
    //     }
    //     if (!isInit) {
    //         getDataAndStat();
    //     }
    // }, [session])

    const OverViewData: { color: string, icon: JSX.Element, subTitle: string, title: string, stat: string, pourcentage: number, sup: boolean }[] = [
        {
            color: "secondary",
            icon: <CalendarIcon stroke={"#FB7C37"} fill={"#FB7C37"}></CalendarIcon>,
            subTitle: "In Process",
            title: "Appointments",
            stat: "0",
            pourcentage: 0,
            sup: false,
        },
        {
            color: "secondary",
            icon: <OrderIcon stroke={"#FB7C37"} fill={"#FB7C37"}></OrderIcon>,
            subTitle: "This Week",
            title: "Orders",
            stat: "0",
            pourcentage: 0,
            sup: false,
        },
        {
            color: "secondary",
            icon: <OrderIcon stroke={"#FB7C37"} fill={"#FB7C37"}></OrderIcon>,
            subTitle: "This Week",
            title: "Revenue",
            stat: "0",
            pourcentage: 0,
            sup: false,
        },
        {
            color: "secondary",
            icon: <OrderIcon stroke={"#FB7C37"} fill={"#FB7C37"}></OrderIcon>,
            subTitle: "This Week",
            title: "VIN Request Made",
            stat: "0",
            pourcentage: 0,
            sup: false,
        },
        {
            color: "secondary",
            icon: <OrderIcon stroke={"#FB7C37"} fill={"#FB7C37"}></OrderIcon>,
            subTitle: "This Week",
            title: "Total Users",
            stat: "0",
            pourcentage: 0,
            sup: false,
        },
        {
            color: "secondary",
            icon: <OrderIcon stroke={"#FB7C37"} fill={"#FB7C37"}></OrderIcon>,
            subTitle: "This Week",
            title: "Emergency Request",
            stat: "0",
            pourcentage: 0,
            sup: false,
        },
    ];
    const AppointmentData: { color: string, icon: JSX.Element, title: string, stat: string, }[] = [
        {
            color: "secondary",
            icon: <CalendarIcon stroke={"#FB7C37"} fill={"#FB7C37"}></CalendarIcon>,
            title: "Total Revenue",
            stat: "0",
        },
        {
            color: "secondary",
            icon: <CalendarIcon stroke={"#FB7C37"} fill={"#FB7C37"}></CalendarIcon>,
            title: "Total Appointment",
            stat: "0",
        },
        {
            color: "secondary",
            icon: <CalendarIcon stroke={"#FB7C37"} fill={"#FB7C37"}></CalendarIcon>,
            title: "Completed Appointment",
            stat: "0",
        },
        {
            color: "secondary",
            icon: <CalendarIcon stroke={"#FB7C37"} fill={"#FB7C37"}></CalendarIcon>,
            title: "Cancel Appointment",
            stat: "0",
        }
    ]
    const OrderData: { color: string, icon: JSX.Element, title: string, stat: string, }[] = [
        {
            color: "secondary",
            icon: <OrderIcon stroke={"#FB7C37"} fill={"#FB7C37"}></OrderIcon>,
            title: "Total Revenue",
            stat: "0",
        },
        {
            color: "secondary",
            icon: <OrderIcon stroke={"#FB7C37"} fill={"#FB7C37"}></OrderIcon>,
            title: "Total Orders",
            stat: "0",
        },
        {
            color: "secondary",
            icon: <OrderIcon stroke={"#FB7C37"} fill={"#FB7C37"}></OrderIcon>,
            title: "Completed Orders",
            stat: "0",
        },
        {
            color: "secondary",
            icon: <OrderIcon stroke={"#FB7C37"} fill={"#FB7C37"}></OrderIcon>,
            title: "Cancel Orders",
            stat: "0",
        }
    ]
    const EmergencyData: { color: string, icon: JSX.Element, title: string, stat: string, }[] = [
        {
            color: "secondary",
            icon: <StatIcon fill={"#FB7C37"}></StatIcon>,
            title: "Total Revenue",
            stat: "0",
        },
        {
            color: "secondary",
            icon: <StatIcon fill={"#FB7C37"}></StatIcon>,
            title: "Total Requests",
            stat: "0",
        },
        {
            color: "secondary",
            icon: <StatIcon fill={"#FB7C37"}></StatIcon>,
            title: "Completed Requests",
            stat: "0",
        },
        {
            color: "secondary",
            icon: <StatIcon fill={"#FB7C37"}></StatIcon>,
            title: "Cancel Requests",
            stat: "0",
        }
    ]
    const UserData: { color: string, icon: JSX.Element, title: string, stat: string, }[] = [
        {
            color: "secondary",
            icon: <StatIcon fill={"#FB7C37"}></StatIcon>,
            title: "Users",
            stat: "0"
        },
        {
            color: "secondary",
            icon: <StatIcon fill={"#FB7C37"}></StatIcon>,
            title: "Service Provider",
            stat: "0",
        },
        {
            color: "secondary",
            icon: <StatIcon fill={"#FB7C37"}></StatIcon>,
            title: "Admin",
            stat: "0",
        },
    ]
    const VinRequestData: { color: string, icon: JSX.Element, title: string, stat: string, }[] = [
        {
            color: "secondary",
            icon: <StatIcon fill={"#FB7C37"}></StatIcon>,
            title: "Total Revenue",
            stat: "0",
        },
        {
            color: "secondary",
            icon: <StatIcon fill={"#FB7C37"}></StatIcon>,
            title: "Total Requests",
            stat: "0",
        },
        {
            color: "secondary",
            icon: <StatIcon fill={"#FB7C37"}></StatIcon>,
            title: "From Users",
            stat: "0",
        },
        {
            color: "secondary",
            icon: <StatIcon fill={"#FB7C37"}></StatIcon>,
            title: "From Service Providers",
            stat: "0",
        },
        {
            color: "secondary",
            icon: <StatIcon fill={"#FB7C37"}></StatIcon>,
            title: "Successful VIN Request",
            stat: "0",
        },
        {
            color: "secondary",
            icon: <StatIcon fill={"#FB7C37"}></StatIcon>,
            title: "Unsuccessful VIN Request",
            stat: "0",
        }
    ]
    const cardBarData = ["2021", "2022", "2023", "2024"]
    return (
        <>
            <title>Statistics Global | Admin - Japcare</title>
            <section className="w-full py-8 relative container px-4  bg-white" >
                <div className="flex items-center justify-between ">
                    <h3 className="font-bold text-lg">Overview</h3>
                    <Button onClick={() => setOpenExportDataDraw(true)} label="Download Report" className="w-fit rounded-full px-4" typeButton="dark"></Button>
                </div>
                <div className="grid grid-cols-1 gap-5 mt-5 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2">
                    {
                        OverViewData.map((item, index) => (
                            <CardBasic
                                key={index}
                                color={item.color}
                                icon={item.icon}
                                subTitle={item.subTitle}
                                title={item.title}
                                stat={item.stat}
                                pourcentage={item.pourcentage}
                                sup={item.sup}>
                            </CardBasic>
                        ))
                    }
                    <div className="col-span-full">
                        <CardChartLine labels={cardBarData} height={500} subTitle={"5"} maxWidth={"w-full"} data={[50, 10, 20, 0, 0, 30]}></CardChartLine>
                    </div>
                    <div className="col-span-full flex items-center gap-2">
                        <StatIcon fill="#FB7C37"></StatIcon>
                        <span className="font-bold text-lg">
                            Stats Breakdown by Category
                        </span>
                    </div>
                    <div className="col-span-full">
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-5 mt-4">
                    <div className="flex items-center col-span-full justify-between ">
                        <span className="font-semibold">Appointment Stats</span>
                        <button className="px-4 py-2 text-sm rounded-full bg-stone-200 text-stone-800">
                            This week
                        </button>
                    </div>
                    {
                        AppointmentData.map((item, index) => (
                            <CardStat
                                key={index}
                                color={item.color}
                                icon={item.icon}
                                title={item.title}
                                stat={item.stat}
                            >
                            </CardStat>
                        ))
                    }
                    <div className="flex items-center col-span-full justify-between ">
                        <span className="font-semibold">Order Stats</span>
                        <button className="px-4 py-2 text-sm rounded-full bg-stone-200 text-stone-800">
                            This week
                        </button>
                    </div>
                    {
                        OrderData.map((item, index) => (
                            <CardStat
                                key={index}
                                color={item.color}
                                icon={item.icon}
                                title={item.title}
                                stat={item.stat}
                            >
                            </CardStat>
                        ))
                    }
                    <div className="flex items-center col-span-full justify-between ">
                        <span className="font-semibold">Emergency Stats</span>
                        <button className="px-4 py-2 text-sm rounded-full bg-stone-200 text-stone-800">
                            This week
                        </button>
                    </div>
                    {
                        EmergencyData.map((item, index) => (
                            <CardStat
                                key={index}
                                color={item.color}
                                icon={item.icon}
                                title={item.title}
                                stat={item.stat}
                            >
                            </CardStat>
                        ))
                    }
                    <div className="flex items-center col-span-full justify-between ">
                        <span className="font-semibold">VIN Requests</span>
                        <button className="px-4 py-2 text-sm rounded-full bg-stone-200 text-stone-800">
                            This week
                        </button>
                    </div>
                    {
                        VinRequestData.map((item, index) => (
                            <CardStat
                                key={index}
                                color={item.color}
                                icon={item.icon}
                                title={item.title}
                                stat={item.stat}
                            >
                            </CardStat>
                        ))
                    }
                    <div className="flex items-center col-span-full justify-between ">
                        <span className="font-semibold">Users stats</span>
                        <button className="px-4 py-2 text-sm rounded-full bg-stone-200 text-stone-800">
                            This week
                        </button>
                    </div>
                    {
                        UserData.map((item, index) => (
                            <CardStat
                                key={index}
                                color={item.color}
                                icon={item.icon}
                                title={item.title}
                                stat={item.stat}
                            >
                            </CardStat>
                        ))
                    }
                </div>
            </section>
            {
                openExportDataDraw ? (<ExportDataDraw onClose={setOpenExportDataDraw} onSubmit={(e) => console.log(e)}></ExportDataDraw>) : (<></>)
            }
        </>
    )
}