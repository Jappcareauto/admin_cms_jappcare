import { signOut } from "next-auth/react";
import Link from "next/link"
import { usePathname } from "next/navigation";
import UserIcon from "../Icones/UserIcon";

const NavbarManager = () => {
    const pathname = usePathname()
    const logOut = async     ()  => {
        await signOut({
            redirect: true,
            callbackUrl: "/auth/signin",
        });
    }
    const activedLink = (str: string) => {
        if (pathname === str) {
            return "flex items-center gap-4 p-4 my-2 transition-all rounded-md max-md:flex max-md:justify-center max-md:p-2 hover:bg-orange-400 hover:text-white li-nav-bar-fill bg-rose-100/70"
        }else{
            return "flex items-center gap-4 p-4 my-2 rounded-md hover:bg-rose-100/70"
        }
    }
    const activedIcon = (str: string) => {
        if (pathname === str) {
            return "#FB7C37"
        }else{
            return "#242424"
        }
    }
    return (
        <nav style={{ width: "270px" }}
            className=" w-96 flex flex-col justify-between bg-white h-full min-h-screen gap-8 px-4 py-20 border-r max-md:hidden border-stone-300">
            <div>
                <div className="font-bold text-lg">Good Morning</div>
                <div
                    className="flex my-5 items-center w-full gap-4 p-3 px-4 border max-md:p-0 max-md:rounded-full rounded-2xl">
                    <span className="text-sm font-bold max-md:hidden">manager</span>
                </div>
                <ul>
                    <Link href={"/service_center"}  >
                        <li 
                            className={activedLink("/service_center")}>

                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd"
                                    d="M2.35137 13.2134L2.35139 13.2135L2.65243 15.1724L2.65244 15.1725C3.15287 18.4289 3.4031 20.0572 4.571 21.0286C5.39295 21.7123 6.48213 21.9148 8.24564 21.9748L8.00063 18.5445C7.83487 16.2239 9.67286 14.25 11.9993 14.25C14.3259 14.25 16.1638 16.2239 15.9981 18.5445L15.753 21.9748C17.5173 21.9149 18.6068 21.7124 19.429 21.0286C20.5969 20.0572 20.8472 18.4289 21.3476 15.1724L21.6486 13.2135C22.0017 10.9162 22.1782 9.76763 21.7439 8.74938C21.3096 7.73117 20.3461 7.03449 18.4191 5.64125L18.4189 5.64106L16.979 4.6L16.9787 4.59979C14.5816 2.8666 13.383 2 12 2C10.617 2 9.41829 2.86667 7.02099 4.6L5.58114 5.64106C3.65403 7.03443 2.69047 7.73112 2.25617 8.74938C1.82187 9.76761 1.99836 10.9162 2.35137 13.2134ZM14.2493 21.9985C14.2493 21.9813 14.25 21.964 14.2512 21.9466L14.5019 18.4377C14.6056 16.9853 13.4553 15.75 11.9993 15.75C10.5434 15.75 9.39308 16.9853 9.49682 18.4377L9.74745 21.9466C9.74869 21.964 9.74933 21.9813 9.74938 21.9985C10.0986 22 10.4686 22 10.8612 22H13.1388C13.5309 22 13.9004 22 14.2493 21.9985Z"
                                    fill={activedIcon("/service_center")} />
                            </svg>
                            <span className="block text-sm max-md:hidden">Dashboard</span>
                        </li>
                    </Link>
                  
                    <Link href="/service_center/appointments">
                        <li className={activedLink("/service_center/appointments")}>

                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 2V4M6 2V4" stroke={activedIcon("/service_center/appointments")} strokeWidth="1.5" strokeLinecap="round"
                                    strokeLinejoin="round" />
                                <path
                                    d="M12.9917 2.5H11.0083C9.02839 2.49999 7.48726 2.49999 6.28725 2.67441C5.06018 2.85276 4.11749 3.22232 3.38507 4.01412C2.65778 4.80038 2.32291 5.80313 2.16034 7.11036C2.15461 7.15643 2.14908 7.20298 2.14375 7.25H21.8562C21.8509 7.20298 21.8454 7.15643 21.8397 7.11036C21.6771 5.80313 21.3422 4.80038 20.615 4.01412C19.8825 3.22231 18.9398 2.85275 17.7128 2.6744C16.5127 2.49999 14.9716 2.49999 12.9917 2.5Z"
                                    fill={activedIcon("/service_center/appointments")} />
                                <path fillRule="evenodd" clipRule="evenodd"
                                    d="M2 12.2069C2 10.8766 1.99999 9.73365 2.03809 8.75H21.9619C22 9.73365 22 10.8765 22 12.2069V12.7931C22 14.941 22 16.6003 21.8397 17.8897C21.6771 19.1969 21.3422 20.1996 20.615 20.9859C19.8825 21.7777 18.9398 22.1473 17.7128 22.3256C16.5127 22.5 14.9716 22.5 12.9917 22.5H11.0083C9.02837 22.5 7.48726 22.5 6.28725 22.3256C5.06019 22.1473 4.1175 21.7777 3.38508 20.9859C2.65779 20.1996 2.32291 19.1969 2.16034 17.8897C1.99999 16.6003 2 14.941 2 12.7931V12.2069ZM7.2 12C6.53726 12 6 12.5223 6 13.1667C6 13.811 6.53726 14.3333 7.2 14.3333H7.21076C7.87351 14.3333 8.41076 13.811 8.41076 13.1667C8.41076 12.5223 7.87351 12 7.21076 12H7.2ZM11.9946 12C11.3319 12 10.7946 12.5223 10.7946 13.1667C10.7946 13.811 11.3319 14.3333 11.9946 14.3333H12.0054C12.6681 14.3333 13.2054 13.811 13.2054 13.1667C13.2054 12.5223 12.6681 12 12.0054 12H11.9946ZM16.7892 12C16.1265 12 15.5892 12.5223 15.5892 13.1667C15.5892 13.811 16.1265 14.3333 16.7892 14.3333H16.8C17.4627 14.3333 18 13.811 18 13.1667C18 12.5223 17.4627 12 16.8 12H16.7892ZM7.2 16.6667C6.53726 16.6667 6 17.189 6 17.8333C6 18.4777 6.53726 19 7.2 19H7.21076C7.87351 19 8.41076 18.4777 8.41076 17.8333C8.41076 17.189 7.87351 16.6667 7.21076 16.6667H7.2ZM11.9946 16.6667C11.3319 16.6667 10.7946 17.189 10.7946 17.8333C10.7946 18.4777 11.3319 19 11.9946 19H12.0054C12.6681 19 13.2054 18.4777 13.2054 17.8333C13.2054 17.189 12.6681 16.6667 12.0054 16.6667H11.9946Z"
                                    fill={activedIcon("/service_center/appointments")} />
                            </svg>
                            <span className="block text-sm max-md:hidden">Appointments</span>
                        </li>
                    </Link>
                    <Link href={"/service_center/emergency"}>
                        <li className={activedLink("/service_center/emergency")}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 2V4M6 2V4" stroke={activedIcon("/service_center/emergency")} strokeWidth="1.5" strokeLinecap="round"
                                    strokeLinejoin="round" />
                                <path
                                    d="M12.9917 2.5H11.0083C9.02839 2.49999 7.48726 2.49999 6.28725 2.67441C5.06018 2.85276 4.11749 3.22232 3.38507 4.01412C2.65778 4.80038 2.32291 5.80313 2.16034 7.11036C2.15461 7.15643 2.14908 7.20298 2.14375 7.25H21.8562C21.8509 7.20298 21.8454 7.15643 21.8397 7.11036C21.6771 5.80313 21.3422 4.80038 20.615 4.01412C19.8825 3.22231 18.9398 2.85275 17.7128 2.6744C16.5127 2.49999 14.9716 2.49999 12.9917 2.5Z"
                                    fill={activedIcon("/service_center/emergency")} />
                                <path fillRule="evenodd" clipRule="evenodd"
                                    d="M2 12.2069C2 10.8766 1.99999 9.73365 2.03809 8.75H21.9619C22 9.73365 22 10.8765 22 12.2069V12.7931C22 14.941 22 16.6003 21.8397 17.8897C21.6771 19.1969 21.3422 20.1996 20.615 20.9859C19.8825 21.7777 18.9398 22.1473 17.7128 22.3256C16.5127 22.5 14.9716 22.5 12.9917 22.5H11.0083C9.02837 22.5 7.48726 22.5 6.28725 22.3256C5.06019 22.1473 4.1175 21.7777 3.38508 20.9859C2.65779 20.1996 2.32291 19.1969 2.16034 17.8897C1.99999 16.6003 2 14.941 2 12.7931V12.2069ZM7.2 12C6.53726 12 6 12.5223 6 13.1667C6 13.811 6.53726 14.3333 7.2 14.3333H7.21076C7.87351 14.3333 8.41076 13.811 8.41076 13.1667C8.41076 12.5223 7.87351 12 7.21076 12H7.2ZM11.9946 12C11.3319 12 10.7946 12.5223 10.7946 13.1667C10.7946 13.811 11.3319 14.3333 11.9946 14.3333H12.0054C12.6681 14.3333 13.2054 13.811 13.2054 13.1667C13.2054 12.5223 12.6681 12 12.0054 12H11.9946ZM16.7892 12C16.1265 12 15.5892 12.5223 15.5892 13.1667C15.5892 13.811 16.1265 14.3333 16.7892 14.3333H16.8C17.4627 14.3333 18 13.811 18 13.1667C18 12.5223 17.4627 12 16.8 12H16.7892ZM7.2 16.6667C6.53726 16.6667 6 17.189 6 17.8333C6 18.4777 6.53726 19 7.2 19H7.21076C7.87351 19 8.41076 18.4777 8.41076 17.8333C8.41076 17.189 7.87351 16.6667 7.21076 16.6667H7.2ZM11.9946 16.6667C11.3319 16.6667 10.7946 17.189 10.7946 17.8333C10.7946 18.4777 11.3319 19 11.9946 19H12.0054C12.6681 19 13.2054 18.4777 13.2054 17.8333C13.2054 17.189 12.6681 16.6667 12.0054 16.6667H11.9946Z"
                                    fill={activedIcon("/service_center/emergency")} />
                            </svg>
                            <span className="block text-sm max-md:hidden">Emergency Assitance</span>
                        </li>
                    </Link>

                    <Link href="/service_center/chat">
                        <li className={activedLink("/service_center/chat")}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C10.3596 22 8.77516 21.6039 7.35578 20.8583L3.06538 21.9753C2.6111 22.0937 2.1469 21.8213 2.02858 21.367C1.99199 21.2266 1.99198 21.0791 2.02855 20.9386L3.1449 16.6502C2.3972 15.2294 2 13.6428 2 12C2 6.47715 6.47715 2 12 2ZM13.2517 13H8.75L8.64823 13.0068C8.28215 13.0565 8 13.3703 8 13.75C8 14.1297 8.28215 14.4435 8.64823 14.4932L8.75 14.5H13.2517L13.3535 14.4932C13.7196 14.4435 14.0017 14.1297 14.0017 13.75C14.0017 13.3703 13.7196 13.0565 13.3535 13.0068L13.2517 13ZM15.25 9.5H8.75L8.64823 9.50685C8.28215 9.55651 8 9.8703 8 10.25C8 10.6297 8.28215 10.9435 8.64823 10.9932L8.75 11H15.25L15.3518 10.9932C15.7178 10.9435 16 10.6297 16 10.25C16 9.8703 15.7178 9.55651 15.3518 9.50685L15.25 9.5Z"
                                    fill={activedIcon("/service_center/chat")} />
                            </svg>
                            <span className="block text-sm max-md:hidden">Chat</span>
                        </li>
                    </Link>
                     
                    <Link href={"/service_center/invoice"}>
                        <li className={activedLink("/service_center/invoice")}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M10.25 4.25C10.6642 4.25 11 4.58579 11 5V13H19C19.3797 13 19.6935 13.2822 19.7432 13.6482L19.75 13.75C19.75 18.7206 15.7206 22.25 10.75 22.25C5.77944 22.25 1.75 18.2206 1.75 13.25C1.75 8.27944 5.27944 4.25 10.25 4.25ZM13.25 1.75C18.2206 1.75 22.25 5.77944 22.25 10.75C22.25 11.1642 21.9142 11.5 21.5 11.5H13.25C12.8358 11.5 12.5 11.1642 12.5 10.75V2.5C12.5 2.08579 12.8358 1.75 13.25 1.75Z"
                                    fill={activedIcon("/service_center/invoice")} />
                            </svg>
                            <span className="block text-sm max-md:hidden">Invoice</span>
                        </li>
                    </Link>
                    <Link href={"/service_center/statistics"}>
                        <li className={activedLink("/service_center/statistics")}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M10.25 4.25C10.6642 4.25 11 4.58579 11 5V13H19C19.3797 13 19.6935 13.2822 19.7432 13.6482L19.75 13.75C19.75 18.7206 15.7206 22.25 10.75 22.25C5.77944 22.25 1.75 18.2206 1.75 13.25C1.75 8.27944 5.27944 4.25 10.25 4.25ZM13.25 1.75C18.2206 1.75 22.25 5.77944 22.25 10.75C22.25 11.1642 21.9142 11.5 21.5 11.5H13.25C12.8358 11.5 12.5 11.1642 12.5 10.75V2.5C12.5 2.08579 12.8358 1.75 13.25 1.75Z"
                                    fill={activedIcon("/service_center/statistics")} />
                            </svg>
                            <span className="block text-sm max-md:hidden">Statistics</span>
                        </li>
                    </Link>
                    <Link href={"/service_center/profile"}>
                        <li className={activedLink("/service_center/profile")}>
                            <UserIcon fill={activedIcon("/service_center/profile")}></UserIcon>
                            <span className="block text-sm max-md:hidden">Profile</span>
                        </li>
                    </Link>
              
                </ul>
            </div>
            <button onClick={logOut}
                className="flex items-center gap-4 p-4 my-2 text-red-600 transition-all rounded-md hover:text-white li-nav-bar-stroke hover:bg-red-600">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M14 3.09502C13.543 3.03241 13.0755 3 12.6 3C7.29807 3 3 7.02944 3 12C3 16.9706 7.29807 21 12.6 21C13.0755 21 13.543 20.9676 14 20.905"
                        stroke="#F1351B" strokeWidth="1.5" strokeLinecap="round" />
                    <path
                        d="M21 12H11M21 12C21 11.2998 19.0057 9.99153 18.5 9.5M21 12C21 12.7002 19.0057 14.0085 18.5 14.5"
                        stroke="#F1351B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="block text-sm max-md:hidden">Log Out</span>
            </button>
        </nav>)
}

export default NavbarManager