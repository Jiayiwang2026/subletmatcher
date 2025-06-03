import { connectToDatabase } from '@/lib/mongodb';

export async function POST(request) {
    try {
        const { startDate, endDate, roomType, budget } = await request.json();
        
        const { db } = await connectToDatabase();
        
        // Convert dates to Date objects
        const start = new Date(startDate);
        const end = new Date(endDate);
        const maxBudget = budget ? parseFloat(budget) * 1.2 : Infinity; // Allow 20% over budget

        // Build MongoDB query
        const query = {
            转租开始时间: { $lte: end.toISOString() },  // Listing starts before user's end date
            转租结束时间: { $gte: start.toISOString() }, // Listing ends after user's start date
            价格: { $lte: maxBudget }
        };

        // Add room type filter if specified
        if (roomType) {
            query.房型 = roomType.toLowerCase();
        }

        // Fetch matching listings
        const listings = await db.collection('listings').find(query).toArray();

        // Calculate scores and sort results
        const scoredListings = listings.map(item => {
            const listingStart = new Date(item.转租开始时间);
            const listingEnd = new Date(item.转租结束时间);

            const overlapStart = new Date(Math.max(start.getTime(), listingStart.getTime()));
            const overlapEnd = new Date(Math.min(end.getTime(), listingEnd.getTime()));
            const overlapDays = Math.max(0, (overlapEnd - overlapStart) / (1000 * 60 * 60 * 24));

            const totalDaysNeeded = (end - start) / (1000 * 60 * 60 * 24);
            const timeScore = overlapDays / totalDaysNeeded * 100;

            const priceScore = item.价格 <= budget ? 100 - (item.价格 / budget * 50) : 0;
            const roomTypeScore = !roomType || item.房型 === roomType ? 100 : 50;

            return {
                ...item,
                score: (timeScore * 0.5 + priceScore * 0.3 + roomTypeScore * 0.2),
                overlapDays,
                coveragePercent: Math.round(timeScore)
            };
        }).sort((a, b) => b.score - a.score);

        return Response.json(scoredListings);
    } catch (error) {
        console.error('Search error:', error);
        return Response.json({ error: 'Failed to search listings' }, { status: 500 });
    }
} 