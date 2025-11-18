import { useEffect, useState } from 'react'

export default function Owners() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [owners, setOwners] = useState([])

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/owners`)
        if (res.ok) setOwners(await res.json())
      } catch (e) {}
    }
    load()
  }, [])

  return (
    <section id="owners" className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-rose-50">Das Team</h2>
      <p className="text-rose-200/80 mt-2">Zwei Herzen, eine Bühne</p>

      <div className="mt-8 grid sm:grid-cols-2 gap-6">
        {owners.map((o, i) => (
          <div key={i} className="bg-gradient-to-b from-stone-900/70 to-stone-900/40 border border-white/10 rounded-2xl p-5 flex gap-4 items-center">
            {o.image_url && (
              <img src={o.image_url} alt={o.name} className="w-24 h-24 rounded-full object-cover border border-white/20" />
            )}
            <div>
              <h3 className="text-xl font-semibold text-rose-50">{o.name}</h3>
              <p className="text-rose-200/80">{o.role}</p>
              <p className="text-rose-100/80 mt-2">{o.bio}</p>
              <div className="mt-2 flex items-center gap-3 text-rose-200/80">
                {o.instagram && <a href={o.instagram} className="hover:text-rose-50">Instagram</a>}
                {o.website && <a href={o.website} className="hover:text-rose-50">Website</a>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
