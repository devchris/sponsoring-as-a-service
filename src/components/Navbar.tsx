import Link from 'next/link';

export default function Navbar() {
    return (
        <header className="bg-neutral-50 shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0 flex items-center">
                            <span className="font-bold text-xl text-primary">Sponsoring-as-a-Service</span>
                        </Link>
                    </div>
                    <nav className="hidden md:flex space-x-8 items-center">
                        <Link href="#vereine" className="text-neutral-700 hover:text-primary transition px-3 py-2">
                            Für Vereine
                        </Link>
                        <Link href="#sponsoren" className="text-neutral-700 hover:text-primary transition px-3 py-2">
                            Für Sponsoren
                        </Link>
                        <Link href="#about" className="text-neutral-700 hover:text-primary transition px-3 py-2">
                            Über uns
                        </Link>
                        <Link
                            href="#contact"
                            className="bg-primary text-neutral-50 rounded-lg px-4 py-2 hover:bg-primary/90 transition"
                        >
                            Kontakt
                        </Link>
                    </nav>
                    <div className="flex items-center md:hidden">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-neutral-700 hover:text-primary"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Menü öffnen</span>
                            <svg
                                className="block h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
} 