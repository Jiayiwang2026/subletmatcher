import { NextResponse } from 'next/server';
import { getConnection } from '@/db';

export async function POST(req) {
    try {
        const body = await req.json();
        const {
            title,
            startDate,
            endDate,
            roomType,
            price,
            address,
            feature,
            contact,
            href
        } = body;

        const db = await getConnection();

        await db.execute(
            `INSERT INTO sublets (title, 转租开始时间, 转租结束时间, 房型, 价格, 地址, 特色, 联系方式, href)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [title, startDate, endDate, roomType, price, address, feature, contact, href || '#']
        );

        await db.end();
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
