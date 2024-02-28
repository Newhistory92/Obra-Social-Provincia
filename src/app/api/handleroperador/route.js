
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import { prisma } from "@/app/conec_bd/prismabd";
import { checkUserAuthentication } from "../checkUser/authUtils";

export async function POST(request) {
    try {
        const user = await currentUser();
        const body = await request.json();
        const numeroOperador = body.numeroOperador;
        const email = user.emailAddresses[0].emailAddress;
        const userId = user.id;

        // Verificar si el usuario ya está autenticado en alguna tabla
        const isAuthenticated = await checkUserAuthentication(userId);
        if (isAuthenticated) {
            return NextResponse.json({ status: 400, message: `El usuario ya está asociado a una cuenta existente.` });
        }

        // Verificar si el DNI ya está asociado a un usuario en la base de datos
        const existingUserWithOPer = await prisma.operador.findFirst({
            where: {
                numeroOperador: numeroOperador
            }
        });

        if (existingUserWithOPer) {
            return NextResponse.json({ status: 400, message: `El Operador N°: ${existingUserWithOPer.numeroOperador} ya está asociado a un Afiliado` });
        }

        // Verificar si el usuario ya existe en la base de datos por su email
        const existingUserWithEmail = await prisma.operador.findFirst({
            where: {
                email: email
            }
        });

        if (existingUserWithEmail) {
            return NextResponse.json({ status: 400, message: `El Correo Electrónico ${existingUserWithEmail.email} ya está asociado a un Afiliado` });
        }

        // Insertar el nuevo usuario en la base de datos
        const { firstName, lastName, emailAddresses, imageUrl, phoneNumbers, passwordEnabled } = user;
        const passwordValue = passwordEnabled ? 'true' : 'false'; // Convertir el booleano a string
        const newOperador = await prisma.operador.create({
            data: {
                id: userId,
                name: `${firstName} ${lastName}`,
                email: emailAddresses[0].emailAddress,
                imageUrl: imageUrl,
                phone: phoneNumbers[0].phoneNumber,
                password: passwordValue,
                numeroOperador: numeroOperador
            }
        });
        
        console.log("Perfil de usuario creado correctamente:", newOperador);

        return NextResponse.json({ status: 200, message: "Perfil del Operador fue creado con éxito." });
    } catch (error) {
        console.error("Error al crear el perfil del Afiliado:", error);
        return NextResponse.json({ status: 500, message: `Error al crear el perfil del Operador: ${error.message}` });
    }
}


export async function GET(request) {
    try {
        const user = await currentUser();
        if (!user) {
            return NextResponse.json({ status: 401, message: "Afiliado no autenticado. Redirigiendo al inicio de sesión." });
        }
        
        // Obtener el ID del usuario autenticado
        const userId = user.id;

        // Verificar si el ID del usuario está en la base de datos
        const isAuthenticatedAndInDatabase = await checkUserAuthentication(userId, 'operador');
        if (isAuthenticatedAndInDatabase.status === 200) {
            return NextResponse.json({ status: 200, message: isAuthenticatedAndInDatabase.message });
        } else {
            return NextResponse.json ({ status: 402, message: "Operador no encontrado en la base de datos." });
        }
    } catch (error) {
        console.error("Error al verificar la autenticación del usuario:", error);
        return NextResponse.json({ status: 500, message: `Error al verificar la autenticación del usuario: ${error.message}` });
    }
}




