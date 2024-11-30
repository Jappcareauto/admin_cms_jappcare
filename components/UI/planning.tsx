'use client';

import React, { useState } from "react";
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import { Button } from "./Button";
interface PlanningProps {
    isMobile: boolean
}
const Planning = ({ isMobile }: PlanningProps) => {
    const [dates, setDates] = useState<DayPilot.Date>(DayPilot.Date.today())
    const next = () => {
        const dates1 = new Date(dates.toString());
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
        setDates(dates);
    };
    const initialConfig: DayPilot.CalendarConfig = {
        viewType: "Week",
        durationBarVisible: false,
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
                {...initialConfig}
                
            />
        </div>
    )
}

export default Planning