-- Database Schema Migration script for Social Analytics 360
-- Compatible with PostgreSQL 14+, Supabase, and Neon.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS & ACCOUNTS
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    avatar_url TEXT,
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS platform_connections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    platform VARCHAR(50) NOT NULL, -- instagram, tiktok, facebook, twitter, linkedin, youtube, ga4, meta_ads, google_ads
    account_handle VARCHAR(255),
    access_token TEXT NOT NULL,
    refresh_token TEXT,
    expires_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. GA4 & REALTIME METRICS
CREATE TABLE IF NOT EXISTS ga4_realtime_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    active_users INT NOT NULL DEFAULT 0,
    page_views INT NOT NULL DEFAULT 0,
    bounce_rate DECIMAL(5,2),
    top_active_pages JSONB,
    event_type VARCHAR(100),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. SOCIAL MEDIA POSTS & METRICS
CREATE TABLE IF NOT EXISTS social_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    platform VARCHAR(50) NOT NULL,
    post_external_id VARCHAR(255) UNIQUE NOT NULL,
    content TEXT,
    media_url TEXT,
    media_type VARCHAR(50), -- video, reel, story, image, text, carrousel
    published_at TIMESTAMP WITH TIME ZONE NOT NULL,
    likes_count INT DEFAULT 0,
    comments_count INT DEFAULT 0,
    shares_count INT DEFAULT 0,
    views_count INT DEFAULT 0,
    reach INT DEFAULT 0,
    impressions INT DEFAULT 0,
    engagement_rate DECIMAL(5,2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. HASHTAG MONITORING
CREATE TABLE IF NOT EXISTS hashtag_monitors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    hashtag VARCHAR(100) UNIQUE NOT NULL,
    platform VARCHAR(50) NOT NULL,
    total_posts INT DEFAULT 0,
    total_reach BIGINT DEFAULT 0,
    avg_engagement DECIMAL(5,2) DEFAULT 0.00,
    alert_threshold_posts_per_hour INT DEFAULT 50,
    alert_email VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS hashtag_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    monitor_id UUID REFERENCES hashtag_monitors(id) ON DELETE CASCADE,
    author_handle VARCHAR(255),
    post_content TEXT,
    reach INT DEFAULT 0,
    likes INT DEFAULT 0,
    posted_at TIMESTAMP WITH TIME ZONE NOT NULL
);

-- 5. INSTAGRAM LINKABLE IMAGES & LANDING PAGES
CREATE TABLE IF NOT EXISTS instagram_linkable_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ig_post_id VARCHAR(255) UNIQUE NOT NULL,
    image_url TEXT NOT NULL,
    caption TEXT,
    target_url TEXT NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    clicks_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS link_clicks_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID REFERENCES instagram_linkable_posts(id) ON DELETE CASCADE,
    referrer TEXT,
    user_agent TEXT,
    ip_hash VARCHAR(64),
    clicked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. AUTOMATED REPORTS & SCHEDULES
CREATE TABLE IF NOT EXISTS generated_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    format VARCHAR(10) NOT NULL, -- pdf, excel
    file_path TEXT NOT NULL,
    platforms_included JSONB NOT NULL,
    ai_insights TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS scheduled_report_jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recipient_email VARCHAR(255) NOT NULL,
    frequency VARCHAR(20) NOT NULL, -- daily, weekly, monthly
    platforms JSONB NOT NULL,
    next_run_at TIMESTAMP WITH TIME ZONE NOT NULL,
    is_enabled BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- INDEXES FOR FAST QUERYING
CREATE INDEX idx_social_posts_platform_pub ON social_posts(platform, published_at DESC);
CREATE INDEX idx_ga4_realtime_timestamp ON ga4_realtime_log(timestamp DESC);
CREATE INDEX idx_linkable_posts_slug ON instagram_linkable_posts(slug);
