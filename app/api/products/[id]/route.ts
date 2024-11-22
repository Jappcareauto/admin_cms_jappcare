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
            method: 'get',
            url: process.env.API_URL + 'products/' + id,
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
        console.log(error)
        return new NextResponse(
            JSON.stringify(error), { status: 500 }
        )
    }

}

// import { NextResponse } from "next/server"
// import { prisma } from "@/utils/connect";


// export const GET = async (req: Request, { params }: { params: { id: string } }) => {
//     const { id } = params;
//     try {
//         const artisans = await prisma.artisan.findUnique({ where: { id: id }, include: { offres: true } });
//         return new NextResponse(JSON.stringify(artisans), { status: 200 });
//     } catch (error) {
//         return new NextResponse(
//             JSON.stringify({ message: error }), { status: 500 }
//         )
//     }
// }


export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
    const { id } = params;
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
    try {
        var config = {
            method: 'delete',
            url: process.env.API_URL + 'products/' + id,
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
        console.log(error)
        return new NextResponse(
            JSON.stringify(error), { status: 500 }
        )
    }

}

// export const PUT = async (req: Request, { params }: { params: { id: string } }) => {
//     const { id } = params;
//     const body = await req.json();
//     const { nom, prenom, adresse, telephone } = body;

//     try {
//         const artisan = await prisma.artisan.update({
//             where: { id: id },
//             data: {
//                 nom: nom,
//                 prenom: prenom,
//                 adresse: adresse,
//                 telephone: telephone,
//             }
//         });
//         return new NextResponse(JSON.stringify(artisan), { status: 200 });
//     } catch (error) {
//         console.log(error);
//         return new NextResponse(
//             JSON.stringify(null), { status: 500 }
//         )
//     }
// }


