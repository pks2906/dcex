import { NextRequest } from "next/server";


export async function POST(req: NextRequest) {
    const data: {
        baseAssetMint: String;
        quoteAssetMint: String;
        qty: string;
        quote: string;
    } = await req.json();

}