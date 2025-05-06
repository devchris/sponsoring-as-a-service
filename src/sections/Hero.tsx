// components/Hero.tsx
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="bg-neutral-100 text-neutral-900 py-20 px-6 md:px-12 relative overflow-hidden">
      {/* Animated success gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 opacity-70"></div>

      {/* Glow circles */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-primary opacity-10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-secondary opacity-10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="inline-block animate-fadeIn">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            Marketing für Unternehmen.<br />
            Einnahmen für Vereine.<br />
            <span className="text-primary relative">
              Ohne Umwege.
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary animate-expand"></span>
            </span>
          </h1>
        </div>
        <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto animate-fadeIn" style={{ animationDelay: '0.3s' }}>
          Wir garantieren Sportvereinen feste Einnahmen – und übernehmen die Sponsorensuche
          mit professionellem Marketing für Unternehmen.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-5 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
          <Link
            href="#vereine"
            className="bg-primary text-neutral-50 font-semibold py-4 px-8 rounded-lg shadow hover:shadow-lg hover:bg-primary/90 transition-all transform hover:-translate-y-1 hover:shadow-primary/30"
          >
            Verein anmelden
          </Link>
          <Link
            href="#sponsoren"
            className="bg-neutral-50 text-primary border-2 border-primary font-semibold py-4 px-8 rounded-lg shadow hover:shadow-lg hover:bg-primary/10 transition-all transform hover:-translate-y-1 hover:shadow-primary/20"
          >
            Sponsor werden
          </Link>
        </div>
      </div>
    </section>
  );
}
