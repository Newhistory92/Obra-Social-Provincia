import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import { prisma } from "@/app/conec_bd/prismabd";
import { checkUserAuthentication } from "../checkUser/authUtils";




export async function POST(request) {
    try {
        console.log("Iniciando función POST...");

        const user = await currentUser();
        console.log("Usuario actual:", user);

        const body = await request.json();
        console.log("Cuerpo de la solicitud:", body);

        const matricula = body.matricula;
        const especialidad = body.especialidad;
        const email = user.emailAddresses[0].emailAddress;
        const userId = user.id;
        const dataTime =  new Date().toISOString();
        
        console.log(" dataTime:", dataTime);
        console.log("Matrícula:", matricula);
        console.log("Especialidad:", especialidad);
        console.log("Correo electrónico:", email);
        console.log("ID de usuario:", userId);

        // Verificar si el usuario ya está asociado a una cuenta existente
        
        const isAuthenticated = await checkUserAuthentication(userId, 'prestador');
        console.log(isAuthenticated.status,isAuthenticated.message )
        if (isAuthenticated === false) {
            return NextResponse.json({ status: 404, message: isAuthenticated.message });
        }
        // Verificar si el DNI ya está asociado a un usuario en la base de datos
        const existingUserWithMatricula = await prisma.prestador.findFirst({
            where: {
                matricula: matricula
            }
        });
        console.log("Usuario existente con matrícula:", existingUserWithMatricula);

        if (existingUserWithMatricula) {
            return NextResponse.json({ status: 400, message: `El DNI N°: ${existingUserWithMatricula.matricula} ya está asociado a un Prestador` });
        }

        // Verificar si el usuario ya existe en la base de datos por su email
        const existingUserWithEmail = await prisma.prestador.findFirst({
            where: {
                email: email
            }
        });
        console.log("Usuario existente con correo electrónico:", existingUserWithEmail);

        if (existingUserWithEmail) {
            return NextResponse.json({ status: 400, message: `El Correo Electrónico ${existingUserWithEmail.email} ya está asociado a un Prestador` });
        }

        // Si no se cumplen las condiciones anteriores, crear el nuevo usuario
        const { firstName, lastName, emailAddresses, imageUrl, phoneNumbers, passwordEnabled,
        } = user;
        const passwordValue = passwordEnabled ? 'true' : 'false'; // Convertir el booleano a string
        console.log("Nombre:", firstName);
        console.log("Apellido:", lastName);
        console.log("Imagen de perfil:", imageUrl);
        console.log("Número de teléfono:", phoneNumbers[0].phoneNumber);
        console.log("¿Contraseña habilitada?", passwordEnabled);
        console.log("Valor de la contraseña:", passwordValue);

        const newPrestador = await prisma.prestador.create({
            data: {
                id: userId,
                name: `${firstName}`,
                apellido: `${lastName}`,
                email: emailAddresses[0].emailAddress,
                imageUrl: imageUrl,
                phone: phoneNumbers[0].phoneNumber,
                password: passwordValue,
                matricula: matricula,
                especialidad: especialidad,
                dataTime: dataTime,
                puntuacion: null,
                phoneopc:null,
                role: "provider",
                addressId:null,
                tipo: "Fidelizado",
                descripcion:null,
             
          
            }
        });
        console.log("Perfil de usuario creado correctamente:", newPrestador);

        return NextResponse.json({ status: 200, message: "Perfil del Prestador fue creado con éxito." });
    } catch (error) {
        console.error("Error al crear el perfil del Prestador:", error);
        return NextResponse.json({ status: 500, message: `Error al crear el perfil del Prestador: ${error.message}` });
    }
}





export async function GET(request) {
    try {
        const user = await currentUser();
        if (!user) {
            return NextResponse.json({ status: 407, message: "Prestador no autenticado. Redirigiendo al inicio de sesión." });
        }
        
        // Obtener el ID del usuario autenticado
        const userId = user.id;

        // Verificar si el ID del usuario está en la base de datos
        const isAuthenticatedAndInDatabase = await checkUserAuthentication(userId, 'prestador');
        if (isAuthenticatedAndInDatabase.status === 200) {
            // Obtener toda la información del usuario desde la base de datos
            const users = await prisma.prestador.findMany();

            // Verificar si se encontró la información del usuario
            if (!users) {
                return NextResponse.json({ status: 404, message: "Usuario no encontrado en la base de datos." });
            }

            // Devolver toda la información del usuario
            return NextResponse.json({ status: 200, users });
        } else {
            return NextResponse.json ({ status: 402, message: isAuthenticatedAndInDatabase.message });
        }
    } catch (error) {
        console.error("Error al verificar la autenticación del usuario:", error);
        return NextResponse.json({ status: 500, message: `Error al verificar la autenticación del usuario: ${error.message}` });
    }
}



