"use client";

import Image from 'next/image'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import EyeOpenImage from "@/public/images/eye.svg"
import EyeCloseImage from "@/public/images/eye-close.svg"
import React from 'react';
import { Input } from '@/components/UI/Input';
import { Select } from '@/components/UI/Select';
// import { signIn } from 'next-auth/react';
import { Button } from '@/components/UI/Button';
// import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import LoadingIcon from '@/components/Icones/LoadingIcon';
import Loader from '@/components/UI/Loader';

export default function Page() {

    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [typePassword, setTypePassword] = useState<string>("password");
    const [code, setCode] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [openEye, setOpenEye] = useState<boolean>(true);
    const [loginWithEmail, setLoginWithEmail] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    // const params = useParams<{ callbackUrl: string }>();
    const [message, setMessage] = useState<string>("");
    const router = useRouter();

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault()
        setIsLoading(true)
        try {
            // Handle successful login (redirect, update state, etc.)
            // console.log(data)
            const signInData = await signIn('credentials', {
                username: email,
                password: password,
                redirect: false
            });
            // setIsLogging(true)
            setTimeout(() => {
                if (signInData?.error) {
                    // setIsLogging(false)
                    setMessage("Password or username is incorrect or user does not exist!")
                    console.log(signInData.error);
                } else {
                    // router.refresh(
                    // console.log(signInData)
                    router.push("/admin")
                }
            }, 2000);
            setIsLoading(false)
            // .then((e) => {
            //     console.log(e) a
            //     // router.push('/admin');
            // }).catch((err) => console.log(err));
            // router.push('/admin');
            // const res = fetch('/api/users/login', { method: "POST", body: JSON.stringify({ email: email, password: password }) })
        } catch (err) {
            console.log(err)
            // if ((err.response.data.details as string).search(email) != -1 && err.response.data.message) {
            //     localStorage.setItem('email', JSON.stringify(email));
            //     router.push('/verify-email');
            // }
            // const res = await fetch("/api/artisans/" + params.id, { cache: "no-store" })
            // if (res.ok) {
            //     const data = await res.json();
            //     setUser(data);
            // }
            setMessage("Password or username is incorrect or user does not exist!")
            setIsLoading(false)
        }
    }

    return (
        <form className="w-full p-10 m-auto bg-white rounded-md shadow-xl " onSubmit={onSubmit} style={{ maxWidth: "456px" }}>
            <Loader isLoading={isLoading} message={null}></Loader>
            <div className="space-y-12">
                <div className="pb-12 ">
                    <h2 className="text-2xl leading-7 text-gray-900">Sign In</h2>
                    <h6 className='text-xs my-2 italic text-red-400 mb-4 font-medium text-left'>{message}</h6>
                    <div className="grid grid-cols-1 gap-4 py-4 mt-4">
                        <div className="block" id="email-to-phone">
                            <label htmlFor="email" className="text-sm">Email</label>
                            <Input placeholder="Email" value={email} onChange={e => { setEmail(e.target.value); setMessage("") }} className='mt-1' name="email" id="email" type='text' ></Input>
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
                        {/* <div className="text-right">
                            <Link href="/forgot-password" className="text-sm text-orange-400">Forgot Password?</Link>
                        </div> */}
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                {/* <div className='text-center m-auto' >
                    <Link className='text-center text-xs text-orange-400 m-auto' href={"/register"}>Register</Link>
                </div> */}
                <Button disabled onClick={() => setLoginWithEmail(!loginWithEmail)} label={loginWithEmail ? "Sign In with a phone number" : "Sign In with a email"} typeButton='clear' type='button'></Button>
                <Button label="SignIn" typeButton='dark' type='submit'></Button>

                {/* <Link className='text-center m-auto' href={"/admin"}>submit</Link> */}
                {/* <Button label='Login with google' onClick={logGoogle} typeButton='dark' type='button'></Button> */}
            </div>
        </form >
    )
}