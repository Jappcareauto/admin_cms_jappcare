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
            url: process.env.API_URL + 'service/list',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            // data: data
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
    const { description, title, serviceCenterId, definition  } = body;
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
    var data = JSON.stringify({
        "title": `${title}`,
        "description": `${description}`,
        "serviceCenterId": `${serviceCenterId}`,
        "definition": `${definition}`,
    });
    console.log()
    try {   
        var config = {
            method: 'POST',
            url: process.env.API_URL + 'service',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            data: data
        };
        const sender = await axios(config);
        console.log(sender.data)
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