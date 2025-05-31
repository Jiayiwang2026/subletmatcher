// src/app/api/sublets/route.js

import { NextResponse } from 'next/server';
import { getConnection } from '../../db';

export async function GET() {
    try {
        const db = await getConnection();
        const [rows] = await db.execute('SELECT * FROM sublets');
        await db.end();

        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
