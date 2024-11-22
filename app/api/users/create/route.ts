import { NextRequest, NextResponse } from "next/server"
import axios from "axios";

export const POST = async (req: NextRequest) => {
    const body = await req.json();
    const { email, password, name, verified, role } = body;
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
    var data = JSON.stringify({
        "email": `${email}`,
        "password": `${password}`,
        "name": `${name}`,
        "verified": verified,
        "role": `${role}`,
    });

    try {
        var config = {
            method: 'post',
            url: process.env.API_URL + 'user/create',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            data: data
        };
        const sender = await axios(config);
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
