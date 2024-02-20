import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import { redirect } from 'next/navigation';
import { database } from "@/app/store";

export async function POST(request) {
    try {
        // Verificar si el usuario está autenticado
        const user = await currentUser();
        if (!user) {
            console.log("Usuario no autenticado. Redirigiendo al inicio de sesión.");
            return redirect('/');
        }

        console.log("Usuario autenticado:", user);

         // Verificar si el usuario ya existe en la base de datos
         const existingUser = await database.query("SELECT * FROM operador WHERE id = ?", [user.id]);
         if (existingUser) {
             console.log("El usuario ya existe en la base de datos.");
             return NextResponse.json({ status: 400, message: "El usuario ya existe en la base de datos." });
         }
          else {
        // Insertar el nuevo usuario en la base de datos
        const newAfiliado = await database.query("INSERT INTO operador (id, name, email, imageUrl, phone, password, operadorNum) VALUES (?, ?, ?, ?, ?, ?, ?)",
         [id, `${firstName} ${lastName}`,
          emailAddresses[0].emailAddress,
           imageUrl, phoneNumbers[0].phoneNumber, 
           passwordEnabled, operadorNum]);
           console.log("Perfil de usuario creado correctamente:", newAfiliado);
          }

        return NextResponse.json({ status: 201, message: "Perfil de usuario creado correctamente." });
    } catch (error) {
        console.error("Error en la función POST:", error);
        return NextResponse.json({ status: 500, message: "Error en la función POST." });
    }
}
