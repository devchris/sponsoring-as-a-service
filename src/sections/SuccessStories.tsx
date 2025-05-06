import ScrollReveal from "@/components/ScrollReveal";

export default function SuccessStories() {
    const stories = [
        {
            club: "SV Blau-Weiß 1920",
            beforeAmount: "2.500 €",
            afterAmount: "8.000 €",
            quote: "Dank der Sponsoring-as-a-Service Lösung konnten wir unsere Sponsoringeinnahmen mehr als verdreifachen – und mussten uns um nichts kümmern!",
            person: "Michael Berger",
            role: "Vereinsvorsitzender"
        },
        {
            club: "TSG Adlershorst",
            beforeAmount: "1.800 €",
            afterAmount: "6.500 €",
            quote: "Der Unterschied ist enorm. Wir haben jetzt Planungssicherheit und können uns auf den Sport konzentrieren, statt Sponsoren zu suchen.",
            person: "Sandra Müller",
            role: "Schatzmeisterin"
        },
        {
            club: "FC Sportfreunde",
            beforeAmount: "3.200 €",
            afterAmount: "10.000 €",
            quote: "Die Professionalität hat unsere Sponsoren beeindruckt. Die Zusammenarbeit ist für alle Seiten ein Gewinn.",
            person: "Thomas Weber",
            role: "Abteilungsleiter Fußball"
        }
    ];

    return (
        <section className="py-16 bg-gray-50 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0"></div>
            <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-primary/5 blur-3xl"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <ScrollReveal animation="fadeIn">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Erfolgsgeschichten</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            So haben wir Vereinen zu mehr Einnahmen verholfen – mit garantierten Ergebnissen.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid md:grid-cols-3 gap-8">
                    {stories.map((story, index) => (
                        <ScrollReveal
                            key={story.club}
                            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                            animation="scaleIn"
                            delay={index * 200}
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xl font-bold text-gray-900">{story.club}</h3>
                                    <div className="bg-green-50 text-green-600 text-xs font-medium px-2 py-1 rounded-full">Erfolg</div>
                                </div>

                                <div className="flex justify-between mb-6">
                                    <div className="text-center">
                                        <p className="text-sm text-gray-500 mb-1">Vorher</p>
                                        <p className="text-lg font-semibold text-gray-700">{story.beforeAmount}</p>
                                    </div>

                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </div>

                                    <div className="text-center">
                                        <p className="text-sm text-gray-500 mb-1">Nachher</p>
                                        <p className="text-xl font-bold text-primary">{story.afterAmount}</p>
                                    </div>
                                </div>

                                <blockquote className="italic text-gray-600 border-l-4 border-primary/20 pl-4 py-2 mb-4">
                                    &ldquo;{story.quote}&rdquo;
                                </blockquote>

                                <div className="text-right">
                                    <p className="font-medium text-gray-900">{story.person}</p>
                                    <p className="text-sm text-gray-500">{story.role}</p>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                <ScrollReveal className="mt-12 text-center" delay={400}>
                    <a
                        href="#contact"
                        className="inline-block bg-primary text-white font-semibold py-3 px-8 rounded-lg shadow hover:shadow-lg hover:shadow-primary/30 hover:bg-primary/90 transition-all hover:-translate-y-1"
                    >
                        Auch so erfolgreich werden
                    </a>
                </ScrollReveal>
            </div>
        </section>
    );
} 