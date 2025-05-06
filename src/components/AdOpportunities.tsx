export default function AdOpportunities() {
    const opportunities = [
        {
            title: "Logo auf Vereins-Website",
            description: "Ständige Sichtbarkeit bei Besuchern und Fans."
        },
        {
            title: "Logo im E-Mail-Newsletter",
            description: "Direkte Ansprache der Mitglieder und Unterstützer."
        },
        {
            title: "Bannerwerbung bei Heimspielen",
            description: "Sichtkontakt mit Zuschauern vor Ort."
        },
        {
            title: "Trikot-Branding",
            description: "Hohe Wiedererkennung in Pressefotos und Live-Übertragungen."
        },
        {
            title: "Werbebanden am Spielfeldrand",
            description: "Dauerhafte Präsenz während des Spiels und in Stadionführungen."
        },
        {
            title: "Social-Media-Posts",
            description: "Reichweitenstarke Ansprache junger Zielgruppen."
        },
        {
            title: "Namensrechte für Events/Turniere",
            description: "Exklusive Markenassoziation (\"Sponsor X Cup\")."
        },
        {
            title: "Logo auf Fanartikeln",
            description: "Mobile Werbung durch Fans im Alltag."
        },
        {
            title: "Werbung auf Eintrittskarten",
            description: "Jeder Ticketinhaber sieht das Logo."
        },
        {
            title: "Anzeigen im Spieltagsprogramm",
            description: "Gedruckte Präsenz mit langer Verweildauer."
        },
        {
            title: "Verlinkung im digitalen Vereinsheft",
            description: "Klickbare Promotion direkt zu Ihrer Website."
        },
        {
            title: "Exklusive Social-Media-Übernahmen",
            description: "Direktmarketing über Vereinskanäle."
        }
    ];

    return (
        <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Werbemöglichkeiten für Sponsoren</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Als Sponsor profitieren Sie von einer Vielzahl an effektiven Werbemöglichkeiten,
                        die Ihre Marke sichtbar machen und Ihre Zielgruppe erreichen.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {opportunities.map((opportunity, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                                    <span className="text-primary font-semibold">{index + 1}</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{opportunity.title}</h3>
                                    <p className="text-gray-600">{opportunity.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <a
                        href="#contact"
                        className="inline-block bg-primary text-white font-semibold py-3 px-8 rounded-lg shadow hover:bg-primary/90 transition"
                    >
                        Mehr über Sponsoring-Möglichkeiten erfahren
                    </a>
                </div>
            </div>
        </section>
    );
} 