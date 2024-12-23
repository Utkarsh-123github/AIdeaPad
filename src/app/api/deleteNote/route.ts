import { db } from "@/lib/db"
import { $notes } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export async function POST (req: Request){
    const {noteId} = await req.json()
    await db.delete($notes).where(eq($notes.id,parseInt(noteId)))
    return new Response('Deleted Successfully',{status:200})
}