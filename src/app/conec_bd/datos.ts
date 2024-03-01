import { prisma } from "./prismabd";



export async function getAllUsers(userType: string) {
  try {
    let users;

    switch (userType) {
      case 'Afiliado':
        users = await prisma.afiliado.findMany();
        break;
      case 'Operador':
        users = await prisma.operador.findMany();
        break;
      case 'Prestador':
        users = await prisma.prestador.findMany();
        break;
      default:
        throw new Error('Tipo de usuario no válido');
    }

    return users;
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
