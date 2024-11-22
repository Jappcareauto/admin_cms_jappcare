import { NextRequest, NextResponse } from "next/server"
import { https } from "follow-redirects";
import { AnyNaptrRecord } from "dns";
import axios from "axios";

export const POST = async (req: Request) => {
    const body = await req.json();
    const { username, password } = body;
    var data = JSON.stringify({
        "username": `${username}`,
        "password": `${password}`
    });
    try {
        var config = {
            method: 'post',
            url: 'https://japcare-be.onrender.com/api/v1/auth/login',
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
