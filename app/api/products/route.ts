import { NextRequest, NextResponse } from "next/server"
import axios from "axios";

export const POST = async (req: NextRequest) => {
    const body = await req.json();
    const { description, amount, name, stockQuantity, active } = body;
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
    var data = JSON.stringify({
        "name": `${name}`,
        "description": `${description}`,
        "price": {
            "amount": amount,
            "currency": "XAF"
        },
        "stockQuantity": stockQuantity,
        "active": `${active}`,
    });

    try {   
        var config = {
            method: 'post',
            url: process.env.API_URL + 'products',
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
