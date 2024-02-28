
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import { prisma } from "@/app/conec_bd/prismabd";

export async function POST(request) {
    try {
        const user = await currentUser();
        const body = await request.json();
        const dni = body.dni;
        const email = user.emailAddresses[0].emailAddress;
        const userId = user.id;
    
        // Verificar si el DNI ya está asociado a un usuario en la base de datos
        const existingUserWithDNI = await prisma.afiliado.findFirst({
            where: {
                dni: dni
            }
        });

        if (existingUserWithDNI) {
            // Verificar si el usuario ya existe en la base de datos por su ID
            const existingUserWithId = await prisma.afiliado.findFirst({
                where: {
                    id: userId
                }
            });

            if (existingUserWithId && existingUserWithId.id === existingUserWithDNI.id) {
                return NextResponse.json({ status: 200, message: "El Afiliado se confirma correctamente." });
            }
        }

        // Si el DNI no está asociado al usuario o no coincide con el ID, continuar con la lógica anterior

        if (existingUserWithDNI) {
            return NextResponse.json({ status: 400, message: `El DNI N°: ${existingUserWithDNI.dni} ya está asociado a un Afiliado`});
        }

        // Verificar si el usuario ya existe en la base de datos por su email
        const existingUserWithEmail = await prisma.afiliado.findFirst({
            where: {
                email: email
            }
        });

        if (existingUserWithEmail) {
            return NextResponse.json({ status: 400, message: `El Correo Electronico  ${existingUserWithEmail.email} ya está asociado a un Afiliado` });
        }

        // Verificar si el usuario ya existe en la base de datos por su ID
        // Buscar en la tabla Afiliado
        const existingAfiliado = await prisma.afiliado.findFirst({
            where: {
                id: userId
            }
        });

        // Buscar en la tabla Prestador
        const existingPrestador = await prisma.prestador.findFirst({
            where: {
                id: userId
            }
        });

        // Buscar en la tabla Operador
        const existingOperador = await prisma.operador.findFirst({
            where: {
                id: userId
            }
        });
        if (existingAfiliado) {
            return NextResponse.json({ status: 400, message: `El Afiliado ${existingAfiliado.name} ya tiene una cuenta asociada como Afiliado.` });
        } else if (existingPrestador) {
            return NextResponse.json({ status: 400, message: `El Prestador ${existingPrestador.name} ya tiene una cuenta asociada como Prestador.` });
        } else if (existingOperador) {
            return NextResponse.json({ status: 400, message: `El Operador ${existingOperador.name} ya tiene una cuenta asociada como Operador.` });
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
            // Verificar si el ID del usuario está en la tabla Afiliado
            const existingAfiliado = await prisma.afiliado.findFirst({
                where: {
                    id: userId
                }
            });
    
            // Verificar si el ID del usuario está en la tabla Prestador
            const existingPrestador = await prisma.prestador.findFirst({
                where: {
                    id: userId
                }
            });
    
            // Verificar si el ID del usuario está en la tabla Operador
            const existingOperador = await prisma.operador.findFirst({
                where: {
                    id: userId
                }
            });
    
            // Determinar si el usuario está autenticado en alguna tabla
            if (existingAfiliado || existingPrestador || existingOperador) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error("Error al verificar la autenticación del usuario:", error);
            return false;
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


