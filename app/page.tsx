"use client"

import React from "react"

import { useState, useRef, useEffect } from "react"
import { Star, Globe, MapPin, Phone, Mail, Facebook, Instagram, Twitter, ArrowRight, Leaf, Rocket, Users, ShoppingBasket, Timer, Bike, Crown, Gift, User, CheckCircle, Award, Sprout } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import HeroCarousel from "@/components/hero-carousel"
import { WavySeparator } from "@/components/wavy-separator"
import Head from "next/head";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

// Custom hook for Intersection Observer
function useSectionInView(options = { threshold: 0.5 }) {
  const ref = useRef<HTMLElement | null>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      options
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref, options])
  return [ref, inView] as const
}

const content = {
  en: {
    header: {
      howItWorks: "How It Works",
      pricing: "Pricing",
      vendors: "Vendors",
      riders: "Riders",
      login: "Login",
      getStarted: "Get Started",
    },
    whySection: {
      title: "Why Choose",
      subtitle: "Building community through small businesses and our customers",
      cards: [
        {
          title: "Fresh & Local",
          description: "Support local vendors and enjoy farm-fresh groceries straight from the market to your door.",
        },
        {
          title: "Fast Delivery",
          description: "Bodaboda riders bring your order in under an hour. Quick, reliable, and always with a smile!",
        },
        {
          title: "Community-Driven",
          description: "Join a platform that empowers small businesses and strengthens our local communities.",
        },
      ],
    },
    vendorsSection: {
      title: "Meet Your Local",
      subtitle: "Real vendors, real stories, fresh produce every day",
      vendors: [
        {
          name: "Fresh Harvest Mama",
          location: "Westlands Market • 8 years",
          quote: "I love serving my community with fresh vegetables at fair prices!",
          specialties: ["Fresh Vegetables", "Herbs"],
          buttonText: "Shop from Fresh Harvest",
          image: "/grace-wanjiku.jpg",
        },
        {
          name: "Green Valley Mama",
          location: "Kibera Market • 12 years",
          quote: "Fresh vegetables every morning, straight from the farm!",
          specialties: ["Spinach", "Carrots", "Eggplant"],
          buttonText: "Shop from Green Valley",
          image: "/jane-njeri.jpg",
        },
        {
          name: "Sunrise Market Mama",
          location: "Kawangware • 6 years",
          quote: "Quality produce at fair prices, that's my promise!",
          specialties: ["Cabbage", "Tomatoes", "Potatoes"],
          buttonText: "Shop from Sunrise Market",
          image: "/mary-akinyi.jpg",
        },
      ],
    },
    howItWorksSection: {
      title: "How It Works",
      subtitle: "Simple steps to get fresh groceries delivered to your door",
      steps: [
        {
          title: "Find a Vendor",
          description: "Discover trusted local vendors near you with fresh produce and great prices.",
        },
        {
          title: "Order in Minutes",
          description: "Browse fresh groceries, add to cart, and place your order with just a few taps.",
        },
        {
          title: "Fast Delivery",
          description: "Our trusted bodaboda riders deliver your fresh groceries in under an hour.",
        },
      ],
    },
    pricingSection: {
      title: "Choose Your",
      subtitle: "Flexible options for every shopping need",
      plans: [
        {
          name: "Free Plan",
          description: "Perfect for occasional shoppers",
          price: "KSh 0",
          period: "/month",
          features: [
            "Up to 5 orders per month",
            "Standard delivery fees (KSh 50-100)",
            "Basic customer support",
            "Order tracking",
          ],
          buttonText: "Get Started Free",
        },
        {
          name: "Premium Plan",
          description: "For regular grocery shoppers",
          price: "KSh 500",
          period: "/month",
          features: [
            "Unlimited orders",
            "FREE delivery on all orders",
            "Priority customer support",
            "Advanced order tracking",
            "Exclusive vendor discounts",
            "Early access to new vendors",
          ],
          buttonText: "Start Premium Trial",
          popular: true,
          popularText: "🔥 Most Popular",
          footerText: "🔥 1,200+ people joined Premium this week!",
        },
      ],
    },
    ridersSection: {
      title: "Our Amazing",
      subtitle: "Meet the heroes who bring fresh groceries to your door",
      joinText: "🏍️ Join as a Rider",
    },
    testimonialsSection: {
      title: "What Our Community Says",
      subtitle: "Real stories from real people in our community",
      testimonials: [
        {
          text: "Mboga Pap has made grocery shopping so convenient! Fresh vegetables delivered right to my door. Asante sana!",
          name: "Sarah Muthoni",
          role: "Customer • Westlands",
        },
        {
          text: "As a vendor, this platform has helped me reach more customers and grow my business. My income has doubled!",
          name: "John Kiprotich",
          role: "Vendor • Kibera Market",
        },
        {
          text: "Great way to earn extra income as a bodaboda rider. The app is easy to use and payments are reliable. Poa sana!",
          name: "Peter Omondi",
          role: "Rider • Kasarani",
        },
      ],
    },
    footer: {
      tagline: "Connecting communities through fresh, local groceries. Building community through quality food.",
      sections: [
        {
          title: "For Customers",
          links: [
            { text: "Sign Up", href: "/signup" },
            { text: "How it Works", href: "#jinsi-inavyofanya" },
            { text: "Pricing", href: "#bei" },
            { text: "Help Center", href: "/help" },
            { text: "Track Order", href: "/track" },
          ],
        },
        {
          title: "For Partners",
          links: [
            { text: "Become a Vendor", href: "/signup?role=vendor" }, // Link to signup with role pre-selected
            { text: "Become a Rider", href: "/signup?role=rider" }, // Link to signup with role pre-selected
            { text: "Vendor Resources", href: "/vendor-resources" },
            { text: "Rider Resources", href: "/rider-resources" },
            { text: "Partner Support", href: "/partner-support" },
          ],
        },
        {
          title: "Company",
          links: [
            { text: "About Us", href: "/about" },
            { text: "Our Story", href: "/story" },
            { text: "Careers", href: "/careers" },
            { text: "Press", href: "/press" },
            { text: "Blog", href: "/blog" },
          ],
        },
        {
          title: "Support",
          links: [
            { text: "Contact Us", href: "/contact" },
            { text: "Privacy Policy", href: "/privacy" },
            { text: "Terms of Service", href: "/terms" },
            { text: "Community Guidelines", href: "/community" },
            { text: "Safety", href: "/safety" },
          ],
        },
      ],
      contact: {
        title: "Get in Touch",
        phone: "+254 700 123 456",
        email: "hello@mbongapap.co.ke",
        address: "Nairobi, Kenya",
      },
      stats: [
        { number: "2,500+", label: "Active Users" },
        { number: "150+", label: "Vendors" },
        { number: "200+", label: "Riders" },
      ],
              copyright: "© 2025 Mboga Pap All rights reserved.",
    },
  },
  sw: {
    header: {
      howItWorks: "Jinsi Inavyofanya",
      pricing: "Bei",
              vendors: "Vendors",
      riders: "Madereva",
      login: "Ingia",
      getStarted: "Anza Sasa",
    },
    whySection: {
      title: "Kwa Nini",
      subtitle: "Tunajenga jamii kupitia biashara ndogo ndogo na wateja wetu",
      cards: [
        {
          title: "Safi na za Mitaani",
          description: "Saidia wachuuzi wa mitaani na ufurahie mboga safi kutoka sokoni hadi mlangoni mwako.",
        },
        {
          title: "Utoaji wa Haraka",
          description:
            "Madereva wa bodaboda wanakuletea agizo lako ndani ya saa moja. Haraka, wa kuaminika, na kila wakati kwa tabasamu!",
        },
        {
          title: "Kuongozwa na Jamii",
          description: "Jiunge na jukwaa linalowezesha biashara ndogo na kuimarisha jamii zetu za mitaani.",
        },
      ],
    },
    vendorsSection: {
      title: "Kutana na",
      subtitle: "Wachuuzi wa kweli, hadithi za kweli, mboga safi kila siku",
      vendors: [
        {
          name: "Fresh Harvest Mama",
          location: "Soko la Westlands • Miaka 8",
          quote: "Napenda kutumikia jamii yangu kwa mboga safi na bei nzuri!",
          specialties: ["Mboga Safi", "Viungo"],
          buttonText: "Nunua kutoka kwa Fresh Harvest",
          image: "/grace-wanjiku.jpg",
        },
        {
          name: "Green Valley Mama",
          location: "Soko la Kibera • Miaka 12",
          quote: "Mboga safi kila asubuhi, moja kwa moja kutoka shambani!",
          specialties: ["Mchicha", "Karoti", "Biringanya"],
          buttonText: "Nunua kutoka kwa Green Valley",
          image: "/jane-njeri.jpg",
        },
        {
          name: "Sunrise Market Mama",
          location: "Kawangware • Miaka 6",
          quote: "Mazao ya ubora kwa bei nzuri, hiyo ni ahadi yangu!",
          specialties: ["Kabichi", "Nyanya", "Viazi"],
          buttonText: "Nunua kutoka kwa Sunrise Market",
          image: "/mary-akinyi.jpg",
        },
      ],
    },
    howItWorksSection: {
      title: "Jinsi Inavyofanya",
      subtitle: "Hatua rahisi za kupata mboga safi zikiletwa mlangoni mwako",
      steps: [
        {
          title: "Tafuta Mchuuzi",
          description: "Gundua wachuuzi wa mitaani wanaoaminika karibu nawe wenye mboga safi na bei nzuri.",
        },
        {
          title: "Agiza kwa Dakika",
          description: "Vinjari mboga safi, ongeza kwenye kikapu, na uweke agizo lako kwa mibofyo michache tu.",
        },
        {
          title: "Utoaji wa Haraka",
          description: "Madereva wetu wa bodaboda wanaoaminika wanakuletea mboga zako safi ndani ya saa moja.",
        },
      ],
    },
    pricingSection: {
      title: "Chagua",
      subtitle: "Chaguzi za kubadilika kwa kila mahitaji ya ununuzi",
      plans: [
        {
          name: "Mpango wa Bure",
          description: "Kamili kwa wanunuzi wa mara kwa mara",
          price: "KSh 0",
          period: "/mwezi",
          features: [
            "Hadi maagizo 5 kwa mwezi",
            "Ada za kawaida za utoaji (KSh 50-100)",
            "Msaada wa kimsingi wa wateja",
            "Ufuatiliaji wa agizo",
          ],
          buttonText: "Anza Bure",
        },
        {
          name: "Mpango wa Premium",
          description: "Kwa wanunuzi wa kawaida wa mboga",
          price: "KSh 500",
          period: "/mwezi",
          features: [
            "Maagizo yasiyo na kikomo",
            "Utoaji wa BURE kwa maagizo yote",
            "Msaada wa kipaumbele wa wateja",
            "Ufuatiliaji wa kina wa agizo",
            "Punguzo za kipekee za wachuuzi",
            "Ufikiaji wa mapema wa wachuuzi wapya",
          ],
          buttonText: "Anza Jaribio la Premium",
          popular: true,
          popularText: "🔥 Maarufu Zaidi",
          footerText: "🔥 Watu 1,200+ wamejiunga na Premium wiki hii!",
        },
      ],
    },
    ridersSection: {
      title: "Madereva Wetu",
      subtitle: "Kutana na mashujaa wanaokuletea mboga safi mlangoni mwako",
      joinText: "🏍️ Jiunge kama Dereva",
    },
    testimonialsSection: {
      title: "Jamii Yetu",
      subtitle: "Hadithi za kweli kutoka kwa watu wa kweli katika jamii yetu",
      testimonials: [
        {
          text: "Mboga Pap imefanya ununuzi wa mboga kuwa rahisi sana! Mboga safi zinaletwa hadi mlangoni mwangu. Asante sana!",
          name: "Sarah Muthoni",
          role: "Mteja • Westlands",
        },
        {
          text: "Kama mchuuzi, jukwaa hili limenisaidia kufikia wateja wengi na kukuza biashara yangu. Mapato yangu yamezidishwa mara mbili!",
          name: "John Kiprotich",
          role: "Mchuuzi • Soko la Kibera",
        },
        {
          text: "Njia nzuri ya kupata kipato cha ziada kama dereva wa bodaboda. Programu ni rahisi kutumia na malipo ni ya kuaminika. Poa sana!",
          name: "Peter Omondi",
          role: "Dereva • Kasarani",
        },
      ],
    },
    footer: {
      tagline: "Kuunganisha jamii kupitia mboga safi za mitaani. Kujenga jamii kupitia chakula cha ubora.",
      sections: [
        {
          title: "Kwa Wateja",
          links: [
            { text: "Jisajili", href: "/signup" },
            { text: "Jinsi Inavyofanya", href: "#jinsi-inavyofanya" },
            { text: "Bei", href: "#bei" },
            { text: "Kituo cha Msaada", href: "/help" },
            { text: "Fuatilia Agizo", href: "/track" },
          ],
        },
        {
          title: "Kwa Washirika",
          links: [
            { text: "Kuwa Mchuuzi", href: "/signup?role=vendor" },
            { text: "Kuwa Dereva", href: "/signup?role=rider" },
            { text: "Vendor Resources", href: "/vendor-resources" },
            { text: "Rider Resources", href: "/rider-resources" },
            { text: "Partner Support", href: "/partner-support" },
          ],
        },
        {
          title: "Kampuni",
          links: [
            { text: "About Us", href: "/about" },
            { text: "Our Story", href: "/story" },
            { text: "Careers", href: "/careers" },
            { text: "Press", href: "/press" },
            { text: "Blog", href: "/blog" },
          ],
        },
        {
          title: "Msaada",
          links: [
            { text: "Wasiliana Nasi", href: "/contact" },
            { text: "Sera ya Faragha", href: "/privacy" },
            { text: "Masharti ya Huduma", href: "/terms" },
            { text: "Miongozo ya Jamii", href: "/community" },
            { text: "Usalama", href: "/safety" },
          ],
        },
      ],
      contact: {
        title: "Wasiliana Nasi",
        phone: "+254 700 123 456",
        email: "hello@mbongapap.co.ke",
        address: "Nairobi, Kenya",
      },
      stats: [
        { number: "2,500+", label: "Watumiaji Hai" },
        { number: "150+", label: "Wachuuzi" },
        { number: "200+", label: "Madereva" },
      ],
              copyright: "© 2025 Mboga Pap Haki zote zimehifadhiwa.",
    },
  },
}

