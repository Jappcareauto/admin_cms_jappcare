import { NextRequest, NextResponse } from "next/server"
import { https } from "follow-redirects";
import { AnyNaptrRecord } from "dns";
import axios from "axios";

export const POST = async (req: NextRequest) => {
    const body = await req.json();
    const { email, password, name, code, number, dateOfBirth } = body;

    var data = JSON.stringify({
        "email": `${email}`,
        "password": `${password}`,
        "name": `${name}`,
        "phone": {
            "code": `${code}`,
            "number": `${number}`
        },
        "dateOfBirth": `${dateOfBirth}`
    });

    try {
        var config = {
            method: 'post',
            url: process.env.API_URL + 'auth/register',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        const sender = await axios(config);
        console.log(sender)
        return new NextResponse(
            JSON.stringify(sender.data), { status: 200 }
        )
    } catch (error) {
        // console.log(error)
        return new NextResponse(
            JSON.stringify(error), { status: 200 }
        )
    }

}
