import "dotenv/config";
import prisma from "@/lib/prisma";

async function main() {
    const flights = [
        {
            title: "Vol Paris-Lyon avec Air France dès 60 € en économie",
            description: "Réservez votre vol Paris-Lyon avec Air France à partir de 60 €. Classe économique, sièges confortables et franchise bagages standard inclus !",
            airline: "Air France",
            departureCity: "Paris",
            arrivalCity: "Lyon",
            duration: "~1h30",
            price: 60,
            currency: "EUR",
            flightClass: "Économique",
            baggage: "Franchise standard incluse",
            services: JSON.stringify(["Sièges confortables", "Options de repas à bord selon vol", "Embarquement facile"]),
            whyAdore: JSON.stringify([
                "Vol direct entre Paris et Lyon pour gagner du temps",
                "Classe économique confortable avec sièges ergonomiques",
                "Franchise bagages standard incluse pour voyager léger ou avec valises",
                "Voyage flexible, idéal pour affaires ou loisirs",
                "Service fiable et expérience de vol sereine",
                "Offres limitées réservez rapidement pour garantir votre billet"
            ]),
            flexibleDates: true,
            extras: JSON.stringify({ bagages: "Inclus", service: "Fiable", flexibilite: "Options" }),
            tips: JSON.stringify([
                "Vérifiez les horaires et l’aéroport de départ exact avant de réserver",
                "Arrivez au moins 1h30 avant le départ pour les vols domestiques",
                "Préparez vos documents et bagages pour un embarquement rapide et facile"
            ]),
            offerLink: "https://booking.example.com/paris-lyon-60"
        },
        {
            title: "Vol Paris-Lyon avec Air France dès 103 €",
            description: "Réservez votre vol Paris-Lyon et profitez d’un voyage pratique et abordable entre deux grandes villes françaises. Ce vol inclut sièges confortables et bagages essentiels.",
            airline: "Air France",
            departureCity: "Paris",
            arrivalCity: "Lyon",
            duration: "~1h30",
            price: 103,
            currency: "EUR",
            flightClass: "Économique",
            baggage: "Bagages essentiels inclus",
            services: JSON.stringify(["Sièges confortables", "Embarquement facile"]),
            whyAdore: JSON.stringify([
                "Vol direct entre Paris et Lyon pour gagner du temps",
                "Sièges confortables pour un voyage agréable",
                "Bagages essentiels inclus pour voyager l’esprit tranquille",
                "Idéal pour voyages d’affaires ou de loisirs",
                "Expérience de vol flexible et fiable",
                "Offre limitée – réservez rapidement pour garantir votre billet"
            ]),
            flexibleDates: true,
            extras: JSON.stringify({ bagages: "Essentiels inclus", sieges: "Confortables" }),
            tips: JSON.stringify([
                "Vérifiez l’aéroport de départ exact avant de réserver",
                "Arrivez au moins 1h30 avant le départ pour un embarquement sans stress",
                "Préparez vos documents et bagages pour un vol serein"
            ]),
            offerLink: "https://booking.example.com/paris-lyon-103"
        },
        {
            title: "Billet Paris–Berlin dès 164 € Vol pratique avec bagage inclus",
            description: "Voyagez de Paris à Berlin à partir de 164 € par personne. Bagage à main inclus (8 kg), options de bagages en soute selon tarif.",
            airline: "Various",
            departureCity: "Paris",
            arrivalCity: "Berlin",
            duration: "~1h45",
            price: 164,
            currency: "EUR",
            flightClass: "Loisirs ou affaires",
            baggage: "1 bagage à main (55 × 35 × 20 cm, max. 8 kg)",
            services: JSON.stringify(["Sièges standards confortables", "Options de services variables selon la compagnie"]),
            whyAdore: JSON.stringify([
                "Trajet direct ou avec correspondance entre Paris et Berlin",
                "Prix attractif dès 164 € par personne",
                "Bagage à main inclus (55 × 35 × 20 cm, 8 kg)",
                "Voyage flexible, adapté aux séjours loisirs ou déplacements professionnels",
                "Connexion rapide entre deux grandes villes européennes",
                "Offre limitée selon les disponibilités – réservation recommandée"
            ]),
            flexibleDates: true,
            extras: JSON.stringify({ bagagesEnSoute: "En option" }),
            tips: JSON.stringify([
                "Vérifiez les conditions exactes de bagages avant paiement",
                "Arrivez à l’aéroport au moins 2 heures avant le départ",
                "Consultez les options de flexibilité si vos dates peuvent changer"
            ]),
            offerLink: "https://booking.example.com/paris-berlin-164"
        },
        {
            title: "Billet aller simple Paris–Milan dès 91 € – Bagages inclus",
            description: "Vol aller simple Paris–Milan à partir de 91 €. Bagage à main et bagage cabine inclus. Voyage flexible entre deux villes européennes.",
            airline: "Various",
            departureCity: "Paris",
            arrivalCity: "Milan",
            duration: "~1h30–1h45",
            price: 91,
            currency: "EUR",
            flightClass: "Loisirs ou affaires",
            baggage: "Bagage à main + bagage cabine (15 kg)",
            services: JSON.stringify(["Sièges standards confortables", "Services variables selon la compagnie aérienne"]),
            whyAdore: JSON.stringify([
                "Vol aller simple entre Paris et Milan",
                "Prix attractif dès 91 €",
                "Bagage à main + bagage cabine inclus (15 kg)",
                "Voyage flexible, adapté aux voyages d’affaires ou de loisirs",
                "Connexion rapide entre deux grandes villes européennes",
                "Offre soumise à disponibilité – réservation conseillée"
            ]),
            flexibleDates: true,
            extras: JSON.stringify({ bagageEnSoute: "En option" }),
            tips: JSON.stringify([
                "Vérifiez les conditions exactes de bagages avant paiement",
                "Arrivez à l’aéroport au moins 2 heures avant le départ",
                "Consultez l’itinéraire pour les options de bagages enregistrés"
            ]),
            offerLink: "https://booking.example.com/paris-milan-91"
        },
        {
            title: "Vol Paris–Lyon en classe affaires dès 631 € | Confort premium",
            description: "Voyagez de Paris à Lyon en classe affaires dès 631 €. Service prioritaire et 2 bagages cabine (2×8 kg) inclus pour un voyage premium.",
            airline: "Various",
            departureCity: "Paris",
            arrivalCity: "Lyon",
            duration: "~1h30",
            price: 631,
            currency: "EUR",
            flightClass: "Affaires",
            baggage: "2 bagages cabine (2 × 8 kg)",
            services: JSON.stringify(["Sièges spacieux et confortables", "Service dédié et prioritaire", "Expérience premium"]),
            whyAdore: JSON.stringify([
                "Vol Paris–Lyon en classe affaires",
                "Confort optimal avec sièges premium",
                "Service prioritaire (enregistrement et embarquement)",
                "Deux bagages cabine inclus (2 × 8 kg)",
                "Idéal pour les voyages d’affaires et les déplacements rapides",
                "Expérience de voyage élégante, efficace et sans stress"
            ]),
            flexibleDates: true,
            extras: JSON.stringify({ priority: "Service prioritaire", bagages: "2 bagages cabine" }),
            tips: JSON.stringify([
                "Profitez du service prioritaire pour gagner du temps à l’aéroport",
                "Vérifiez les conditions exactes liées au bagage en soute",
                "Arrivez à l’aéroport en avance pour une expérience fluide"
            ]),
            offerLink: "https://booking.example.com/paris-lyon-affaires-631"
        }
    ];

    for (const flight of flights) {
        await prisma.flight.create({
            data: {
                ...flight,
                services: JSON.parse(flight.services as string),
                whyAdore: JSON.parse(flight.whyAdore as string),
                extras: JSON.parse(flight.extras as string),
                tips: JSON.parse(flight.tips as string),
            },
        });
    }

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
