
import { NextResponse } from "next/server";
import { prisma } from "../../conec_bd/prismabd";

export async function GET(req: { query: { userType?: string }; }) {
  const { userType } = req.query;
    console.log({ userType })
    try {
      let users;
      switch (userType) {
        case 'Afiliado':
          users = await prisma.afiliado.findMany();
          console.log(users);
          break;
        case 'Operador':
          users = await prisma.operador.findMany();
          console.log(users);
          break;
        case 'Prestador':
          users = await prisma.prestador.findMany();
          console.log(users);
          break;
        default:
          throw new Error('Tipo de usuario no válido');
      }
  
      return NextResponse.json(users);
    } catch (error) {
        console.error('Error en la función GET:', error);
        NextResponse.json({status:500, error: 'Error en el servidor' }); // Devuelve un error al cliente
    } finally {
      await prisma.$disconnect();
    }
  }

