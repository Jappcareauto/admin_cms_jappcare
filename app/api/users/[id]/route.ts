import { NextRequest, NextResponse } from "next/server"
import axios from "axios";

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = params;
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
    try {
        const config = {
            method: 'GET',
            url:  process.env.API_URL + 'user/by-id/' + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
          
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
