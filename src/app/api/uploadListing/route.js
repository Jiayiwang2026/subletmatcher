import { NextResponse } from 'next/server';
import getConnection from '@/db';

export async function POST(req) {
    try {
        const body = await req.json();
        const {
            title, startDate, endDate, roomType,
            price, address, feature, contact, href
        } = body;

        const db = await getConnection();

        await db.execute(
            `INSERT INTO sublets
             (title, startDate, endDate, roomType, price, address, feature, contact, href)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [title, startDate, endDate, roomType, price, address, feature, contact, href || '#']
        );

        await db.end();
        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Upload failed:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
