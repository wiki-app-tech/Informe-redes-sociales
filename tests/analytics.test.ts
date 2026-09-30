/**
 * Unit Tests for Social Analytics 360 Logic
 */

import { describe, it, expect } from 'vitest';

function calculateEngagementRate(likes: number, comments: number, shares: number, reach: number): number {
  if (reach <= 0) return 0;
  return Number((((likes + comments + shares) / reach) * 100).toFixed(2));
}

function filterPostsByPlatform<T extends { platform: string }>(posts: T[], platform: string): T[] {
  if (platform === 'all') return posts;
  return posts.filter(p => p.platform.toLowerCase() === platform.toLowerCase());
}

describe('Social Analytics 360 Calculations', () => {
  it('calculates correct engagement rate percentage', () => {
    const rate = calculateEngagementRate(100, 20, 30, 2000);
    expect(rate).toBe(7.5);
  });

  it('handles zero reach gracefully', () => {
    const rate = calculateEngagementRate(50, 10, 5, 0);
    expect(rate).toBe(0);
  });

  it('filters posts by platform correctly', () => {
    const sample = [
      { id: '1', platform: 'instagram' },
      { id: '2', platform: 'tiktok' },
      { id: '3', platform: 'instagram' }
    ];
    const igPosts = filterPostsByPlatform(sample, 'instagram');
    expect(igPosts.length).toBe(2);
  });
});
