'use client';
import Image from 'next/image';

const Newsletter = () => {
    return (
        <section className="py-16 px-4 md:px-8 bg-muted/40 border-y border-gray-100">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
                {/* Text and Form Content */}
                <div className="w-full md:w-1/2 space-y-6">
                    <div className="space-y-2">
                        <h2 className="text-3xl md:text-4xl font-bold text-primary">
                            Newsletter abonnieren
                        </h2>
                        <p className="text-lg text-gray-600">
                            Melde Dich hier für unseren kostenfreien Newsletter an, der Dich mit den besten Deals des Tages versorgt.
                        </p>
                    </div>

                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                placeholder="z.B. reisender@email.de"
                                className="grow px-6 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all text-gray-800 bg-white"
                                required
                            />
                            <button
                                type="submit"
                                className="btn btn-blue py-4 px-8 text-lg"
                            >
                                Anmelden
                            </button>
                        </div>

                        <label className="flex items-start gap-3 cursor-pointer group">
                            <div className="relative flex items-center mt-1">
                                <input
                                    type="checkbox"
                                    className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-300 transition-all checked:bg-secondary checked:border-secondary"
                                    required
                                />
                                <svg
                                    className="absolute h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </div>
                            <span className="text-sm text-gray-500 leading-tight">
                                Ich habe die <a href="#" className="text-secondary hover:underline">Datenschutzerklärung</a> gelesen und bin einverstanden, personalisierte Reiseangebote der Urlaubstracker GmbH per E-Mail zu erhalten. Abmeldung jederzeit möglich.
                            </span>
                        </label>
                    </form>
                </div>

                {/* Mascot Illustration */}
                <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                    <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
                        <Image
                            src="/newsletter-mascot.png" // We will move the generated image here
                            alt="Newsletter Mascot"
                            fill
                            className="object-contain drop-shadow-2xl animate-float"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
