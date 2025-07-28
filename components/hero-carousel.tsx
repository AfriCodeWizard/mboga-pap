"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CarouselProps {
  language: "en" | "sw"
}

const slides = {
  en: [
    {
      id: 1,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-kindelmedia-6994261.jpg-GEJDAzGSxqLO3Z450KLV8uIyuS43n9.jpeg",
      title: "Fresh Groceries Delivered",
      subtitle: "Get farm-fresh vegetables delivered to your doorstep",
      description:
        "Supporting local vendors while bringing you the freshest produce from trusted mamambogas across Nairobi.",
      ctaText: "Order Now",
      ctaLink: "/signup",
    },
    {
      id: 2,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-emma-photography-88955769-27731041.jpg-cTMFXTwOLxK5jVZfkfibYjGblAMBSz.jpeg",
      title: "Trusted Bodaboda Riders",
      subtitle: "Fast & reliable delivery by local heroes",
      description:
        "Our experienced riders ensure your groceries arrive fresh and on time, supporting the local community.",
      ctaText: "Join as Rider",
      ctaLink: "/rider-signup",
    },
    {
      id: 3,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-cenali-2733918.jpg-GulJ1zlMzVevJVf2XsTcXJDCnbsTLu.jpeg",
      title: "Quality Fresh Produce",
      subtitle: "Handpicked vegetables from local markets",
      description: "Browse through a wide selection of fresh, quality vegetables sourced directly from local vendors.",
      ctaText: "Shop Now",
      ctaLink: "/signup",
    },
  ],
  sw: [
    {
      id: 1,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-kindelmedia-6994261.jpg-GEJDAzGSxqLO3Z450KLV8uIyuS43n9.jpeg",
      title: "Mboga Safi Zinapoletwa",
      subtitle: "Pata mboga safi kutoka shambani hadi mlangoni mwako",
      description:
        "Tunasaidia wachuuzi wa mitaani wakati tunakupatia mboga safi kutoka kwa mamambogas wanaoaminika Nairobi.",
      ctaText: "Agiza Sasa",
      ctaLink: "/signup",
    },
    {
      id: 2,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-emma-photography-88955769-27731041.jpg-cTMFXTwOLxK5jVZfkfibYjGblAMBSz.jpeg",
      title: "Madereva wa Bodaboda Wanaoaminika",
      subtitle: "Utoaji wa haraka na wa kuaminika na mashujaa wa mitaani",
      description:
        "Madereva wetu wenye uzoefu wanahakikisha mboga zako zinafika safi na kwa wakati, wakisaidia jamii ya mitaani.",
      ctaText: "Jiunge kama Dereva",
      ctaLink: "/rider-signup",
    },
    {
      id: 3,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-cenali-2733918.jpg-GulJ1zlMzVevJVf2XsTcXJDCnbsTLu.jpeg",
      title: "Mboga za Ubora wa Juu",
      subtitle: "Mboga zilizochaguliwa kwa makini kutoka masoko ya mitaani",
      description:
        "Vinjari kupitia uteuzi mkubwa wa mboga safi za ubora zilizotoka moja kwa moja kwa wachuuzi wa mitaani.",
      ctaText: "Nunua Sasa",
      ctaLink: "/signup",
    },
  ],
}

export default function HeroCarousel({ language }: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const currentSlides = slides[language]

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % currentSlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, currentSlides.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + currentSlides.length) % currentSlides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % currentSlides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  return (
    <section className="relative w-full h-[500px] md:h-[calc(100vh-64px)] overflow-hidden">
      {" "}
      {/* Adjusted height for responsiveness */}
      {/* Slides Container */}
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {currentSlides.map((slide, index) => (
          <div key={slide.id} className="relative w-full h-full flex-shrink-0">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={slide.image || "/placeholder.svg"}
                alt={slide.title}
                className="w-full h-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
              {" "}
              {/* Centered content */}
              <div className="max-w-2xl text-white">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight drop-shadow-2xl text-white">
                  {slide.title}
                </h1>

                <div className="flex items-center justify-center gap-3 mb-6">
                  <span className="hidden sm:inline-block flex-1 border-t-2 border-dashed border-white/70"></span>
                  <h2 className="inline-block bg-[color:var(--color-accent)] text-[color:var(--color-primary)] font-bold text-base md:text-lg lg:text-xl px-3 py-1 rounded-md whitespace-nowrap shadow-md">
                  {slide.subtitle}
                </h2>
                  <span className="hidden sm:inline-block flex-1 border-t-2 border-dashed border-white/70"></span>
                </div>

                <p className="text-base md:text-lg mb-8 text-gray-200 leading-relaxed max-w-xl drop-shadow-md mx-auto">
                  {" "}
                  {/* Added mx-auto for centering */}
                  {slide.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {" "}
                  {/* Centered buttons */}
                  <Button
                    size="lg"
                    className="bg-[color:var(--color-accent)] text-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)] hover:text-[color:var(--color-accent)] px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl transform hover:scale-105 border-2 border-[color:var(--color-primary)]/30 transition-all duration-300 ease-in-out"
                    onClick={() => (window.location.href = slide.ctaLink)}
                  >
                    {slide.ctaText}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white/80 text-white hover:bg-[color:var(--color-primary)] hover:text-[color:var(--color-accent)] px-8 py-4 text-lg font-semibold rounded-xl backdrop-blur-md bg-white/10 hover:shadow-2xl transition-all duration-300 ease-in-out"
                    onClick={() => (window.location.href = "#jinsi-inavyofanya")}
                  >
                    {language === "en" ? "Learn More" : "Jifunze Zaidi"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 transition-all duration-300 group shadow-2xl"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 group-hover:scale-110 transition-transform" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 transition-all duration-300 group shadow-2xl"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 group-hover:scale-110 transition-transform" />
      </button>
      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {currentSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 shadow-lg ${
              index === currentSlide
                ? "bg-[color:var(--color-accent)] scale-125 shadow-2xl ring-2 ring-[color:var(--color-accent)]/50"
                : "bg-white/50 hover:bg-white/75 hover:scale-110"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <div
          className="h-full bg-gradient-to-r from-[color:var(--color-primary)] via-[color:var(--color-accent)] to-[color:var(--color-primary)] transition-all duration-300 shadow-lg"
          style={{ width: `${((currentSlide + 1) / currentSlides.length) * 100}%` }}
        />
      </div>
      {/* Mobile Swipe Indicators */}
      <div className="absolute top-6 right-6 z-20 md:hidden">
        <div className="flex items-center space-x-2 px-4 py-2 bg-black/40 backdrop-blur-md rounded-full text-white text-sm font-medium shadow-xl">
          <span>{currentSlide + 1}</span>
          <span>/</span>
          <span>{currentSlides.length}</span>
        </div>
      </div>
    </section>
  )
}
