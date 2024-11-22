import { NextRequest, NextResponse } from "next/server"
import { https } from "follow-redirects";
import { AnyNaptrRecord } from "dns";
import axios from "axios";

export const POST = async (req: NextRequest) => {
    const body = await req.json();
    const { code } = body;
    
    var data = JSON.stringify({
        "code": `${code}`,
    });
   
    try {
        var config = {
            method: 'post',
            url:  process.env.API_URL + 'auth/verify/'+ code,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        console.log(data)
        const sender = await axios(config);
        console.log(sender)
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
