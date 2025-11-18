import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '#events', label: 'Programm' },
  { href: '#about', label: 'Theater' },
  { href: '#owners', label: 'Team' },
  { href: '#visit', label: 'Anfahrt & Kontakt' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed top-0 inset-x-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mt-6 backdrop-blur-md bg-black/30 border border-white/10 rounded-full shadow-lg">
          <div className="flex items-center justify-between px-4 py-2">
            <a href="#" className="text-rose-200 font-semibold tracking-widest uppercase text-sm">
              Kabarett Salon am Kanal
            </a>
            <div className="hidden md:flex items-center gap-6">
              {links.map(l => (
                <a key={l.href} href={l.href} className="text-rose-100/80 hover:text-rose-50 transition-colors">
                  {l.label}
                </a>
              ))}
              <a href="#events" className="bg-rose-500/80 hover:bg-rose-500 text-white px-4 py-1.5 rounded-full text-sm transition-colors">
                Jetzt Reservieren
              </a>
            </div>
            <button onClick={() => setOpen(v => !v)} className="md:hidden text-rose-50">
              {open ? <X /> : <Menu />}
            </button>
          </div>
          {open && (
            <div className="md:hidden px-4 pb-4 flex flex-col gap-3">
              {links.map(l => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-rose-100/90">
                  {l.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
