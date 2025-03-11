"use server"
import { PrismaClient } from "@prisma/client"
import jwt from "jsonwebtoken";


const prisma = new PrismaClient();

export async function profile(token: string){
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number};
        const user = await prisma.user.findUnique({
          where: {
            id: decoded.userId,
          },
          include: {
            post: true,
          },
        });
        if(!user){
          throw new Error("User not found");
        }
        console.log(user);
        return user;
      } catch (error) {
        console.error("Error fetching profile:", error);
        return null;
      }
}