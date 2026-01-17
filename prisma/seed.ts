import prisma from '../lib/prisma';
import fs from 'fs';
import path from 'path';


async function main() {
    const csvPath = path.join(process.cwd(), 'sheet_data.csv');
    console.log(`Reading CSV from: ${csvPath}`);

    if (!fs.existsSync(csvPath)) {
        console.error("CSV file not found!");
        return;
    }

    const csvContent = fs.readFileSync(csvPath, 'utf-8');

    const lines = csvContent.split('\n');

    const parseCSVLine = (line: string) => {
        const result = [];
        let start = 0;
        let inQuotes = false;
        for (let i = 0; i < line.length; i++) {
            if (line[i] === '"') {
                inQuotes = !inQuotes;
            } else if (line[i] === ',' && !inQuotes) {
                let val = line.substring(start, i).trim();
                if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1).replace(/""/g, '"');
                result.push(val);
                start = i + 1;
            }
        }
        let lastVal = line.substring(start).trim();
        if (lastVal.startsWith('"') && lastVal.endsWith('"')) lastVal = lastVal.slice(1, -1).replace(/""/g, '"');
        result.push(lastVal);
        return result;
    };

    console.log(`Found ${lines.length} lines.`);

    let count = 0;
    // Start from 1 to skip header
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        // Simple filter to skip empty-ish lines from the end of file
        if (line.replace(/,/g, '').trim().length === 0) continue;

        const row = parseCSVLine(line);
        // Columns: Link, Content, Category, Price, Title, Desc
        // Index:   0     1        2         3      4      5

        if (row.length < 6) {
            console.warn(`Skipping line ${i}: Not enough columns.`);
            continue;
        }

        const priceRaw = row[3];
        // Handle "136€", "€681", "167,28€"
        let cleanPrice = priceRaw.replace(/[^0-9.,]/g, '').replace(',', '.');
        // If it has multiple dots/commas (unlikely for these simple formats but possible), handle simply
        const price = parseFloat(cleanPrice);

        const title = row[4];
        const desc = row[5];

        if (!title) continue;

        // Naively infer city/country
        let city = 'Paris'; // Default fallback
        let country = 'France';

        const rules = [
            { key: 'Tel Aviv', city: 'Tel Aviv', country: 'Israel' },
            { key: 'Berlin', city: 'Berlin', country: 'Germany' },
            { key: 'London', city: 'London', country: 'UK' },
            { key: 'Tallinn', city: 'Tallinn', country: 'Estonia' },
            { key: 'Geneva', city: 'Geneva', country: 'Switzerland' },
            { key: 'Genève', city: 'Geneva', country: 'Switzerland' },
            { key: 'Toulouse', city: 'Toulouse', country: 'France' },
            { key: 'Lille', city: 'Lille', country: 'France' },
            { key: 'Lyon', city: 'Lyon', country: 'France' },
            { key: 'Nice', city: 'Nice', country: 'France' },
            { key: 'Marseille', city: 'Marseille', country: 'France' },
            { key: 'Rhodes', city: 'Rhodes', country: 'Greece' },
            { key: 'Ibiza', city: 'Ibiza', country: 'Spain' },
            { key: 'Minorque', city: 'Menorca', country: 'Spain' },
            { key: 'La Plagne', city: 'La Plagne', country: 'France' },
            { key: 'Tignes', city: 'Tignes', country: 'France' },
            { key: 'Vars', city: 'Vars', country: 'France' },
            { key: 'Cap d\'Agde', city: 'Cap d\'Agde', country: 'France' },
            { key: 'Montmartre', city: 'Paris', country: 'France' },
        ];

        for (const rule of rules) {
            if (title.includes(rule.key) || desc.includes(rule.key) || (row[0] && row[0].includes(rule.key.toLowerCase()))) {
                city = rule.city;
                country = rule.country;
                break;
            }
        }

        try {
            await prisma.hotel.create({
                data: {
                    title: title,
                    desc: desc || title,
                    title_fr: title,
                    desc_fr: desc || title,
                    address: `${city}, ${country}`,
                    city: city,
                    country: country,
                    price_per_night: isNaN(price) ? 100 : price,
                    currency: 'EUR',
                    rating: 4 + Math.random(),
                    review_count: 10 + Math.floor(Math.random() * 200),
                    amenities: ["Free WiFi", "Non-smoking", "Breakfast"],
                    check_in: "15:00",
                    check_out: "11:00",
                    notes: "Imported via Seed"
                }
            });
            count++;
        } catch (err) {
            console.error(`Failed to create ${title}:`, err);
        }
    }
    console.log(`Seeding finished. Inserted ${count} hotels.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
