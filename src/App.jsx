import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Events from './components/Events'
import About from './components/About'
import Owners from './components/Owners'
import Visit from './components/Visit'

function App() {
  return (
    <div className="min-h-screen bg-[radial-gradient(80rem_40rem_at_50%_-10%,rgba(244,63,94,0.15),transparent_70%)] relative">
      <Navbar />
      <Hero />
      <Events />
      <About />
      <Owners />
      <Visit />
      <footer className="py-10 text-center text-rose-200/70">
        © {new Date().getFullYear()} Kabarett Salon am Kanal · Wien
      </footer>

      {/* subtle grain overlay for vintage charm */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.07] mix-blend-overlay" style={{backgroundImage:'url(https://grainy-gradients.vercel.app/noise.svg)'}} />
    </div>
  )
}

export default App
