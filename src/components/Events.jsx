import { useEffect, useState } from 'react'

function formatDate(iso) {
  const d = new Date(iso)
  return d.toLocaleString('de-AT', { weekday: 'short', day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
}

export default function Events() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [reservingId, setReservingId] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', tickets: 2 })
  const [message, setMessage] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/events`)
        if (!res.ok) throw new Error('Fehler beim Laden des Programms')
        const data = await res.json()
        setEvents(data)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const reserve = async (eventId) => {
    setMessage('')
    setReservingId(eventId)
    try {
      const res = await fetch(`${baseUrl}/api/reservations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event_id: eventId, name: form.name, email: form.email, tickets: Number(form.tickets) })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Reservierung fehlgeschlagen')
      setMessage('Reservierung bestätigt! Check deine E‑Mails.')
      // reload list
      const reload = await fetch(`${baseUrl}/api/events`)
      setEvents(await reload.json())
      setForm({ name: '', email: '', tickets: 2 })
    } catch (e) {
      setMessage(String(e.message))
    } finally {
      setReservingId(null)
    }
  }

  if (loading) return <section id="events" className="max-w-7xl mx-auto px-6 py-16 text-rose-50">Laden…</section>
  if (error) return <section id="events" className="max-w-7xl mx-auto px-6 py-16 text-rose-200">{error}</section>

  return (
    <section id="events" className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-rose-50">Aktuelles Programm</h2>
      <p className="text-rose-200/80 mt-2">Kabarett, Impro & Workshops im Überblick</p>

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(ev => (
          <div key={ev.id || ev._id || ev.title} className="group bg-gradient-to-b from-stone-900/70 to-stone-900/40 border border-white/10 rounded-2xl overflow-hidden hover:border-rose-500/40 transition-all">
            {ev.image_url && (
              <div className="aspect-video overflow-hidden">
                <img src={ev.image_url} alt={ev.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
            )}
            <div className="p-4">
              <div className="text-sm text-rose-200/70">{formatDate(ev.date)}</div>
              <h3 className="mt-1 text-xl font-semibold text-rose-50">{ev.title}</h3>
              <p className="mt-1 text-rose-200/90 line-clamp-3">{ev.description}</p>
              <div className="mt-3 flex items-center justify-between text-rose-200/80">
                <span>{ev.genre}</span>
                <span>{ev.price_eur.toFixed(2)} €</span>
              </div>
              <div className="mt-3 text-sm text-rose-200/70">Freie Plätze: {ev.seats_available}</div>

              <div className="mt-4 border-t border-white/10 pt-3">
                <div className="grid grid-cols-2 gap-2">
                  <input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="Name" className="bg-white/10 text-rose-50 placeholder-rose-200/60 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-rose-500/50" />
                  <input value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} placeholder="E‑Mail" className="bg-white/10 text-rose-50 placeholder-rose-200/60 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-rose-500/50" />
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <input type="number" min="1" max="10" value={form.tickets} onChange={e=>setForm(f=>({...f,tickets:e.target.value}))} className="w-24 bg-white/10 text-rose-50 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-rose-500/50" />
                  <button disabled={reservingId=== (ev.id||ev._id)} onClick={()=>reserve(ev.id||ev._id)} className="flex-1 bg-rose-500/90 hover:bg-rose-500 disabled:opacity-60 text-white font-semibold px-4 py-2 rounded-md transition-colors">
                    {reservingId=== (ev.id||ev._id) ? 'Reserviere…' : 'Reservieren'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {message && (
        <div className="mt-6 text-rose-100/90">{message}</div>
      )}
    </section>
  )
}
