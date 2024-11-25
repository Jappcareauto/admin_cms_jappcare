import { NextRequest, NextResponse } from "next/server"
import axios from "axios";

export const POST = async (req: NextRequest) => {
    const body = await req.json();
    const { ownerId, latitude, name, longitude, description, category  } = body;
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
    var data = JSON.stringify({
        "name": `${name}`,
        "ownerId": `${ownerId}`,
        "location": {
          "latitude": latitude,
          "longitude": longitude,
          "description":  `${description}`,
        },
        "category": `${category}`,
    });
    console.log()
    try {   
        var config = {
            method: 'POST',
            url: process.env.API_URL + 'service-center',
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

export const GET = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
    try {
        var config = {
            method: 'get',
            url: process.env.API_URL + 'service-center',
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
