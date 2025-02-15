import { NextResponse } from "next/server";

export async function GET() {
    //Test Protected Route
    return NextResponse.json({ success: true, result: 'Protected Route' }, { status: 200 });
}