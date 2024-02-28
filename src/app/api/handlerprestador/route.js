import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import { prisma } from "@/app/conec_bd/prismabd";
import { checkUserAuthentication } from "../checkUser/authUtils";

export async function POST(request) {
    try {
        console.log("Iniciando función POST...");

        const user = await currentUser();
        const body = await request.json();
        const matricula= body.matricula;
        const especialidad = body.especialidad;
        const email = user.emailAddresses[0].emailAddress;
        const userId = user.id;
        // Verificar si la matrícula ya está asociada a un usuario en la base de datos
          // Verificar si el usuario ya está autenticado en alguna tabla
          const isAuthenticated = await checkUserAuthentication(userId);
          if (isAuthenticated) {
              return NextResponse.json({ status: 400, message: `El usuario ya está asociado a una cuenta existente.` });
          }
  
          // Verificar si el DNI ya está asociado a un usuario en la base de datos
          const existingUserWithDNI = await prisma.prestador.findFirst({
              where: {
                  dni: dni
              }
          });
  
          if (existingUserWithDNI) {
              return NextResponse.json({ status: 400, message: `El DNI N°: ${existingUserWithDNI.dni} ya está asociado a un Afiliado` });
          }
  
          // Verificar si el usuario ya existe en la base de datos por su email
          const existingUserWithEmail = await prisma.prestador.findFirst({
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
            return NextResponse.json({ status: 407, message: "Afiliado no autenticado. Redirigiendo al inicio de sesión." });
        }
        
        // Obtener el ID del usuario autenticado
        const userId = user.id;

        // Verificar si el ID del usuario está en la base de datos
       
        const isAuthenticatedAndInDatabase = await checkUserAuthentication(userId, 'prestador');
        if (isAuthenticatedAndInDatabase.status === 200) {
            console.log(isAuthenticatedAndInDatabase.status)
            return NextResponse.json({ status: 200, message: isAuthenticatedAndInDatabase.message });
        } else {
        } 
            (isAuthenticatedAndInDatabase.status === 400)
            return NextResponse.json ({ status: 402, message: isAuthenticatedAndInDatabase.message });
    } catch (error) {
        console.error("Error al verificar la autenticación del usuario:", error);
        return NextResponse.json({ status: 500, message: `Error al verificar la autenticación del usuario: ${error.message}` });
    }
}


