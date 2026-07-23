import { describe, expect, it } from 'vitest'
import robots from './robots'

describe('robots', () => {
  it('모든 크롤러를 허용하고 sitemap 위치를 안내한다', () => {
    const result = robots()
    expect(result.rules).toEqual({ userAgent: '*', allow: '/' })
    expect(result.sitemap).toBe('https://automation-landing-page.vercel.app/sitemap.xml')
  })
})
