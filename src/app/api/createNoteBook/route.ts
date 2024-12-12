// Endpoint : /api/createNoteBook
// Method: POST
// Request: CreateNoteBookRequest

import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Response: CreateNoteBookResponse

export async function POST(req : Request) {
    const {userId} = await auth();
    console.log(userId);
    if (!userId) {
        return new NextResponse("unauthorised", { status: 401 });
    }
    const body = await req.json();
    const { name } = body;
    
    // const imageDescription = await generateImagePrompt(name); 
    // console.log(imageDescription);
    // Dropping off this functionality bcoz of lack of not suitable AI api key
    // We'll add a static image for now
    const note_ids = await db.insert($notes).values({
        name,
        userId,
        imageUrl : 'https://i.pinimg.com/736x/19/ce/78/19ce78573c1a739a998a7aff07ecd3eb.jpg'
    }).returning({
        insertedId : $notes.id
    });

    return NextResponse.json({
        note_id : note_ids[0].insertedId
    })
}
