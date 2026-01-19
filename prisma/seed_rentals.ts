import prisma from "@/lib/prisma";

const rentalData = [
    {
        category: "car",
        title: "Location Voiture Majorque Tout Compris dès 6€/jour Offre Pas Chère 2026",
        description: "Louez une voiture à Majorque dès 6€/jour avec assurance et taxes incluses. Formule tout compris, Fiat Panda ou similaire. Offres 2026 Réservez sans frais cachés!",
        mainHeading: "Location sans souci: 4 jours à Majorque avec voiture tout compris à partir de seulement 6 €/jour",
        mainDescription: "Profitez d'une escapade à Majorque sans stress grâce à notre formule tout compris. Réservez votre voiture et partez à la découverte de l'île en toute liberté ! Avec ce deal, vous pouvez louer une Fiat Panda ou un modèle similaire pendant 4 jours pour seulement 6 € par jour, tout inclus : pas de surprises, pas de frais cachés, juste un séjour réussi et relaxant.",
        offer: {
            vehicle: "Fiat Panda ou modèle similaire",
            duration: "4 jours (29 janvier – 2 février 2026)",
            included: "assurance, taxes et frais inclus",
            pricePerDay: 6,
            currency: "€",
            highlights: "Idéal pour explorer Majorque en toute liberté et profiter de l'île à votre rythme"
        },
        whySuperDeal: "Les locations de voitures tout compris à Majorque coûtent généralement beaucoup plus cher, surtout avec assurance et taxes incluses. Cette formule \"sans tracas\" vous permet de profiter pleinement de votre séjour sans vous soucier de rien.",
        thingsToDo: [
            "Explorer les plages et criques secrètes de l'île",
            "Découvrir les villages pittoresques comme Valldemossa et Sóller",
            "Profiter de la gastronomie locale dans les restaurants typiques",
            "Faire une excursion dans la Serra de Tramuntana pour les amoureurs de nature et randonnée"
        ],
        additionalInfo: {
            vehicleType: "Fiat Panda ou équivalent",
            included: "assurance complète, taxes et frais supplémentaires",
            pickup: "à votre arrivée à Majorque, facile et rapide",
            options: ["GPS", "siège enfant", "conducteur supplémentaire"],
            pricePerDay: "6 € / jour"
        },
        ecoTip: "Vous pouvez compenser vos émissions CO2 pour un voyage plus respectueux de l'environnement via atmosfair."
    },
    {
        category: "car",
        title: "Location voiture Majorque dès 2 €/jour Offre tout compris 4 jours",
        description: "Profitez d'une location de voiture à Majorque dès seulement 2 €/jour. Fiat 500 tout compris avec assurance et taxes incluses. Offre 4 jours idéale pour explorer l'île. Réservez maintenant !",
        mainHeading: "Offre de location de voiture imbattable à Majorque : 4 jours au volant dès seulement 2 €/jour !",
        mainDescription: "Découvrez Majorque avec style grâce à notre offre de location de voiture ultra-économique. Profitez de 4 jours (du 29 janvier au 2 février 2026) au volant d'une Fiat 500 ou d'un modèle similaire, parfait pour explorer l'île en toute liberté. Compacte, maniable et très économique, c'est le choix idéal pour profiter au maximum de Majorque sans se ruiner.",
        offer: {
            vehicle: "Fiat 500 ou modèle similaire",
            duration: "4 jours",
            included: "assurance, taxes et frais inclus",
            pricePerDay: 2,
            currency: "€",
            highlights: "Idéal pour explorer Majorque en toute simplicité et se déplacer facilement partout sur l'île"
        },
        whySuperDeal: "Les locations de voitures à Majorque coûtent généralement bien plus cher, surtout lorsqu'elles incluent assurance et frais additionnels. À seulement 2 € / jour, cette offre est tout simplement exceptionnelle. Une option parfaite pour profiter de l'île sans contraintes et à mini-budget.",
        thingsToDo: [
            "Explorer les plages magnifiques et les criques secrètes de Majorque",
            "Visiter les villages emblématiques comme Valldemossa et Sóller",
            "Découvrir la gastronomie locale dans les petits restaurants typiques",
            "Partir en excursion dans la Serra de Tramuntana, idéale pour randonnée et panoramas"
        ],
        additionalInfo: {
            vehicleType: "Fiat 500 ou équivalent",
            included: "assurance complète, taxes et frais supplémentaires",
            pickup: "facile et rapide à votre arrivée à Majorque",
            options: ["GPS", "siège enfant", "conducteur additionnel"],
            pricePerDay: "2 € / jour"
        },
        ecoTip: "Vous pouvez compenser vos émissions CO₂ pour un voyage plus responsable via atmosfair."
    },
    {
        category: "car",
        title: "Location Range Rover Sport à Majorque – SUV de luxe dès 450 €/jour",
        description: "Louez un Range Rover Sport à Majorque dès 450 €/jour. SUV de luxe, boîte automatique, 5 places, 150 km/jour et assurance incluse. Réservez votre véhicule premium dès maintenant.",
        mainHeading: "Range Rover Sport de luxe Offre de location exclusive à partir de 450€/jour",
        mainDescription: "Découvrez un confort, une puissance et une élégance incomparables grâce à notre offre de location premium. Conduisez un Range Rover Sport dernière génération et profitez d'une expérience de conduite haut de gamme ! Avec cette offre, vous bénéficiez d'un SUV de luxe à partir de 450 € par jour, équipé d'une boîte automatique, d'un moteur essence performant et d'un espace généreux pour 5 passagers. Une option idéale pour les conducteurs exigeants souhaitant parcourir Majorque avec style.",
        offer: {
            vehicle: "Range Rover Sport (SUV premium)",
            transmission: "Boîte automatique",
            fuel: "moteur essence puissant et performant",
            capacity: "5 places + grand volume de coffre",
            conditions: "conducteur de plus de 23 ans requis",
            pricePerDay: 450,
            currency: "€",
            deposit: "4 000 €",
            mileage: "150 km / jour",
            highlights: "Idéal pour une conduite confortable, élégante et sécurisée à travers toute l'île de Majorque"
        },
        whySuperDeal: "Les SUV de luxe comme le Range Rover Sport coûtent habituellement beaucoup plus cher à la location, surtout avec des performances premium et un package kilométrique généreux. Cette offre exclusive vous permet de profiter d'un véhicule haut de gamme à un prix extrêmement concurrentiel pour ce segment.",
        thingsToDo: [
            "Se rendre dans les plus belles criques cachées de l'île",
            "Visiter des villages prestigieux comme Deià ou Port d'Andratx",
            "Profiter des routes panoramiques de la Serra de Tramuntana",
            "Voyager confortablement en ville comme en pleine nature",
            "Transporter bagages & équipement facilement grâce au grand coffre"
        ],
        additionalInfo: {
            vehicleType: "Range Rover Sport (SUV premium)",
            included: "assurance de base, 150 km / jour, assistance",
            pickup: "rapide et simple à l'arrivée à Majorque",
            options: ["conducteur supplémentaire", "GPS", "sièges enfant"],
            pricePerDay: "450 € / jour",
            deposit: "4 000 € (remboursable)"
        },
        ecoTip: "Vous pouvez compenser vos émissions CO₂ pour une conduite plus responsable via atmosfair."
    },
    {
        category: "car",
        title: "Location Mustang GT Louez une voiture sportive dès 289 €/jour",
        description: "Louez la Mustang GT et profitez de plus de 450 ch pour une expérience sportive unique. Boîte manuelle, 250 km/jour inclus. À partir de 289 €/jour. Réservez maintenant !",
        mainHeading: "Louez la légendaire Mustang GT Puissance et sensations fortes garanties à partir de 289 €/jour",
        mainDescription: "Libérez plus de 450 chevaux au volant d'une véritable icône du sport automobile. Cette Mustang GT à boîte manuelle, quatre places, vous offre une expérience de conduite inoubliable. Équipée de nombreuses options haut de gamme – climatisation, régulateur de vitesse, ABS, airbags – et incluant 250 km par jour, cette offre est disponible à partir de 289 €/jour, réservée aux conducteurs de 23 ans et plus.",
        offer: {
            vehicle: "Mustang GT (boîte manuelle, 4 places)",
            power: "plus de 450 chevaux – sensations fortes garanties",
            equipment: "climatisation, ABS, airbags, régulateur de vitesse",
            mileage: "250 km par jour",
            pricePerDay: 289,
            currency: "€",
            conditions: "réservé aux conducteurs de 23 ans et plus",
            highlights: "Idéal pour les passionnés d'automobile souhaitant vivre une expérience sportive authentique au volant d'une voiture mythique"
        },
        whySuperDeal: "Les locations de voitures sportives de cette catégorie sont souvent bien plus coûteuses, surtout lorsqu'elles incluent autant d'options premium. Cette Mustang GT propose un excellent rapport puissance/prix et assure une expérience de conduite exceptionnelle, sans frais cachés.",
        thingsToDo: [
            "Explorer les plus belles routes panoramiques pour profiter pleinement des performances du V8",
            "Découvrir des lieux emblématiques et prendre des photos incroyables avec cette icône automobile",
            "Profiter des longues lignes droites, idéales pour ressentir toute la puissance du moteur",
            "Vivre une expérience unique, que ce soit pour un week-end, un événement ou un road trip sportif"
        ],
        additionalInfo: {
            vehicleType: "Mustang GT boîte manuelle",
            equipment: "climatisation, ABS, airbags, régulateur de vitesse",
            mileage: "250 km / jour",
            pickup: "simple & rapide selon le lieu de prise en charge",
            options: ["conducteur additionnel", "assurance renforcée", "équipements supplémentaires"],
            pricePerDay: "289 € / jour"
        },
        ecoTip: "Si vous souhaitez rendre votre expérience plus responsable, vous pouvez compenser vos émissions CO₂ via atmosfair."
    },
    {
        category: "car",
        title: "Location voiture de fonction 2 places dès 25€/jour Compacte pro",
        description: "Louez une voiture de fonction compacte 2 places dès 25€/jour. Grand espace de chargement, 3 portes, boîte manuelle. Idéale pour les déplacements professionnels. Réservez maintenant.",
        mainHeading: "Voiture de fonction compacte 2 places pour des déplacements professionnels efficaces à partir de 25€ / jour",
        mainDescription: "Bénéficiez d'une performance fiable avec notre voiture de fonction 2 places à boîte manuelle. Dotée de 3 portes, d'un espace généreux pouvant accueillir jusqu'à 10 valises et d'un rapport qualité-prix imbattable à partir de seulement 25 € par jour (TVA incluse), elle représente la solution idéale pour les professionnels recherchant efficacité, confort et praticité sans compromis.",
        offer: {
            vehicle: "voiture de fonction compacte 2 places, boîte manuelle",
            capacity: "jusqu'à 10 valises grâce à un grand espace arrière",
            design: "modèle 3 portes, pratique et maniable pour les déplacements pros",
            included: "TVA incluse dans le prix",
            pricePerDay: 25,
            currency: "€",
            idealFor: "missions professionnelles, déplacements rapides, transport de matériel léger"
        },
        whySuperDeal: "Les voitures utilitaires compactes adaptées aux déplacements professionnels sont souvent beaucoup plus coûteuses, surtout lorsqu'elles offrent un espace de chargement aussi généreux. Cette option combine prix attractif, fiabilité et praticité – parfaite pour les pros exigeants.",
        thingsToDo: [
            "Effectuer des tournées clients efficacement",
            "Transporter du matériel or des documents professionnels",
            "Assurer vos déplacements sur chantier ou entre bureaux",
            "Profiter d'une consommation réduite sur des trajets réguliers",
            "Gagner du temps grâce à un véhicule compact facile à garer en ville"
        ],
        additionalInfo: {
            vehicleType: "compacte 2 places, boîte manuelle",
            included: "TVA, assurance de base, frais standards",
            pickup: "au centre de location ou à l'aéroport selon disponibilité",
            options: ["GPS", "conducteur additionnel", "équipements business"],
            pricePerDay: "25 € / jour"
        },
        ecoTip: "Vous pouvez compenser vos émissions CO₂ pour un déplacement professionnel plus durable via atmosfair."
    },
    {
        category: "car",
        title: "Location Minibus 9 Places dès 69,49€/jour | Confort & Voyage en Groupe",
        description: "Louez un minibus 9 places Cat L dès 69,49€/jour. Idéal familles & groupes, grand espace bagages, options GPS & sièges enfants. Voyager ensemble confortablement !",
        mainHeading: "Voyagez ensemble tout confort: Minibus 9 places Cat L à partir de 69,49€/jour",
        mainDescription: "Profitez d'un véhicule spacieux et idéal pour les voyages en groupe ! Avec ce deal, vous pouvez louer un minibus 9 places catégorie L, équipé d'une boîte manuelle pouvant accueillir jusqu'à 9 valises. Une solution parfaite pour les familles nombreuses, les road-trips entre amis ou les déplacements professionnels de groupe. Le tout à partir de 69,49 € par jour, TVA incluse. Réservez sans attendre et partez ensemble en toute tranquillité.",
        offer: {
            vehicle: "Minibus 9 places Catégorie L (boîte manuelle)",
            capacity: "Jus'à 9 passagers + 9 valises",
            included: "TVA incluse, pas de frais cachés",
            pricePerDay: 69.49,
            currency: "€",
            idealFor: ["Voyages en famille", "Groupes d'amis", "Aventures routières", "Déplacements de groupe pratiques et confortables"]
        },
        whySuperDeal: "Louer un minibus 9 places coûte souvent bien plus cher, surtout pour les grands groupes. Avec cette formule, vous bénéficiez d'un excellent rapport qualité-prix, d'un maximum d'espace et d'une grande flexibilité pour organiser vos trajets ensemble, sans avoir à réserver plusieurs voitures.",
        thingsToDo: [
            "Explorer l'île ou la région tous ensemble sans se séparer",
            "Transporter facilement bagages, équipements de sport ou matériel",
            "Organiser des excursions en groupe",
            "Profiter d'un road-trip convivial, pratique et économique"
        ],
        additionalInfo: {
            vehicleType: "Minibus 9 places – Cat L, boîte manuelle",
            included: "TVA, véhicule entièrement fonctionnel avec grande capacité bagages",
            pickup: "Facile, rapide et adapté aux groupes",
            options: ["GPS", "sièges enfants", "conducteur supplémentaire"],
            pricePerDay: "69,49 € / jour"
        },
        ecoTip: "Pour voyager de manière plus responsable, vous pouvez compenser vos émissions de CO₂ via atmosfair."
    },
    {
        category: "car",
        title: "Location BMW Série 4 Gran Coupé – Luxe & Performance dès 51,84 €/jour",
        description: "Découvrez la BMW Série 4 Gran Coupé ou modèle similaire pour vos voyages d'affaires ou de loisirs. Confort, élégance et performance sont au rendez-vous. Offre flexible dès 51,84 €/jour avec annulation gratuite et options de paiement pratiques.",
        mainHeading: "Luxe et performance: BMW Série 4 Gran Coupé à partir de seulement 51,84 €/jour",
        mainDescription: "Profitez d'une expérience de conduite premium avec la BMW Série 4 Gran Coupé ou modèle similaire, idéale aussi bien pour les voyages d'affaires que de loisirs. Confort, élégance et performance sont au rendez-vous avec ce véhicule Full-Size Elite. À partir de 51,84 € par jour, bénéficiez d'une offre flexible et sans stress, avec options de paiement pratiques et annulation gratuite.",
        offer: {
            vehicle: "BMW Série 4 Gran Coupé ou modèle similaire (Full-Size Elite)",
            capacity: "5 passagers, 5 portes",
            transmission: "Automatique",
            luggage: "2 valises + 3 sacs",
            pricePerDay: 51.84,
            totalPrice: 207.35,
            currency: "€",
            highlights: "Idéal pour un voyage premium alliant confort, style et liberté"
        },
        whySuperDeal: "Les véhicules de cette catégorie sont généralement proposés à des tarifs bien plus élevés. Cette offre combine luxe, flexibilité et excellent rapport qualité-prix, avec en plus la possibilité de payer maintenant ou au moment de la prise en charge, sans frais cachés.",
        thingsToDo: [
            "Voyager confortablement pour des rendez-vous professionnels",
            "Profiter d'un road trip haut de gamme",
            "Explorer la ville et ses environs avec style",
            "Voyager en famille ou entre amis with un maximum d'espace"
        ],
        additionalInfo: {
            vehicleType: "BMW Série 4 Gran Coupé ou équivalent",
            mileage: "1 000 km inclus",
            unlimitedMileageOption: "+2,04 € / jour",
            minAge: "18 ans",
            paymentOptions: "payer maintenant ou au retrait du véhicule",
            cancellation: "gratuite",
            pricePerDay: "51,84 € / jour"
        },
        ecoTip: "Vous pouvez compenser vos émissions CO₂ pour un voyage plus responsable via atmosfair."
    },
    {
        category: "car",
        title: "Location de voiture à Majorque : Audi A1 Automatique 4 jours dès 29,98 €/jour",
        description: "Explorez Majorque en toute liberté avec notre location Audi A1 Sportback ou équivalent, boîte automatique, kilométrage illimité et réservation flexible dès 29,98 €/jour. Parfait pour les plages, les villages pittoresques et Serra de Tramuntana.",
        mainHeading: "Formule Économique Elite Automatique : 4 jours à Majorque avec Audi A1 Sportback ou similaire à partir de 29,98 €/jour",
        mainDescription: "Profitez d'une escapade à Majorque avec confort et liberté grâce à notre formule Économie Élite tout compris. Louez une Audi A1 Sportback ou une berline similaire avec boîte automatique pendant 4 jours et bénéficiez d'un kilométrage illimité, d'une réservation flexible et d'un prix avantageux à partir de 29,98 € par jour.",
        offer: {
            vehicle: "Audi A1 Sportback or modèle similaire",
            transmission: "Boîte automatique",
            capacity: "5 places, 5 portes",
            mileage: "Kilométrage illimité",
            flexibility: "Réservation flexible et annulation avec paiement ultérieur possible",
            minAge: "18 ans",
            pricePerDay: 29.98,
            currency: "€",
            highlights: "Idéal pour explorer Majorque avec confort et liberté"
        },
        whySuperDeal: "Les locations de voitures avec boîte automatique et kilométrage illimité sont généralement beaucoup plus chères. Cette formule Économie Elite vous permet de profiter d'un véhicule pratique et confortable tout en gardant un excellent rapport qualité-prix.",
        thingsToDo: [
            "Explorer les plages et criques secrètes de l'île",
            "Découvrir les villages pittoresques comme Valldemossa et Sóller",
            "Profiter de la gastronomie locale dans les restaurants typiques",
            "Faire une excursion dans la Serra de Tramuntana pour les amoureux de nature et randonnée"
        ],
        additionalInfo: {
            vehicleType: "Audi A1 Sportback ou équivalent",
            included: "assurance complète, taxes et frais supplémentaires",
            pickup: "à votre arrivée à Majorque, facile et rapide",
            options: ["GPS", "siège enfant", "conducteur supplémentaire"],
            pricePerDay: "29,98 € / jour"
        },
        ecoTip: "Vous pouvez compenser vos émissions CO2 pour un voyage plus respectueux de l'environnement via atmosfair."
    },
    {
        category: "car",
        title: "Location Nissan Micra Pas Cher dès 62,68€ / Jour | Réservation Facile",
        description: "Réservez une Nissan Micra ou équivalent dès 62,68€ par jour. Citadine économique, confortable et idéale pour la ville. Location simple, rapide et sans stress.",
        mainHeading: "Réservation sans souci : Nissan Micra à partir de seulement 62,68 € / jour",
        mainDescription: "Profitez d'une location de voiture simple et efficace avec la Nissan Micra, une citadine compacte idéale pour les déplacements urbains et les courts trajets. Grâce à cette offre, bénéficiez d'un excellent rapport qualité-prix à partir de 62,68 € par jour, pour une conduite confortable, économique et sans stress.",
        offer: {
            vehicle: "Nissan Micra ou modèle similaire",
            type: "Citadine compacte, économique et facile à conduire",
            comfort: "Intérieur moderne et agréable pour les trajets quotidiens",
            consumption: "Faible consommation de carburant",
            pricePerDay: 62.68,
            currency: "€",
            idealFor: "déplacements urbains, courts trajets et voyages pratiques"
        },
        whySuperDeal: "La Nissan Micra est reconnue pour sa fiabilité, son confort et sa faible consommation. Les locations de voitures de cette catégorie sont souvent plus chères, surtout avec des équipements modernes. Cette offre vous permet de rouler sereinement tout en maîtrisant votre budget.",
        thingsToDo: [
            "Se déplacer facilement en ville sans contraintes",
            "Profiter d'une conduite fluide et confortable",
            "Explorer les environs sans dépendre des transports publics",
            "Gagner du temps grâce à un véhicule maniable et pratique"
        ],
        additionalInfo: {
            vehicleType: "Nissan Micra ou équivalent",
            included: "équipements modernes pour un voyage agréable",
            usage: "idéale pour la ville et les trajets courts",
            options: ["GPS", "siège enfant", "conducteur additionnel (selon disponibilité)"],
            pricePerDay: "62,68 € / jour"
        },
        ecoTip: "Vous pouvez compenser vos émissions CO₂ pour un voyage plus respectueux de l'environnement via atmosfair."
    },
    {
        category: "motorbike",
        title: "Location Nissan Micra Pas Cher dès 62,68€ / Jour | Réservation Facile",
        description: "Réservez une Nissan Micra ou équivalent dès 62,68€ par jour. Citadine économique, confortable et idéale pour la ville. Location simple, rapide et sans stress.",
        mainHeading: "Réservation sans souci : Nissan Micra à partir de seulement 62,68 € / jour",
        mainDescription: "Profitez d'une location de voiture simple et efficace avec la Nissan Micra, une citadine compacte idéale pour les déplacements urbains et les courts trajets. Grâce à cette offre, bénéficiez d'un excellent rapport qualité-prix à partir de 62,68 € par jour, pour une conduite confortable, économique et sans stress.",
        offer: {
            vehicle: "Nissan Micra ou modèle similaire",
            type: "Citadine compacte, économique et facile à conduire",
            comfort: "Intérieur moderne et agréable pour les trajets quotidiens",
            consumption: "Faible consommation de carburant",
            pricePerDay: 62.68,
            currency: "€",
            idealFor: "déplacements urbains, courts trajets et voyages pratiques"
        },
        whySuperDeal: "La Nissan Micra est reconnue pour sa fiabilité, son confort et sa faible consommation. Les locations de voitures de cette catégorie sont souvent plus chères, surtout avec des équipements modernes. Cette offre vous permet de rouler sereinement tout en maîtrisant votre budget.",
        thingsToDo: [
            "Se déplacer facilement en ville sans contraintes",
            "Profiter d'une conduite fluide et confortable",
            "Explorer les environs sans dépendre des transports publics",
            "Gagner du temps grâce à un véhicule maniable et pratique"
        ],
        additionalInfo: {
            vehicleType: "Nissan Micra ou équivalent",
            included: "équipements modernes pour un voyage agréable",
            usage: "idéale pour la ville et les trajets courts",
            options: ["GPS", "siège enfant", "conducteur additionnel (selon disponibilité)"],
            pricePerDay: "62,68 € / jour"
        },
        ecoTip: "Vous pouvez compenser vos émissions CO₂ pour un voyage plus respectueux de l'environnement via atmosfair."
    },
    {
        category: "motorbike",
        title: "Location Nissan Micra Pas Cher dès 62,68€ / Jour | Réservation Facile",
        description: "Réservez une Nissan Micra ou équivalent dès 62,68€ par jour. Citadine économique, confortable et idéale pour la ville. Location simple, rapide et sans stress.",
        mainHeading: "Réservation sans souci : Nissan Micra à partir de seulement 62,68 € / jour",
        mainDescription: "Profitez d'une location de voiture simple et efficace avec la Nissan Micra, une citadine compacte idéale pour les déplacements urbains et les courts trajets. Grâce à cette offre, bénéficiez d'un excellent rapport qualité-prix à partir de 62,68 € par jour, pour une conduite confortable, économique et sans stress.",
        offer: {
            vehicle: "Nissan Micra ou modèle similaire",
            type: "Citadine compacte, économique et facile à conduire",
            comfort: "Intérieur moderne et agréable pour les trajets quotidiens",
            consumption: "Faible consommation de carburant",
            pricePerDay: 62.68,
            currency: "€",
            idealFor: "déplacements urbains, courts trajets et voyages pratiques"
        },
        whySuperDeal: "La Nissan Micra est reconnue pour sa fiabilité, son confort et sa faible consommation. Les locations de voitures de cette catégorie sont souvent plus chères, surtout avec des équipements modernes. Cette offre vous permet de rouler sereinement tout en maîtrisant votre budget.",
        thingsToDo: [
            "Se déplacer facilement en ville sans contraintes",
            "Profiter d'une conduite fluide et confortable",
            "Explorer les environs sans dépendre des transports publics",
            "Gagner du temps grâce à un véhicule maniable et pratique"
        ],
        additionalInfo: {
            vehicleType: "Nissan Micra ou équivalent",
            included: "équipements modernes pour un voyage agréable",
            usage: "idéale pour la ville et les trajets courts",
            options: ["GPS", "siège enfant", "conducteur additionnel (selon disponibilité)"],
            pricePerDay: "62,68 € / jour"
        },
        ecoTip: "Vous pouvez compenser vos émissions CO₂ pour un voyage plus respectueux de l'environnement via atmosfair."
    },
    {
        category: "motorbike",
        title: "Location Nissan Micra Pas Cher dès 62,68€ / Jour | Réservation Facile",
        description: "Réservez une Nissan Micra ou équivalent dès 62,68€ par jour. Citadine économique, confortable et idéale pour la ville. Location simple, rapide et sans stress.",
        mainHeading: "Réservation sans souci : Nissan Micra à partir de seulement 62,68 € / jour",
        mainDescription: "Profitez d'une location de voiture simple et efficace avec la Nissan Micra, une citadine compacte idéale pour les déplacements urbains et les courts trajets. Grâce à cette offre, bénéficiez d'un excellent rapport qualité-prix à partir de 62,68 € par jour, pour une conduite confortable, économique et sans stress.",
        offer: {
            vehicle: "Nissan Micra ou modèle similaire",
            type: "Citadine compacte, économique et facile à conduire",
            comfort: "Intérieur moderne et agréable pour les trajets quotidiens",
            consumption: "Faible consommation de carburant",
            pricePerDay: 62.68,
            currency: "€",
            idealFor: "déplacements urbains, courts trajets et voyages pratiques"
        },
        whySuperDeal: "La Nissan Micra est reconnue pour sa fiabilité, son confort et sa faible consommation. Les locations de voitures de cette catégorie sont souvent plus chères, surtout avec des équipements modernes. Cette offre vous permet de rouler sereinement tout en maîtrisant votre budget.",
        thingsToDo: [
            "Se déplacer facilement en ville sans contraintes",
            "Profiter d'une conduite fluide et confortable",
            "Explorer les environs sans dépendre des transports publics",
            "Gagner du temps grâce à un véhicule maniable et pratique"
        ],
        additionalInfo: {
            vehicleType: "Nissan Micra ou équivalent",
            included: "équipements modernes pour un voyage agréable",
            usage: "idéale pour la ville et les trajets courts",
            options: ["GPS", "siège enfant", "conducteur additionnel (selon disponibilité)"],
            pricePerDay: "62,68 € / jour"
        },
        ecoTip: "Vous pouvez compenser vos émissions CO₂ pour un voyage plus respectueux de l'environnement via atmosfair."
    },
    {
        category: "car",
        title: "Location voiture Paris-Orly dès 24,50€/jour | Europcar Aéroport",
        description: "Louez une voiture à l'aéroport de Paris-Orly dès 24,50€/jour avec Europcar. Véhicules modernes, service rapide, idéal pour les voyages pro et tourisme.",
        mainHeading: "Location sans souci : voiture à Paris-Orly à partir de seulement 24,50 €/jour",
        mainDescription: "Profitez d'une location de voiture pratique et fiable dès votre arrivée à l'aéroport de Paris-Orly. Grâce à cette offre avec Europcar, bénéficiez d'un large choix de véhicules modernes et bien entretenus, idéals aussi bien pour les déplacements professionnels que pour les séjours touristiques. Une solution flexible et sans stress pour voyager en toute liberté.",
        offer: {
            rentalAgency: "Europcar",
            pickupLocation: "Aéroport de Paris-Orly",
            vehicleSelection: "Large choix de véhicules modernes et récents",
            service: "Service rapide et fiable à l'aéroport",
            pricePerDay: 24.50,
            currency: "€",
            idealFor: "les voyages d'affaires et les escapades touristiques"
        },
        whySuperDeal: "Les locations de voiture à l'aéroport de Paris-Orly sont souvent plus chères, surtout avec des prestataires fiables. Cette offre Europcar combine qualité, flexibilité et prix compétitif, tout en garantissant un service professionnel et une assistance incluse pour un voyage sans souci.",
        thingsToDo: [
            "Explorer Paris et ses monuments emblématiques",
            "Se déplacer facilement pour des rendez-vous professionnels",
            "Découvrir les environs de Paris et l'Île-de-France",
            "Profiter d'une mobilité totale sans dépendre des transports publics"
        ],
        additionalInfo: {
            vehicleType: "selon disponibilité (citadine, compacte, etc.)",
            included: "assistance et services Europcar",
            pickup: "directement à l'aéroport de Paris-Orly",
            options: ["GPS", "siège enfant", "conducteur additionnel"],
            pricePerDay: "24,50 € / jour"
        },
        ecoTip: "Vous pouvez compenser vos émissions de CO₂ pour un voyage plus respectueux de l'environnement via atmosfair."
    },
    {
        category: "car",
        title: "Location Renault Mégane Électrique à Lyon Aéroport dès 22,79€/jour",
        description: "Louez une Renault Mégane électrique à l'aéroport de Lyon dès 22,79€/jour avec Europcar. Assurance incluse, écologique, idéale pour découvrir Lyon.",
        mainHeading: "Location sans souci: Renault Mégane électrique à Lyon dès 22,79 €/jour à l'aéroport",
        mainDescription: "Profitez d'une expérience de conduite moderne et écologique à Lyon grâce à cette offre de location sans tracas. Louez une Renault Mégane électrique avec Europcar directement à l'aéroport de Lyon et explorez la ville ainsi que ses environs en toute liberté. À partir de 22,79 € par jour, bénéficiez d'un véhicule silencieux, confortable et économique, idéal pour un séjour urbain ou professionnel.",
        offer: {
            vehicle: "Renault Mégane électrique",
            pickupLocation: "Aéroport de Lyon",
            included: "assurance, taxes et frais inclus selon conditions Europcar",
            pricePerDay: 22.79,
            currency: "€",
            highlights: "Idéal pour découvrir Lyon et ses alentours avec un véhicule propre et moderne"
        },
        whySuperDeal: "Les voitures électriques récentes comme la Renault Mégane sont généralement plus chères à la location, surtout à l'aéroport. Cette offre permet de profiter d'un véhicule haut de gamme, écologique et confortable, à un tarif très compétitif, avec le sérieux et le service client professionnel d'Europcar.",
        thingsToDo: [
            "Explorer le centre historique de Lyon et le Vieux-Lyon",
            "Découvrir la gastronomie lyonnaise et ses célèbres bouchons",
            "Se promener le long des quais du Rhône et de la Saône",
            "Faire une excursion dans les Monts du Lyonnais ou vers le Beaujolais"
        ],
        additionalInfo: {
            vehicleType: "Renault Mégane électrique",
            included: "assurance, taxes et frais supplémentaires selon conditions",
            pickup: "Aéroport de Lyon, rapide et pratique",
            options: ["GPS", "siège enfant", "conducteur additionnel"],
            pricePerDay: "22,79 € / jour"
        },
        ecoTip: "En choisissant une voiture électrique, vous réduisez votre impact environnemental. Vous pouvez également compenser vos émissions CO₂ pour un voyage encore plus responsable via atmosfair."
    },
    {
        category: "parking",
        title: "Parking Paris Centre Sécurisé | Q-Park Lobau Notre-Dame dès 328€",
        description: "Réservez votre parking sécurisé au cœur de Paris. Q-Park Lobau Hôtel de Ville Notre-Dame, accès 24h/24, emplacement central, dès 328€.",
        mainHeading: "Réservation de parking sans souci : Q-Park Lobau Hôtel de Ville Notre-Dame à partir de 328€",
        mainDescription: "Profitez d'un séjour à Paris en toute tranquillité grâce à cette offre de parking sécurisé et central. Avec cette réservation au Q-Park Lobau Hôtel de Ville Notre-Dame, votre véhicule est stationné en toute sécurité pendant que vous explorez la capitale. Service disponible 24h/24, accès facile et emplacement idéal à deux pas des sites emblématiques de Paris.",
        offer: {
            parkingName: "Q-Park Lobau – Hôtel de Ville Notre-Dame",
            location: "Centre de Paris, proche de Notre-Dame et de l'Hôtel de Ville",
            access: "24h/24 et 7j/7",
            security: "parking surveillé et sécurisé",
            price: 328,
            currency: "€",
            idealFor: "visiter Paris sans stress et sans souci de stationnement"
        },
        whySuperDeal: "Les parkings en centre-ville de Paris sont souvent très chers et difficiles d'accès. Avec cette réservation au Q-Park Lobau, vous bénéficiez d'un emplacement premium, sécurisé et pratique, à un prix clair, sans frais cachés. Une solution idéale pour profiter de Paris en toute sérénité.",
        thingsToDo: [
            "Visiter Notre-Dame de Paris, à quelques minutes à pied",
            "Découvrir le quartier animé de l'Hôtel de Ville",
            "Se promener le long de la Seine",
            "Explorer le Marais, ses boutiques et musées",
            "Profiter des cafés et restaurants parisiens typiques"
        ],
        additionalInfo: {
            parkingType: "Parking couvert et sécurisé",
            access: "entrée et sortie libres 24h/24",
            suitability: "séjours courts ou prolongés",
            idealFor: "voyageurs, touristes et déplacements urbains",
            totalPrice: "328 €"
        },
        ecoTip: "Vous pouvez réduire l'impact environnemental de votre séjour en privilégiant les déplacements à pied, à vélo ou en transports en commun depuis ce parking central."
    },
    {
        category: "parking",
        title: "Location Parking Paris Châtelet Forum des Halles dès 148 € | Yespark",
        description: "Réservez votre place de parking sécurisé à Paris – Châtelet – Forum des Halles dès 148 €. Accès 24/7, central et pratique pour visiter ou travailler.",
        mainHeading: "Location de parking Yespark à Paris Châtelet – Forum des Halles à partir de 148€",
        mainDescription: "Profitez d'un stationnement sans stress en plein cœur de Paris grâce à cette offre Yespark. Réservez votre place de parking à Châtelet – Forum des Halles et bénéficiez d'un emplacement central, sécurisé et facilement accessible. Idéal pour découvrir Paris, faire du shopping ou travailler en centre-ville sans vous soucier du stationnement.",
        offer: {
            location: "Paris – Châtelet – Forum des Halles",
            security: "Parking sécurisé et surveillé",
            access: "facile 24h/24 et 7j/7",
            booking: "Réservation simple et rapide avec Yespark",
            price: 148,
            currency: "€",
            idealFor: "résidents, professionnels et visiteurs du centre de Paris"
        },
        whySuperDeal: "Se garer à Paris, et surtout à Châtelet, peut être coûteux et compliqué. Cette location de parking Yespark vous permet de bénéficier d'un emplacement central à prix fixe, sans risque d'amende ni perte de temps à chercher une place.",
        thingsToDo: [
            "Explorer les boutiques du Forum des Halles",
            "Se promener dans le quartier du Marais",
            "Profiter des restaurants et cafés parisiens",
            "Accéder rapidement aux transports (RER, métro, bus)",
            "Visiter des sites emblématiques comme le Louvre ou le Centre Pompidou"
        ],
        additionalInfo: {
            type: "place de parking souterraine",
            security: "accès contrôlé et parking surveillé",
            access: "badge ou application mobile Yespark",
            duration: "location flexible selon vos besoins",
            price: "148 €"
        },
        ecoTip: "Stationner dans un parking sécurisé vous permet d'éviter le stress, les amendes et les risques liés au stationnement en voirie à Paris."
    },
    {
        category: "parking",
        title: "Meilleur Parking Serie A à Varsovie Parking Extérieur Sécurisé 8 Jours dès 29,90€",
        description: "Réservez votre parking extérieur sécurisé Serie A à Varsovie dès 29,90 € pour 8 jours. Profitez d'un emplacement pratique, sûr et économique, idéal pour visiter la ville sans stress. Garantissez votre place dès maintenant !",
        mainHeading: "Meilleur Parking Serie A: Parking extérieur à Varsovie à partir de 29,90€ / 8 journées",
        mainDescription: "Profitez d'un stationnement pratique et économique à Varsovie grâce à notre offre spéciale. Avec ce deal, vous pouvez réserver un parking extérieur sécurisé pendant 8 jours pour seulement 29,90 €, parfait pour visiter la ville sans stress et profiter de votre séjour en toute tranquillité.",
        offer: {
            parkingName: "Serie A Parking Extérieur",
            duration: "8 jours",
            price: 29.90,
            currency: "€",
            location: "Emplacement pratique et facile d'accès",
            idealFor: "découvrir Varsovie sans se soucier du stationnement"
        },
        whySuperDeal: "Les parkings sécurisés en centre-ville coûtent généralement beaucoup plus cher. Cette formule économique vous permet de garer votre véhicule en toute sécurité tout en profitant pleinement de votre visite à Varsovie.",
        thingsToDo: [
            "Explorer les principales attractions de Varsovie",
            "Profiter des restaurants, cafés et boutiques à proximité",
            "Visiter les monuments historiques et musées de la ville",
            "Se déplacer librement sans stress lié au stationnement"
        ],
        additionalInfo: {
            type: "Parking extérieur sécurisé Serie A",
            included: "surveillance et sécurité",
            access: "proche des axes principaux et des attractions",
            options: "réservation flexible selon vos besoins",
            price: "29,90 € pour 8 journées"
        },
        ecoTip: "Réservez votre place à l'avance pour garantir disponibilité et tranquillité d'esprit pendant votre séjour."
    },
    {
        category: "car",
        title: "Location de voiture à Paris dès 130€ | Offre tout compris Carigami",
        description: "Louez une voiture à Paris à partir de seulement 130€. Assurance, taxes et frais inclus. Offre Carigami flexible et sans stress pour découvrir Paris et ses environs en toute liberté.",
        mainHeading: "Location sans souci: voiture à Paris à partir de seulement 130€",
        mainDescription: "Profitez d'un séjour à Paris sans stress grâce à notre formule flexible et tout compris. Réservez votre voiture et explorez la capitale et ses environs en toute liberté ! Avec ce deal, vous pouvez louer une voiture adaptée à vos besoins pour seulement 130 €, tout inclus : pas de surprises, pas de frais cachés, juste un déplacement confortable et pratique.",
        offer: {
            vehicle: "large sélection de véhicules adaptés à tous vos besoins",
            duration: "selon votre réservation",
            included: "assurance, taxes et frais inclus",
            price: 130,
            currency: "€",
            idealFor: "découvrir Paris à votre rythme, pour le tourisme ou les déplacements professionnels"
        },
        whySuperDeal: "Les locations de voitures à Paris peuvent vite devenir coûteuses, surtout avec assurance et taxes incluses. Cette offre Carigami vous permet de voyager facilement et sans stress dans et autour de la capitale.",
        thingsToDo: [
            "Explorer les monuments emblématiques : Tour Eiffel, Louvre, Notre-Dame",
            "Découvrir les quartiers charmants comme Montmartre et Le Marais",
            "Profiter des cafés, restaurants et marchés typiques parisiens",
            "Faire des excursions dans les environs de Paris, comme Versailles ou Disneyland"
        ],
        additionalInfo: {
            vehicleType: "selon votre choix parmi la sélection Carigami",
            included: "assurance complète, taxes et frais supplémentaires",
            pickup: "facile à Paris, points de retrait pratiques",
            options: ["GPS", "siège enfant", "conducteur supplémentaire"],
            price: "130 €"
        },
        ecoTip: "Vous pouvez compenser vos émissions CO2 pour un voyage plus respectueux de l'environnement via atmosfair."
    },
    {
        category: "car",
        title: "Location de voiture Driveboo dès 11,29€ | Réservation simple & rapide",
        description: "Louez une voiture avec Driveboo à partir de seulement 11,29€. Large choix de véhicules récents, prix transparents, réservation rapide en ligne. Idéal pour les voyages, week-ends et déplacements urbains.",
        mainHeading: "Location de voiture Driveboo à partir de seulement 11,29€",
        mainDescription: "Profitez d'une location de voiture simple, rapide et économique grâce à Driveboo. Que ce soit pour un trajet urbain, un voyage d'affaires ou une escapade le temps d'un week-end, Driveboo propose des tarifs très attractifs à partir de 11,29 €, un large choix de véhicules bien entretenus et une réservation sans stress. Pas de complications, pas de mauvaises surprises : juste la voiture idéale pour votre trajet.",
        offer: {
            provider: "Driveboo",
            price: 11.29,
            currency: "€",
            vehicleSelection: "Large choix de véhicules (citadines, compactes, familiales, SUV)",
            vehicleCondition: "Véhicules récents et bien entretenus",
            booking: "Réservation simple et rapide en ligne",
            flexibility: "Options flexibles adaptées à vos besoins de conduite"
        },
        whySuperDeal: "Les locations de voiture peuvent vite devenir chères avec les frais supplémentaires et les options cachées. Avec Driveboo, vous bénéficiez de prix transparents, d'une comparaison claire entre de nombreux loueurs et d'offres compétitives pour trouver la meilleure option au meilleur prix.",
        thingsToDo: [
            "Se déplacer facilement en ville",
            "Partir en escapade le temps d'un week-end",
            "Explorer les environs à votre rythme",
            "Voyager confortablement sans dépendre des transports publics"
        ],
        additionalInfo: {
            vehicleType: "selon disponibilité (citadine, compacte, SUV, etc.)",
            included: "tarifs compétitifs et options claires",
            pickup: "selon l'agence choisie (aéroport ou centre-ville)",
            options: ["GPS", "siège enfant", "conducteur additionnel"],
            startingPrice: "11,29 €"
        },
        ecoTip: "Vous pouvez réduire l'impact environnemental de votre voyage en compensant vos émissions de CO₂ via atmosfair."
    },
    {
        category: "parking",
        title: "Parking Aéroport Pas Cher dès 2,30€/jour | Drive&Park Sécurisé",
        description: "Réservez un parking à l'aéroport sécurisé dès 2,30€ par jour avec Drive&Park. Accès rapide aux terminaux, idéal pour courts et longs séjours.",
        mainHeading: "Parking à l'aéroport à partir de seulement 2,30€ par jour",
        mainDescription: "Profitez d'un parking à l'aéroport économique et sans stress grâce au service Drive&Park. Stationnez votre véhicule en toute sécurité pendant votre voyage, que ce soit pour un court ou un long séjour. À partir de seulement 2,30 € par jour, bénéficiez d'une solution pratique, fiable et parfaitement adaptée aux voyageurs malins.",
        offer: {
            service: "Parking à l'aéroport avec Drive&Park",
            pricePerDay: 2.30,
            currency: "€",
            security: "parking surveillé et sécurisé",
            access: "facile et rapide aux terminaux",
            idealFor: "les voyages courts et longs"
        },
        whySuperDeal: "Les parkings officiels des aéroports sont souvent très chers, surtout pour les longs séjours. Avec Drive&Park, vous économisez considérablement tout en profitant d'un service fiable, sécurisé et sans mauvaises surprises. C'est la solution idéale pour voyager l'esprit tranquille.",
        thingsToDo: [
            "Stationner votre véhicule en toute sécurité avant votre vol",
            "Profiter d'un accès rapide et pratique à l'aéroport",
            "Voyager sans stress en sachant que votre voiture est bien gardée",
            "Économiser sur les frais de stationnement"
        ],
        additionalInfo: {
            serviceType: "Parking extérieur sécurisé",
            included: "surveillance, accès facile et service fiable",
            location: "à proximité immédiate de l'aéroport",
            suitability: "courts et longs séjours",
            pricePerDay: "2,30 € / jour"
        },
        ecoTip: "En choisissant un parking organisé et optimisé comme Drive&Park, vous contribuez à une meilleure gestion de l'espace et à une réduction du trafic inutile autour des aéroports."
    },
    {
        category: "parking",
        title: "Parking Aéroport Mulhouse Sécurisé + Navette dès 80,96€ | Looking4Parking",
        description: "Réservez un parking souterrain sécurisé à l'Aéroport de Mulhouse avec navette incluse dès 80,96€. Accès rapide au terminal, parking surveillé à l'Hôtel ibis. Offre idéale pour courts et longs séjours avec Looking4Parking.",
        mainHeading: "Parking + navette: stationnement sécurisé à l'Aéroport de Mulhouse à partir de seulement 80,96€",
        mainDescription: "Profitez d'un départ sans stress depuis l'aéroport de Mulhouse grâce à ce parking souterrain avec navette inclus. Réservez votre place à l'Hôtel ibis Aéroport de Mulhouse avec Looking4Parking et voyagez l'esprit tranquille. Sécurité, confort et praticité sont garantis, à partir de 80,96 € seulement.",
        offer: {
            parkingName: "Parking souterrain de l'Hôtel ibis Aéroport de Mulhouse",
            service: "Parking sécurisé + navette aéroport",
            access: "facile et rapide à l'aéroport",
            parkingType: "couvert et surveillé",
            price: 80.96,
            currency: "€",
            idealFor: "les voyages courts ou longs au départ de Mulhouse"
        },
        whySuperDeal: "Les parkings proches de l'aéroport de Mulhouse sont souvent chers et rapidement complets. Cette offre combine un parking souterrain sécurisé et un service de navette rapide, généralement bien plus coûteux lorsqu'ils sont réservés séparément. Une solution pratique et économique pour voyager sereinement.",
        thingsToDo: [
            "Garer votre véhicule en toute sécurité dans un parking couvert",
            "Profiter d'un transfert rapide en navette jusqu'au terminal",
            "Éviter les frais élevés de stationnement longue durée à l'aéroport",
            "Partir en voyage sans stress ni perte de temps"
        ],
        additionalInfo: {
            parkingType: "Souterrain",
            security: "Parking surveillé et sécurisé",
            shuttle: "Incluse, rapide et pratique vers l'aéroport",
            location: "Hôtel ibis – Aéroport de Mulhouse",
            provider: "Looking4Parking",
            price: "80,96 €"
        },
        ecoTip: "Vous pouvez réduire l'impact environnemental de votre voyage en compensant vos émissions CO₂ via atmosfair."
    },
    {
        category: "parking",
        title: "Parking Aéroport Sécurisé dès 28,99€ | Parkvia Adonis Park & Fly",
        description: "Réservez votre parking aéroport sécurisé Parkvia Adonis Park & Fly dès 28,99€. Accès rapide, service fiable, idéal courts et longs séjours.",
        mainHeading: "Parking sans souci: Parkvia Adonis Park and Fly à partir de seulement 28,99€",
        mainDescription: "Profitez d'un stationnement sans stress grâce au Parkvia Adonis Park and Fly. Réservez votre place de parking en toute tranquillité et partez en voyage l'esprit léger ! Avec ce deal, vous bénéficiez d'un parking sécurisé et pratique à partir de seulement 28,99 €, idéal pour les voyages de courte ou longue durée. Aucun souci, aucun frais caché : votre véhicule est entre de bonnes mains.",
        offer: {
            parkingName: "Parkvia Adonis Park and Fly",
            parkingType: "sécurisé et surveillé",
            access: "rapide et pratique depuis l'aéroport",
            price: 28.99,
            currency: "€",
            idealFor: "les voyages longue durée ou les départs anticipés"
        },
        whySuperDeal: "Les parkings proches des aéroports sont souvent chers et peu pratiques. Avec Parkvia Adonis Park and Fly, vous profitez d'un excellent rapport qualité-prix, d'un service fiable et d'une vraie tranquillité d'esprit pendant toute la durée de votre voyage.",
        thingsToDo: [
            "Garer votre véhicule en toute sécurité",
            "Profiter d'un accès rapide vers votre terminal",
            "Voyager sans stress en sachant votre voiture protégée",
            "Gagner du temps le jour du départ et du retour"
        ],
        additionalInfo: {
            parkingName: "Parkvia Adonis Park and Fly",
            security: "parking surveillé et fiable",
            access: "facile et bien signalé",
            suitability: "courts et longs séjours",
            price: "28,99 €"
        },
        ecoTip: "Vous pouvez compenser vos émissions CO₂ pour un voyage plus respectueux de l'environnement via atmosfair."
    },
    {
        category: "car",
        title: "Location Peugeot 208 2021 dès 100€ | Voiture Moderne & Confortable",
        description: "Louez une Peugeot 208 2021 dès 100€ seulement. GPS, caméra de recul, Android Auto & Apple CarPlay inclus. Location simple, fiable et sans souci.",
        mainHeading: "Location sans souci: Peugeot 208 2021 en location à partir de seulement 100€",
        mainDescription: "Profitez d'une location de voiture moderne et confortable sans stress grâce à notre formule transparente. Réservez la Peugeot 208 2021 et profitez d'une expérience de conduite agréable et sécurisée. À partir de 100 € seulement, tout est pensé pour vous offrir un excellent rapport qualité-prix, sans mauvaises surprises.",
        offer: {
            vehicle: "Peugeot 208 (année 2021)",
            comfort: "moderne et agréable",
            equipment: ["GPS intégré", "Caméra de recul", "Android Auto", "Apple CarPlay"],
            price: 100,
            currency: "€"
        },
        whySuperDeal: "Cette Peugeot 208 de dernière génération est proposée à un tarif exceptionnel pour son niveau d'équipement. Un choix idéal pour ceux qui veulent une voiture tech, confortable et économe.",
        thingsToDo: [
            "Parcourir la ville avec style",
            "Profiter des équipements modernes pour un trajet sans stress",
            "Se garer facilement grâce à la caméra de recul",
            "Connecter son smartphone pour une navigation parfaite"
        ],
        additionalInfo: {
            vehicleType: "Peugeot 208 2021",
            included: "équipement haut de gamme",
            price: "100 €"
        }
    }
];

async function main() {
    console.log("Seeding rentals...");
    for (const rental of rentalData) {
        await prisma.rental.create({
            data: rental
        });
    }
    console.log("Seeding finished.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
