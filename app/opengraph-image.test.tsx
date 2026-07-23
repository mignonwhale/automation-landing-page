import { describe, expect, it } from 'vitest'
import OpengraphImage, { contentType, size } from './opengraph-image'

describe('OpengraphImage', () => {
  it('1200x630 PNG OG 이미지 응답을 생성한다', () => {
    expect(size).toEqual({ width: 1200, height: 630 })
    expect(contentType).toBe('image/png')

    const response = OpengraphImage()
    expect(response).toBeInstanceOf(Response)
    expect(response.headers.get('content-type')).toBe('image/png')
  })
})
