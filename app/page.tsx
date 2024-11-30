"use client";

import Image from 'next/image'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import EyeOpenImage from "@/public/images/eye.svg"
import EyeCloseImage from "@/public/images/eye-close.svg"
import React from 'react';
import { Input } from '@/components/UI/Input';
import { Select } from '@/components/UI/Select';    
import { Button } from '@/components/UI/Button';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import Loader from '@/components/UI/Loader';
import AuthentificationImage from "@/public/images/authentification.svg"
export default function Page() {

    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [typePassword, setTypePassword] = useState<string>("password");
    const [code, setCode] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [openEye, setOpenEye] = useState<boolean>(true);
    const [loginWithEmail, setLoginWithEmail] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<string>("");
    const router = useRouter();

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault()
        setIsLoading(true)
        try {
       
            const signInData = await signIn('credentials', {
                username: email,
                password: password,
                redirect: false
            });
     
            setTimeout(() => {
                if (signInData?.error) {
                    setMessage("Password or username is incorrect or user does not exist!")
                    console.log(signInData.error);
                } else {
                
                    router.push("/admin")
                }
            }, 2000);
            setIsLoading(false)
        
        } catch (err) {
            console.log(err)
          
            setMessage("Password or username is incorrect or user does not exist!")
            setIsLoading(false)
        }
    }

    return (
        <div className="grid text-stone-900 min-h-screen md:grid-cols-2 bg-orange-50" style={{ backgroundColor: '#FFEDE6' }}>
        <div className="flex items-center justify-center " style={{ backgroundColor: "#FB7C37" }}>
            <Image width={500} height={500} src={AuthentificationImage.src} alt="" />
        </div>
        <div className="fixed top-0 flex items-center justify-center w-full h-full p-3 md:p-0 md:relative">
            <form className="w-full p-10 m-auto bg-white rounded-md shadow-xl " onSubmit={onSubmit} style={{ maxWidth: "456px" }}>
                <Loader isLoading={isLoading} message={null}></Loader>
                <div className="space-y-12">
                    <div className="pb-12 ">
                        <h2 className="text-2xl leading-7 text-gray-900">Sign In</h2>
                        <h6 className='text-xs my-2 italic text-red-400 mb-4 font-medium text-left'>{message}</h6>
                        <div className="grid grid-cols-1 gap-4 py-4 mt-4">
                            <div className="block" id="email-to-phone">
                                <label htmlFor="email" className="text-sm">Email</label>
                                <Input placeholder="Email" value={email} onChange={e => { setEmail(e.target.value); setMessage("") }} className='mt-1' name="email" id="email" type='email' ></Input>
                            </div>
                            {
                                loginWithEmail ? "" : (
                                    <div>
                                        <label htmlFor="phone" className="text-sm">Phone</label>
                                        <div className="flex gap-2 mt-1">
                                            <div className="basis-1/4">
                                                <Select value={code} onChange={e => { setCode(e.target.value); setMessage("") }} options={[{ value: "+237", label: "+237" }]}></Select>
                                            </div>
                                            <div className="w-full basis-3/4">
                                                <Input value={phone} onChange={e => { setPhone(e.target.value); setMessage("") }} placeholder="Phone number" className='mt-1' name="phone" id="phone" type='tel' ></Input>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            <div className="block ">
                                <label htmlFor="password" className="text-sm">Password</label>
                                <div className="relative mt-1">
                                    <Input value={password} onChange={e => { setPassword(e.target.value); setMessage("") }} placeholder="Password" className='mt-1' name="password" id="password" type={typePassword} ></Input>
                                    <button type="button" onClick={() => { setOpenEye(!openEye); if (openEye) setTypePassword("text"); else setTypePassword("password") }} id="passwordButton" name="showpasswordButton"
                                        className="absolute -translate-y-1/2 top-1/2 right-2 opacity-30">
                                        <Image src={EyeOpenImage.src} width={24} height={24} className={openEye ? 'block' : 'hidden'} alt='eye-open'></Image>
                                        <Image src={EyeCloseImage.src} width={24} height={24} className={!openEye ? 'block' : 'hidden'} alt='eye-close'></Image>
                                    </button>
                                </div>
                            </div>
                        
                        </div>

                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <Button disabled onClick={() => setLoginWithEmail(!loginWithEmail)} label={loginWithEmail ? "Sign In with a phone number" : "Sign In with a email"} typeButton='clear' type='button'></Button>
                    <Button label="SignIn" typeButton='dark' type='submit'></Button>
                </div>
            </form >
        </div>
    </div>
    )
}