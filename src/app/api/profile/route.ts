import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request){
    const authHeader = request.headers.get('Authorization');
    const token = localStorage.getItem('token');

    if(!token){
        return NextResponse.json({ message: 'Unauthorized'}, { status: 401 });
    }

    try{
        const decoded = jwt.verify(token, "your-secret-key");
        const userId = decoded.id;

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                roles: true,
            },
        });
        // console.log('halo:',user)
        if(!user){
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
        return NextResponse.json(user);
    }catch(error){
        console.error(error);
        return NextResponse.json(
            { message: "Invalid or Expired token" },
            { status: 401 },
        );
    }
}