import { PrismaClient } from '../app/generated/prisma/client'

const prisma = new PrismaClient()

const exceptionalHotels = [
    {
        title: "Stylish Hotel Stay in Tel Aviv",
        desc: "Stay near the vibrant Sarona Market in Tel Aviv. Modern comfort, excellent reviews (9.1/10), Wi-Fi, sauna & fitness included.",
        title_fr: "Séjour urbain de luxe à Tel-Aviv : Hôtel premium près du marché de Sarona dès 136€ / nuit",
        desc_fr: "Nous avons trouvé une excellente offre à Tel-Aviv, l’une des villes les plus dynamiques d’Israël. Profitez d’un hôtel urbain haut de gamme, idéalement situé près du célèbre marché de Sarona, à partir de seulement 136€ par nuit. Cette offre combine emplacement stratégique, confort moderne et très bonnes évaluations clients.",
        address: "29 HaRakevet St, 6618306 Tel-Aviv",
        city: "Tel Aviv",
        country: "Israel",
        price_per_night: 136,
        currency: "EUR",
        rating: 9.1,
        review_count: 733,
        amenities: [
            "Wi-Fi gratuit",
            "Sauna",
            "Fitness center",
            "Pet-friendly",
            "Air conditioning",
            "Meeting spaces"
        ],
        check_in: "Flexible",
        check_out: "Flexible",
        notes: "Limited availability, book early recommended"
    },
    {
        title: "Leonardo Hotel Berlin",
        desc: "Enjoy a stay in the heart of Charlottenburg with free Wi-Fi, breakfast included, and modern rooms. From €71 per night.",
        title_fr: "Séjour confortable à Berlin Leonardo Hotel dès 71 €",
        desc_fr: "Profitez d’un séjour au cœur de Charlottenburg avec Wi-Fi gratuit, petit-déjeuner inclus et chambres modernes. Réservez dès maintenant à partir de 71 € par nuit pour une escapade inoubliable à Berlin !",
        address: "Wilmersdorfer Straße 32, 10585 Berlin",
        city: "Berlin",
        country: "Germany",
        price_per_night: 71,
        currency: "EUR",
        rating: 8.7,
        review_count: 11066,
        amenities: [
            "Wi-Fi gratuit",
            "Petit-déjeuner inclus",
            "Bar & restaurant",
            "EV charging station",
            "Accessible rooms",
            "Meeting spaces",
            "Non-smoking hotel"
        ],
        check_in: "14:00",
        check_out: "11:00",
        notes: "Central location in Charlottenburg, close to shops, restaurants and cultural attractions"
    },
    {
        title: "The Blasky Hotel",
        desc: "Luxury stay at The Blasky Hotel with Wi-Fi, breakfast included, and luxurious rooms. From €234 per night.",
        title_fr: "Escapade de luxe à l'hôtel The Blasky – Séjour dès 234 €",
        desc_fr: "Profitez d’un séjour haut de gamme à l’hôtel The Blasky avec Wi-Fi, petit-déjeuner inclus et chambres luxueuses. Réservez dès 234 € par nuit !",
        address: "Central city location (exact address not provided)",
        city: "Not specified",
        country: "Not specified",
        price_per_night: 234,
        currency: "EUR",
        rating: null,
        review_count: null,
        amenities: [
            "Wi-Fi gratuit",
            "Petit-déjeuner inclus",
            "Bar & restaurant",
            "Fitness & spa",
            "Concierge service",
            "Non-smoking",
            "Family & business friendly"
        ],
        check_in: "14:00",
        check_out: "11:00",
        notes: "Limited-time offer; central location"
    },
    {
        title: "Hôtel de Stars Astor & Aparthotel",
        desc: "Modern and comfortable stay with free Wi-Fi and premium services. From €181 per night.",
        title_fr: "Séjour élégant à l'Hôtel de Stars Astor & Aparthotel dès 181 €",
        desc_fr: "Profitez d’un séjour moderne et confortable à l’Hôtel de Stars Astor & Aparthotel avec Wi-Fi gratuit et services premium. À partir de 181 € par nuit !",
        address: "Central city location (exact address not provided)",
        city: "Not specified",
        country: "Not specified",
        price_per_night: 181,
        currency: "EUR",
        rating: null,
        review_count: null,
        amenities: [
            "Wi-Fi gratuit",
            "Petit-déjeuner disponible",
            "Reception 24h",
            "Non-smoking",
            "Family & business friendly",
            "Premium services"
        ],
        check_in: "14:00",
        check_out: "11:00",
        notes: "Limited-time offer; central location"
    },
    {
        title: "Mobil-home with Terrace",
        desc: "Comfortable mobile home for 4 people with terrace, bright living room, 2 bedrooms. 7 nights from €224.",
        title_fr: "Escapade en mobil-home avec terrasse 7 nuits dès 224 €",
        desc_fr: "Profitez d’un mobil-home confortable pour 4 personnes avec terrasse, séjour lumineux et 2 chambres. 7 nuits du 6 au 13 juin dès 224 € !",
        address: "Exact location not provided",
        city: "Not specified",
        country: "Not specified",
        price_per_night: 32, // 224€/7 nights = ~32€ per night
        total_price: 224,
        currency: "EUR",
        rating: null,
        review_count: null,
        amenities: [
            "Terrace",
            "2 bedrooms",
            "Bright living room",
            "Kitchen",
            "Non-smoking",
            "Family friendly"
        ],
        check_in: "6 June",
        check_out: "13 June",
        notes: "Limited availability, book quickly"
    }

]

async function main() {
    console.log('Start seeding...')
    for (const hotel of exceptionalHotels) {
        const result = await prisma.hotel.create({
            data: hotel,
        })
        console.log(`Created hotel with id: ${result.id}`)
    }
    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
