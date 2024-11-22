

"use client";

import React, { useState } from 'react';

// type Event = {
//     name: string;
//     date: string;
//     day: number;
//     month: number;
//     year: number;
//     time: string;
// };

type CalendarProps = {
    isWeekView: boolean
};

const Calendar: React.FC<CalendarProps> = ({ isWeekView }) => {
    const [view, setView] = useState("month");
    const [layout, setLayout] = useState("grid");
    const [selectedDay, setSelectedDay] = useState(new Date().getDate());
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const daysOfWeekMobile = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
    // const events = [{ day: 29, time: "10:30", name: "Boxe anglaise" }];

    // Calculer le nombre de jours dans le mois actuel
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Déterminer le jour de la semaine du premier jour du mois
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const offset = (firstDayOfMonth + 6) % 7; // Ajuster pour commencer par lundi

    const handleViewChange = (newView: React.SetStateAction<string>) => setView(newView);
    const handleLayoutChange = (newLayout: React.SetStateAction<string>) => setLayout(newLayout);
    const date = new Date();
    const currentDay = date.getDate()

    const getDay = (da: number) => {
        const dateLetter = new Date(currentYear, currentMonth, da);
        return daysOfWeekMobile[dateLetter.getDay() - 1];
    }

    // Fonctions de navigation entre les mois
    const goToPreviousMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const goToNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    return (
        <div className=" text-white p-6 rounded-lg h-full w-full mx-auto">
            <div className="flex items-center justify-between mt-4">
                <div>
                    <h1 className="text-xl font-bold text-orange-500 dateNow">{date.toDateString()}</h1>
                </div>
                <div className="flex justify-between gap-2 ">
                    <button type='button' onClick={() => goToPreviousMonth()} className="text-gray-400 float-end relative bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 18L9 12L15 6" stroke="#121014" strokeWidth="2" strokeLinecap="round"
                                strokeLinejoin="round" />
                        </svg>
                    </button>
                    <button type='button' onClick={() => goToNextMonth()} className="text-gray-400 float-end relative bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 18L15 12L9 6" stroke="#121014" strokeWidth="2" strokeLinecap="round"
                                strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
            <div>
                <h2 className="text-sm mt-4 font-thin text-right text-stone-500 dateNow">{currentMonth}/{currentYear}</h2>
            </div>
            {view === "month" && layout === "grid" && (
                <div className={` ${isWeekView ? '' : 'border rounded-lg p-1'} grid grid-cols-7 gap-1 text-center`}>

                    <div className={` ${isWeekView ? ' gap-1' : 'border-b'} col-span-7 grid grid-cols-7`}>
                        {daysOfWeekMobile.map((day, index) => (
                            <div key={index} className={` ${isWeekView ? 'text-orange-600 font-semibold  text-right' : 'text-stone-700 font-bold text-center'} uppercase text-sm  p-2`}>
                                {day}
                            </div>
                        ))}
                    </div>
                    {
                        Array.from({ length: offset }).map((_, index) => (
                            <div key={`empty-${index}`} className="p-2   "></div>
                        ))
                    }

                    {
                        isWeekView ? Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day, index) => (

                            <div
                                key={day}
                                onClick={() => setSelectedDay(day)}
                                className={`  ${day == date.getDate() ? 'bg-gray-200 text-stone-700' : 'text-stone-700'}  flex-col rounded-full flex items-center justify-between cursor-pointer`}
                            >
                                <div className="font-thin text-xs text-right mb-2">{day}</div>
                            </div>

                        )) : Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
                            <div
                                key={day}
                                onClick={() => setSelectedDay(day)}
                                className={`${day == date.getDate() ? 'bg-gray-200 text-stone-700' : 'text-stone-800'}  flex-col border flex items-start justify-start  min-h-24 min-w-24  cursor-pointer`}
                            >
                                <div className="font-thin text-sm text-right mb-2">{day}</div>

                            </div>
                        ))
                    }

                </div>
            )}


        </div>
    );
};
export default Calendar;


