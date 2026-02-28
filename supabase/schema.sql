-- Raksha Hash Supabase Schema

-- 1. Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Hashes Table
CREATE TABLE hashes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    hash TEXT NOT NULL UNIQUE, -- PDQ 256-bit hash (64 hex chars)
    label TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Alerts Table
CREATE TABLE alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hash_id UUID REFERENCES hashes(id) ON DELETE CASCADE,
    platform TEXT, -- e.g., "Instagram", "Facebook"
    detected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status TEXT DEFAULT 'blocked'
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE hashes ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can only see themselves" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can only manage their own hashes" ON hashes
    USING (auth.uid() = user_id);

CREATE POLICY "Users can only see their own alerts" ON alerts
    FOR SELECT USING (
        hash_id IN (SELECT id FROM hashes WHERE user_id = auth.uid())
    );