// Vendor list for both homepage and vendor pages
const mamambogaVendors = [
  {
    id: "fresh-harvest-mama",
    name: "Fresh Harvest Mama",
    location: "Westlands Market • 8 years",
    quote: "I love serving my community with fresh vegetables at fair prices!",
    specialties: ["Fresh Vegetables", "Herbs"],
    buttonText: "Shop from Fresh Harvest",
    image: "/grace-wanjiku.jpg"
  },
  {
    id: "green-valley-mama",
    name: "Green Valley Mama",
    location: "Kibera Market • 12 years",
    quote: "Fresh vegetables every morning, straight from the farm!",
    specialties: ["Spinach", "Carrots", "Eggplant"],
    buttonText: "Shop from Green Valley",
    image: "/jane-njeri.jpg"
  },
  {
    id: "sunrise-market-mama",
    name: "Sunrise Market Mama",
    location: "Kawangware • 6 years",
    quote: "Quality produce at fair prices, that's my promise!",
    specialties: ["Cabbage", "Tomatoes", "Potatoes"],
    buttonText: "Shop from Sunrise Market",
    image: "/mary-akinyi.jpg"
  },
  {
    id: "wambuis-greens",
    name: "Wambui's Greens",
    location: "1.1 km • 4.7★",
    quote: "Traditional greens and organic produce.",
    specialties: ["Traditional Greens", "Organic"],
    buttonText: "Shop from Wambui's Greens",
    image: "/placeholder.svg"
  },
  {
    id: "fruit-basket",
    name: "Fruit Basket",
    location: "1.5 km • 4.5★",
    quote: "Fresh fruits and juices for your family.",
    specialties: ["Fresh Fruits", "Juices"],
    buttonText: "Shop from Fruit Basket",
    image: "/placeholder.svg"
  },
  {
    id: "organic-hub",
    name: "Organic Hub",
    location: "2.0 km • 4.8★",
    quote: "Organic veggies and herbs delivered.",
    specialties: ["Organic Veggies", "Herbs"],
    buttonText: "Shop from Organic Hub",
    image: "/placeholder.svg"
  },
  {
    id: "roots-tubers",
    name: "Roots & Tubers",
    location: "2.3 km • 4.4★",
    quote: "Best tubers and roots in town.",
    specialties: ["Tubers", "Roots"],
    buttonText: "Shop from Roots & Tubers",
    image: "/placeholder.svg"
  },
  {
    id: "salad-stop",
    name: "Salad Stop",
    location: "1.8 km • 4.6★",
    quote: "Fresh salads and veggies every day.",
    specialties: ["Salads", "Fresh Veggies"],
    buttonText: "Shop from Salad Stop",
    image: "/placeholder.svg"
  },
];

