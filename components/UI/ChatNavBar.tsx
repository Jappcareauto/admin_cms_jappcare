"use client"

import SearchIcon from "@/components/Icones/SearchIcon";
import { Button } from "@/components/UI/Button";
import CardMessageUser from "@/components/UI/CardMessageUser";
import Image from "next/image";
import { useEffect, useState } from "react";
import profilImage from "@/public/images/profil7.png"
import ChatRoomCreateModal from "@/components/UI/ChatRoomCreateModal";
import { useSession } from "next-auth/react";
import { UserInterface } from "@/interfaces/UserInterface";
import LoadingIcon from "../Icones/LoadingIcon";
import { changeDateForm } from "@/functions/boostrapFunctions"

interface ChatRoomInterface {
    name: string,
    participantIds: string[],
    id: string,
    createdBy: string,
    updatedBy: string,
    createdAt: string,
    updatedAt: string
}
const ChatNavBar = () => {

    const session = useSession();
    const [hiddenChat, setHiddenChat] = useState<string>("hidden")
    const [user, setUser] = useState<ChatRoomInterface>()
    const [chatRoomList, setChatRoomList] = useState<ChatRoomInterface[]>([])
    const [searchInputValue, setSearchInputValue] = useState<string>("")
    const [activedButton, setActivedButton] = useState<boolean>(true)
    const [openModalCreateChatRoom, setOpenModalCreateChatRoom] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [hiddenChatTitle, setHiddenChatTitle] = useState<string>("")
    const [discusionsUser, setDiscusionsUser] = useState<ChatRoomInterface[]>([])
    const [alertMessage, setAlertMessage] = useState<string>('')
    const [alertDetails, setAlertDetails] = useState<string>('')
    const [alertStatus, setAlertStatus] = useState<string>('')
    const [showAlert, setShowAlert] = useState<boolean>(false)
    const onFadeOut = (item: ChatRoomInterface) => {

        setUser(item);
        setHiddenChat("")
        setHiddenChatTitle("hidden")
    }
    const onFadeIn = () => {
        setHiddenChat("hidden")
        setHiddenChatTitle("")
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
    const [usersList, setUserList] = useState<UserInterface[]>([])
    const createChat = async (item: { name: string, participant: string[] }) => {
        setIsLoading(true)
        const data = {
            name: item.name,
            participantUserIds: item.participant,
            userId: session.data?.user?.id
        }
        try {
            const res = await fetch('/api/chat?token=' + session.data?.user?.accessToken, { method: 'POST', body: JSON.stringify(data) });
            const dataCreate = await res.json()
            if (res.ok) {
                getData()
                handlerAlert(true, "User", "User is adding successfully", "green")
            } else {
                handlerAlert(true, dataCreate.message, dataCreate.details, "red")
            }
        } catch (err) {
            console.log(err)
        }
        setIsLoading(false)
    }
    const getData = async () => {
        const resChatRoom = await fetch('/api/chat?token=' + session.data?.user?.accessToken);
        if (resChatRoom.ok) {
            const dataChat = await resChatRoom.json();
            setChatRoomList(dataChat);
            setDiscusionsUser(dataChat)
        }
    }
    useEffect(() => {
        const getDataAndStat = async () => {
            if (session.status == "authenticated") {
                try {
                    const res = await fetch('/api/users/list?token=' + session.data?.user?.accessToken);
                    if (res.ok) {
                        const data = await res.json();
                        setUserList(data.data);
                    }
                    const resChatRoom = await fetch('/api/chat?token=' + session.data?.user?.accessToken);
                    if (resChatRoom.ok) {
                        const dataChat = await resChatRoom.json();
                        setChatRoomList(dataChat);
                        setDiscusionsUser(dataChat)
                    }
                } catch (err) {
                    console.log(err)
                }
            }
        }

        getDataAndStat()
    }, [session])

    const onSearchUser = () => {
        setActivedButton(true)
        setDiscusionsUser(chatRoomList);
        if (searchInputValue == "") {
            setDiscusionsUser(chatRoomList)
            return
        }
        const tab: ChatRoomInterface[] = []
        discusionsUser.map((item) => {
            if (item.name.trim().toLocaleLowerCase().search(searchInputValue.toLocaleLowerCase()) != -1) {
                tab.push(item);
            }
        })
        setDiscusionsUser(tab)
    }
    const buttonAllAndUnreadHandler = () => {
        if (!activedButton) {
            setDiscusionsUser(chatRoomList)
        } else {
            const tab: ChatRoomInterface[] = []
            discusionsUser.map((item) => {
                if (item.participantIds.length.toString() != "0") {
                    tab.push(item);
                }
            })
            setDiscusionsUser(tab)
        }
    }
    return (
        <>
            <div style={{ maxWidth: 450, width: "100%" }} className="border-r min-h-screen">
                {
                    showAlert ? (
                        <div className={`p-4 w-fit min-w-96 mb-4 text-sm  rounded-lg bg-${alertStatus}-50`} role="alert">
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

                <div className={"  bg-white transition-transform  z-10 relative max-w-full col-span-2 px-8 pt-2 xl:max-w-7xl " + hiddenChat} id="chat">
                    <div className="flex gap-2 items-center font-bold">
                        <Button type="button" className="text-xs" style={{ width: "fit-content" }} onClick={onFadeIn} typeButton={"dark"} label={"Back"}></Button>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C10.3596 22 8.77516 21.6039 7.35578 20.8583L3.06538 21.9753C2.6111 22.0937 2.1469 21.8213 2.02858 21.367C1.99199 21.2266 1.99198 21.0791 2.02855 20.9386L3.1449 16.6502C2.3972 15.2294 2 13.6428 2 12C2 6.47715 6.47715 2 12 2ZM13.2517 13H8.75L8.64823 13.0068C8.28215 13.0565 8 13.3703 8 13.75C8 14.1297 8.28215 14.4435 8.64823 14.4932L8.75 14.5H13.2517L13.3535 14.4932C13.7196 14.4435 14.0017 14.1297 14.0017 13.75C14.0017 13.3703 13.7196 13.0565 13.3535 13.0068L13.2517 13ZM15.25 9.5H8.75L8.64823 9.50685C8.28215 9.55651 8 9.8703 8 10.25C8 10.6297 8.28215 10.9435 8.64823 10.9932L8.75 11H15.25L15.3518 10.9932C15.7178 10.9435 16 10.6297 16 10.25C16 9.8703 15.7178 9.55651 15.3518 9.50685L15.25 9.5Z"
                                fill="#111111" />
                        </svg>
                        Chat
                    </div>
                    <div className="w-full my-4 gap-4 rounded-2xl">
                        <Image width={72} height={72} className="rounded-full" src={profilImage} alt={""}  ></Image>
                        <h1 className="text-xl font-bold ">{user?.name}</h1>
                        <div className="flex my-4 text-orange-400 gap-4 items-center">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd"
                                    d="M17.5 9.10516C17.5 5.02781 14.0588 1.66699 10 1.66699C5.9412 1.66699 2.5 5.02781 2.5 9.10516C2.5 13.2617 6.00325 16.135 9.2275 18.1309C9.46292 18.2638 9.72917 18.3337 10 18.3337C10.2708 18.3337 10.5371 18.2638 10.7725 18.1309C14.0027 16.1542 17.5 13.2474 17.5 9.10516ZM10.0007 12.0833C11.6115 12.0833 12.9173 10.7775 12.9173 9.16667C12.9173 7.55583 11.6115 6.25 10.0007 6.25C8.38982 6.25 7.08398 7.55583 7.08398 9.16667C7.08398 10.7775 8.38982 12.0833 10.0007 12.0833Z"
                                    fill="#FB7C37" />
                            </svg>
                            <span className="text-sm">Deido, Douala</span>
                            <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="3" cy="3" r="3" fill="#111111" />
                            </svg>
                            <div className="flex items-center text-sm">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M11.439 2.87047L12.9055 5.82772C13.1055 6.23938 13.6388 6.63424 14.0888 6.70985L16.7468 7.15511C18.4466 7.44076 18.8466 8.68416 17.6217 9.91074L15.5553 11.9942C15.2053 12.3471 15.0137 13.0276 15.1219 13.5149L15.7136 16.0941C16.1802 18.1356 15.1053 18.9253 13.3138 17.8583L10.8224 16.3713C10.3725 16.1025 9.63093 16.1025 9.1726 16.3713L6.68124 17.8583C4.8981 18.9253 3.81489 18.1272 4.28151 16.0941L4.87311 13.5149C4.98142 13.0276 4.78978 12.3471 4.43981 11.9942L2.37338 9.91074C1.15685 8.68416 1.54847 7.44076 3.24828 7.15511L5.90632 6.70985C6.34794 6.63424 6.88122 6.23938 7.08119 5.82772L8.54768 2.87047C9.3476 1.26583 10.6474 1.26583 11.439 2.87047Z"
                                        fill="#FB7C37" />
                                </svg>
                                4.75
                            </div>
                            <Button typeButton={"outline"} className="w-fit rounded-full px-4" label={"View profile"}></Button>
                        </div>
                    </div>

                </div>
                <div className="relative  col-span-2 px-8 " id="serviceCenter">
                    <div className={"flex gap-2 font-bold " + hiddenChatTitle}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C10.3596 22 8.77516 21.6039 7.35578 20.8583L3.06538 21.9753C2.6111 22.0937 2.1469 21.8213 2.02858 21.367C1.99199 21.2266 1.99198 21.0791 2.02855 20.9386L3.1449 16.6502C2.3972 15.2294 2 13.6428 2 12C2 6.47715 6.47715 2 12 2ZM13.2517 13H8.75L8.64823 13.0068C8.28215 13.0565 8 13.3703 8 13.75C8 14.1297 8.28215 14.4435 8.64823 14.4932L8.75 14.5H13.2517L13.3535 14.4932C13.7196 14.4435 14.0017 14.1297 14.0017 13.75C14.0017 13.3703 13.7196 13.0565 13.3535 13.0068L13.2517 13ZM15.25 9.5H8.75L8.64823 9.50685C8.28215 9.55651 8 9.8703 8 10.25C8 10.6297 8.28215 10.9435 8.64823 10.9932L8.75 11H15.25L15.3518 10.9932C15.7178 10.9435 16 10.6297 16 10.25C16 9.8703 15.7178 9.55651 15.3518 9.50685L15.25 9.5Z"
                                fill="#111111" />
                        </svg>
                        <span>Service Center Chat</span>
                    </div>
                    <Button onClick={() => setOpenModalCreateChatRoom(true)} typeButton="dark" label="Create chat room" className='mt-4'></Button>
                    <div className="flex gap-2 mt-5 text-sm">
                        <Button style={{ width: "fit-content" }} onClick={() => { setActivedButton(true); buttonAllAndUnreadHandler() }} className="rounded-full px-4" typeButton={activedButton ? "primary" : "gray"} label={"All"} ></Button>
                        <Button style={{ width: "fit-content" }} onClick={() => { setActivedButton(false); buttonAllAndUnreadHandler() }} className="rounded-full px-4" typeButton={!activedButton ? "primary" : "gray"} label={"Unread"} ></Button>
                    </div>
                    <form className="flex items-center w-full p-2 pl-5 mt-5 bg-rose-50 rounded-full">
                        <SearchIcon fill="#C5550E" stroke="none"></SearchIcon>
                        <input type="search" value={searchInputValue} onKeyUp={onSearchUser} onChange={(e) => setSearchInputValue(e.target.value)} className="border-none w-full focus-visible:outline-none text-sm p-2 bg-inherit" placeholder="Search" />
                    </form>
                    <div className="mt-5">
                        {
                            discusionsUser ? discusionsUser.map((item) => (
                                <div key={item.id} onClick={() => { onFadeOut(item) }}>
                                    <CardMessageUser image={""} chatRoomId={item.id} userName={item.name} lastMessage={""} time={changeDateForm(item.updatedAt)} countNewMessage={item.participantIds.length.toString()}  ></CardMessageUser>
                                </div>
                            )) : (<div className=" animate-pulse  bg-gray-200 h-full min-h-28 rounded-2xl dark:bg-gray-700 w-full mb-4"></div>)
                        }
                    </div>
                </div>
            </div>
            {
                openModalCreateChatRoom ? (<ChatRoomCreateModal onClose={setOpenModalCreateChatRoom} onSubmit={createChat} users={usersList}></ChatRoomCreateModal>) : (<></>)
            }
        </>
    )
}

export default ChatNavBar