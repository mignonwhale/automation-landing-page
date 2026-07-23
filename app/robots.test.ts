import { describe, expect, it } from 'vitest'
import robots from './robots'
import { SITE_URL } from '@/lib/constants'

describe('robots', () => {
  it('모든 크롤러를 허용하고 sitemap 위치를 안내한다', () => {
    const result = robots()
    expect(result.rules).toEqual({ userAgent: '*', allow: '/' })
    expect(result.sitemap).toBe(`${SITE_URL}/sitemap.xml`)
  })
})
