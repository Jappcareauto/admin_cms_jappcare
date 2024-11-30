import { NextRequest, NextResponse } from "next/server"
import axios from "axios";

export const GET = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
    try {
        const config = {
            method: 'get',
            url: process.env.API_URL + 'authorities/permissions',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        };
        const sender = await axios(config);
        console.log(sender.data)
        return new NextResponse(
            JSON.stringify(sender.data), { status: 200 }
        )
    } catch (error) {
        return new NextResponse(
            JSON.stringify(error), { status: 500 }
        )
    }

}


export const POST = async (req: NextRequest) => {
    const body = await req.json();
    const { authorityType, authorities, users } = body;
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
    const data = JSON.stringify({
        "toggle": true,
        "authorityType": `${authorityType}`,
        "authorities": [`${authorities}`, "57272d6e-84f5-4034-b0a2-a0abb4f71288"],
        "users": [`${users}`],
    
    });
    try {
        const config = {
            method: 'post',
            url: process.env.API_URL + 'authorities/toggle',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            data: data
        };
        const sender = await axios(config);
        console.log(data)
        return new NextResponse(
            JSON.stringify(sender.data), { status: 200 }
        )
    } catch (error) {
        console.log(error)
        return new NextResponse(
            JSON.stringify(error), { status: 500 }
        )
    }

}