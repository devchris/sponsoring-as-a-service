import Link from 'next/link';

export default function ForClubs() {
    return (
        <section id="vereine" className="py-16 bg-white relative">
            {/* Subtle gradient background */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-50 to-white"></div>

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12 opacity-0 animate-slideUp" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Für Sportvereine</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Wir garantieren euch eine feste jährliche Sponsoring-Einnahme – und kümmern uns um alles Weitere.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition duration-300 hover:bg-white hover:scale-105 transform opacity-0 animate-scaleIn" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 animate-float">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-primary"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Garantierte Einnahmen</h3>
                        <p className="text-gray-600">
                            Ihr erhaltet eine feste, jährliche Summe – unabhängig von der wirtschaftlichen Lage eurer Sponsoren.
                        </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition duration-300 hover:bg-white hover:scale-105 transform opacity-0 animate-scaleIn" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 animate-float" style={{ animationDelay: '0.2s' }}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-primary"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Zeitersparnis</h3>
                        <p className="text-gray-600">
                            Keine zeitaufwändige Sponsorensuche mehr. Wir übernehmen die Akquise und das Management für euch.
                        </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition duration-300 hover:bg-white hover:scale-105 transform opacity-0 animate-scaleIn" style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}>
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 animate-float" style={{ animationDelay: '0.4s' }}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-primary"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Professionelles Marketing</h3>
                        <p className="text-gray-600">
                            Eure Sponsoren erhalten ein professionelles Marketing-Paket – für langfristige, erfolgreiche Partnerschaften.
                        </p>
                    </div>
                </div>

                <div className="mt-12 text-center opacity-0 animate-fadeIn" style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}>
                    <Link
                        href="#contact"
                        className="inline-block bg-primary text-white font-semibold py-3 px-8 rounded-lg shadow hover:shadow-lg hover:shadow-primary/30 hover:bg-primary/90 transition-all transform hover:-translate-y-1"
                    >
                        Jetzt als Verein anmelden
                    </Link>
                </div>
            </div>
        </section>
    );
} 