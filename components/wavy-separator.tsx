interface WavySeparatorProps {
  className?: string
  color?: string // fallback for backward compatibility
  topColor?: string // new: color of the section above
  bottomColor?: string // new: color of the section below
}

export function WavySeparator({ className, color, topColor, bottomColor }: WavySeparatorProps) {
  // Default colors for smooth transitions
  const top = topColor || color || "#fff"
  const bottom = bottomColor || color || "#f0fdf4"

  // SVG with two paths: top fills the top, bottom fills the wave
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'>
    <rect width='1200' height='120' fill='${top}'/>
    <path d='M0,0V46.29c47.29,22.09,104.29,29.09,158,17.7,70-15.29,136-57.29,207-60.29,73-3,147,38,220,39,63,.8,127-32,190-32,65,0,130,33,195,33,60,0,120-27,180-27V0Z' fill='${bottom}'/>
  </svg>`

  const encodedSvg = encodeURIComponent(svg)

  return (
    <div
      className={`w-full h-20 overflow-hidden ${className}`}
      style={{
        backgroundImage: `url("data:image/svg+xml;utf8,${encodedSvg}")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      }}
    />
  )
}
