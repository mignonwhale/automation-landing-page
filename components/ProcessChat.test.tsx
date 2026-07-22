import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ProcessChat from './ProcessChat'
import { CHAT } from '@/lib/constants'

describe('ProcessChat', () => {
  it('모든 대화 메시지를 순서대로 표시한다', () => {
    render(<ProcessChat />)
    for (const msg of CHAT) {
      expect(screen.getByText(msg.text)).toBeInTheDocument()
    }
  })
})
