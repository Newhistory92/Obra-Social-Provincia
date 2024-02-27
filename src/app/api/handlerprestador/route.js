import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import { prisma } from "@/app/conec_bd/prismabd";

export async function POST(request) {
    try {
        console.log("Iniciando función POST...");

        const user = await currentUser();
        console.log("Usuario actual:", user);

        const body = await request.json();
        console.log("Datos del cuerpo de la solicitud:", body);
        const matricula= body.matricula;
        const especialidad = body.especialidad;

        const email = user.emailAddresses[0].emailAddress;
        const userId = user.id;

    console.log("matricula:", matricula);
        console.log("Email:", email);
        console.log("ID de usuario:", userId);
        
        // Verificar si la matrícula ya está asociada a un usuario en la base de datos
        const existingUserWithMatricula = await prisma.prestador.findFirst({
            where: {
                matricula: matricula
            }
        });
        console.log("existingUserWithMatricula:", existingUserWithMatricula);

        if (existingUserWithMatricula) {
            // Verificar si el usuario ya existe en la base de datos por su ID
            const existingUserWithId = await prisma.prestador.findFirst({
                where: {
                    id: userId
                }
            });
            if (existingUserWithId && existingUserWithId.id === existingUserWithMatricula.id) {
                return NextResponse.json({ status: 200, message: "El Prestador se confirma correctamente." });
            }
        }
        
        // Si la matrícula no está asociada al usuario o no coincide con el ID, continuar con la lógica anterior
        
        if (existingUserWithMatricula) {
            return NextResponse.json({ status: 400, message: `La matrícula N°: ${existingUserWithMatricula.matricula} ya está asociada a un Prestador`});
        }
        console.log("existingUserWithMatricula:", existingUserWithMatricula);
        // Verificar si el usuario ya existe en la base de datos por su email
        const existingUserWithEmail = await prisma.prestador.findFirst({
            where: {
                email: email
            }
        });
        
        if (existingUserWithEmail) {
            return NextResponse.json({ status: 400, message: `El Correo Electrónico ${existingUserWithEmail.email} ya está asociado a un Prestador` });
        }
        
        // Verificar si el usuario ya existe en la base de datos por su ID
        const existingUserWithId = await prisma.prestador.findFirst({
            where: {
                id: userId
            }
        });
        
        if (existingUserWithId) {
            return NextResponse.json({ status: 400, message: `El Prestador ${existingUserWithId.name} ya existe en la base de datos.` });
        }
        console.log("existingUserWithId:", existingUserWithId);

        // Insertar el nuevo usuario en la base de datos
        const { firstName, lastName, emailAddresses, imageUrl, phoneNumbers, passwordEnabled } = user;
        const passwordValue = passwordEnabled ? 'true' : 'false'; // Convertir el booleano a string
        const newPrestador = await prisma.prestador.create({
            data: {
                id: userId,
                name: `${firstName} ${lastName}`,
                email: emailAddresses[0].emailAddress,
                imageUrl: imageUrl,
                phone: phoneNumbers[0].phoneNumber,
                password: passwordValue,
                matricula: matricula,
                especialidad: especialidad // Guardar especialidad
            }
        });
        
        console.log("Perfil de usuario creado correctamente:", newPrestador);

        return NextResponse.json({ status: 200, message: "Perfil del Prestador fue creado con éxito." });
    } catch (error) {
        return NextResponse.json({ status: 500, message: `Error al crear el perfil del Prestador: ${error.message}` });
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
        const isAuthenticatedAndInDatabase = await checkUserAuthentication(userId);
        if (!isAuthenticatedAndInDatabase) {
            return NextResponse.json ({ status: 402, message: "Afiliado no encontrado en la base de datos." });
        }

        return NextResponse.json({ status: 200,message: "El Afiliado se confirma correctamente." });
    } catch (error) {
        console.error("Error al verificar la autenticación del usuario:", error);
        return NextResponse.json({ status: 500, message: `Error al verificar la autenticación del usuario: ${error.message}` });
    }
}

async function checkUserAuthentication(userId) {
    try {
        // Verificar si el ID del usuario está en la base de datos
        const existingUserWithId = await prisma.afiliado.findFirst({
            where: {
                id: userId
            }
        });

        return !!existingUserWithId; // Convertir a booleano
    } catch (error) {
        console.error("Error al verificar la autenticación del Afiliado:", error);
        return false;
    }
}

