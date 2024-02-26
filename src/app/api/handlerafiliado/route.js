
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import { prisma } from "@/app/conec_bd/prismabd";
import { redirect } from "next/navigation";

export async function POST(request) {
    try {
        const user = await currentUser();
        
        // Verificar si el usuario está autenticado
        if (!user) {
            return redirect('/');
        }
  
        const body = await request.json();
        const dni = body.dni;
        const email = user.emailAddresses[0].emailAddress;
    
        // Verificar si el DNI ya está asociado a este correo electrónico en la base de datos
        const existingUserWithDNI = await prisma.afiliado.findFirst({
            where: {
                dni: dni,
                email: email // Verificar si el DNI está asociado a este correo electrónico
            }
        });

        if (existingUserWithDNI) {
            console.log("El DNI ya está asociado a este correo electrónico en la base de datos.");
            return NextResponse.json({ status: 400, message: "El DNI ya está asociado a este correo electrónico" });
        }

        // Verificar si el correo electrónico ya está asociado a un DNI en la base de datos
        const existingUserWithEmail = await prisma.afiliado.findFirst({
            where: {
                email: email,
                dni: dni // Verificar si el correo electrónico está asociado a este DNI
            }
        });

        if (existingUserWithEmail) {
            console.log("Este correo electrónico ya está asociado a un DNI en la base de datos.");
            return NextResponse.json({ status: 400, message: "Este correo electrónico ya está asociado a un DNI en la base de datos." });
        }

        // Verificar si el usuario ya existe en la base de datos
        const existingUser = await prisma.afiliado.findFirst({
            where: {
                id: user.id
            }
        });

        if (existingUser) {
            console.log("El usuario ya existe en la base de datos.");
            return NextResponse.json({ status: 400, message: "El usuario ya existe en la base de datos." });
        }

        // Insertar el nuevo usuario en la base de datos
        const { id, firstName, lastName, emailAddresses, imageUrl, phoneNumbers, passwordEnabled } = user;
        const passwordValue = passwordEnabled ? 'true' : 'false'; // Convertir el booleano a string
        const newAfiliado = await prisma.afiliado.create({
            data: {
                id: id,
                name: `${firstName} ${lastName}`,
                email: email,
                imageUrl: imageUrl,
                phone: phoneNumbers[0].phoneNumber,
                password: passwordValue,
                dni: dni
            }
        });
        
        console.log("Perfil de usuario creado correctamente:", newAfiliado);

        return NextResponse.json({ status: 201, message: "Perfil de usuario creado correctamente." });
    } catch (error) {
        return NextResponse.json({ status: 500, message:error.message });
    }
}










export function GET (){
    return NextResponse.json("obteniendo afiliado")


}





// export function POST (){
//     return NextResponse.json("creando afiliado")


// }














// import { NextResponse } from "next/server";
// import { currentUser } from "@clerk/nextjs";
// import { redirect } from 'next/navigation';
// import { database } from "@/app/store";

// export async function POST(request) {
//     try {
//         // Verificar si el usuario está autenticado
//         const user = await currentUser();
//         if (!user) {
//             console.log("Usuario no autenticado. Redirigiendo al inicio de sesión.");
//             return redirect('/');
//         }

//         console.log("Usuario autenticado:", user);

//          // Verificar si el usuario ya existe en la base de datos
//          const existingUser = await database.query("SELECT * FROM afiliado WHERE id = ?", [user.id]);
//          if (existingUser) {
//              console.log("El usuario ya existe en la base de datos.");
//              return NextResponse.json({ status: 400, message: "El usuario ya existe en la base de datos." });
//          }
//           else {
//         // Insertar el nuevo usuario en la base de datos
//         const newAfiliado = await database.query("INSERT INTO afiliado (id, name, email, imageUrl, phone,
// password, dni) VALUES (?, ?, ?, ?, ?, ?, ?)",
//          [id, `${firstName} ${lastName}`,
//           emailAddresses[0].emailAddress,
//            imageUrl, phoneNumbers[0].phoneNumber, 
//            passwordEnabled, dni]);
//            console.log("Perfil de usuario creado correctamente:", newAfiliado);
//           }

//         return NextResponse.json({ status: 201, message: "Perfil de usuario creado correctamente." });
//     } catch (error) {
//         console.error("Error en la función POST:", error);
//         return NextResponse.json({ status: 500, message: "Error en la función POST." });
//     }
// }




// import { NextResponse } from "next/server";
// import { currentUser} from "@clerk/nextjs";
// import { redirect } from 'next/navigation';
// import { database } from "@/app/store";

// export async function POST(request) {
//     try {
//         const user = await currentUser();

//         if (!user) {
//             console.log("Usuario no autenticado. Redirigiendo al inicio de sesión.");
//             return redirect('/');
//         }

//         console.log("Usuario autenticado:", user);

//         // Obtener datos del cuerpo de la solicitud
//         const requestData = await request.json();

//         // Extraer datos del usuario actual
//         const { id, firstName, lastName, emailAddresses, imageUrl, phoneNumbers, passwordEnabled } = user;

//         // Extraer datos del cuerpo de la solicitud
//         const { dni } = requestData;

//         // Crear el nuevo afiliado en la base de datos
//         const newAfiliado = await database.query("INSERT INTO afiliado (id, name, email, imageUrl, phone, password, dni) VALUES (?, ?, ?, ?, ?, ?, ?)",
//          [id, `${firstName} ${lastName}`,
//           emailAddresses[0].emailAddress,
//            imageUrl, phoneNumbers[0].phoneNumber, 
//            passwordEnabled, dni]);

//         if (newAfiliado) {
//             console.log("Perfil de usuario creado correctamente:", newAfiliado);
//             return NextResponse.json({ status: 201 });
//         } else {
//             console.error("Error al crear el perfil de usuario.");
//             return NextResponse.json({ status: 500 });
//         }
//     } catch (error) {
//         console.error("Error en la función POST:", error);
//         return NextResponse.json({ status: 500 });
//     }
// }




















// import { NextResponse } from "next/server";
// import { currentUser} from "@clerk/nextjs";
// import { redirect } from 'next/navigation';

// import { database } from "@/app/store";

// export async function POST(request) {
//     try {
//         const user = await currentUser();

//         if (!user) {
//             console.log("Usuario no autenticado. Redirigiendo al inicio de sesión.");
//             return redirect('/');
//         }

//         console.log("Usuario autenticado:", user);

//             const newAfiliado = await database.query("INSERT INTO afiliado SET ?", {
//                 id: user.id,
//                 name: `${user.firstName} ${user.lastName}`,
//                 email: user.emailAddresses[0].emailAddress,
//                 imageUrl: user.imageUrl,
//                 phone: user.phoneNumbers[0].phoneNumber,
//                 password: user.passwordEnabled,
                
//             });

//             if (newProfile) {
//                 console.log("Perfil de usuario creado correctamente:", newProfile);
//                 return NextResponse.json({ status: 201 });
//             } else {
//                 console.error("Error al crear el perfil de usuario.");
//                 return NextResponse.json({ status: 500 });
//             }
//         } catch (error) {
//             console.error("Error en la función POST:", error);
//             return NextResponse.json({ status: 500 });
//         }
//     }



