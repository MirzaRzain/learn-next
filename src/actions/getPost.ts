"use server"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getPost(){
    const post = await prisma.post.findMany({
        include: {
            user: true,
        },
    });
    // console.log(post)
    return post;
}