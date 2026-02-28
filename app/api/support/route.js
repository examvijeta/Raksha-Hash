import { getDb } from "@/lib/db";

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, email, caseId, issue, message } = body;

        // Basic validation
        if (!name || !email || !issue || !message) {
            return new Response(JSON.stringify({
                success: false,
                error: "Missing required fields"
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Save to Firebase Firestore
        const db = getDb();
        await db.collection('support_requests').add({
            name,
            email,
            caseId: caseId || null,
            issue,
            message,
            status: 'pending',
            createdAt: new Date().toISOString()
        });

        console.log("Support Request Saved to Firebase:", { name, email, caseId, issue, message });

        return new Response(JSON.stringify({
            success: true,
            message: "Support request submitted successfully"
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({
            success: false,
            error: "Internal Server Error"
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
