import { useEffect, useState } from 'react'

export default function Hero() {
  const [video, setVideo] = useState(null)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/video/current`)
        if (res.ok) {
          const data = await res.json()
          setVideo(data)
        }
      } catch (e) {
        console.error(e)
      }
    }
    load()
  }, [])

  return (
    <section className="relative min-h-[90vh] flex items-center">
      {/* Video background */}
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-b-[2.5rem]">
        {video ? (
          <video className="w-full h-full object-cover" autoPlay muted loop playsInline src={video.video_url} />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-rose-900 via-stone-900 to-amber-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-black/70" />
        <div className="absolute inset-0 backdrop-blur-[1px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-32 text-rose-50">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-[0_2px_0_rgba(0,0,0,0.25)]">
          Quirky Kabarett. Echter Wiener Schmäh.
        </h1>
        <p className="mt-6 max-w-2xl text-rose-100/90">
          Ein kleines Theater mit großer Bühne für Kabarett, Impro und spontane Funken. Mit Bar, Werkraum und einer Portion Nostalgie.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#events" className="bg-rose-500/90 hover:bg-rose-500 text-white font-semibold px-5 py-2.5 rounded-full transition-colors">
            Programm & Reservieren
          </a>
          {video?.caption && (
            <span className="px-4 py-2 rounded-full bg-white/10 text-rose-100/90 border border-white/10">
              {video.caption}
            </span>
          )}
        </div>
      </div>
    </section>
  )
}
