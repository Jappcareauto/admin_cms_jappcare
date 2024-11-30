import { NextRequest, NextResponse } from "next/server"
import axios from "axios";

export const GET = async (req: NextRequest) => {
   
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
  
    try {
        const config = {
            method: 'get',
            url: process.env.API_URL + 'vehicle/list',
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
