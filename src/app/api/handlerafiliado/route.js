
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import { prisma } from "@/app/conec_bd/prismabd";
import { checkUserAuthentication } from "../checkUser/authUtils";

export async function POST(request) {
    try {
        const user = await currentUser();
        const body = await request.json();
        const dni = body.dni;
        const email = user.emailAddresses[0].emailAddress;
        const userId = user.id;

        // Verificar si el usuario ya está autenticado en alguna tabla
        const isAuthenticated = await checkUserAuthentication(userId);
        if (isAuthenticated) {
            return NextResponse.json({ status: 400, message: `El usuario ya está asociado a un Afiliado.` });
        }

        // Verificar si el DNI ya está asociado a un usuario en la base de datos
        const existingUserWithDNI = await prisma.afiliado.findFirst({
            where: {
                dni: dni
            }
        });

        if (existingUserWithDNI) {
            return NextResponse.json({ status: 400, message: `El DNI N°: ${existingUserWithDNI.dni} ya está asociado a un Afiliado` });
        }

        // Verificar si el usuario ya existe en la base de datos por su email
        const existingUserWithEmail = await prisma.afiliado.findFirst({
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
        const newAfiliado = await prisma.afiliado.create({
            data: {
                id: userId,
                name: `${firstName} ${lastName}`,
                email: emailAddresses[0].emailAddress,
                imageUrl: imageUrl,
                phone: phoneNumbers[0].phoneNumber,
                password: passwordValue,
                dni: dni
            }
        });
        
        console.log("Perfil de usuario creado correctamente:", newAfiliado);

        return NextResponse.json({ status: 200, message: "Perfil del Afiliado fue creado con éxito." });
    } catch (error) {
        console.error("Error al crear el perfil del Afiliado:", error);
        return NextResponse.json({ status: 500, message: `Error al crear el perfil del Afiliado: ${error.message}` });
    }
}

// export async function POST(request) {
//     try {
//         const user = await currentUser();
//         const body = await request.json();
//         const dni = body.dni;
//         const email = user.emailAddresses[0].emailAddress;
//         const userId = user.id;
    
//         // Verificar si el DNI ya está asociado a un usuario en la base de datos
//         const existingUserWithDNI = await prisma.afiliado.findFirst({
//             where: {
//                 dni: dni
//             }
//         });

//         if (existingUserWithDNI) {
//             // Verificar si el usuario ya existe en la base de datos por su ID
//             const existingUserWithId = await prisma.afiliado.findFirst({
//                 where: {
//                     id: userId
//                 }
//             });

//             if (existingUserWithId && existingUserWithId.id === existingUserWithDNI.id) {
//                 return NextResponse.json({ status: 200, message: "El Afiliado se confirma correctamente." });
//             }
//         }

//         // Si el DNI no está asociado al usuario o no coincide con el ID, continuar con la lógica anterior

//         if (existingUserWithDNI) {
//             return NextResponse.json({ status: 400, message: `El DNI N°: ${existingUserWithDNI.dni} ya está asociado a un Afiliado`});
//         }

//         // Verificar si el usuario ya existe en la base de datos por su email
//         const existingUserWithEmail = await prisma.afiliado.findFirst({
//             where: {
//                 email: email
//             }
//         });

//         if (existingUserWithEmail) {
//             return NextResponse.json({ status: 400, message: `El Correo Electronico  ${existingUserWithEmail.email} ya está asociado a un Afiliado` });
//         }

//         // Verificar si el usuario ya existe en la base de datos por su ID
//         const existingUserWithId = await prisma.afiliado.findFirst({
//             where: {
//                 id: userId
//             }
//         });

//         if (existingUserWithId) {
//             return NextResponse.json({ status: 400, message: `El Afiliado ${existingUserWithId.name} ya existe en la base de datos.` });
//         }

//         // Insertar el nuevo usuario en la base de datos
//         const { firstName, lastName, emailAddresses, imageUrl, phoneNumbers, passwordEnabled } = user;
//         const passwordValue = passwordEnabled ? 'true' : 'false'; // Convertir el booleano a string
//         const newAfiliado = await prisma.afiliado.create({
//             data: {
//                 id: userId,
//                 name: `${firstName} ${lastName}`,
//                 email: emailAddresses[0].emailAddress,
//                 imageUrl: imageUrl,
//                 phone: phoneNumbers[0].phoneNumber,
//                 password: passwordValue,
//                 dni: dni
//             }
//         });
        
//         console.log("Perfil de usuario creado correctamente:", newAfiliado);

//         return NextResponse.json({ status: 200, message: "Perfil del Afiliado fue creado con éxito." });
//     } catch (error) {
//         return NextResponse.json({ status: 500, message: `Error al crear el perfil del Afiliado: ${error.message}` });
//     }
// }


export async function GET(request) {
        try {
            const user = await currentUser();
            if (!user) {
                return NextResponse.json({ status: 401, message: "Afiliado no autenticado. Redirigiendo al inicio de sesión." });
            }
            
            // Obtener el ID del usuario autenticado
            const userId = user.id;
    
            // Verificar si el ID del usuario está en la base de datos
            const isAuthenticatedAndInDatabase = await checkUserAuthentication(userId, 'afiliado');
            if (isAuthenticatedAndInDatabase.status === 200) {
                return NextResponse.json({ status: 200, message: isAuthenticatedAndInDatabase.message });
            } else {
                return NextResponse.json ({ status: 402, message: "Afiliado no encontrado en la base de datos." });
            }
        } catch (error) {
            console.error("Error al verificar la autenticación del usuario:", error);
            return NextResponse.json({ status: 500, message: `Error al verificar la autenticación del usuario: ${error.message}` });
        }
    }

    





// export async function GET(request) {
//     try {
//         const user = await currentUser();
//         if (!user) {
//             return NextResponse.json({ status: 401, message: "Afiliado no autenticado. Redirigiendo al inicio de sesión." });
//         }
        
//         // Obtener el ID del usuario autenticado
//         const userId = user.id;

//         // Verificar si el ID del usuario está en la base de datos
//         const isAuthenticatedAndInDatabase = await checkUserAuthentication(userId);
//         if (!isAuthenticatedAndInDatabase) {
//             return NextResponse.json ({ status: 402, message: "Afiliado no encontrado en la base de datos." });
//         }

//         return NextResponse.json({ status: 200,message: "El Afiliado se confirma correctamente." });
//     } catch (error) {
//         console.error("Error al verificar la autenticación del usuario:", error);
//         return NextResponse.json({ status: 500, message: `Error al verificar la autenticación del usuario: ${error.message}` });
//     }
// }

// async function checkUserAuthentication(userId) {
//     try {
//         // Verificar si el ID del usuario está en la base de datos
//         const existingUserWithId = await prisma.afiliado.findFirst({
//             where: {
//                 id: userId
//             }
//         });

//         return !!existingUserWithId; // Convertir a booleano
//     } catch (error) {
//         console.error("Error al verificar la autenticación del Afiliado:", error);
//         return false;
//     }
// }


