"use client";

import { Button } from "@/components/UI/Button";
import ListCategoriesService from "@/components/UI/ListCategoriesService";
// import MapComponent from "@/components/UI/Map";
import { UserInterface } from "@/interfaces/UserInterface";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

export default function Page() {
    const session = useSession();
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
        async function getProfileUser() {
            try {
                if (session.data) {
                    if (session?.data?.user) {
                        const res = await fetch(`/api/users/${session?.data?.user.id}?token=${session?.data?.user.name}`);
                        if (res.ok) {
                            const data = await res.json();
                            setUser(data);
                        }
                    }
                }
            } catch (err) {
                console.log(err)
            }
        }
        getProfileUser()
    }, [])
    const setLatitude = (e: number) => {
        console.log(e)
    }
    const setLongitude = (e: number) => {
        console.log(e)
    }

    const Map = useMemo(() => dynamic(
        () => import('@/components/UI/Map'),
        {
            loading: () => <p>A map is loading</p>,
            ssr: false
        }
    ), [])
    const getData = async () => {

        try {
            if (session.data) {
                if (session?.data?.user) {
                    const resAppointment = await fetch(`/api/authorities?token=${session?.data?.user.accessToken}`);
                    if (resAppointment.ok) {
                        const data = await resAppointment.json();
                        console.log(data)
                        // setNoAppointment(true)
                    } else {
                       
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
    const postData = async () => {

        const data = {
            "toggle": true,
            "authorityType": "ROLE_GARAGE_MANAGER",
            "authorities": "eb3914b3-6025-4ca3-9d2b-2d766d129e17",
            "users": `${session.data?.user.id}`,
        }
        try {
            if (session.data) {
                if (session?.data?.user) {
                    const res = await fetch(`/api/authorities?token=${session?.data?.user.accessToken}`, { method: 'POST', body: JSON.stringify(data) });
                    const dataCreate = await res.json()
                    if (res.ok) {
                        console.log(dataCreate)
                    } else {
                        // handlerAlert(true, dataCreate.message, dataCreate.details, "red")
                    }
                }
            }
        } catch (err) {
            console.log(err)
            // handlerAlert(true, "err.message", "err.details", "red")
        }
    }
    return (
        <section className="w-full py-8 relative container px-4  bg-white" >
            <title>Japcare Admin | Profile</title>
            <div className="flex items-start w-full gap-4 mt-4 rounded-2xl">
                <img width="72" height="72" className="rounded-full"
                    src={user.profileImageUrl} alt="" />
            </div>
            <div className="mt-4">
                <h1 className="text-xl font-bold">{user.name}</h1>
                <div className="flex items-center justify-between gap-4 text-orange-500 ">
                    <div className="flex items-center justify-between gap-8">
                        <div className="flex items-center">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd"
                                    d="M17.5 9.10516C17.5 5.02781 14.0588 1.66699 10 1.66699C5.9412 1.66699 2.5 5.02781 2.5 9.10516C2.5 13.2617 6.00325 16.135 9.2275 18.1309C9.46292 18.2638 9.72917 18.3337 10 18.3337C10.2708 18.3337 10.5371 18.2638 10.7725 18.1309C14.0027 16.1542 17.5 13.2474 17.5 9.10516ZM10.0007 12.0833C11.6115 12.0833 12.9173 10.7775 12.9173 9.16667C12.9173 7.55583 11.6115 6.25 10.0007 6.25C8.38982 6.25 7.08398 7.55583 7.08398 9.16667C7.08398 10.7775 8.38982 12.0833 10.0007 12.0833Z"
                                    fill="#FB7C37" />
                            </svg>
                            <span>
                                {/* //Address */} No Location
                            </span>
                        </div>

                    </div>
                    <Button onClick={() => postData()} typeButton="outline" className="rounded-full w-fit" label="Edit profile" type="button"></Button>
                </div>

            </div>
            <div>
                <p className="my-4 text-sm max-w-96">
                    {/* Experience top-notch service at Japtech Auto shop, where we offer a wide range of basic car
                    services to keep your vehicle running smoothly. */}
                    No description
                </p>
            </div>
            <h1 className="text-xl font-bold">Gallery</h1>
            <div className="flex w-full gap-2 mt-4 overflow-hidden">
                {/* <div className=" animate-pulse  bg-gray-200 h-52  rounded-2xl dark:bg-gray-700 w-full  mb-4"></div> */}
                No Gallery
            </div>
            <h1 className="mt-8  text-xl font-bold">Specialized Services</h1>
            <div>
                <ListCategoriesService itemActived={() => { }}></ListCategoriesService>
            </div>
            {
                user.location ? (
                    <div className="w-full p-4 mt-8 overflow-hidden  rounded-xl " >
                        <Map isDraggable={false} latitude={setLatitude} positionInit={{ lat: user.location?.latitude, lng: user.location?.longitude }} longitude={setLongitude} posix={[51.505, -0.09]} />
                    </div>
                ) : null
            }
        </section>
    )
}