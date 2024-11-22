'use client';

import React, { useState, useRef } from "react";
// @ts-ignore
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import Image from "next/image";
import loaderSvg from "@/public/images/loader.svg"
import { Button } from "./Button";
interface PlanningProps {
    isMobile: boolean
}
const Planning = ({ isMobile }: PlanningProps) => {

    const [vo, setVO] = useState<DayPilot.EventData[]>([]);
    const [dates, setDates] = useState<any>(DayPilot.Date.today())
    const [isNull, setIsNull] = useState<boolean>(false)
    const calendarRef = useRef<any>();
    const next = () => {
        const dates1 = new Date(dates);
        let year = dates1.getFullYear();
        let month = dates1.getMonth() + 1;
        let day = dates1.getDate();
        day = day + 7;
        if (month % 2 == 0) {
            if (month == 2) {
                if (year == 2024 || year == 2028 || year == 2032 || year == 2036 || year == 2040) {
                    if (day > 29) {
                        day = day - 29;
                        month = month + 1;
                    }
                } else {
                    if (day > 28) {
                        day = day - 28;
                        month = month + 1;
                    }
                }
            } else {
                if (day > 30) {
                    day = day - 30;
                    month = month + 1;
                }
            }
        } else {
            if (day > 31) {
                day = day - 31;
                month = month + 1;
            }
        }
        if (month == 13) {
            month = 1;
            year = year + 1;
        }
        const daym2 = (day) < 10 ? `0${day}` : `${day}`;
        const monthm2 = (month) < 10 ? `0${month}` : `${month}`;
        setDates(`${year}-${daym2}-${monthm2}`);
    };
    const previous = () => {
        const dates1 = new Date(dates);
        let year = dates1.getFullYear();
        let month = dates1.getMonth() + 1;
        let day = dates1.getDate();
        day = day - 7;
        if (month % 2 == 0) {
            if (month == 2) {
                if (year == 2024 || year == 2028 || year == 2032 || year == 2036 || year == 2040) {
                    if (day < 29) {
                        day = Math.abs(day - 29);
                        month = month - 1;
                    }
                } else {
                    if (day < 28) {
                        day = Math.abs(day - 28);
                        month = month - 1;
                    }
                }
            } else {
                if (day < 30) {
                    day = Math.abs(day - 30);
                    month = month - 1;
                }
            }
        } else {
            if (day < 31) {
                day = Math.abs(day - 31);
                month = month - 1;
            }
        }
        if (month == 0) {
            month = 12;
            year = year - 1;
        }
        const daym2 = (day) < 10 ? `0${day}` : `${day}`;
        const monthm2 = (month) < 10 ? `0${month}` : `${month}`;
        setDates(`${year}-${daym2}-${monthm2}`);

    };

    const colors = [
        { name: "Green", id: "#6aa84f" },
        { name: "Blue", id: "#3d85c6" },
        { name: "Turquoise", id: "#00aba9" },
        { name: "Light Blue", id: "#56c5ff" },
        { name: "Yellow", id: "#f1c232" },
        { name: "Orange", id: "#e69138" },
        { name: "Red", id: "#cc4125" },
        { name: "Light Red", id: "#ff0000" },
        { name: "Purple", id: "#af8ee5" },
    ];

    const participants = [
        { name: "1", id: 1 },
        { name: "2", id: 2 },
        { name: "3", id: 3 },
        { name: "4", id: 4 },
    ];

    const [calendar, setCalendar] = useState<DayPilot.Calendar>();

    const editEvent = async (e: DayPilot.Event) => {
        const form = [
            { name: "Event text", id: "text", type: "text" },
            { name: "Event color", id: "backColor", type: "select", options: colors },
            { name: "Number of participants", id: "tags.participants", type: "select", options: participants },
        ];

        const modal = await DayPilot.Modal.form(form, e.data);
        if (modal.canceled) { return; }
        e.data.text = modal.result.text;
        e.data.backColor = modal.result.backColor;
        e.data.tags.participants = modal.result.tags.participants;
        calendar?.events.update(e);
    };

    const contextMenu = new DayPilot.Menu({
        items: [
            {
                text: "Delete",
                onClick: async (args: { source: any; }) => {
                    calendar?.events.remove(args.source);
                },
            },
            {
                text: "-"
            },
            {
                text: "Edit...",
                onClick: async (args: { source: any; }) => {
                    await editEvent(args.source);
                }
            }
        ]
    });



    const initialConfig: DayPilot.CalendarConfig = {
        viewType: "Week",
        durationBarVisible: false,
    };

    const [config, setConfig] = useState(initialConfig);


    const emptyData = () => {
        if (!isNull) {
            return <Image src={loaderSvg} className='animate-spin mx-auto' width={25} height={25} alt='Loader image' />;
        } else {
            return <p className='text-center p-4 bg-white text-blue-400 font-semibold'>Planning vide!</p>
        }
    }

    const onTimeRangeSelected = async (args: { start: any; end: any; resource: any; }) => {
        const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
        calendarRef.current?.control?.clearSelection();
        if (modal.canceled) { return; }
        setVO([...vo, {
            start: args.start,
            end: args.end,
            id: DayPilot.guid(),
            resource: args.resource,
            text: modal.result
        }])

    };

    const previewDate = () => {
        setDates(DayPilot.Date.today())
    }

    return (
        <div className="relative mt-4 bg-white">
            {
                !isMobile ? (
                    <div className="my-4 flex flex-row gap-2s bg-white">
                        <Button typeButton="dark" onClick={() => previewDate()} className="text-sm w-fit px-4 rounded-full" label="Date d&apos;aujourd&apos;hui"></Button>
                        <Button typeButton="dark" onClick={() => next()} className="text-sm w-fit px-4 rounded-full" label="Next week"></Button>
                    </div>
                ) : null
            }

            <DayPilotCalendar
                height={200}
                {...config}
                controlRef={setCalendar}
            />
        </div>
    )
}

export default Planning