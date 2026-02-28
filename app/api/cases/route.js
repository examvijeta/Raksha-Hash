import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getDb } from '@/lib/db';

function generateCaseRef() {
    return 'RH-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

// POST /api/cases — register new case with hashes
export async function POST(request) {
    try {
        const { hashes, saheli_name } = await request.json();
        if (!hashes || !Array.isArray(hashes) || hashes.length === 0) {
            return NextResponse.json({ error: 'No hashes provided' }, { status: 400 });
        }

        const pin = String(Math.floor(1000 + Math.random() * 9000));
        const pinHash = await bcrypt.hash(pin, 10);
        const caseRef = generateCaseRef();
        // Generate a unique read-only token for Saheli
        const saheliToken = saheli_name
            ? Math.random().toString(36).substr(2, 16) + Date.now().toString(36)
            : null;
        const db = getDb();
        const now = new Date().toISOString();

        await db.collection('cases').doc(caseRef).set({
            case_ref: caseRef,
            pin_hash: pinHash,
            hashes,
            media_count: hashes.length,
            status: 'active',
            created_at: now,
            ...(saheli_name && { saheli_name, saheli_token: saheliToken }),
        });

        return NextResponse.json({
            success: true,
            case_id: caseRef,
            pin,        // one-time plain PIN — never stored
            created_at: now,
            hash_count: hashes.length,
            ...(saheliToken && { saheli_token: saheliToken }),
        });

    } catch (err) {
        console.error('POST /api/cases error:', err);
        return NextResponse.json({ error: 'Failed to register case. Check your Firebase credentials in .env.local' }, { status: 500 });
    }
}

// GET /api/cases?id=RH-XXX&pin=1234
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const caseId = searchParams.get('id');
        const pin = searchParams.get('pin');

        if (!caseId || !pin) {
            return NextResponse.json({ error: 'Case ID and PIN required' }, { status: 400 });
        }

        const db = getDb();
        const doc = await db.collection('cases').doc(caseId).get();

        if (!doc.exists || doc.data().status !== 'active') {
            return NextResponse.json({ error: 'Case not found or already deleted' }, { status: 404 });
        }

        const data = doc.data();
        const pinValid = await bcrypt.compare(pin, data.pin_hash);
        if (!pinValid) {
            return NextResponse.json({ error: 'Invalid Case ID or PIN' }, { status: 401 });
        }

        return NextResponse.json({
            success: true,
            case_id: data.case_ref,
            media_count: data.media_count,
            created_at: data.created_at,
            status: data.status,
        });

    } catch (err) {
        console.error('GET /api/cases error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
