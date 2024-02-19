import { NextResponse } from "next/server";
import { conn } from "../../../libs/db";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from 'next/navigation';
import { NextRequest } from "next/server";
import { database } from "@/app/store";

export async function POST(request) {
    try {
        const user = await currentUser();

        if (!user) {
            console.log("Usuario no autenticado. Redirigiendo al inicio de sesión.");
            return redirectToSignIn();
        }

        console.log("Usuario autenticado:", user);

         // Verificar si el afiliado ya existe
         const existingAfiliadoQuery = `SELECT * FROM afiliado WHERE id = ?`;
         const [existingAfiliadoRows, existingAfiliadoFields] = await database.query().execute(existingAfiliadoQuery, [user.id]);
         const existingAfiliado = existingAfiliadoRows[0];
 
         if (existingAfiliado) {
             console.log("El afiliado ya existe en la base de datos:", existingAfiliado);
             return existingAfiliado;
         }
 
         console.log("El afiliado no existe en la base de datos. Procediendo a la inserción.");
 

        // Verificar si el usuario es un superadministrador
        const isAdmin = user.organizationMemberships[0].id.some(
            (membership) => membership.id === 'orgmem_2boX6k6KTmsnEnUsUJ21LrWymvV'
        );

        if (isAdmin) {
            console.log("El usuario es un superadministrador. Redirigiendo a la página de superadministrador.");
            return redirect('page/dashboard/superadmin');
        } else {
            console.log("El usuario no es un superadministrador. Creando un nuevo perfil de afiliado.");

            const newAfiliado = await database.query("INSERT INTO afiliado SET ?", {
                id: user.id,
                name: `${user.firstName} ${user.lastName}`,
                email: user.emailAddresses[0].emailAddress,
                imageUrl: user.imageUrl,
                phone: user.phoneNumbers[0].phoneNumber,
                password: user.passwordEnabled,
            });

            if (newAfiliado) {
                console.log("Perfil de afiliado creado correctamente:", newAfiliado);
                return NextResponse.json({ status: 201 });
            } else {
                console.error("Error al crear el perfil de afiliado.");
                return NextResponse.json({ status: 500 });
            }
        }
    } catch (error) {
        console.error("Error en la función POST:", error);
        return NextResponse.json({ status: 500 });
    }
}

