import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(request) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

    // Prevent crash if env vars are missing during build
    if (!supabaseUrl || !supabaseKey) {
        console.warn("Supabase credentials missing. API will fail at runtime.");
    }
    const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

    try {
        const { hash, label, userId } = await request.json();

        if (!hash || hash.length !== 64) {
            return NextResponse.json(
                { error: 'Invalid hash format' },
                { status: 400 }
            );
        }

        // Insert the hash into the database
        if (!supabase) throw new Error("Supabase client not initialized.");
        const { data, error } = await supabase
            .from('hashes')
            .insert([
                {
                    hash: hash.toLowerCase(),
                    label: label || 'Protected Image',
                    user_id: userId || null
                }
            ])
            .select();

        if (error) {
            // Handle unique constraint violation (hash already registered)
            if (error.code === '23505') {
                return NextResponse.json(
                    { message: 'Hash already protected', alreadyExists: true },
                    { status: 200 }
                );
            }
            throw error;
        }

        return NextResponse.json(
            { message: 'Hash registered successfully', data },
            { status: 201 }
        );

    } catch (error) {
        console.error('Registration API Error:', error);
        return NextResponse.json(
            { error: 'Failed to register hash' },
            { status: 500 }
        );
    }
}
