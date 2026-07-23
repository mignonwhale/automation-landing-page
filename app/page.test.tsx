import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Home from './page'

describe('Home', () => {
  it('주요 섹션과 문의 폼을 표시한다', () => {
    render(<Home />)
    expect(screen.getAllByText('업무 자동화 전문가').length).toBeGreaterThan(0)
    expect(screen.getByText('반복 작업, 이제 자동화로 넘겨보세요')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('홍길동')).toBeInTheDocument()
  })
})
