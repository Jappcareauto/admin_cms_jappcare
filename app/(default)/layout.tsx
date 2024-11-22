import AuthentificationImage from "@/public/images/authentification.svg"
import { metadata } from "@/app/layout";
import Image from 'next/image'
metadata.title = "Authentification"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
            <div className="grid text-stone-900 min-h-screen md:grid-cols-2 bg-orange-50" style={{ backgroundColor: '#FFEDE6' }}>
                <div className="flex items-center justify-center " style={{ backgroundColor: "#FB7C37" }}>
                    <Image width={500} height={500} src={AuthentificationImage.src} alt="" />
                </div>
                <div className="fixed top-0 flex items-center justify-center w-full h-full p-3 md:p-0 md:relative">
                    {children}
                </div>
            </div>  
    )
}