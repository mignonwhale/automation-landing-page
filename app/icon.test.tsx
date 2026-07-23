import { describe, expect, it } from 'vitest'
import Icon, { contentType, size } from './icon'

describe('Icon', () => {
  it('32x32 PNG 파비콘 응답을 생성한다', () => {
    expect(size).toEqual({ width: 32, height: 32 })
    expect(contentType).toBe('image/png')

    const response = Icon()
    expect(response).toBeInstanceOf(Response)
    expect(response.headers.get('content-type')).toBe('image/png')
  })
})
