import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

// GET /api/saheli?token=xxxx — read-only case status for trusted contact
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const token = searchParams.get('token');

        if (!token) {
            return NextResponse.json({ error: 'Token required' }, { status: 400 });
        }

        const db = getDb();
        // Find case by saheli_token
        const snapshot = await db.collection('cases')
            .where('saheli_token', '==', token)
            .limit(1)
            .get();

        if (snapshot.empty) {
            return NextResponse.json({ error: 'Invalid or expired token' }, { status: 404 });
        }

        const data = snapshot.docs[0].data();

        // Return only safe public fields — never return hashes or PIN
        return NextResponse.json({
            success: true,
            case_id: data.case_ref,
            media_count: data.media_count,
            created_at: data.created_at,
            status: data.status,
            saheli_name: data.saheli_name,
        });

    } catch (err) {
        console.error('GET /api/saheli error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
