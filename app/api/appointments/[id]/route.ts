import { NextRequest, NextResponse } from "next/server"
import axios from "axios";

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = params;
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
    try {
        const config = {
            method: 'get',
            url: process.env.API_URL + 'appointment/' + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        };
        const sender = await axios(config);
        const config2 = {
            method: 'get',
            url: process.env.API_URL + 'vehicle/' + sender.data.vehicleId,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        };
        const sender2 = await axios(config2);

        const config3 = {
            method: 'get',
            url: process.env.API_URL + 'service/' + sender.data.serviceId,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        };
        const sender3 = await axios(config3);

        const responseData = {
            date: sender.data.date,
            locationType: sender.data.locationType,
            note: sender.data.note,
            serviceId: sender.data.serviceId,
            vehicleId: sender.data.vehicleId,
            status: sender.data.status,
            id: sender.data.id,
            createdBy: sender.data.createdBy,
            updatedBy: sender.data.updatedBy,
            createdAt: sender.data.createdAt,
            updatedAt: sender.data.updatedAt,
            service: sender3.data,
            vehicle: sender2.data
        }
        return new NextResponse(
            JSON.stringify(responseData), { status: 200 }
        )
    } catch (error) {
        console.log(error)
        return new NextResponse(
            JSON.stringify(error), { status: 500 }
        )
    }

}

export const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = params;
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
    const body = await req.json();
    const { date, locationType, note, serviceId, vehicleId, status } = body;
    const data = JSON.stringify({
        "date": `${date}`,
        "locationType": `${locationType}`,
        "note": `${note}`,
        "serviceId": `${serviceId}`,
        "vehicleId": `${vehicleId}`,
        "status": `${status}`,
    });

    try {
        const config = {
            method: 'get',
            url: process.env.API_URL + 'appointment/' + id,
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