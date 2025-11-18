export default function About() {
  return (
    <section id="about" className="max-w-7xl mx-auto px-6 py-20 text-rose-50">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold">Ein Theater mit Geschichte</h2>
          <p className="mt-4 text-rose-100/90">
            Zwischen Samtvorhang und Messinglampe: Unser Haus ist klein, aber voller Geschichten.
            Seit den 1960ern beherbergt es Schabernack, Schmäh und spontane Juwelen.
            Heute treffen bei uns zeitgenössisches Kabarett und Improvisation auf das Flair alter
            Wiener Bühnen. Dazu gibt’s eine kleine Bar und einen Raum für Workshops.
          </p>
          <p className="mt-4 text-rose-100/80">
            Wir lieben das Verspielte, das Zarte, das Freche. Und das Publikum mittendrin.
            Komm vorbei – und bleib danach noch auf ein Getränk.
          </p>
        </div>
        <div className="bg-gradient-to-br from-rose-900/60 to-amber-900/40 border border-white/10 rounded-2xl overflow-hidden">
          <img src="https://images.unsplash.com/photo-1515165562835-c3b8c1ea0f59?q=80&w=1200&auto=format&fit=crop" alt="Samt und Bühne" className="w-full h-full object-cover mix-blend-luminosity" />
        </div>
      </div>
    </section>
  )
}
