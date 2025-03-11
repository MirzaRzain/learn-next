import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextApiRequest, { params }: { params: { id: string } }) {
  const { id } = params; // Retrieve 'id' from the params object
  
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id), // Parse the ID into an integer
      },
    });

    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error("Error retrieving user data:", error);
    return new Response(JSON.stringify({ message: 'Error retrieving user data' }), { status: 500 });
  } finally {
    await prisma.$disconnect(); // Properly disconnect from Prisma Client
  }
}

