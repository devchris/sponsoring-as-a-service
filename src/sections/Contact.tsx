export default function Contact() {
    return (
        <section id="contact" className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Kontakt</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Haben Sie Fragen zu unserem Service? Möchten Sie als Verein oder Sponsor teilnehmen?
                        Kontaktieren Sie uns noch heute!
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                    <div className="bg-white rounded-xl shadow-sm p-8">
                        <h3 className="text-2xl font-bold mb-6">Schreiben Sie uns</h3>
                        <form>
                            <div className="grid grid-cols-1 gap-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                        placeholder="Ihr Name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        E-Mail
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                        placeholder="ihre-email@beispiel.de"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                                        Ich bin...
                                    </label>
                                    <select
                                        id="type"
                                        name="type"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                    >
                                        <option value="">Bitte auswählen</option>
                                        <option value="club">Verein</option>
                                        <option value="sponsor">Potentieller Sponsor</option>
                                        <option value="other">Andere Anfrage</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                        Nachricht
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={4}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                        placeholder="Ihre Nachricht an uns"
                                    ></textarea>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="w-full bg-primary text-white font-semibold py-3 px-6 rounded-lg shadow hover:bg-primary/90 transition"
                                    >
                                        Nachricht senden
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div>
                        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
                            <h3 className="text-2xl font-bold mb-6">Kontaktinformationen</h3>
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                                        <svg
                                            className="w-5 h-5 text-primary"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500">Telefon</h4>
                                        <p className="text-gray-900">+49 (0) 123 456 789</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                                        <svg
                                            className="w-5 h-5 text-primary"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500">E-Mail</h4>
                                        <p className="text-gray-900">info@sponsoring-as-a-service.de</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                                        <svg
                                            className="w-5 h-5 text-primary"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500">Adresse</h4>
                                        <p className="text-gray-900">Musterstraße 123<br />12345 Berlin</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-8">
                            <h3 className="text-xl font-bold mb-4">Geschäftszeiten</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Montag - Freitag:</span>
                                    <span className="font-medium">09:00 - 18:00 Uhr</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Samstag:</span>
                                    <span className="font-medium">Geschlossen</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Sonntag:</span>
                                    <span className="font-medium">Geschlossen</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
} 