import data from "../../afiliados.json";
import { NextResponse } from "next/server";



async function getAfiliado(request) {
  try {
    // Buscar el afiliado en el JSON según el DNI proporcionado
    const afiliado = data.find(afiliado => afiliado.dni === parseInt(dni));
    if (!afiliado) {
      console.log("No se encontró ningún afiliado con el DNI proporcionado.");
      return NextResponse.json({ status: 404, message: "No se encontró ningún afiliado con el DNI proporcionado." });
    }

    // Guardar los datos del afiliado y del usuario en un objeto JSON
    const userData = {
      id: user.id,
      email: email,
      dni: afiliado.dni,
      // Agrega aquí más campos del afiliado si es necesario
    };

    // Realizar la solicitud POST a la API
    const response = await fetch('/api/handlerafiliado', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      console.log("Solicitud POST exitosa.");
      // Mostrar mensaje para el usuario
      console.log("Perfil de usuario creado correctamente.");
      return NextResponse.redirect('/api/handlerafiliado');
    } else {
      console.log("Error en la solicitud POST:", responseData.message);
      return NextResponse.json({ status: 500, message: "Error en la solicitud POST." });
    }
  } catch (error) {
    console.error("Error en la función getAfiliado:", error);
    return NextResponse.json({ status: 500, message: "Error en la función getAfiliado." });
  }
}
export default getAfiliado