import { NextRequest, NextResponse } from "next/server"
import axios from "axios";

export const GET = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
    try {
        const config = {
            method: 'get',
            url: process.env.API_URL + 'service/list',
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
    const { description, title, serviceCenterId, definition  } = body;
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
    const data = JSON.stringify({
        "title": `${title}`,
        "description": `${description}`,
        "serviceCenterId": `${serviceCenterId}`,
        "definition": `${definition}`,
    });
    console.log()
    try {   
        const config = {
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