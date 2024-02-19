
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const Redirector = ({ selectedType }) => {
  const router = useRouter();

  useEffect(() => {
    // Verificar si estamos en el lado del cliente antes de intentar redirigir
    if (typeof window !== 'undefined') {
      // Función para manejar la redirección según el tipo seleccionado
      const handleRedirect = () => {
        switch (selectedType) {
          case 'AFILIADOS':
            router.push('/page/dashboard/afiliado');
            break;
          case 'OPERADORES':
            router.push('/page/dashboard/operador');
            break;
          case 'PRESTADORES':
            router.push('/page/dashboard/prestador');
            break;
          default:
            break;
        }
      };

      // Redirigir al renderizar el componente
      handleRedirect();
    }
  }, [selectedType, router]);

  return null; // No se renderiza ningún contenido visible
};

export default Redirector;
