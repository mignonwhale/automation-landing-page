import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import ProblemSection from '@/components/ProblemSection'
import SolutionSection from '@/components/SolutionSection'
import ServiceGrid from '@/components/ServiceGrid'
import CareerSection from '@/components/CareerSection'
import ProcessChat from '@/components/ProcessChat'
import PricingSection from '@/components/PricingSection'
import FaqSection from '@/components/FaqSection'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <ServiceGrid />
      <CareerSection />
      <ProcessChat />
      <PricingSection />
      <FaqSection />
      <section id="contact" className="bg-[#080D16] px-6 py-20">
        <div className="mx-auto max-w-[560px]">
          <h2 className="mb-3 text-center text-[clamp(24px,4vw,38px)] font-black tracking-[-0.02em] text-slate-100">
            반복 작업, 이제 자동화로 넘겨보세요
          </h2>
          <p className="mb-10 text-center text-[15px] leading-[1.75] text-slate-400">
            간단한 작업도 3만원부터 시작합니다.
            <br />
            어떤 업무인지 알려주시면 가능 여부와 대략적인 견적을 안내해드려요.
          </p>
          <ContactForm />
        </div>
      </section>
      <Footer />
    </>
  )
}
