import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getDb } from '@/lib/db';

// DELETE /api/cases/delete
export async function DELETE(request) {
    try {
        const { case_id, pin } = await request.json();
        if (!case_id || !pin) {
            return NextResponse.json({ error: 'Case ID and PIN required' }, { status: 400 });
        }

        const db = getDb();
        const doc = await db.collection('cases').doc(case_id).get();

        if (!doc.exists) {
            return NextResponse.json({ error: 'Case not found' }, { status: 404 });
        }

        const data = doc.data();
        if (data.status === 'deleted') {
            return NextResponse.json({ error: 'Case already deleted' }, { status: 410 });
        }

        const pinValid = await bcrypt.compare(String(pin), data.pin_hash);
        if (!pinValid) {
            return NextResponse.json({ error: 'Invalid PIN' }, { status: 401 });
        }

        // Soft delete — clear hashes, mark deleted
        await db.collection('cases').doc(case_id).update({
            status: 'deleted',
            hashes: [],
            deleted_at: new Date().toISOString(),
        });

        return NextResponse.json({ success: true, message: 'Case deleted. All hashes permanently removed.' });

    } catch (err) {
        console.error('DELETE /api/cases/delete error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
