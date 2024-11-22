import { NextRequest, NextResponse } from "next/server"
import { https } from "follow-redirects";
import { AnyNaptrRecord } from "dns";
import axios from "axios";

export const GET = async (req: NextRequest) => {
    // const body = await req.json();
    // const { email, password } = body;

    // var data = JSON.stringify({
    //     "email": `${email}`,
    //     "password": `${password}`
    // });
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
    try {
        var config = {
            method: 'get',
            url: process.env.API_URL + 'service-center/categories',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            // data: data
        };

        const sender = await axios(config);
        return new NextResponse(
            JSON.stringify(sender.data), { status: 200 }
        )
    } catch (error) {
        return new NextResponse(
            JSON.stringify(error), { status: 500 }
        )
    }

}
