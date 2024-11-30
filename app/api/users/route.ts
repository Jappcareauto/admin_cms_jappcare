import { NextResponse } from "next/server"
import axios from "axios";

export const POST = async (req: Request) => {
    const body = await req.json();
    const { username, password } = body;
    const data = JSON.stringify({
        "username": `${username}`,
        "password": `${password}`
    });
    try {
        const config = {
            method: 'post',
            url: process.env.API_URL + '/auth/login',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        const sender = await axios(config);
        return new NextResponse(
            JSON.stringify({ message: sender.data }), { status: 200 }
        )
    } catch (error) {
        return new NextResponse(
            JSON.stringify(error), { status: 500 }
        )
    }

}
