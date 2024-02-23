import { currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';

// Importa los datos de los JSON
import dataAfiliados from '../../../afiliados.json';

export async function typeAfiliado(request: { dni: string; }) {
    try {
        // Verifica si el usuario está autenticado
        const user = await currentUser();
        if (!user) {
            console.log("Usuario no autenticado. Redirigiendo al inicio de sesión.");
            return redirect('/');
        }

        console.log("Usuario autenticado:", user);

        // Extrae el DNI del cuerpo de la solicitud
        const { dni } = request;
        console.log("DNI recibido:", dni); // Agregamos un console.log para verificar el DNI recibido

        // Busca el afiliado en el JSON según el DNI proporcionado
        const afiliado = dataAfiliados.find(afiliado => afiliado.dni === dni);
        console.log("Afiliado encontrado:", afiliado); // Agregamos un console.log para verificar el afiliado encontrado

        if (!afiliado) {
            console.log("No se encontró ningún afiliado con el DNI proporcionado.");
            return NextResponse.json({ status: 404, message: "No se encontró ningún afiliado con el DNI proporcionado." });
        }

        // Realiza la solicitud POST a la API para afiliados
        const response = await fetch('/api/handlerafiliado', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ dni }), // Se pasa el DNI correctamente como un objeto
        });

        if (response.status === 200) {
            console.log("Solicitud POST exitosa.");
            // Redirige al usuario al dashboard de afiliados
            return redirect('/page/dashboard/afiliado');
        } else {
            console.log("Error en la solicitud POST:", response.message);
            return NextResponse.json({ status: 500, message: "Error en la solicitud POST." });
        }
    } catch (error) {
        console.error("Error en la función typeAfiliado:", error);
        // Manejo de errores
        return NextResponse.json({ status: 500, message: "Error en la función typeAfiliado." });
    }
}
