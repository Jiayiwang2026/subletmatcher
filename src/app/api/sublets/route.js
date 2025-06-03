// src/app/api/sublets/route.js

import { NextResponse } from 'next/server';
import pool from '../../db';

export async function GET() {
    try {
        const [rows] = await pool.execute('SELECT * FROM sublets');
        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
