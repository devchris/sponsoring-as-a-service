// import ClubhouseTransformation3D from "../components/ClubhouseTransformation3D";

export default function HowItWorks() {
    return (
        <section id="about" className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">So funktioniert&apos;s</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Unser Prozess ist einfach und transparent – für Vereine und Sponsoren.
                    </p>
                </div>

                {/* <ClubhouseTransformation3D /> */}

                <div className="relative">
                    {/* Subtle connecting line */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2"></div>

                    {/* Step 1 */}
                    <div className="relative flex flex-col md:flex-row items-center mb-16">
                        <div className="md:w-1/2 md:pr-16 mb-6 md:mb-0 md:text-right">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Vereinsanmeldung</h3>
                            <p className="text-gray-600">
                                Der Verein meldet sich an und legt seine gewünschte garantierte Jahreseinnahme fest.
                                Wir besprechen die Werbemöglichkeiten und Sichtbarkeit.
                            </p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-medium text-sm mb-6 md:mb-0 shadow-sm z-10">
                            1
                        </div>
                        <div className="md:w-1/2 md:pl-16"></div>
                    </div>

                    {/* Step 2 */}
                    <div className="relative flex flex-col md:flex-row items-center mb-16">
                        <div className="md:w-1/2 md:pr-16 mb-6 md:mb-0 md:text-right"></div>
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-medium text-sm mb-6 md:mb-0 shadow-sm z-10">
                            2
                        </div>
                        <div className="md:w-1/2 md:pl-16">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Sponsorengewinnung</h3>
                            <p className="text-gray-600">
                                Wir übernehmen die Sponsorensuche und Akquise in der Region.
                                Dank unseres Netzwerks erreichen wir passende Unternehmen schnell und effektiv.
                            </p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="relative flex flex-col md:flex-row items-center mb-16">
                        <div className="md:w-1/2 md:pr-16 mb-6 md:mb-0 md:text-right">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Vertragsabschluss</h3>
                            <p className="text-gray-600">
                                Der Verein erhält die garantierte Summe jährlich, unabhängig von den tatsächlich eingeworbenen Sponsorengeldern.
                                Die Sponsoren schließen langfristige Verträge mit attraktiven Werbepaketen ab.
                            </p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-medium text-sm mb-6 md:mb-0 shadow-sm z-10">
                            3
                        </div>
                        <div className="md:w-1/2 md:pl-16"></div>
                    </div>

                    {/* Step 4 */}
                    <div className="relative flex flex-col md:flex-row items-center">
                        <div className="md:w-1/2 md:pr-16 mb-6 md:mb-0 md:text-right"></div>
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-medium text-sm mb-6 md:mb-0 shadow-sm z-10">
                            4
                        </div>
                        <div className="md:w-1/2 md:pl-16">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Umsetzung & Reporting</h3>
                            <p className="text-gray-600">
                                Wir unterstützen bei der professionellen Umsetzung aller Werbemaßnahmen und liefern regelmäßige
                                Performance-Berichte an die Sponsoren.
                            </p>
                        </div>
                    </div>

                    {/* Success indicator */}
                    <div className="flex justify-center mt-16">
                        <div className="inline-flex items-center px-4 py-2 border border-gray-200 rounded-md text-primary">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            Erfolgreiche Partnerschaften für alle Beteiligten
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
} 