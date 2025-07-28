"use client"

import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-2xl bg-gradient-to-br from-[color:var(--color-primary)] to-[color:var(--color-primary)] text-white transition-opacity duration-300 hover:scale-110 hover:from-[color:var(--color-accent)] hover:to-[color:var(--color-accent)] focus:outline-none focus:ring-4 focus:ring-[color:var(--color-accent)] group transition-transform ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ boxShadow: "0 8px 32px 0 rgba(106,27,154,0.25)" }}
    >
      <ArrowUp className="h-6 w-6 group-hover:text-[color:var(--color-primary)]" />
    </button>
  )
} 