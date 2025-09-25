import { db } from '$lib/server/db';
import { typeIds } from '$lib/server/db/schema';

const chunkSize = 500;
const inserts = [];

try {
    const typeIdInfos = Object.values(await fetch('https://mokaam.dk/API/market/type_ids').then((r) => r.json())) as { id: number; name: string }[];

    for (let i = 0; i < chunkSize; i += chunkSize) {
        const chunk = typeIdInfos.slice(i, i + chunkSize);
        inserts.push(db.insert(typeIds).values(chunk).onConflictDoNothing().run());
    }

    await Promise.all(inserts);
} catch (e) {
    console.error('Error initializing type IDs:', e);
}