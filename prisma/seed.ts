import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(){
    const user1 = await prisma.user.create({
        data:{
            name: 'John Doe',
            email: 'john@example.com',
            roles: 'Admin',
            password: '$2a$10$50UZa7R1yCIl9d91Xqjz3.xvO0pyc357GL2VNZLixL15Q0cPA4T3e'
        },
    });
    const user2 = await prisma.user.create({
        data:{
            name: 'Alan Walker',
            email: 'walker@example.com',
            roles: 'Admin',
            password: '$2a$10$50UZa7R1yCIl9d91Xqjz3.xvO0pyc357GL2VNZLixL15Q0cPA4T3e'
        },
    });
    const user3 = await prisma.user.create({
        data:{
            name: 'John Constantine',
            email: 'constantine@example.com',
            roles: 'Admin',
            password: '$2a$10$50UZa7R1yCIl9d91Xqjz3.xvO0pyc357GL2VNZLixL15Q0cPA4T3e'
        },
    });
    const user4 = await prisma.user.create({
        data:{
            name: 'Heisenberg guz',
            email: 'guz@example.com',
            roles: 'Admin',
            password: '$2a$10$50UZa7R1yCIl9d91Xqjz3.xvO0pyc357GL2VNZLixL15Q0cPA4T3e'
        },
    });
    const user5 = await prisma.user.create({
        data:{
            name: 'Versca Reiko',
            email: 'rei.reiko@example.com',
            roles: 'Admin',
            password: '$2a$10$50UZa7R1yCIl9d91Xqjz3.xvO0pyc357GL2VNZLixL15Q0cPA4T3e'
        },
    });
    const user6 = await prisma.user.create({
        data:{
            name: 'Nimbus solomon',
            email: 'nimbus@example.com',
            roles: 'Admin',
            password: '$2a$10$50UZa7R1yCIl9d91Xqjz3.xvO0pyc357GL2VNZLixL15Q0cPA4T3e'
        },
    });
    const user7 = await prisma.user.create({
        data:{
            name: 'Jonathan ',
            email: 'jonathan@example.com',
            roles: 'Admin',
            password: '$2a$10$50UZa7R1yCIl9d91Xqjz3.xvO0pyc357GL2VNZLixL15Q0cPA4T3e'
        },
    });
    const user8 = await prisma.user.create({
        data:{
            name: 'John Wesker',
            email: 'wesker@example.com',
            roles: 'Admin',
            password: '$2a$10$50UZa7R1yCIl9d91Xqjz3.xvO0pyc357GL2VNZLixL15Q0cPA4T3e'
        },
    });
    const user9 = await prisma.user.create({
        data:{
            name: 'Andrew Tate',
            email: 'tate.cobre@example.com',
            roles: 'Admin',
            password: '$2a$10$50UZa7R1yCIl9d91Xqjz3.xvO0pyc357GL2VNZLixL15Q0cPA4T3e'
        },
    });
    const user10 = await prisma.user.create({
        data:{
            name: 'Joffrey Baratheon',
            email: 'baratheon@example.com',
            roles: 'Admin',
            password: '$2a$10$50UZa7R1yCIl9d91Xqjz3.xvO0pyc357GL2VNZLixL15Q0cPA4T3e'
        },
    });
}