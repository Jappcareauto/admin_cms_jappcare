import { NextRequest, NextResponse } from "next/server"
import axios from "axios";

export const POST = async (req: NextRequest) => {
    const body = await req.json();
    const { email, password } = body;
    
    var data = JSON.stringify({
        "email": `${email}`,
        "password": `${password}`,
        "extend": true
    });
   
    try {
        var config = {
            method: 'post',
            url:  process.env.API_URL + 'auth/login',
            headers: {
                'Content-Type': 'application/json'
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
