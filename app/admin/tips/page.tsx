"use client"
import EditIcon from "@/components/Icones/EditIcon";
import TipIcon from "@/components/Icones/TipsIcon";
import TrashIcon from "@/components/Icones/TrashIcon";
import { Button } from "@/components/UI/Button";
import CardStat from "@/components/UI/CardStat";
import ProductDetailModal from "@/components/UI/ProductDetailModal";
import TipsCreateModal from "@/components/UI/TipsCreateModal";
import TipsDetailModal from "@/components/UI/TipsDetailModal";
import { useState } from "react";

export default function Page() {
    const [DataTips, setDataTips] = useState<{ label: string, description: string }[]>([
        {
            label: "Always Rotate your tires regulary",
            description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam odit in perspiciatis iste eos minus consequuntur quod quo architecto. Doloremque, fugiat labore. Dolorem iste magni id tempore dolores dignissimos excepturi!`
        },
        {
            label: "Check tire pressure monthly",
            description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam odit in perspiciatis iste eos minus consequuntur quod quo architecto. Doloremque, fugiat labore. Dolorem iste magni id tempore dolores dignissimos excepturi!`
        },
        {
            label: "Check tire pressure monthly",
            description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam odit in perspiciatis iste eos minus consequuntur quod quo architecto. Doloremque, fugiat labore. Dolorem iste magni id tempore dolores dignissimos excepturi!`
        },
        {
            label: "Check tire pressure monthly",
            description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam odit in perspiciatis iste eos minus consequuntur quod quo architecto. Doloremque, fugiat labore. Dolorem iste magni id tempore dolores dignissimos excepturi!`
        },
        {
            label: "Check tire pressure monthly",
            description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam odit in perspiciatis iste eos minus consequuntur quod quo architecto. Doloremque, fugiat labore. Dolorem iste magni id tempore dolores dignissimos excepturi!`
        },
        {
            label: "Check tire pressure monthly",
            description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam odit in perspiciatis iste eos minus consequuntur quod quo architecto. Doloremque, fugiat labore. Dolorem iste magni id tempore dolores dignissimos excepturi!`
        },
        {
            label: "Check tire pressure monthly",
            description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam odit in perspiciatis iste eos minus consequuntur quod quo architecto. Doloremque, fugiat labore. Dolorem iste magni id tempore dolores dignissimos excepturi!`
        },
        {
            label: "Check tire pressure monthly",
            description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam odit in perspiciatis iste eos minus consequuntur quod quo architecto. Doloremque, fugiat labore. Dolorem iste magni id tempore dolores dignissimos excepturi!`
        }

    ])
    const [openTipModal, setOpenTipModal] = useState<boolean>(false);
    const [openTipDetailModal, setOpenTipDetailModal] = useState<boolean>(false);
    const [tipItem, setTipItem] = useState<{ label: string, description: string }>({ label: "", description: "" })
    return (
        <>
            <div className="w-full max-w-7xl py-8 relative container px-4 ">
                <h3 className="flex gap-4  items-center ">
                    <TipIcon fill="#111111"></TipIcon>
                    <span className="font-bold">Tips</span></h3>
                <div className="grid grid-cols-4  gap-5 my-4">
                    <CardStat color={"secondary"} icon={TipIcon({ fill: "#FB7C37" })} title={"Tips"} stat={DataTips.length} ></CardStat>
                </div>
                <Button typeButton="dark" className="w-fit mb-4" label="Create Tip" onClick={() => setOpenTipModal(true)}></Button>
                <hr />
                <div>
                    <ul>
                        {
                            DataTips.map((item, index) => (
                                <li key={index} className="py-3 px-2 border-b flex items-center justify-between">
                                    {item.label}
                                    <div className="flex items-center gap-1">

                                        <button title={"Delete tip"} type="button" className="rounded-full p-2 hover:bg-red-100">
                                            <TrashIcon fill="none" stroke="#242424"></TrashIcon>
                                            <span className="hidden">Delete</span>
                                        </button>
                                        <button title={"Edit tip"} onClick={() => {setTipItem(item); setOpenTipDetailModal(true)}} type="button" className="rounded-full p-2 hover:bg-red-100">
                                            <EditIcon fill="#242424"></EditIcon>
                                            <span className="hidden">Editer</span>
                                        </button>

                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            {openTipModal ? <TipsCreateModal item={tipItem} onSubmit={function (value: { label: string, description: string }): void {
                setDataTips([...DataTips, value]); setOpenTipModal(false)
            }} onClose={setOpenTipModal} ></TipsCreateModal> : null
            }
            {openTipDetailModal ? <TipsDetailModal item={tipItem} onSubmit={function (value: { label: string, description: string }): void {
                setDataTips([...DataTips, value]); setOpenTipDetailModal(false)
            }} onClose={setOpenTipDetailModal} ></TipsDetailModal> : null
            }
        </>
    )
}

