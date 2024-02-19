'use server'

import { NextResponse } from "next/server";
import {conn} from "../../../libs/db"
import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from 'next/navigation';


export async function POST(request) {
    try {
        const user = await currentUser();

        if (!user) {
            return redirectToSignIn();
        }

        // Verificar si el afiliado ya existe
        const existingAfiliado = await conn.afiliado.findUnique({
            where: {
                userId: user.id,
            },
        });

        if (existingAfiliado) {
            return existingAfiliado;
        }

        // Verificar si el usuario es un superadministrador
        const isAdmin = user.organizationMemberships[0].id.some(
            (membership) => membership.id === 'orgmem_2boX6k6KTmsnEnUsUJ21LrWymvV'
        );

        if (isAdmin) {
            // Si es un superadministrador, redirigirlo a la página de superadministrador
            return redirect('page/dashboard/superadmin');
        } else {
            // Si no es un superadministrador, crear un nuevo perfil de afiliado
            const newAfiliado = await conn.query("INSERT INTO afiliado SET ?",{
                id: user.id,
                name:  `${user.firstName} ${user.lastName}`,
                email: user.emailAddresses[0].emailAddress,
                imageUrl: user.imageUrl,
                phone: user.phoneNumbers[0].phoneNumber
                ,
                password: user.passwordEnabled,
            });

            if (newAfiliado) {
                return NextResponse.json({ status: 201 });
            } else {
                return NextResponse.json({ status: 500 });
            }
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ status: 500 });
    }
}