export default function HomePage() {
  const [language, setLanguage] = useState<"en" | "sw">("en")
  const t = content[language]

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "sw" : "en"))
  }

  const [mamambogaRef, mamambogaInView] = useSectionInView({ threshold: 0.5 })

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Mboga Pap</title>
        <meta name="description" content="Order fresh groceries from local vendors and get fast delivery with Mboga Pap! Supporting community, vendors, and riders across Nairobi." />
        <link rel="canonical" href="https://mbogapap.co.ke/" />
        <meta property="og:title" content="Mboga Pap - Fresh Groceries, Local Vendors, Fast Delivery" />
        <meta property="og:description" content="Order fresh groceries from local vendors and get fast delivery with Mboga Pap! Supporting community, vendors, and riders across Nairobi." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mbogapap.co.ke/" />
        <meta property="og:image" content="/placeholder.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Mboga Pap - Fresh Groceries, Local Vendors, Fast Delivery" />
        <meta name="twitter:description" content="Order fresh groceries from local vendors and get fast delivery with Mboga Pap! Supporting community, vendors, and riders across Nairobi." />
        <meta name="twitter:image" content="/placeholder.jpg" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Mboga Pap",
            "url": "https://mbogapap.co.ke/",
            "logo": "/placeholder-logo.png",
            "sameAs": [
              "https://facebook.com/mbogapap",
              "https://instagram.com/mbogapap",
              "https://twitter.com/mbogapap"
            ]
          }
        `}</script>
      </Head>
      {/* Hero Carousel Section - No margin/padding, flush with header */}
      <div className="-mt-px bg-white">
        <HeroCarousel language={language} />
      </div>
      {/* Why Mboga Pap */}
      <section className="py-10 sm:py-20 bg-white">
        <div className="container mx-auto px-2 sm:px-4 relative z-10">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[color:var(--color-primary)] mb-4">
              {t.whySection.title} <span>Mboga Pap?</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">{t.whySection.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-6xl mx-auto">
            {t.whySection.cards.map((card, index) => (
              <Card
                key={index}
                className="border-0 shadow-2xl bg-gradient-to-br from-[color:var(--color-accent)]/10 via-white to-[color:var(--color-primary)]/10 transform hover:scale-105 transition-all duration-500 hover:shadow-3xl group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--color-primary)]/10 to-[color:var(--color-accent)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="p-6 sm:p-8 text-center relative z-10">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[color:var(--color-primary)] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                    {index === 0 ? <Sprout className="h-10 w-10 text-[color:var(--color-accent)]" /> : index === 1 ? <Bike className="h-10 w-10 text-[color:var(--color-accent)]" /> : <Users className="h-10 w-10 text-[color:var(--color-accent)]" />}
                  </div>
                  <h3 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-4 text-[color:var(--color-primary)] group-hover:text-[color:var(--color-primary)] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-gray-700 text-base sm:text-lg leading-relaxed group-hover:text-gray-800 transition-colors">
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Meet Your Local Vendors */}
      <section
        id="vendors"
        ref={mamambogaRef}
        className="relative py-20 bg-fixed bg-cover"
        style={{ backgroundImage: 'url(/market-woman.jpg)', backgroundPosition: 'center 20%' }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16 animate-fade-slide-down">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              Meet Your Local <span className="text-brandgreen">Vendors</span>
            </h2>
            <div className="flex items-center justify-center gap-3 mb-8">
              <span className="hidden sm:inline-block flex-1 border-t-2 border-dashed border-white/70"></span>
              <span className="inline-block bg-[color:var(--color-accent)] text-[color:var(--color-primary)] font-bold text-base md:text-lg lg:text-xl px-3 py-1 rounded-md whitespace-nowrap shadow-md">
                Real vendors, real stories, fresh produce every day
              </span>
              <span className="hidden sm:inline-block flex-1 border-t-2 border-dashed border-white/70"></span>
            </div>
          </div>
          <div className="max-w-6xl mx-auto animate-fade-slide-up relative">
            <Carousel opts={{ align: 'start', loop: true }}>
              <CarouselContent>
                {mamambogaVendors.map((vendor) => (
                  <CarouselItem key={vendor.id} className="md:basis-1/2 lg:basis-1/3">
                    <Card className={`border border-[color:var(--color-primary)] shadow-2xl bg-white transform hover:scale-105 transition-all duration-500 hover:shadow-3xl group relative overflow-hidden opacity-0 ${mamambogaInView ? 'opacity-100' : ''}`}
                      style={{ transition: 'opacity 0.8s, transform 0.8s', background: 'white' }}>
                      <CardContent className="p-0 relative z-10">
                        <div className="relative">
                          <img
                            src={vendor.image}
                            alt={vendor.name}
                            className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-4 right-4 bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-accent)] text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                            ⭐ {vendor.location.split('•')[1] || '4.7'}
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-lg"></div>
                        </div>
                        <div className="p-6" style={{ background: '#F9F5FB', borderBottomLeftRadius: '0.5rem', borderBottomRightRadius: '0.5rem' }}>
                          <h3 className="text-xl font-bold text-[color:var(--color-primary)] mb-2 group-hover:text-[color:var(--color-accent)] transition-colors">
                            {vendor.name}
                          </h3>
                          <p className="text-[color:var(--color-accent)] font-medium mb-3">{vendor.location}</p>
                          <p className="text-gray-600 mb-4 italic group-hover:text-gray-700 transition-colors">
                            "{vendor.quote}"
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {vendor.specialties.map((specialty, idx) => (
                              <Badge
                                key={idx}
                                className="bg-[color:var(--color-accent)] text-[color:var(--color-primary)] hover:scale-105 transition-transform"
                              >
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                          <Button
                            className="w-full"
                            onClick={() => {
                              window.location.href = `/vendors/${vendor.id}`;
                            }}
                          >
                            {vendor.buttonText}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-6 md:-left-10 top-1/2" />
              <CarouselNext className="-right-6 md:-right-10 top-1/2" />
            </Carousel>
          </div>
        </div>
      </section>
      {/* How It Works */}
      <section id="jinsi-inavyofanya" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[color:var(--color-primary)] mb-4">
              {t.howItWorksSection.title}
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto">{t.howItWorksSection.subtitle}</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-center gap-0 md:gap-4">
              {t.howItWorksSection.steps.map((step, index) => (
                <React.Fragment key={index}>
                  <div className="flex flex-col items-center mx-2 md:mx-0">
                    <div className="w-24 h-24 bg-gradient-to-br from-[color:var(--color-primary)] via-[color:var(--color-primary)] to-[color:var(--color-primary)] rounded-full flex items-center justify-center shadow-2xl animate-pulse-glow">
                      {index === 0 ? (
                        <MapPin className="h-12 w-12 text-[color:var(--color-accent)]" />
                      ) : index === 1 ? (
                        <ShoppingBasket className="h-12 w-12 text-[color:var(--color-accent)]" />
                      ) : (
                        <Bike className="h-12 w-12 text-[color:var(--color-accent)]" />
                      )}
                    </div>
                    <h3 className="text-2xl font-bold mt-6 mb-4 text-[color:var(--color-primary)] group-hover:text-[color:var(--color-primary)] transition-colors text-center">
                      {step.title}
                    </h3>
                    <p className="text-gray-700 text-lg group-hover:text-black transition-colors text-center">
                      {step.description}
                    </p>
                  </div>
                  {index < t.howItWorksSection.steps.length - 1 && (
                    <div className="flex items-center mx-2 md:mx-0">
                      <svg
                        className="w-8 h-8 text-[color:var(--color-accent)] animate-bounce-x"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Subscription Plans */}
      <section id="bei" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[color:var(--color-primary)] mb-4">
              {t.pricingSection.title} <span>{language === "en" ? "Plan" : "Mpango"}</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto">{t.pricingSection.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {t.pricingSection.plans.map((plan, index) => {
              const isPremium = plan.popular;
              return (
                <div
                  key={index}
                  className={`relative flex flex-col rounded-3xl shadow-2xl transition-all duration-300 bg-white/95 overflow-hidden
                    ${isPremium ? "z-10 scale-105 border-2 border-[color:var(--color-primary)] shadow-3xl bg-[color:var(--color-primary)]/10" : "border border-gray-200"}
                    hover:scale-105 hover:shadow-3xl`}
                  style={{ minHeight: isPremium ? 520 : 480 }}
                >
                  {isPremium && (
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20">
                      <span className="inline-block bg-[color:var(--color-primary)] text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg tracking-wide uppercase">Most Popular</span>
                    </div>
                  )}
                  <div className="flex-1 flex flex-col justify-between p-8 pt-16">
                    <div className="text-center mb-6">
                      <div className={`mx-auto mb-4 w-16 h-16 flex items-center justify-center rounded-full ${isPremium ? "bg-[color:var(--color-primary)]" : "bg-brandgreen/10"}`}>
                        {isPremium ? <Crown className="h-10 w-10 text-yellow-400" /> : <Gift className="h-10 w-10 text-brandgreen" />}
                      </div>
                      <h3 className="text-2xl font-bold mb-2 text-black">{plan.name}</h3>
                      <p className="text-gray-700 mb-6">{plan.description}</p>
                      <div className="flex items-end justify-center mb-4">
                        <span className="text-5xl font-extrabold text-black mr-2">{plan.price}</span>
                        <span className="text-lg text-gray-500 font-medium mb-1">{plan.period}</span>
                      </div>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-base text-gray-800">
                          <CheckCircle className="h-5 w-5 mr-2 text-brandgreen" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full text-lg py-3 rounded-xl shadow-lg font-semibold"
                    >
                      {plan.buttonText}
                    </Button>
                    {plan.footerText && <p className="text-center text-xs text-gray-500 mt-3">{plan.footerText}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* Rider Spotlight */}
      <section id="riders" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[color:var(--color-primary)] mb-4">
              {t.ridersSection.title} <span className="text-brandgreen">{language === "en" ? "Riders" : "Wazuri"}</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto">{t.ridersSection.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {["John Kiprop", "Peter Ochieng", "David Mwangi"].map((name, index) => (
              <Card
                key={index}
                className="border border-[color:var(--color-primary)] shadow-2xl bg-white transform hover:scale-105 transition-all duration-500 hover:shadow-3xl group"
              >
                <CardContent className="p-6 text-center">
                  <div className="relative mb-6">
                    <img
                      src={
                        [
                          "/john-kiprop.jpg",
                          "/peter-ochieng.jpg",
                          "/david-mwangi.jpg"
                        ][index]
                      }
                      alt={name}
                      className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-[color:var(--color-primary)] group-hover:border-[color:var(--color-accent)] transition-colors"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-accent)] rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white text-sm">🏍️</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[color:var(--color-primary)] mb-2 group-hover:text-[color:var(--color-accent)] transition-colors">
                    {name}
                  </h3>
                  <p className="text-[color:var(--color-accent)] font-medium mb-3">
                    {["Nairobi • 3 years", "Kisumu • 2 years", "Mombasa • 4 years"][index]}
                  </p>
                  <div className="flex items-center justify-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[color:var(--color-accent)] text-[color:var(--color-accent)]" />
                    ))}
                    <span className="ml-2 text-sm text-gray-700">{[4.9, 4.8, 4.9][index]} rating</span>
                  </div>
                  <p className="text-gray-700 italic mb-4 group-hover:text-gray-900 transition-colors">
                    {
                      [
                        "Delivering smiles with every order! Fast, safe, and reliable.",
                        "Great way to earn flexible income while serving my community!",
                        "Every delivery is a chance to make someone's day better!",
                      ][index]
                    }
                  </p>
                  <Badge className="bg-[color:var(--color-primary)] text-white hover:bg-[color:var(--color-accent)] hover:text-[color:var(--color-primary)] hover:scale-105 transition-transform">
                    {[2500, 1800, 3200][index]}+ Deliveries
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/signup?role=rider">
              <Button
                size="lg"
                className="bg-[color:var(--color-primary)] hover:bg-[color:var(--color-accent)] text-[color:var(--color-accent)] hover:text-[color:var(--color-primary)] text-lg px-10 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
              >
                {t.ridersSection.joinText}
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* Loyalty Points System */}
      <section className="py-20 bg-gradient-to-br from-[color:var(--color-primary)]/5 to-[color:var(--color-accent)]/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[color:var(--color-primary)] mb-4">
              {language === "en" ? (
                <>
                  Earn <span className="text-[color:var(--color-accent)]">Loyalty Points</span> Every Order
                </>
              ) : (
                <>
                  Pata <span className="text-[color:var(--color-accent)]">Pointi za Uaminifu</span> Kila Agizo
                </>
              )}
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto">
              {language === "en" 
                ? "Get rewarded for every purchase! Earn 1 point for every KSh 10 spent and redeem for amazing rewards."
                : "Pata malipo kwa kila ununuzi! Pata pointi 1 kwa kila KSh 10 uliyotumia na ubadilishe kwa malipo ya kushangaza."
              }
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Earn Points */}
            <Card className="border-2 border-[color:var(--color-primary)]/20 shadow-xl bg-white transform hover:scale-105 transition-all duration-500 hover:shadow-2xl group">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[color:var(--color-accent)] to-[color:var(--color-primary)] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500">
                  <Star className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[color:var(--color-primary)] mb-4">
                  {language === "en" ? "Earn Points" : "Pata Pointi"}
                </h3>
                <p className="text-gray-700 mb-6">
                  {language === "en" 
                    ? "Earn 1 loyalty point for every KSh 10 you spend on fresh groceries."
                    : "Pata pointi 1 za uaminifu kwa kila KSh 10 unayotumia kwenye mboga mbichi."
                  }
                </p>
                <div className="bg-[color:var(--color-accent)]/10 rounded-lg p-4">
                  <div className="text-2xl font-bold text-[color:var(--color-primary)]">1 Point</div>
                  <div className="text-sm text-gray-600">
                    {language === "en" ? "per KSh 10 spent" : "kwa kila KSh 10"}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Track Progress */}
            <Card className="border-2 border-[color:var(--color-primary)]/20 shadow-xl bg-white transform hover:scale-105 transition-all duration-500 hover:shadow-2xl group">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[color:var(--color-primary)] to-[color:var(--color-accent)] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500">
                  <Award className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[color:var(--color-primary)] mb-4">
                  {language === "en" ? "Track Progress" : "Fuatilia Maendeleo"}
                </h3>
                <p className="text-gray-700 mb-6">
                  {language === "en" 
                    ? "Watch your points grow and see how close you are to your next reward."
                    : "Tazama pointi zako zikiongezeka na uone jinsi ulivyo karibu na malipo yako yafuatayo."
                  }
                </p>
                <div className="bg-[color:var(--color-primary)]/10 rounded-lg p-4">
                  <div className="text-2xl font-bold text-[color:var(--color-accent)]">100 Points</div>
                  <div className="text-sm text-gray-600">
                    {language === "en" ? "for next reward" : "kwa malipo yafuatayo"}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Redeem Rewards */}
            <Card className="border-2 border-[color:var(--color-primary)]/20 shadow-xl bg-white transform hover:scale-105 transition-all duration-500 hover:shadow-2xl group">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[color:var(--color-accent)] to-[color:var(--color-primary)] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500">
                  <Gift className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[color:var(--color-primary)] mb-4">
                  {language === "en" ? "Redeem Rewards" : "Badilisha Malipo"}
                </h3>
                <p className="text-gray-700 mb-6">
                  {language === "en" 
                    ? "Redeem your points for discounts, free delivery, and exclusive offers."
                    : "Badilisha pointi zako kwa punguzo, usambazaji wa bure, na ofa za kipekee."
                  }
                </p>
                <div className="bg-[color:var(--color-accent)]/10 rounded-lg p-4">
                  <div className="text-2xl font-bold text-[color:var(--color-primary)]">50+ Points</div>
                  <div className="text-sm text-gray-600">
                    {language === "en" ? "to start redeeming" : "kuanza kubadilisha"}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg"
              className="bg-[color:var(--color-primary)] hover:bg-[color:var(--color-accent)] hover:text-[color:var(--color-primary)] text-[color:var(--color-accent)] text-lg px-8 py-3 shadow-lg"
              onClick={() => window.location.href = '/signup'}
            >
              {language === "en" ? "Start Earning Points" : "Anza Kupata Pointi"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[color:var(--color-primary)] mb-4">
              {language === "en"
                ? (
                  <>
                    What Our <span className="text-brandgreen">Community Says</span>
                  </>
                )
                : (
                  <>
                    {t.testimonialsSection.title} <span className="text-brandgreen">Inasema</span>
                  </>
                )}
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto">{t.testimonialsSection.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {t.testimonialsSection.testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border border-[color:var(--color-primary)] shadow-2xl bg-white transform hover:scale-105 transition-all duration-500 hover:shadow-3xl group"
              >
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-[color:var(--color-accent)] text-[color:var(--color-accent)] group-hover:scale-110 transition-transform"
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 text-lg italic group-hover:text-black transition-colors">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center">
                    <img
                      src="/placeholder.svg?height=50&width=50"
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4 border-2 border-white shadow-lg"
                    />
                    <div>
                      <div className="font-bold text-[color:var(--color-primary)] group-hover:text-[color:var(--color-primary)] transition-colors">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-700">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white py-20">
        <div className="container mx-auto px-4">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-6 gap-8 mb-12">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[color:var(--color-primary)] to-[color:var(--color-primary)] rounded-xl flex items-center justify-center shadow-lg border-2 border-[color:var(--color-accent)] transform rotate-12">
                  <span className="text-[color:var(--color-accent)] font-bold text-xl transform -rotate-12">🥬</span>
                </div>
                <div>
                  <span className="text-3xl font-bold bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-primary)] bg-clip-text text-transparent">
                    Mboga Pap
                  </span>
                  <p className="text-xs text-gray-400 -mt-1">Fresh And Fast 🏍️</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">{t.footer.tagline}</p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-brandgreen rounded-full flex items-center justify-center hover:bg-brandgreen cursor-pointer transition-all duration-300 hover:scale-110">
                  <Facebook className="h-5 w-5 text-white" />
                </div>
                <div className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 cursor-pointer transition-all duration-300 hover:scale-110">
                  <Instagram className="h-5 w-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 cursor-pointer transition-all duration-300 hover:scale-110">
                    <Instagram className="h-5 w-5 text-white" />
                  </Instagram>
                </div>
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 cursor-pointer transition-all duration-300 hover:scale-110">
                  <Twitter className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>

            {/* Footer Links */}
            {t.footer.sections.map((section, index) => (
              <div key={index}>
                <h4 className="font-bold text-lg mb-4 text-[color:var(--color-accent)]">{section.title}</h4>
                <ul className="space-y-3 text-gray-300">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        className="hover:text-brandgreen transition-colors duration-300 flex items-center group"
                      >
                        <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact & Stats Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-12 pt-8 border-t border-gray-700">
            {/* Contact Info */}
            <div>
              <h4 className="font-bold text-lg mb-4 text-[color:var(--color-accent)]">{t.footer.contact.title}</h4>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-brandgreen" />
                  <span>{t.footer.contact.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-brandgreen" />
                  <span>{t.footer.contact.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-brandgreen" />
                  <span>{t.footer.contact.address}</span>
                </div>
              </div>
            </div>

            {/* Live Stats */}
            <div>
              <h4 className="font-bold text-lg mb-4 text-[color:var(--color-accent)]">
                {language === "en" ? "Live Stats" : "Takwimu za Moja kwa Moja"}
              </h4>
              <div className="grid grid-cols-3 gap-4">
                {t.footer.stats.map((stat, index) => (
                  <div
                    key={index}
                    className="text-center p-3 bg-gray-800 rounded-lg border border-gray-700 hover:border-brandgreen transition-colors"
                  >
                    <div className="text-2xl font-bold text-brandgreen mb-1">{stat.number}</div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
                    <div
                      className={`w-2 h-2 rounded-full mx-auto mt-2 animate-pulse ${
                        index === 0 ? "bg-brandgreen" : index === 1 ? "bg-orange-500" : "bg-blue-500"
                      }`}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 mb-4 md:mb-0">
                <p>{t.footer.copyright}</p>
              </div>
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <Link href="/privacy" className="hover:text-brandgreen transition-colors">
                  {language === "en" ? "Privacy" : "Faragha"}
                </Link>
                <Link href="/terms" className="hover:text-brandgreen transition-colors">
                  {language === "en" ? "Terms" : "Masharti"}
                </Link>
                <Link href="/cookies" className="hover:text-brandgreen transition-colors">
                  {language === "en" ? "Cookies" : "Vidakuzi"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
