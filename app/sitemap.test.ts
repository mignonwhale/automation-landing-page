import { describe, expect, it } from 'vitest'
import sitemap from './sitemap'
import { SITE_URL } from '@/lib/constants'

describe('sitemap', () => {
  it('사이트 루트 URL을 포함한다', () => {
    const result = sitemap()
    expect(result).toHaveLength(1)
    expect(result[0].url).toBe(SITE_URL)
    expect(result[0].changeFrequency).toBe('monthly')
  })
})
