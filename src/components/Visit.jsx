import { useEffect, useState } from 'react'

export default function Visit() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [info, setInfo] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/theater`)
        if (res.ok) setInfo(await res.json())
      } catch (e) {}
    }
    load()
  }, [])

  const send = async () => {
    setStatus('')
    try {
      const res = await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Nachricht konnte nicht gesendet werden')
      setStatus('Danke! Wir melden uns bald.')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (e) {
      setStatus(e.message)
    }
  }

  return (
    <section id="visit" className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-rose-50">Anfahrt & Kontakt</h2>
          <p className="text-rose-200/80 mt-2">So findest du zu uns – und so erreichst du uns.</p>

          {info && (
            <div className="mt-6 text-rose-100/90 space-y-2">
              <p className="font-semibold">{info.name}</p>
              <p>{info.address}</p>
              <p>Telefon: {info.phone}</p>
              <p>E‑Mail: {info.email}</p>
              {info.opening_hours && <p>Öffnungszeiten: {info.opening_hours}</p>}
              {info.transport_howto && <p>Anfahrt: {info.transport_howto}</p>}
            </div>
          )}

          <div className="mt-6 aspect-video rounded-2xl overflow-hidden border border-white/10">
            <iframe
              title="Map"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2653.224!2d16.361!3d48.196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDExJzQ1LjYiTiAxNsKwMjEnNDkuNiJF!5e0!3m2!1sde!2sat!4v1680000000000"
            />
          </div>
        </div>

        <div className="bg-gradient-to-b from-stone-900/70 to-stone-900/40 border border-white/10 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-rose-50">Schreib uns</h3>
          <div className="mt-4 grid grid-cols-1 gap-3">
            <input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="Dein Name" className="bg-white/10 text-rose-50 placeholder-rose-200/60 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-rose-500/50" />
            <input value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} placeholder="E‑Mail" className="bg-white/10 text-rose-50 placeholder-rose-200/60 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-rose-500/50" />
            <input value={form.subject} onChange={e=>setForm(f=>({...f,subject:e.target.value}))} placeholder="Betreff" className="bg-white/10 text-rose-50 placeholder-rose-200/60 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-rose-500/50" />
            <textarea value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))} rows={5} placeholder="Nachricht" className="bg-white/10 text-rose-50 placeholder-rose-200/60 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-rose-500/50" />
            <button onClick={send} className="bg-rose-500/90 hover:bg-rose-500 text-white font-semibold px-4 py-2 rounded-md transition-colors">Senden</button>
            {status && <div className="text-rose-100/90">{status}</div>}
          </div>
        </div>
      </div>
    </section>
  )
}
