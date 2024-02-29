import { prisma } from "./prismabd";



export async function getAllUsers() {
    try {
      const afiliados = await prisma.afiliado.findMany();
      const operadores = await prisma.operador.findMany();
      const prestadores = await prisma.prestador.findMany();
  
      return {
        afiliados,
        operadores,
        prestadores,
      };
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }