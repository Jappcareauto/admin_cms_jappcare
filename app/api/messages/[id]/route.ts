import { NextRequest, NextResponse } from "next/server"
// import { https } from "follow-redirects";
// import { AnyNaptrRecord } from "dns";
import axios from "axios";

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = params;
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
    try {
        var config = {
            method: 'delete',
            url: process.env.API_URL + 'chat-message/' + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            // data: data
        };
        const sender = await axios(config);
      
        console.log(sender.data)
        return new NextResponse(
            JSON.stringify(true), { status: 200 }
        )
    } catch (error) {
        console.log(error)
        return new NextResponse(
            JSON.stringify(error), { status: 500 }
        )
    }

}