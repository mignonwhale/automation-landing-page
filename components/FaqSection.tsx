'use client'

import { useState } from 'react'
import { FAQS } from '@/lib/constants'

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
}

export default function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <section className="border-y border-[#1E2D42] bg-[#0D1424] px-6 py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="mx-auto max-w-[680px]">
        <h2 className="mb-12 text-center text-[clamp(24px,4vw,36px)] font-extrabold tracking-[-0.02em] text-slate-100">
          자주 묻는 질문
        </h2>
        <div className="overflow-hidden rounded-2xl border border-[#243447]">
          {FAQS.map((faq, i) => (
            <div key={faq.q} className={i < FAQS.length - 1 ? 'border-b border-[#1E2D42]' : ''}>
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className={`flex w-full items-center justify-between gap-4 px-6 py-5.5 text-left transition-colors ${
                  openFaq === i ? 'bg-gray-900' : 'bg-[#0D1424]'
                }`}
              >
                <span className="text-[15px] font-semibold text-slate-100">{faq.q}</span>
                <span
                  className={`shrink-0 text-[22px] text-slate-500 transition-transform ${
                    openFaq === i ? 'rotate-45' : ''
                  }`}
                >
                  +
                </span>
              </button>
              {openFaq === i && (
                <div className="bg-gray-900 px-6 pb-5.5 pt-1">
                  <p className="m-0 text-sm leading-[1.8] text-slate-400">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
